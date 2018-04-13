// @flow

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import * as mySelectors from '../store/environment/selectors';
import * as myActions from '../store/environment/actions';
import type { Args } from '../store/environment/actions';

import Editor from '../components/Editor';

type Props = {
  args: Args,
  updateArgs: (args: Args) => void,
  runRequest: (code: string, args: Args) => void,
  loading: boolean,
  coconutErrorCall: ?string,
  coconutErrorLine: ?number,
};

const EditorContainer = (props: Props) => (
  <Editor
    args={props.args}
    updateArgs={props.updateArgs}
    runRequest={props.runRequest}
    loading={props.loading}
    errorCall={props.coconutErrorCall}
    errorLine={props.coconutErrorLine}
  />
);

const mapStateToProps = createSelector(
  [
    mySelectors.args,
    mySelectors.loading,
    mySelectors.coconutErrorCall,
    mySelectors.coconutErrorLine,
  ],
  (args, loading, coconutErrorCall, coconutErrorLine) => ({
    args,
    loading,
    coconutErrorCall,
    coconutErrorLine,
  })
);

const mapDispatchToProps = dispatch => ({
  updateArgs: args => {
    dispatch(myActions.updateArgs(args));
  },
  runRequest: (code, args) => {
    dispatch(myActions.runRequest(code, args));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);
