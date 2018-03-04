// @flow

import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/text';
import 'brace/theme/chrome';

import styles from './CodeOutput.module.css';
import { aceStyleProps } from '../constants';

type Props = {
  value: string,
  loading: boolean,
};

type State = {
  loadingDots: string,
  interval: ?IntervalID,
};

export default class CodeOutput extends Component<Props, State> {
  state = {
    loadingDots: '',
    interval: null,
  };

  updateLoadingDots() {
    this.setState(prevState => ({ loadingDots: prevState.loadingDots + '.' }));
  }

  componentDidMount() {
    const editor = this.refs.output.editor;
    editor.renderer.setPadding(24);
    editor.renderer.$cursorLayer.element.style.display = 'none';
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.loading) {
      const interval = setInterval(() => this.updateLoadingDots(), 1000);
      this.setState({ loadingDots: '', interval });
    } else {
      if (this.state.interval) clearInterval(this.state.interval);
    }
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
          value={this.props.loading ? this.state.loadingDots : this.props.value}
          readOnly={true}
          {...aceStyleProps}
        />
      </div>
    );
  }
}
