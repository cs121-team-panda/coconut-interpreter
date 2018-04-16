# Coconut Online Interpreter [![Inline docs](http://inch-ci.org/github/cs121-team-panda/coconut-interpreter-flask.svg?branch=master)](http://inch-ci.org/github/cs121-team-panda/coconut-interpreter-flask) [![CircleCI](https://circleci.com/gh/cs121-team-panda/coconut-interpreter-flask/tree/master.svg?style=svg)](https://circleci.com/gh/cs121-team-panda/coconut-interpreter-flask/tree/master)

[Coconut](http://coconut-lang.org/) is a functional programming language that compiles to Python. This project is an online interpreter for Coconut. On the webpage, the user can interact with the code editor and click the run button to execute their program and view the output.

Try the current version at: [https://cs121-team-panda.github.io/coconut-interpreter/](https://cs121-team-panda.github.io/coconut-interpreter/)

Developed by Jonathan Cruz, Teerapat Jenrungrot, Natalie Kadonaga, and Brittany Wang.

## Architecture 
<img width="1093" alt="architecture" src="https://user-images.githubusercontent.com/35832643/38783767-b5ef5236-40bb-11e8-91b4-e1d5bdc0aa18.png">

The Coconut Online Interpreter project's architecture design is based on server-less computing based on AWS Lambda for executing user-submitted Coconut codes. The front-end of the project is developed using React. Based on the designed architecture shown above, the interpreter is resilient to any malicious code submitted by users since the backend protection is handled by AWS Lambda services.

### Prerequisites
Requires Python 3. 
```
python manage.py runserver 
```

## Installation
```
pip install -r requirements.txt
```

## Functionality

The interpreter consists of an easy-to-use webpage (shown below) that enables user to easily enter and execute Coconut code. 

<img width="933" alt="screen shot 2018-04-15 at 3 38 19 pm" src="https://user-images.githubusercontent.com/35832643/38784213-a6b2ceee-40c3-11e8-90cf-464fcd8e8e98.png">

**1 - Compilation Settings:** Clicking the settings gear will display a settings drawer. From within the drawer, the user can select which version of Python the Coconut code will compile to. By default, the latest version of Python is selected. 

**2 - Saving to a Coconut File:** Clicking the save icon will download the contents of the code editor into a Coconut file called ```coconut.coco```.

**3 - Code Executio:n:** Clicking `RUN`or using the keyboard shortcut `Ctrl + Enter` for Windows or `⌘ + Enter` for Mac will compile and execute the program.

**4 - Showing the Compiled Python:** Checking the box labeled `PYTHON` will show the user the compiled Python, which is the output of the Coconut compiler. the Python code will be displayed using Python syntax highlighting.

**5 - Code Editor:** The code editor, which is on the left side of the webpage, is where the user types in their Coconut code. The editor has line numbers and Coconut-specific syntax highlighting.

**6 - Code Execution Output:** The code execution output is on the right side of the webpage. 

Furthermore, if there is an error in compilation or execution, the output will display the traceback. If the error came from the Coconut compiler, the offending Coconut line will be highlighted in red in the code editor:
![error2](https://user-images.githubusercontent.com/35832643/38785410-89d90052-40d4-11e8-93c5-8cec8fea532c.png)
If the error occurred at runtime, then the offending line will be highlighted in red in the Python code:
![error1](https://user-images.githubusercontent.com/35832643/38785409-89c18620-40d4-11e8-8a52-19150efae3ea.png)




## Known Problems
Currently, there are no known problems. However, on the current deployment, users cannot choose the Coconut version on the interpreter except the version installed by developers. The developer team plans to address this issue in the future.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Security

The Coconut Interpreter uses AWS Lambda, a containerized, serverless backend which allows for safe execution of untrusted code. 
