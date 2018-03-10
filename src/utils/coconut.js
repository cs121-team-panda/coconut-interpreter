import 'brace/mode/python';

export class CoconutHighlightRules extends window.ace.acequire(
  'ace/mode/python_highlight_rules'
).PythonHighlightRules {
  constructor() {
    super();

    const keywords =
      'and|as|assert|break|class|continue|def|del|elif|else|except|exec|' +
      'finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|' +
      'raise|return|try|while|with|yield|async|await|' +
      // Coconut-specific:
      'match|case|data';

    const builtinConstants =
      'True|False|None|NotImplemented|Ellipsis|__debug__';

    const builtinFunctions =
      'abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|' +
      'eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|' +
      'binfile|iter|property|tuple|bool|filter|len|range|type|bytearray|' +
      'float|list|raw_input|unichr|callable|format|locals|reduce|unicode|' +
      'chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|' +
      'cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|' +
      '__import__|complex|hash|min|set|apply|delattr|help|next|setattr|' +
      'buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern|self|' +
      // Coconut-specific
      'takewhile|dropwhile|tee|count|makedata|consume|parallel_map|' +
      'addpattern|recursive_iterator|concurrent_map|fmap|__fmap__|starmap|reiterable|' +
      'scan|groupsof|py_chr|py_filter|py_hex|py_input|py_int|py_object|py_oct|' +
      'py_open|py_print|py_range|py_xrange|py_str|py_map|py_zip';

    const keywordMapper = this.createKeywordMapper(
      {
        'invalid.deprecated': 'debugger',
        'support.function': builtinFunctions,
        'variable.language': 'self|cls',
        'constant.language': builtinConstants,
        keyword: keywords,
      },
      'identifier'
    );

    const operators =
      '\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|=|' +
      //Coconut Specific:
      '@|\\$|`|\\|>|(?:<\\*?)?(?!\\.\\.\\.)\\.\\.(?:\\*?>)?|\\|>|<\\||\\|\\*>|' +
      '<\\*\\||->|\\?\\??';

    const pythonHighlightRules = this.getRules();
    pythonHighlightRules.start = pythonHighlightRules.start.filter(
      rule =>
        rule.regex !== '[a-zA-Z_$][a-zA-Z0-9_$]*\\b' &&
        rule.token !== 'keyword.operator'
    );

    this.$rules = {
      ...pythonHighlightRules,
      start: [
        ...pythonHighlightRules.start,
        {
          token: keywordMapper,
          regex: '[a-zA-Z_$][a-zA-Z0-9_$]*\\b',
        },
        {
          token: 'keyword.operator',
          regex: operators,
        },
      ],
    };
  }
}

export default class CoconutMode extends window.ace.acequire('ace/mode/python')
  .Mode {
  constructor() {
    super();
    this.HighlightRules = CoconutHighlightRules;
  }
}
