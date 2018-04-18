/**
 * Creates error markers for code from traceback data
 *
 * @param {string}      code      The code
 * @param {number|null} errorLine The traceback error line number
 * @param {string|null} errorCall The traceback error call
 * @param {string}      className The css classname for marker styling
 *
 * @return [object] The list of error marker objects
 */
const errorMarker = (code, errorLine, errorCall, className) => {
  if (errorLine > 0 && !!errorCall) {
    const lines = code.split('\n');
    const lineNumber = errorLine - 1;
    if (lineNumber < lines.length) {
      const line = lines[lineNumber];
      const start = line.indexOf(errorCall);
      if (start !== -1) {
        return [
          {
            startRow: lineNumber,
            endRow: lineNumber,
            startCol: start,
            endCol: start + errorCall.length,
            className,
          },
        ];
      }
    }
  }
  return [];
};

export default errorMarker;
