import * as actionTypes from './actionTypes';

export function runRequest(code) {
  return {
    type: actionTypes.RUN_REQUEST,
    payload: { code },
  };
}

export function runSuccess(payload) {
  return {
    type: actionTypes.RUN_SUCCESS,
    payload,
  };
}

export function runFailure(output) {
  return {
    type: actionTypes.RUN_FAILURE,
    payload: { output },
  };
}
