// @flow

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import * as mySelectors from '../store/environment/selectors';
import * as myActions from '../store/environment/actions';

import CodeEditor from '../components/CodeEditor';
import CodeOutput from '../components/CodeOutput';

import styles from './App.module.css';

type Props = {
  output: string,
  outputPython: string,
  loading: boolean,
  runRequest: (code: string) => void,
};

const App = ({ output, outputPython, loading, runRequest }: Props) => (
  <div className={styles.container}>
    <CodeEditor runRequest={runRequest} loading={loading} />
    <CodeOutput value={output} python={outputPython} loading={loading} />
  </div>
);

const mapStateToProps = createSelector(
  [mySelectors.output, mySelectors.outputPython, mySelectors.loading],
  (output, outputPython, loading) => ({ output, outputPython, loading })
);

const mapDispatchToProps = dispatch => ({
  runRequest: code => {
    dispatch(myActions.runRequest(code));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
