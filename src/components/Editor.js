// @flow

import React, { Component } from 'react';
import AceEditor from 'react-ace';
import type { EditorProps } from 'react-ace';
import { withStyles } from 'material-ui/styles';

import 'brace/theme/dracula';

import Header from './Header';
import errorMarker from '../utils/highlighter';
import CoconutMode from '../utils/coconut';
import {
  aceStyleProps,
  editorHeaderColor,
  editorHeaderTextColor,
} from '../constants';

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
    const { classes } = this.props;
    return (
      <div className={classes.editor}>
        <Header
          name="Coconut Editor"
          color={editorHeaderColor}
          textColor={editorHeaderTextColor}
        >
          <button
            className={classes.headerButton}
            onClick={this.handleClick}
            disabled={this.props.loading}
          >
            Run
          </button>
        </Header>
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
      </div>
    );
  }
}

export default withStyles(styles)(Editor);
