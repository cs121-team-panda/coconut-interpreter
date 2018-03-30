TRACEBACK_ID = 'Traceback (most recent call last):'

def extract_trace_py(output, offset=2):
    """Extracts info from python trace output
    Returns line numbers of errors.
    """
    capture = False
    traceback = {}

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
                # Update traceback
                # traceback['file'] = fname.lstrip('File ')[1:-1]
                traceback['line'] = int(line_num.lstrip('line ')) - offset
                # traceback['context'] = context.lstrip('in ')
                traceback['call'] = call
        elif capture:
            # Line with error
            traceback['error'] = line
            break

    return traceback

def extract_trace_coco(output):
    """Extracts info from coconut parse error output
    Returns line numbers of errors.
    """
    capture = False
    traceback = {}

    lines = output.split('\n')
    for line in lines:
        if line.startswith('Coconut') and 'Error:' in line:
            capture = True
            error, line_num = line.split(' (line')
            traceback['error'] = error.strip()
            traceback['line'] = int(line_num[:-1])
        elif capture and line.startswith('  '):
            # Line with called function
            line = line.strip()
            if 'call' not in traceback or line != '^':
                traceback['call'] = line
        elif capture:
            break

    return traceback
