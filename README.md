# Coconut Online Interpreter [![Inline docs](http://inch-ci.org/github/cs121-team-panda/coconut-interpreter-flask.svg?branch=master)](http://inch-ci.org/github/cs121-team-panda/coconut-interpreter-flask) [![CircleCI](https://circleci.com/gh/cs121-team-panda/coconut-interpreter-flask/tree/master.svg?style=svg)](https://circleci.com/gh/cs121-team-panda/coconut-interpreter-flask/tree/master)

[Coconut](http://coconut-lang.org/) is a functional programming language that compiles to Python. This project is an online interpreter for Coconut. On the webpage, the user can interact with the code editor and click the run button to execute their program and view the output.

Try the current version at: [https://cs121-team-panda.github.io/coconut-interpreter/](https://cs121-team-panda.github.io/coconut-interpreter/)

Developed by Jonathan Cruz, Teerapat Jenrungrot, Natalie Kadonaga, and Brittany Wang.

## Architecture 
<img width="1093" alt="architecture" src="https://user-images.githubusercontent.com/35832643/38783767-b5ef5236-40bb-11e8-91b4-e1d5bdc0aa18.png">

The project's architecture deploys a server-less backend, AWS Lambda, that compiles and executes user-submitted Coconut code. The front-end is built with React.

## Installation
Requires Python 3. 
```
pip install -r requirements.txt
```

### Running Locally
```
python manage.py runserver 
```

## Functionality

The interpreter consists of an easy-to-use webpage (shown below) that enables user to easily enter and execute Coconut code. 

![demo1](https://user-images.githubusercontent.com/35832643/39089307-f309052e-4578-11e8-8be7-7d1c01902a65.gif)

* **Code Editor:** The code editor, which is on the left side of the webpage, is where the user types in their Coconut code. The editor has line numbers and Coconut-specific syntax highlighting.

* **Compilation Settings:** Clicking the settings gear will display a settings drawer. From within the drawer, the user can select which version of Python the Coconut code will compile to. By default, the latest version of Python 3 is selected. 

* **Saving to a Coconut File:** Clicking the save icon will download the contents of the code editor into a Coconut file called ```coconut.coco```.

* **Code Execution:** Clicking `RUN`or using the keyboard shortcut `Ctrl + Enter` for Windows or `⌘ + Enter` for Mac will compile and execute the program.

* **Showing the Compiled Python:** Checking the box labeled `PYTHON` will replace the output with the compiled Python, which is the output of the Coconut compiler. The Python code will be displayed using Python syntax highlighting.

* **Code Execution Output:** The code execution output is on the right side of the webpage. 

Furthermore, if there is an error in compilation or execution, the output will display the traceback. If the error came from the Coconut compiler, the offending Coconut line will be highlighted in red in the code editor. If the error occurred at runtime, then the offending line will be highlighted in red in the Python code, if the Python checkbox is checked:

![demo2 1](https://user-images.githubusercontent.com/35832643/39089360-592b40be-457a-11e8-840c-dca79ba37a02.gif)

## Known Problems
Currently, there are no known problems. However, on the current deployment, users cannot choose the Coconut version on the interpreter except the version installed by developers. The developer team plans to address this issue in the future.

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue with the owners of this repository before making a change.

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface.
3. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent.
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## Documentation
- [Deployment](https://github.com/cs121-team-panda/coconut-interpreter/blob/master/docs/Deploy.md)
- [How to Embed](https://github.com/cs121-team-panda/coconut-interpreter/blob/master/docs/Embed.md)

## Security

The Coconut Interpreter uses AWS Lambda, a containerized, serverless backend which allows for safe execution of untrusted code. For instance, in the code below, attempting to access the system files will not do anything. 
![demo3](https://user-images.githubusercontent.com/35832643/39089358-3f93a286-457a-11e8-97d1-41664178a2f9.png)
