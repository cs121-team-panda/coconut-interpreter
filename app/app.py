import os
import subprocess
import uuid
from flask import redirect, request, render_template, url_for, session, jsonify
from flask_cors import CORS, cross_origin
from app import create_app

app = create_app(os.getenv('FLASK_CONFIG') or 'default')
CORS(app)

@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        session.pop('output', None)
        return render_template('main.html')
    else:
        outputText = session.get('output')
        return render_template('main.html', subprocess_output=outputText)

@app.route('/coconut', methods=['POST'])
@cross_origin(allow_headers=['Content-Type'])
def coconut():
    """
    Handles Coconut code submitted by users.
    """
    code = request.get_json()['code']

    # Write a code to a file with randomly generated filename.
    filename = str(uuid.uuid4())
    with open(filename, 'w') as output:
        output.write(code)

    # Initialize parameters
    outputText = None
    compileError = None
    runningError = None
    proc = None

    # Compile the user's code with Coconut compiler
    try:
        subprocess.run(["coconut", filename], stderr=subprocess.PIPE, check=True)
    except subprocess.CalledProcessError as error:
        compileError = True
        outputText = str(error.stderr, 'utf-8')
        print("Error in compiling Coconut's code")

    if not compileError:
        print("Finish compilation [{:}] to [{:}.py]".format(filename, filename))

        # Run the compiled code.
        try:
            proc = subprocess.run(["python", filename + ".py"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        except subprocess.CalledProcessError as error:
            runningError = True
            outputText = str(error.stderr, 'utf-8')
            print("Error in running Coconut's code")

        if not runningError:
            # Store output from the running 
            outputText = proc.stdout.decode('utf-8')
            print("Finish running [{:}]".format(filename + ".py"))

        # Remove temporary file that we have compiled (*.py)
        subprocess.run(["rm", filename + '.py'])

    # Remove temporary file that we stored the code 
    subprocess.run(["rm", filename])
    print("Delete temp files {:} and {:}.py".format(filename, filename))
    
    # Store output in session for showing in browser
    session['output'] = outputText
    print("Output is\n{:}".format(outputText))

    # Return JSON output
    return jsonify({'output': session['output']})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
