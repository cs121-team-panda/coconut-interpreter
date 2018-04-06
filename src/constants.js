export const aceStyleProps = {
  showGutter: true,
  highlightActiveLine: false,
  showPrintMargin: false,
  wrapEnabled: true,
  scrollMargin: [24, 24, 0, 0],
  setOptions: { indentedSoftWrap: false, displayIndentGuides: false },
  width: '100%',
  height: 'calc(100%)', // TODO: fix calculation
  editorProps: { $blockScrolling: Infinity },
  fontSize: 14,
};

export const editorHeaderColor = '#44475a';
export const editorHeaderTextColor = '#fff';

export const outputHeaderColor = '#ebebeb';
export const outputHeaderTextColor = '#000';
