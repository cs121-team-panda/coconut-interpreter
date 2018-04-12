// @flow

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import * as mySelectors from '../store/environment/selectors';

import Output from '../components/Output';

type Props = {
  loading: boolean,
  output: string,
  outputPython: string,
  isError: boolean,
  pythonErrorCall: ?string,
  pythonErrorLine: ?number,
};

const OutputContainer = (props: Props) => (
  <Output
    loading={props.loading}
    value={props.output}
    python={props.outputPython}
    isError={props.isError}
    pythonErrorCall={props.pythonErrorCall}
    pythonErrorLine={props.pythonErrorLine}
  />
);

const mapStateToProps = createSelector(
  [
    mySelectors.loading,
    mySelectors.output,
    mySelectors.outputPython,
    mySelectors.isError,
    mySelectors.pythonErrorCall,
    mySelectors.pythonErrorLine,
  ],
  (
    loading,
    output,
    outputPython,
    isError,
    pythonErrorCall,
    pythonErrorLine
  ) => ({
    loading,
    output,
    outputPython,
    isError,
    pythonErrorCall,
    pythonErrorLine,
  })
);

export default connect(mapStateToProps)(OutputContainer);
