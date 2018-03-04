// @flow

import React, { Component } from 'react';
import AceEditor from 'react-ace';
import type { EditorProps } from 'react-ace';

import 'brace/mode/python';
import 'brace/theme/dracula';

import styles from './CodeEditor.module.css';
import { aceStyleProps } from '../constants';

type Props = {
  runRequest: (code: string) => void,
  loading: boolean,
};

type State = {
  code: string,
};

export default class CodeEditor extends Component<Props, State> {
  state = {
    code: '',
  };

  handleChange = (newCode: string) => {
    this.setState({ code: newCode });
  };

  handleClick = () => {
    if (this.state.code.trim()) this.props.runRequest(this.state.code);
  };

  onEditorLoad(editor: EditorProps) {
    editor.renderer.setPadding(24);
  }

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
          ref="code"
          name="code"
          mode="python"
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
