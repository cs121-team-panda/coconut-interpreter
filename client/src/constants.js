export const aceStyleProps = {
  showGutter: true,
  highlightActiveLine: false,
  showPrintMargin: false,
  wrapEnabled: true,
  scrollMargin: [24, 24, 0, 0],
  setOptions: { indentedSoftWrap: false, displayIndentGuides: false },
  width: '100%',
  height: 'calc(100% - 48px)',
  ...(!process.env.REACT_APP_EMBED && { style: { marginTop: 48 } }),
  editorProps: { $blockScrolling: Infinity },
  fontSize: 14,
};

export const editorHeaderColor = '#44475a';
export const editorHeaderTextColor = '#fff';

export const outputHeaderColor = '#ebebeb';
export const outputHeaderTextColor = '#000';

export const headerTextStyle = {
  fontSize: 16,
  textTransform: 'uppercase',
  fontWeight: 700,
  letterSpacing: '0.08em',
};

export const resizeTimeout = 195;
