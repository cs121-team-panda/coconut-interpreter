// @flow

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import * as mySelectors from '../store/environment/selectors';
import * as myActions from '../store/environment/actions';

import Editor from '../components/Editor';

type Props = {
  runRequest: (code: string, args: string) => void,
  loading: boolean,
  coconutErrorCall: ?string,
  coconutErrorLine: ?number,
};

const EditorContainer = (props: Props) => (
  <Editor
    runRequest={props.runRequest}
    loading={props.loading}
    errorCall={props.coconutErrorCall}
    errorLine={props.coconutErrorLine}
  />
);

const mapStateToProps = createSelector(
  [
    mySelectors.loading,
    mySelectors.coconutErrorCall,
    mySelectors.coconutErrorLine,
  ],
  (loading, coconutErrorCall, coconutErrorLine) => ({
    loading,
    coconutErrorCall,
    coconutErrorLine,
  })
);

const mapDispatchToProps = dispatch => ({
  runRequest: (code, args) => {
    dispatch(myActions.runRequest(code, args));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);
