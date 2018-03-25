# Coconut Online Interpreter [![Inline docs](http://inch-ci.org/github/cs121-team-panda/coconut-interpreter-flask.svg?branch=master)](http://inch-ci.org/github/cs121-team-panda/coconut-interpreter-flask) [![CircleCI](https://circleci.com/gh/cs121-team-panda/coconut-interpreter-flask/tree/master.svg?style=svg)](https://circleci.com/gh/cs121-team-panda/coconut-interpreter-flask/tree/master)

[Coconut](http://coconut-lang.org/) is a functional programming language that compiles to Python. This project is an online interpreter for Coconut. On the webpage, the user can interact with the code editor and click the run button to execute their program and view the output.

Try the current version at: [http://coconut-interpreter.herokuapp.com/](http://coconut-interpreter.herokuapp.com/)

Developed by Jonathan Cruz, Teerapat Jenrungrot, Natalie Kadonaga, and Brittany Wang.

# Features

The interpreter consists of a simple, elegant webpage that enables users to easily enter and execute Coconut code.

![App interface](https://user-images.githubusercontent.com/8051724/36887245-2096868e-1da5-11e8-94ad-121c58fe3aad.png)

On the right, the user can see loading dots as the code loads in the output section:

![loading dots](https://user-images.githubusercontent.com/25191981/37872827-5b566c40-2fc4-11e8-9c95-a7fb303618e8.png)

On the left, we can use the code editor. The editor allows for the keyboard shortcuts from Ace editor (listed [here](https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts)). In addition, the editor includes Python and Coconut syntax highlighting for all keywords (Coconut specific keywords listed [here](http://coconut.readthedocs.io/en/latest/DOCS.html#keywords)):

![coconut specific](https://user-images.githubusercontent.com/25191981/37872803-ddc2393a-2fc3-11e8-8f81-d632ac8755ec.png)

Clicking run will compile and execute the program. The output will show up on the right. If there is a compiling error, the output will display the error from the Coconut compiler along with the traceback highlighted in red in the user's original code:

![Example compile error and red tracebacks](https://user-images.githubusercontent.com/25191981/37872744-441a1fa0-2fc3-11e8-8563-e4e3e82077c6.png)

After the code runs, the user's code is stored in the session, so they can make changes to their existing code. 

The interpreter also supports multiple lines of output:

![Example multiple line output](https://user-images.githubusercontent.com/8051724/36887253-2c783556-1da5-11e8-95dc-bae4fb6cdf41.png)

The user has the option of seeing the compiled Python code by clicking the box next to Python at the top right corner:

![python code](https://user-images.githubusercontent.com/25191981/37872848-b85c00c6-2fc4-11e8-90b0-93612406085e.png)


# Issues

See the [Issues](https://github.com/cs121-team-panda/coconut-interpreter-flask/issues) tab for additional information.

## Security

Major security concerns for online compilers/interpreters are malicious codes submitted from users. In our current system, the code is evaluated on the server-side. From the server perspective, the server may happen to run the potentially malicious code. Some potential problems may arise, at least but not limited to:

* DDoS attacks to exhaust the server's resources.
* Manipulation of file structures using `os` module
