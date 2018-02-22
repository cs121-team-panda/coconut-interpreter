import os
import subprocess
import uuid
from flask import Flask, redirect, request, render_template, url_for, session
app = Flask(__name__)
app.secret_key = os.urandom(24)

@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        session.pop('output', None)
        return render_template('main.html')
    else:
        outputText = session.pop('output', None)
        return render_template('main.html', subprocess_output=outputText)


@app.route('/submit', methods=['POST'])
def submit():
    code = request.form['code']

    filename = str(uuid.uuid4())
    with open(filename, 'w') as output:
        output.write(code)

    subprocess.run(["coconut", filename], check=True)
    print("Finish compilation [{:}] to [{:}.py]".format(filename, filename))

    proc = subprocess.run(["python", filename + ".py"], stdout=subprocess.PIPE, check=True)
    print("Finish running [{:}]".format(filename + ".py"))

    outputText = proc.stdout.decode('utf-8')
    print("Output is\n{:}".format(outputText))

    subprocess.run(["rm", filename])
    subprocess.run(["rm", filename + '.py'])
    print("Delete temp fiels {:} and {:}.py".format(filename, filename))

    session['output'] = outputText

    return redirect(url_for('index'), code=307)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
