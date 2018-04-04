// @flow

import React, { Component } from 'react';
import AceEditor from 'react-ace';
import type { EditorProps } from 'react-ace';
import { withStyles } from 'material-ui/styles';

import 'brace/theme/dracula';

import PersistentDrawer from './PersistentDrawer';
import errorMarker from '../utils/highlighter';
import { aceStyleProps } from '../constants';
import CoconutMode from '../utils/coconut';

const styles = () => ({
  editor: {
    gridArea: 'editor',
  },
  headerButton: {
    height: 'inherit',
    float: 'right',
    border: 'none',
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 700,
    textTransform: 'uppercase',
    backgroundColor: 'inherit',
    letterSpacing: '0.08em',
    cursor: 'pointer',
  },
  'headerButton:disabled': {
    color: '#999',
    cursor: 'default',
  },
  errorMarker: {
    position: 'absolute',
    background: 'rgba(255, 0, 0, 0.4)',
  },
});

type Props = {
  runRequest: (code: string) => void,
  loading: boolean,
  errorLine: ?number,
  errorCall: ?string,
  classes: $Call<typeof styles>,
};

type State = {
  code: string,
};

class Editor extends Component<Props, State> {
  state = {
    code: window.initialCode || '',
  };

  onEditorLoad = (editor: EditorProps) => {
    editor.renderer.setPadding(24);
    // Set editor mode for Coconut-specific syntax highlighting.
    const coconutMode = new CoconutMode();
    editor.getSession().setMode(coconutMode);
  };

  getMarkers = () => {
    const { errorLine, errorCall, classes } = this.props;
    const { code } = this.state;
    return errorMarker(code, errorLine, errorCall, classes.errorMarker);
  };

  handleChange = (newCode: string) => {
    this.setState({ code: newCode });
  };

  handleClick = () => {
    if (this.state.code.trim()) this.props.runRequest(this.state.code);
  };

  render() {
    const aceEditor = (
      <AceEditor
        name="code"
        mode="text"
        theme="dracula"
        value={this.state.code}
        onChange={this.handleChange}
        onLoad={this.onEditorLoad}
        {...aceStyleProps}
        markers={this.getMarkers()}
      />
    );

    return (
      <div className={styles.editor}>
        <PersistentDrawer aceEditor={aceEditor} />
      </div>
    );
  }
}

export default withStyles(styles)(Editor);
