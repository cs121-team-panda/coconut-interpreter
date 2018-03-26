# Coconut Online Interpreter [![Inline docs](http://inch-ci.org/github/cs121-team-panda/coconut-interpreter-flask.svg?branch=master)](http://inch-ci.org/github/cs121-team-panda/coconut-interpreter-flask) [![CircleCI](https://circleci.com/gh/cs121-team-panda/coconut-interpreter-flask/tree/master.svg?style=svg)](https://circleci.com/gh/cs121-team-panda/coconut-interpreter-flask/tree/master)

[Coconut](http://coconut-lang.org/) is a functional programming language that compiles to Python. This project is an online interpreter for Coconut. On the webpage, the user can interact with the code editor and click the run button to execute their program and view the output.

Try the current version at: [https://cs121-team-panda.github.io/coconut-interpreter/](https://cs121-team-panda.github.io/coconut-interpreter/)

Developed by Jonathan Cruz, Teerapat Jenrungrot, Natalie Kadonaga, and Brittany Wang.

# Features

The interpreter consists of a simple, elegant webpage that enables users to easily enter and execute Coconut code.

![ui](https://user-images.githubusercontent.com/35832643/37873776-fcecfff2-2fd7-11e8-991b-339363e8489e.png)

On the right, the user can see loading dots as the code loads in the output section:

![dots](https://user-images.githubusercontent.com/35832643/37873777-0d66bf4e-2fd8-11e8-8f14-555df97d3312.png)

On the left, we can use the code editor. The editor allows for the keyboard shortcuts from Ace editor (listed [here](https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts)). In addition, the editor includes Python and Coconut syntax highlighting for all keywords (Coconut specific keywords listed [here](http://coconut.readthedocs.io/en/latest/DOCS.html#keywords)):

![coco specific](https://user-images.githubusercontent.com/35832643/37873781-17561450-2fd8-11e8-8659-1c70463a48aa.png)

Clicking run will compile and execute the program. The output will show up on the right. If there is a compiling error, the output will display the error from the Coconut compiler along with the traceback highlighted in red in the user's original code:

![red tracebacks](https://user-images.githubusercontent.com/35832643/37873784-28079e7c-2fd8-11e8-8c7e-14a954f44264.png)

After the code runs, the user's code is stored in the session, so they can make changes to their existing code. 

The interpreter also supports multiple lines of output:

![example code](https://user-images.githubusercontent.com/35832643/37873786-338affdc-2fd8-11e8-8544-cb8c85bd9be3.png)

The user has the option of seeing the compiled Python code by clicking the box next to Python at the top right corner:

![python code](https://user-images.githubusercontent.com/35832643/37873787-43191844-2fd8-11e8-90b0-e58317c27420.png)

The user is also able to see tracebacks highlighted in red in the Python code as well:
![python tracebacks](https://user-images.githubusercontent.com/35832643/37873790-49e9130e-2fd8-11e8-9bb1-2f3467d09393.png)

# Issues

See the [Issues](https://github.com/cs121-team-panda/coconut-interpreter-flask/issues) tab for additional information.

## Security

The Coconut Interpreter uses AWS Lambda, a containerized, serverless backend which allows users to run code safely. 
