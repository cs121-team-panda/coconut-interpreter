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

export type Args = {
  target: string,
};

export function runRequest(code: string, args: Args) {
  return {
    type: actionTypes.RUN_REQUEST,
    payload: { code, args },
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

export function updateArgs(args: Args) {
  return {
    type: actionTypes.UPDATE_ARGS,
    payload: { args },
  };
}

export type Action =
  | $Call<typeof runRequest, string, Args>
  | $Call<typeof runSuccess, Payload>
  | $Call<typeof runFailure, string>
  | $Call<typeof updateArgs, Args>;
