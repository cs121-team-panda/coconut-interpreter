// @flow

import React, { Component } from 'react';
import AceEditor from 'react-ace';
import type { EditorProps } from 'react-ace';

import 'brace/theme/dracula';

import styles from './Editor.module.css';
import CoconutMode from '../utils/coconut';
import aceStyleProps from '../constants';

type Props = {
  runRequest: (code: string) => void,
  loading: boolean,
};

type State = {
  code: string,
};

export default class Editor extends Component<Props, State> {
  state = {
    code: '',
  };

  onEditorLoad = (editor: EditorProps) => {
    editor.renderer.setPadding(24);
    // Set editor mode for Coconut-specific syntax highlighting.
    const coconutMode = new CoconutMode();
    editor.getSession().setMode(coconutMode);
  };

  handleChange = (newCode: string) => {
    this.setState({ code: newCode });
  };

  handleClick = () => {
    if (this.state.code.trim()) this.props.runRequest(this.state.code);
  };

  render() {
    return (
      <div className={styles.editor}>
        <div className={styles.header}>
          Coconut Editor
          <button
            className={styles.headerButton}
            onClick={this.handleClick}
            disabled={this.props.loading}
          >
            Run
          </button>
        </div>
        <AceEditor
          name="code"
          mode="text"
          theme="dracula"
          value={this.state.code}
          onChange={this.handleChange}
          onLoad={this.onEditorLoad}
          {...aceStyleProps}
        />
      </div>
    );
  }
}
