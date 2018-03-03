import unittest
from mock import patch
from app.app import app

PRINT_CODE = '"hello, world!" |> print'
PRINT_OUTPUT = b'hello, world!'

# From http://coconut.readthedocs.io/en/master/HELP.html#case-study-1-factorial
FACTORIAL_CODE = '''
def factorial(n):
    """Compute n! where n is an integer >= 0."""
    if n `isinstance` int and n >= 0:
        acc = 1
        for x in range(1, n+1):
            acc *= x
        return acc
    else:
        raise TypeError("the argument to factorial must be an integer >= 0")

# Test cases:
0 |> factorial |> print  # 1
3 |> factorial |> print  # 6
'''
FACTORIAL_OUTPUT = b'1\\n6'

COMPILE_ERR_CODE = '1+'
COMPILE_ERR_OUTPUT = b'CoconutParseError: parsing failed (line 1)'

RUNNING_ERR_CODE = '1+"a"'
RUNNING_ERR_OUTPUT = b'TypeError: unsupported operand type(s) for +'

QUICKSORT_CODE = '''
def quick_sort([]) = []

@addpattern(quick_sort)
def quick_sort([head] + tail) =
    """Sort the input sequence using the quick sort algorithm."""
    (quick_sort([x for x in tail if x < head])
        + [head]
        + quick_sort([x for x in tail if x >= head]))

# Test cases:
[] |> quick_sort |> print  # []
[3] |> quick_sort |> print  # [3]
[0,1,2,3,4] |> quick_sort |> print  # [0,1,2,3,4]
[4,3,2,1,0] |> quick_sort |> print  # [0,1,2,3,4]
[3,0,4,2,1] |> quick_sort |> print  # [0,1,2,3,4]
'''
QUICKSORT_OUTPUT = b'[]\\n[3]\\n[0, 1, 2, 3, 4]\\n[0, 1, 2, 3, 4]\\n[0, 1, 2, 3, 4]'

# From http://coconut.readthedocs.io/en/master/DOCS.html#examples
DATA_TYPES_CODE = '''
data Empty()
data Leaf(n)
data Node(l, r)

def size(Empty()) = 0

@addpattern(size)
def size(Leaf(n)) = 1

@addpattern(size)
def size(Node(l, r)) = size(l) + size(r)

size(Node(Empty(), Leaf(10))) == 1
'''

# Other examples: http://coconut.readthedocs.io/en/master/DOCS.html#usage
COMPILE_ARGS = '--line-numbers'
COMPILE_ARGS_OUTPUT = b'(print)(\\"hello, world!\\")  # line 1'

class MockDevice():
    """
    A mock device to temporarily suppress output to stdout, so that
    traceback on test failure doesn't include print statements within tested
    functions. Similar to UNIX /dev/null.
    """

    def write(self, _):
        pass

class InterpreterTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def tearDown(self):
        pass

    def get_code_response(self, code, args=None):
        # Use patch function to temporarily mock out sys.stdout for the test
        with patch('sys.stdout', new=MockDevice()) as _:
            return self.app.post('/coconut', data={'code': code, 'args': args})

    def test_print(self):
        response = self.get_code_response(PRINT_CODE)
        assert PRINT_OUTPUT in response.data

    def test_factorial(self):
        response = self.get_code_response(FACTORIAL_CODE)
        assert FACTORIAL_OUTPUT in response.data

    def test_compile_error(self):
        response = self.get_code_response(COMPILE_ERR_CODE)
        self.assertEqual(response.status_code, 200)
        assert COMPILE_ERR_OUTPUT in response.data

    def test_running_error(self):
        response = self.get_code_response(RUNNING_ERR_CODE)
        self.assertEqual(response.status_code, 200)
        assert RUNNING_ERR_OUTPUT in response.data

    def test_quicksort(self):
        response = self.get_code_response(QUICKSORT_CODE)
        assert QUICKSORT_OUTPUT in response.data

    def test_data_types_compile(self):
        '''DATA_TYPES_CODE does not work with Coconut's parse function.'''
        response = self.get_code_response(DATA_TYPES_CODE)
        self.assertEqual(response.status_code, 200)

    def test_compile_args(self):
        '''Tests ability to pass optional arguments to Coconut compiler.'''
        response = self.get_code_response(code=PRINT_CODE, args=COMPILE_ARGS)
        self.assertEqual(response.status_code, 200)
        assert COMPILE_ARGS_OUTPUT in response.data

if __name__ == "__main__":
    unittest.main()
