// @flow

import React, { Component } from 'react';
import AceEditor from 'react-ace';
import type { EditorProps } from 'react-ace';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

import 'brace/mode/text';
import 'brace/mode/python';
import 'brace/theme/chrome';

import errorMarker from '../utils/highlighter';
import {
  aceStyleProps,
  outputHeaderColor,
  headerTextStyle,
} from '../constants';

const styles = () => ({
  output: {
    flex: 1,
    gridArea: 'output',
    flexGrow: 1,
    '& #output > .ace_gutter': {
      background: 'transparent',
    },
  },
  label: {
    ...headerTextStyle,
  },
  headerSwitch: {
    float: 'right',
    cursor: 'pointer',
  },
  errorMarker: {
    position: 'absolute',
    background: 'rgba(255, 0, 0, 0.4)',
  },
  toolbarRoot: {
    minHeight: 48,
    padding: '0 24px',
  },
  appBar: {
    backgroundColor: outputHeaderColor,
    boxShadow: 'none',
  },
  headerText: {
    flex: 1,
    ...headerTextStyle,
  },
});

type Props = {
  loading: boolean,
  value: string,
  python: string,
  isError: boolean,
  pythonErrorCall: ?string,
  pythonErrorLine: ?number,
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
    const { python, pythonErrorLine, pythonErrorCall, classes } = this.props;
    return errorMarker(
      python,
      pythonErrorLine,
      pythonErrorCall,
      classes.errorMarker
    );
  };

  getValue = () => {
    if (this.props.loading) return this.state.loadingDots;
    return this.state.showPython ? this.props.python : this.props.value;
  };

  updateLoadingDots = () => {
    this.setState(prevState => ({ loadingDots: `${prevState.loadingDots}.` }));
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes, isError, loading } = this.props;
    const { showPython } = this.state;
    return (
      <div className={classes.output}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar classes={{ root: classes.toolbarRoot }}>
            <Typography className={classes.headerText}>Output</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showPython}
                  onChange={this.handleChange('showPython')}
                  value="showPython"
                  color="default"
                />
              }
              label="Python"
              classes={{ label: classes.label }}
              className={classes.headerSwitch}
            />
          </Toolbar>
        </AppBar>
        <AceEditor
          name="output"
          mode={showPython ? 'python' : 'text'}
          theme="chrome"
          value={this.getValue()}
          onLoad={this.onEditorLoad}
          readOnly
          {...aceStyleProps}
          markers={showPython ? this.getMarkers() : []}
          style={isError && !showPython && !loading ? { color: 'red' } : {}}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Output);
