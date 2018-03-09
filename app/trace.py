TRACEBACK_ID = 'Traceback (most recent call last):'
PARSE_ERROR_ID = 'CoconutParseError: parsing failed'

def extract_trace_py(output):
    """Extracts info from python trace output
    Returns line numbers of errors.
    """
    capture = False
    tracebacks = []
    curr = {}

    lines = output.split('\n')
    for index, line in enumerate(lines):
        if TRACEBACK_ID in line:
            capture = True
        elif capture and line.startswith(' '):
            if line.lstrip().startswith('File'):
                # Line with file, line number, and context
                line = line.strip()
                fname, line_num, context = [s.strip() for s in line.split(',')]
                # Next line is the called function
                call = lines[index+1].strip()
                # Update current trace
                curr['file'] = fname.lstrip('File ')[1:-1]
                curr['line'] = int(line_num.lstrip('line '))
                curr['context'] = context.lstrip('in ')
                curr['call'] = call
        elif capture:
            # Line with error
            curr['error'] = line
            tracebacks.append(curr)
            curr = {}
            break

    # Return list of line numbers
    return [traceback['line'] for traceback in tracebacks]

def extract_trace_coco(output):
    """Extracts info from coconut parse error output
    Returns line numbers of errors.
    """
    capture = False
    tracebacks = []
    curr = {}

    lines = output.split('\n')
    for line in lines:
        if PARSE_ERROR_ID in line:
            capture = True
            line_num = line.lstrip(PARSE_ERROR_ID).strip()[1:-1]
            curr['line'] = int(line_num.lstrip('line '))
        elif capture and line.startswith('  '):
            # Line with called function
            line = line.strip()
            curr['call'] = line
        elif capture:
            # Line with error
            curr['error'] = line
            tracebacks.append(curr)
            curr = {}
            break

    # Return list of line numbers
    return [traceback['line'] for traceback in tracebacks]
