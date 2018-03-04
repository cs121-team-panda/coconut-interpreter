// @flow

import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/python';
import 'brace/theme/dracula';

import styles from './CodeEditor.module.css';

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
    this.props.runRequest(this.state.code);
  };

  componentDidMount() {
    this.refs.code.editor.renderer.setPadding(24);
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
          mode="python"
          theme="dracula"
          onChange={this.handleChange}
          name="code"
          value={this.state.code}
          showGutter={false}
          highlightActiveLine={false}
          showPrintMargin={false}
          wrapEnabled={true}
          scrollMargin={[24, 24, 0, 0]}
          setOptions={{ indentedSoftWrap: false }}
          width=""
          height="calc(100% - 42px)"
          editorProps={{ $blockScrolling: Infinity }}
        />
      </div>
    );
  }
}
