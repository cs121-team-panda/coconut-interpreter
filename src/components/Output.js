// @flow

import React, { Component } from 'react';
import AceEditor from 'react-ace';
import type { EditorProps } from 'react-ace';
import { withStyles } from 'material-ui/styles';

import 'brace/mode/text';
import 'brace/mode/python';
import 'brace/theme/chrome';

import Header from './Header';
import errorMarker from '../utils/highlighter';
import {
  aceStyleProps,
  outputHeaderColor,
  outputHeaderTextColor,
} from '../constants';

const styles = () => ({
  output: {
    gridArea: 'output',
  },
  headerSwitch: {
    float: 'right',
    cursor: 'pointer',
  },
  errorMarker: {
    position: 'absolute',
    background: 'rgba(255, 0, 0, 0.4)',
  },
});

type Props = {
  loading: boolean,
  value: string,
  python: string,
  errorLine: ?number,
  errorCall: ?string,
  classes: $Call<typeof styles>,
};

type State = {
  loadingDots: string,
  interval: ?IntervalID,
  showPython: boolean,
};

class Output extends Component<Props, State> {
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

  getMarkers = () => {
    if (this.props.loading) return [];
    const { python, errorLine, errorCall, classes } = this.props;
    return errorMarker(python, errorLine, errorCall, classes.errorMarker);
  };

  getValue = () => {
    if (this.props.loading) return this.state.loadingDots;
    return this.state.showPython ? this.props.python : this.props.value;
  };

  updateLoadingDots = () => {
    this.setState(prevState => ({ loadingDots: `${prevState.loadingDots}.` }));
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.output}>
        <Header
          name="Output"
          color={outputHeaderColor}
          textColor={outputHeaderTextColor}
        >
          <label className={classes.headerSwitch} htmlFor="pythonSwitch">
            <input
              onChange={event =>
                this.setState({ showPython: event.target.checked })
              }
              type="checkbox"
              id="pythonSwitch"
            />
            Python
          </label>
        </Header>
        <AceEditor
          name="output"
          mode={this.state.showPython ? 'python' : 'text'}
          theme="chrome"
          value={this.getValue()}
          onLoad={this.onEditorLoad}
          readOnly
          {...aceStyleProps}
          markers={this.state.showPython ? this.getMarkers() : []}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Output);
