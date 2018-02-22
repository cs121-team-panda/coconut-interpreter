var code = document.querySelector('form textarea[name="code"]');
var form = document.querySelector('form');
var editor = ace.edit('editor');
editor.setTheme('ace/theme/solarized_dark');
editor.session.setMode('ace/mode/python');
form.addEventListener("submit", function() {
  code.value = editor.getValue();
});
