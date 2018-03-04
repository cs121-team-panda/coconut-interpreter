import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

export const initialState = fromJS({
  output: '',
  outputPython: '',
  loading: false,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RUN_REQUEST:
      return state.merge({
        loading: fromJS(true),
      });
    case actionTypes.RUN_SUCCESS:
      return state.merge({
        output: fromJS(action.payload.output),
        outputPython: fromJS(action.payload.python),
        loading: fromJS(false),
      });
    case actionTypes.RUN_FAILURE:
      return state.merge({
        output: fromJS(action.payload.output),
        loading: fromJS(false),
      });
    default:
      return state;
  }
}
