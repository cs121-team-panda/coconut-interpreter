#!/usr/bin/env python
import os
from flask_script import Manager, Server
from app.my_app import app

COV = None
if os.environ.get('FLASK_COVERAGE'):
    import coverage
    COV = coverage.coverage(branch=True, include='app/*')
    COV.start()

if os.path.exists('.env'):
    print('Importing environment from .env...')
    for line in open('.env'):
        var = line.strip().split('=')
        if len(var) == 2:
            os.environ[var[0]] = var[1]

manager = Manager(app)

@manager.command
def test(coverage=False):
    """Run the unit tests."""
    if coverage and not os.environ.get('FLASK_COVERAGE'):
        import sys
        os.environ['FLASK_COVERAGE'] = '1'
        os.execvp(sys.executable, [sys.executable] + sys.argv)
    import unittest
    import xmlrunner
    import sys
    tests = unittest.TestLoader().discover('tests')
    # run tests with unittest-xml-reporting and output to $CIRCLE_TEST_REPORTS on CircleCI or
    # test-reports locally
    test_runner = xmlrunner.XMLTestRunner(output=os.environ.get('CIRCLE_TEST_REPORTS', 'test-reports'))
    results = test_runner.run(tests)
    
    if COV:
        COV.stop()
        COV.save()
        print('Coverage Summary:')
        COV.report()
        basedir = os.path.abspath(os.path.dirname(__file__))
        covdir = os.path.join(basedir, 'tmp/coverage')
        COV.html_report(directory=covdir)
        print('HTML version: file://%s/index.html' % covdir)
        COV.erase()

    # exit with the exit code based on whether the tests fail or not.
    sys.exit(not results.wasSuccessful())

if __name__ == '__main__':
    manager.run()
