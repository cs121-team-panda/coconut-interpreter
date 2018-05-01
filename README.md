# [Coconut Online Interpreter][interpreter-url] [![CircleCI][circleci-image]][circleci-url]

[circleci-image]: https://circleci.com/gh/cs121-team-panda/coconut-interpreter.svg?style=shield
[circleci-url]: https://circleci.com/gh/cs121-team-panda/coconut-interpreter
[interpreter-url]: https://cs121-team-panda.github.io/coconut-interpreter

[Coconut](http://coconut-lang.org/) is a functional programming language that compiles to Python. The online interpreter provides an instant programming environment for Coconut. Users can enter and execute Coconut code and view the output.

## Architecture 
<img width="500" alt="architecture" src="https://user-images.githubusercontent.com/35832643/38783767-b5ef5236-40bb-11e8-91b4-e1d5bdc0aa18.png">

The project's architecture deploys a server-less backend, AWS Lambda, that compiles and executes user-submitted Coconut code. The frontend is built with React. For local development, a Flask app serves as the backend.

### Prerequisites
__Backend and package manager__
* [Python >= 3](https://www.python.org)
* [Node >= 6, <=9](https://nodejs.org)
* [Yarn >= 1](https://yarnpkg.com/en/docs/install)

__Notable Python Packages__ (installed with `pip install -r requirements.txt` below)
* [coconut](https://pypi.org/project/coconut): compiles Coconut code into Python code.
* [flask](https://pypi.org/project/Flask): serves backend API for local development.
* [zappa](https://pypi.org/project/zappa): packages and deploys Flask app to AWS Lambda.

## Installation
For backend installation, we recommend you use Anaconda to handle Python packages. If Python 3.x is not your default Python version, you may have to use `pip3` instead of `pip` to install Python packages and `python3` instead of `python` to run Python. We recommend you check this by using `which python` and `which pip` commands. If users have Python from Anaconda, we further recommend users install all Python packages within a new virtual environment.

For frontend installation of `node` and `yarn`, we recommend you install these separately using the latest stable version. For Mac users, installations with Homebrew for both `node` and `yarn` should be perfectly fine.

Note that you should not have to use `sudo` privileges to install all Python requirement packages. If you encounter any permission issues, it suggests you have previously installed one of our required packages with `sudo` privileges. 

```bash
# Clone the repository
> git clone https://github.com/cs121-team-panda/coconut-interpreter.git
> cd coconut-interpreter

# Backend Installation
> which pip
/Users/<your username>/anaconda3/bin/pip
> pip --version
pip 9.0.1 from /Users/<your username>/anaconda3/lib/python3.6/site-packages (python 3.6)
> pip install -r requirements.txt

# Frontend Installation
> node --version
v8.11.1
> yarn --version
1.5.1
> cd client
> yarn install
```

### Running Locally
```bash
> cd coconut-interpreter
> which python
/Users/<your username>/anaconda3/bin/python
> python manage.py runserver 
```
...and in a separate shell:
```bash
> cd coconut-interpreter/client
> yarn start
```
Open [http://localhost:3000](http://localhost:3000) to see the app.

## Functionality

The interpreter consists of an easy-to-use webpage (shown below) that enables user to easily enter and execute Coconut code. 

![demo1](https://user-images.githubusercontent.com/35832643/39089307-f309052e-4578-11e8-8be7-7d1c01902a65.gif)

* **Code Editor:** The code editor, which is on the left side of the webpage, is where the user types in their Coconut code. The editor has line numbers and Coconut-specific syntax highlighting.

* **Compilation Settings:** Clicking the settings gear will display a settings drawer. From within the drawer, the user can select which version of Python the Coconut code will compile to. By default, the latest version of Python 3 is selected. 

* **Saving to a Coconut File:** Clicking the save icon will download the contents of the code editor into a Coconut file called ```coconut.coco```.

* **Code Execution:** Clicking `RUN` or using the keyboard shortcut `Ctrl + Enter` for Windows or `⌘ + Enter` for Mac will compile and execute the program.

* **Showing the Compiled Python:** Checking the box labeled `PYTHON` will replace the output with the compiled Python, which is the output of the Coconut compiler. The Python code will be displayed using Python syntax highlighting.

* **Code Execution Output:** The code execution output is on the right side of the webpage. 

* **Traceback Highlighting:** If an error came from the Coconut compiler, the offending Coconut line will be highlighted in red in the code editor. If an error occurred at runtime, then the offending line will be highlighted in red in the Python code, if the Python checkbox is checked:

![demo2 1](https://user-images.githubusercontent.com/35832643/39089360-592b40be-457a-11e8-840c-dca79ba37a02.gif)

## Known Problems
There is no support for Coconut's `parallel_map` function due to [limitations of AWS Lambda](https://forums.aws.amazon.com/thread.jspa?threadID=219962). Our client is aware and is ok with this issue since it is not major (users can use `map` instead).

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue with the owners of this repository before making a change.

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface.
3. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent.
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## Documentation
* [Security](https://github.com/cs121-team-panda/coconut-interpreter/blob/master/docs/Security.md)
* [Deployment](https://github.com/cs121-team-panda/coconut-interpreter/blob/master/docs/Deploy.md)
* [How to Embed](https://github.com/cs121-team-panda/coconut-interpreter/blob/master/docs/Embed.md)

## License
MIT. Copyright (c) Jonathan Cruz, Teerapat Jenrungrot, Natalie Kadonaga, Brittany Wang.
