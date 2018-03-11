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
  pythonErrorCall: ?string,
  pythonErrorLine: ?number,
};

const OutputContainer = (props: Props) => (
  <Output
    loading={props.loading}
    value={props.output}
    python={props.outputPython}
    errorCall={props.pythonErrorCall}
    errorLine={props.pythonErrorLine}
  />
);

const mapStateToProps = createSelector(
  [
    mySelectors.loading,
    mySelectors.output,
    mySelectors.outputPython,
    mySelectors.pythonErrorCall,
    mySelectors.pythonErrorLine,
  ],
  (loading, output, outputPython, pythonErrorCall, pythonErrorLine) => ({
    loading,
    output,
    outputPython,
    pythonErrorCall,
    pythonErrorLine,
  })
);

export default connect(mapStateToProps)(OutputContainer);
