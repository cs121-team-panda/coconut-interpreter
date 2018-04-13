// @flow

import { fromJS } from 'immutable';
import type { Map } from 'immutable';
import * as actionTypes from './actionTypes';
import type { Action } from './actions';

export const initialState = fromJS({
  args: {
    target: 'sys',
  },
  output: '',
  outputPython: '',
  coconutError: null,
  pythonError: null,
  loading: false,
});

export default function reducer(state: Map = initialState, action: Action) {
  switch (action.type) {
    case actionTypes.RUN_REQUEST:
      return state.merge({
        loading: fromJS(true),
      });
    case actionTypes.RUN_SUCCESS:
      return state.merge({
        output: fromJS(action.payload.output),
        outputPython: fromJS(action.payload.python),
        coconutError: fromJS(action.payload.coconutError),
        pythonError: fromJS(action.payload.pythonError),
        loading: fromJS(false),
      });
    case actionTypes.RUN_FAILURE:
      return state.merge({
        output: fromJS(action.payload.output),
        loading: fromJS(false),
      });
    case actionTypes.UPDATE_ARGS:
      return state.merge({
        args: fromJS(action.payload.args),
      });
    default:
      return state;
  }
}
