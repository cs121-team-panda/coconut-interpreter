// @flow

import * as actionTypes from './actionTypes';

type Error = {
  call: string,
  line: number,
};

export type Payload = {
  output: string,
  python: string,
  coconutError: ?Error,
  pythonError: ?Error,
};

export function runRequest(code: string) {
  return {
    type: actionTypes.RUN_REQUEST,
    payload: { code },
  };
}

export function runSuccess(payload: Payload) {
  return {
    type: actionTypes.RUN_SUCCESS,
    payload,
  };
}

export function runFailure(output: string) {
  return {
    type: actionTypes.RUN_FAILURE,
    payload: { output },
  };
}

export type Action =
  | $Call<typeof runRequest, string>
  | $Call<typeof runSuccess, Payload>
  | $Call<typeof runFailure, string>;
