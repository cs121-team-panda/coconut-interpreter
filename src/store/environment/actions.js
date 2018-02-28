import * as actionTypes from './actionTypes';

export function runRequest(code) {
  return {
    type: actionTypes.RUN_REQUEST,
    payload: { code },
  };
}

export function runSuccess(output) {
  return {
    type: actionTypes.RUN_SUCCESS,
    payload: { output },
  };
}

export function runFailure(output) {
  return {
    type: actionTypes.RUN_FAILURE,
    payload: { output },
  };
}
