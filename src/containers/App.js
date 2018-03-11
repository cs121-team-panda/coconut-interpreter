// @flow

import React from 'react';

import EditorContainer from './EditorContainer';
import OutputContainer from './OutputContainer';

import styles from './App.module.css';

const App = () => (
  <div className={styles.container}>
    <EditorContainer />
    <OutputContainer />
  </div>
);

export default App;
