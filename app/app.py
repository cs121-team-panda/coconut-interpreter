import os
import subprocess
import uuid
from flask import request, jsonify
from flask_cors import CORS
from app import create_app

app = create_app(os.getenv('FLASK_CONFIG') or 'default')
CORS(app)

@app.route('/coconut', methods=['POST'])
def coconut():
    """
    Handles Coconut code submitted by users.
    """
    code = request.form['code']

    # Write a code to a file with randomly generated filename.
    filename = str(uuid.uuid4())
    with open(filename, 'w') as output:
        output.write(code)

    # Initialize parameters
    output_text = None
    compile_error = None
    running_error = None
    proc = None
    python_code = None

    # Compile the user's code with Coconut compiler
    try:
        subprocess.run(["coconut", filename], stderr=subprocess.PIPE, check=True)
    except subprocess.CalledProcessError as error:
        compile_error = True
        output_text = str(error.stderr, 'utf-8')
        print("Error in compiling Coconut's code")

    if not compile_error:
        print("Finish compilation [{:}] to [{:}.py]".format(filename, filename))

        # Obtain coconut code.
        compiled_code = None
        with open(filename + ".py", "r") as compiled_file:
            compiled_code = compiled_file.read()

        SEPARATOR = "# Compiled Coconut: -----------------------------------------------------------\n\n"
        python_code = compiled_code.split(SEPARATOR)[-1]

        # Run the compiled code.
        try:
            proc = subprocess.run(["python", filename + ".py"], stdout=subprocess.PIPE,
                                  stderr=subprocess.PIPE, check=True)
        except subprocess.CalledProcessError as error:
            running_error = True
            output_text = str(error.stderr, 'utf-8')
            print("Error in running Coconut's code")

        if not running_error:
            # Store output from the run
            output_text = proc.stdout.decode('utf-8')
            print("Finish running [{:}]".format(filename + ".py"))

        # Remove temporary file that we compiled (*.py)
        subprocess.run(["rm", filename + '.py'])

    # Remove temporary file that stored the code
    subprocess.run(["rm", filename])
    print("Delete temp files {:} and {:}.py".format(filename, filename))

    # Print output
    print("Output is\n{:}".format(output_text))

    # Return JSON output
    return jsonify({'output': output_text,
                    'python': python_code,
                    'runningError': running_error,
                    'compileError': compile_error})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
