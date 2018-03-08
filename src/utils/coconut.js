import 'brace/mode/python';

export class CoconutHighlightRules extends window.ace.acequire(
  'ace/mode/python_highlight_rules'
).PythonHighlightRules {
  constructor() {
    super();

    var keywords =
      'and|as|assert|break|class|continue|def|del|elif|else|except|exec|' +
      'finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|' +
      'raise|return|try|while|with|yield|async|await|' +
      // Coconut-specific:
      'match|case';
    // TODO: Add rest

    var builtinConstants = 'True|False|None|NotImplemented|Ellipsis|__debug__|';
    // Coconut-specific:
    // TODO: Add Coconut-specific builtin constants (if applicable?)

    var builtinFunctions =
      'abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|' +
      'eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|' +
      'binfile|iter|property|tuple|bool|filter|len|range|type|bytearray|' +
      'float|list|raw_input|unichr|callable|format|locals|reduce|unicode|' +
      'chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|' +
      'cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|' +
      '__import__|complex|hash|min|set|apply|delattr|help|next|setattr|' +
      'buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern|' +
      // Coconut-specific
      'reduce|takewhile|dropwhile|tee|count|makedata|consume|parallel_map';
    // TODO: Add rest
    var keywordMapper = this.createKeywordMapper(
      {
        'invalid.deprecated': 'debugger',
        'support.function': builtinFunctions,
        'constant.language': builtinConstants,
        keyword: keywords,
      },
      'identifier'
    );

    var strPre = '(?:r|u|ur|R|U|UR|Ur|uR)?';

    var decimalInteger = '(?:(?:[1-9]\\d*)|(?:0))';
    var octInteger = '(?:0[oO]?[0-7]+)';
    var hexInteger = '(?:0[xX][\\dA-Fa-f]+)';
    var binInteger = '(?:0[bB][01]+)';
    var integer =
      '(?:' +
      decimalInteger +
      '|' +
      octInteger +
      '|' +
      hexInteger +
      '|' +
      binInteger +
      ')';

    var exponent = '(?:[eE][+-]?\\d+)';
    var fraction = '(?:\\.\\d+)';
    var intPart = '(?:\\d+)';
    var pointFloat =
      '(?:(?:' + intPart + '?' + fraction + ')|(?:' + intPart + '\\.))';
    var exponentFloat =
      '(?:(?:' + pointFloat + '|' + intPart + ')' + exponent + ')';
    var floatNumber = '(?:' + exponentFloat + '|' + pointFloat + ')';

    var stringEscape =
      '\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv\'"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})';

    this.$rules = {
      start: [
        {
          token: 'comment',
          regex: '#.*$',
        },
        {
          token: 'string', // multi line """ string start
          regex: strPre + '"{3}',
          next: 'qqstring3',
        },
        {
          token: 'string', // " string
          regex: strPre + '"(?=.)',
          next: 'qqstring',
        },
        {
          token: 'string', // multi line ''' string start
          regex: strPre + "'{3}",
          next: 'qstring3',
        },
        {
          token: 'string', // ' string
          regex: strPre + "'(?=.)",
          next: 'qstring',
        },
        {
          token: 'constant.numeric', // imaginary
          regex: '(?:' + floatNumber + '|\\d+)[jJ]\\b',
        },
        {
          token: 'constant.numeric', // float
          regex: floatNumber,
        },
        {
          token: 'constant.numeric', // long integer
          regex: integer + '[lL]\\b',
        },
        {
          token: 'constant.numeric', // integer
          regex: integer + '\\b',
        },
        {
          token: keywordMapper,
          regex: '[a-zA-Z_$][a-zA-Z0-9_$]*\\b',
        },
        {
          token: 'keyword.operator',
          regex:
            '\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|=',
        },
        {
          token: 'paren.lparen',
          regex: '[\\[\\(\\{]',
        },
        {
          token: 'paren.rparen',
          regex: '[\\]\\)\\}]',
        },
        {
          token: 'text',
          regex: '\\s+',
        },
      ],
      qqstring3: [
        {
          token: 'constant.language.escape',
          regex: stringEscape,
        },
        {
          token: 'string', // multi line """ string end
          regex: '"{3}',
          next: 'start',
        },
        {
          defaultToken: 'string',
        },
      ],
      qstring3: [
        {
          token: 'constant.language.escape',
          regex: stringEscape,
        },
        {
          token: 'string', // multi line ''' string end
          regex: "'{3}",
          next: 'start',
        },
        {
          defaultToken: 'string',
        },
      ],
      qqstring: [
        {
          token: 'constant.language.escape',
          regex: stringEscape,
        },
        {
          token: 'string',
          regex: '\\\\$',
          next: 'qqstring',
        },
        {
          token: 'string',
          regex: '"|$',
          next: 'start',
        },
        {
          defaultToken: 'string',
        },
      ],
      qstring: [
        {
          token: 'constant.language.escape',
          regex: stringEscape,
        },
        {
          token: 'string',
          regex: '\\\\$',
          next: 'qstring',
        },
        {
          token: 'string',
          regex: "'|$",
          next: 'start',
        },
        {
          defaultToken: 'string',
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
