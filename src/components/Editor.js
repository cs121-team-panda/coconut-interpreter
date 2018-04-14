// @flow

import React, { Component } from 'react';
import AceEditor from 'react-ace';
import type { EditorProps } from 'react-ace';
import { withStyles } from 'material-ui/styles';

import 'brace/theme/dracula';

import PersistentDrawer from './PersistentDrawer';
import errorMarker from '../utils/highlighter';
import { aceStyleProps } from '../constants';
import CoconutMode from '../utils/coconut';
import type { Args } from '../store/environment/actions';

const styles = () => ({
  editor: {
    gridArea: 'editor',
  },
  errorMarker: {
    position: 'absolute',
    background: 'rgba(255, 0, 0, 0.4)',
  },
});

type Props = {
  args: Args,
  updateArgs: (args: Args) => void,
  runRequest: (code: string, args: Args) => void,
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

  getBindedCommands = () => [
    {
      name: 'run',
      bindKey: { win: 'Ctrl-Enter', mac: 'Command-Enter' },
      exec: this.handleClick,
    },
  ];

  handleChange = (newCode: string) => {
    this.setState({ code: newCode });
  };

  handleClick = () => {
    if (!this.props.loading && this.state.code.trim())
      this.props.runRequest(this.state.code, this.props.args);
  };

  render() {
    const aceEditor = (
      <AceEditor
        name="code"
        mode="text"
        theme="dracula"
        value={this.state.code}
        onChange={this.handleChange}
        onLoad={this.onEditorLoad}
        {...aceStyleProps}
        markers={this.getMarkers()}
        commands={this.getBindedCommands()}
      />
    );

    return (
      <div className={styles.editor}>
        <PersistentDrawer
          aceEditor={aceEditor}
          updateArgs={this.props.updateArgs}
          handleClick={this.handleClick}
          loading={this.props.loading}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Editor);
