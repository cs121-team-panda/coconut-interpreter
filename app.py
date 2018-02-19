import os
import sys
import contextlib
from flask import Flask, redirect, request, render_template, url_for, session
from coconut.convenience import parse
from io import StringIO
app = Flask(__name__)
app.secret_key = os.urandom(24)

@contextlib.contextmanager
def stdoutIO(stdout=None):
    old = sys.stdout
    if stdout is None:
        stdout = StringIO()
    sys.stdout = stdout
    yield stdout
    sys.stdout = old

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
    coconut_code = request.form['code']
    try:
        python_code = parse(coconut_code)
    except:
        session['output'] = str(sys.exc_info()[1])
        return redirect(url_for('index'), code=307)

    with stdoutIO() as s:
        try:
            exec(python_code)
        except Exception as e:
            print(e)
    session['output'] = s.getvalue()

    return redirect(url_for('index'), code=307)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
