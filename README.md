# Coconut Online Interpreter [![Inline docs](http://inch-ci.org/github/cs121-team-panda/coconut-interpreter-flask.svg?branch=master)](http://inch-ci.org/github/cs121-team-panda/coconut-interpreter-flask) [![CircleCI](https://circleci.com/gh/cs121-team-panda/coconut-interpreter-flask/tree/master.svg?style=svg)](https://circleci.com/gh/cs121-team-panda/coconut-interpreter-flask/tree/master)

[Coconut](http://coconut-lang.org/) is a functional programming language that compiles to Python. This project is an online interpreter for Coconut. On the webpage, the user can interact with the code editor and click the run button to execute their program and view the output.

Try the current version at: [http://coconut-interpreter.herokuapp.com/](http://coconut-interpreter.herokuapp.com/)

Developed by Jonathan Cruz, Teerapat Jenrungrot, Natalie Kadonaga, and Brittany Wang.

# Features

The interpreter consists of a simple, elegant webpage that enables users to easily enter and execute Coconut code.

![hello world](https://user-images.githubusercontent.com/25191981/37873631-7263c75a-2fd5-11e8-9d28-5d967f193c53.png)

On the right, the user can see loading dots as the code loads in the output section:

![dots](https://user-images.githubusercontent.com/25191981/37873635-848e7664-2fd5-11e8-882e-bec66dd498fd.png)

On the left, we can use the code editor. The editor allows for the keyboard shortcuts from Ace editor (listed [here](https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts)). In addition, the editor includes Python and Coconut syntax highlighting for all keywords (Coconut specific keywords listed [here](http://coconut.readthedocs.io/en/latest/DOCS.html#keywords)):

![coco specific](https://user-images.githubusercontent.com/25191981/37873637-91acd57a-2fd5-11e8-8b51-2c916fff5f44.png)

Clicking run will compile and execute the program. The output will show up on the right. If there is a compiling error, the output will display the error from the Coconut compiler along with the traceback highlighted in red in the user's original code:

![red tracebacks](https://user-images.githubusercontent.com/25191981/37873641-a2df53cc-2fd5-11e8-9e4d-9b943ac765f0.png)

After the code runs, the user's code is stored in the session, so they can make changes to their existing code. 

The interpreter also supports multiple lines of output:

![example code](https://user-images.githubusercontent.com/25191981/37873646-b5bba32e-2fd5-11e8-8f03-2b0e6258ef77.png)


The user has the option of seeing the compiled Python code by clicking the box next to Python at the top right corner:

![python code](https://user-images.githubusercontent.com/25191981/37873648-c3827b04-2fd5-11e8-9279-832c6a487e4d.png)

The user is also able to see tracebacks highlighted in red in the Python code as well:
![tracebacks in python](https://user-images.githubusercontent.com/25191981/37873653-eb697e10-2fd5-11e8-92ae-c8b99efc8eb2.png)


# Issues

See the [Issues](https://github.com/cs121-team-panda/coconut-interpreter-flask/issues) tab for additional information.

## Security

Major security concerns for online compilers/interpreters are malicious codes submitted from users. In our current system, the code is evaluated on the server-side. From the server perspective, the server may happen to run the potentially malicious code. Some potential problems may arise, at least but not limited to:

* DDoS attacks to exhaust the server's resources.
* Manipulation of file structures using `os` module
