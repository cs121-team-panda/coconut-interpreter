import json
import os
import sys
import contextlib
import traceback
from io import StringIO

from coconut.convenience import parse, setup
from coconut.exceptions import CoconutException
from flask import request, jsonify
from flask_cors import CORS

from app import create_app
from .trace import extract_trace_py, extract_trace_coco

app = create_app(os.getenv('FLASK_CONFIG') or 'default')
CORS(app)

@contextlib.contextmanager
def stdoutIO(stdout=None):
    old = sys.stdout
    if stdout is None:
        stdout = StringIO()
    sys.stdout = stdout
    yield stdout
    sys.stdout = old

@app.route('/coconut', methods=['POST'])
def coconut():
    """
    Handles Coconut code submitted by users.
    """
    coconut_code = request.form['code']

    # Get optional compile arguments
    # Examples: http://coconut.readthedocs.io/en/master/DOCS.html#usage
    compile_args = json.loads(request.form.get('args', '{}'))

    # If target not specified by user, choose the specific target corresponding to
    # the current version
    if not compile_args.get('target'):
        compile_args['target'] = 'sys'

    # Initialize parameters
    output_text = ''
    python_code = ''
    compile_error = False
    running_error = False
    coconut_error = None
    python_error = None

    # Compile the user's code with Coconut compiler
    try:
        # Necessary for _coconut_sys definition in exec environment
        d = {'sys': globals()['sys']}
        exec(parse(), d)
        setup(**compile_args)
        compiled_code = parse(coconut_code, 'block')
    except CoconutException as error:
        compile_error = True
        output_text = '{}: {}'.format(error.__class__.__name__, error)
        print("Error in compiling Coconut code")

    if not compile_error:
        print("Finish compilation")

        python_code = compiled_code

        # Run the compiled code.
        with stdoutIO() as s:
            try:
                exec(compiled_code, d)
            except Exception:
                running_error = True
                output_text = traceback.format_exc()

        if running_error:
            print("Error in running Coconut code")

        print("Finish running")

        if not running_error:
            # Store output from the run
            output_text = s.getvalue()
        else:
            python_error = extract_trace_py(output_text)
            line_num, python_lines = python_error['line'], python_code.split('\n')
            if 0 < line_num < len(python_lines):
                python_error['call'] = python_lines[line_num-1].strip()
            output_text = python_error['error']
    else:
        coconut_error = extract_trace_coco(output_text)
        output_text = coconut_error['error']

    # Print output
    print("Output is\n{:}".format(output_text))

    # Return JSON output
    return jsonify({'output': output_text,
                    'python': python_code,
                    'pythonError': python_error,
                    'coconutError': coconut_error})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
