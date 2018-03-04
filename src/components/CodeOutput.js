// @flow

import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/text';
import 'brace/theme/chrome';

import styles from './CodeOutput.module.css';

type Props = {
  value: string,
};

export default class CodeOutput extends Component<Props> {
  componentDidMount() {
    this.refs.output.editor.renderer.setPadding(24);
    this.refs.output.editor.renderer.$cursorLayer.element.style.display =
      'none';
  }

  render() {
    return (
      <div className={styles.output}>
        <div className={styles.header}>Output</div>
        <AceEditor
          ref="output"
          mode="text"
          theme="chrome"
          name="output"
          value={this.props.value}
          showGutter={false}
          readOnly={true}
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
