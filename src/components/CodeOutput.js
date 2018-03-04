// @flow

import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/text';
import 'brace/theme/chrome';

import styles from './CodeOutput.module.css';
import { aceStyleProps } from '../constants';

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
          name="output"
          mode="text"
          theme="chrome"
          value={this.props.value}
          readOnly={true}
          {...aceStyleProps}
        />
      </div>
    );
  }
}
