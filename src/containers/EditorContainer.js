// @flow

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import * as mySelectors from '../store/environment/selectors';
import * as myActions from '../store/environment/actions';

import CodeEditor from '../components/CodeEditor';

type Props = {
  loading: boolean,
  runRequest: (code: string) => void,
};

const EditorContainer = ({ loading, runRequest }: Props) => (
  <CodeEditor runRequest={runRequest} loading={loading} />
);

const mapStateToProps = createSelector([mySelectors.loading], loading => ({
  loading,
}));

const mapDispatchToProps = dispatch => ({
  runRequest: code => {
    dispatch(myActions.runRequest(code));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);
