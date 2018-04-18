// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';

import EditorContainer from './EditorContainer';
import OutputContainer from './OutputContainer';

const styles = () => ({
  container: {
    height: '100vh',
    fontFamily: 'Roboto',
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
    gridTemplateAreas: "'editor' 'output'",
  },
  '@media only screen and (min-width: 600px)': {
    container: {
      display: 'flex',
    },
  },
});

type Props = {
  classes: $Call<typeof styles>,
};

const App = ({ classes }: Props) => (
  <div className={classes.container}>
    <EditorContainer />
    <OutputContainer />
  </div>
);

export default withStyles(styles)(App);
