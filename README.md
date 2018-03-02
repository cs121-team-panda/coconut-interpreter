# Coconut Online Interpreter [![Inline docs](http://inch-ci.org/github/cs121-team-panda/coconut-interpreter-flask.svg?branch=master)](http://inch-ci.org/github/cs121-team-panda/coconut-interpreter-flask) [![CircleCI](https://circleci.com/gh/cs121-team-panda/coconut-interpreter-flask/tree/master.svg?style=svg)](https://circleci.com/gh/cs121-team-panda/coconut-interpreter-flask/tree/master)

[Coconut](http://coconut-lang.org/) is a functional programming language that compiles to Python. This project is an online interpreter for Coconut. On the webpage, the user can interact with the code editor and click the run button to execute their program and view the output.

Try the current version at: [https://cs121-team-panda.github.io/coconut-interpreter/](https://cs121-team-panda.github.io/coconut-interpreter/)

Developed by Jonathan Cruz, Teerapat Jenrungrot, Natalie Kadonaga, and Brittany Wang.

# Features

The interpreter consists of a simple, elegant webpage that enables users to easily enter and execute Coconut code.

![App interface](https://user-images.githubusercontent.com/8051724/36887245-2096868e-1da5-11e8-94ad-121c58fe3aad.png)

On the left, we can use the code editor. The editor includes Python syntax highlighting. The editor also allows for the keyboard shortcuts from Ace editor (listed [here](https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts)). 

Clicking run will compile and execute the program. The output will show up on the right. If there is a compiling error, the output will display the error from the Coconut compiler:

![Example compile error output](https://user-images.githubusercontent.com/8051724/36887226-0e07d086-1da5-11e8-9ec7-8f46cb136580.png)

If there is a runtime error, the output will display the traceback:

![Example runtime error output](https://user-images.githubusercontent.com/8051724/36887259-36c45bc0-1da5-11e8-9c04-10d2cf888986.png)

After the code runs, the user's code is stored in the session, so they can make changes to their existing code. 

The interpreter also supports multiple lines of output:

![Example multiple line output](https://user-images.githubusercontent.com/8051724/36887253-2c783556-1da5-11e8-95dc-bae4fb6cdf41.png)

# Issues

See the [Issues](https://github.com/cs121-team-panda/coconut-interpreter-flask/issues) tab for additional information.

## Security

Major security concerns for online compilers/interpreters are malicious codes submitted from users. In our current system, the code is evaluated on the server-side. From the server perspective, the server may happen to run the potentially malicious code. Some potential problems may arise, at least but not limited to:

* DDoS attacks to exhaust the server's resources.
* Manipulation of file structures using `os` module