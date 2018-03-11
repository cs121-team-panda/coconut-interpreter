// @flow

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import * as mySelectors from '../store/environment/selectors';

import CodeOutput from '../components/CodeOutput';

type Props = {
  output: string,
  outputPython: string,
  loading: boolean,
};

const OutputContainer = ({ output, outputPython, loading }: Props) => (
  <CodeOutput value={output} python={outputPython} loading={loading} />
);

const mapStateToProps = createSelector(
  [mySelectors.output, mySelectors.outputPython, mySelectors.loading],
  (output, outputPython, loading) => ({ output, outputPython, loading })
);

export default connect(mapStateToProps)(OutputContainer);
