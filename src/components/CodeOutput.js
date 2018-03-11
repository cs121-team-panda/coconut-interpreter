// @flow

import React, { Component } from 'react';
import AceEditor from 'react-ace';
import type { EditorProps } from 'react-ace';

import 'brace/mode/text';
import 'brace/mode/python';
import 'brace/theme/chrome';

import styles from './CodeOutput.module.css';
import aceStyleProps from '../constants';

type Props = {
  value: string,
  python: string,
  loading: boolean,
};

type State = {
  loadingDots: string,
  interval: ?IntervalID,
  showPython: boolean,
};

export default class CodeOutput extends Component<Props, State> {
  state = {
    loadingDots: '',
    interval: null,
    showPython: false,
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.loading) {
      const interval = setInterval(() => this.updateLoadingDots(), 1000);
      this.setState({ loadingDots: '', interval });
    } else if (this.state.interval) clearInterval(this.state.interval);
  }

  onEditorLoad = (editor: EditorProps) => {
    editor.renderer.setPadding(24);
    // eslint-disable-next-line no-param-reassign
    editor.renderer.$cursorLayer.element.style.display = 'none';
  };

  updateLoadingDots = () => {
    this.setState(prevState => ({ loadingDots: `${prevState.loadingDots}.` }));
  };

  render() {
    const value = this.state.showPython ? this.props.python : this.props.value;
    return (
      <div className={styles.output}>
        <div className={styles.header}>
          Output
          <label className={styles.headerCheck} htmlFor="pythonSwitch">
            <input
              onChange={event =>
                this.setState({ showPython: event.target.checked })
              }
              type="checkbox"
              id="pythonSwitch"
            />
            Python
          </label>
        </div>
        <AceEditor
          name="output"
          mode={this.state.showPython ? 'python' : 'text'}
          theme="chrome"
          value={this.props.loading ? this.state.loadingDots : value}
          onLoad={this.onEditorLoad}
          readOnly
          {...aceStyleProps}
        />
      </div>
    );
  }
}
