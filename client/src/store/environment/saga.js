// @flow

import { race, call, take, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import type { Saga } from 'redux-saga';
import type { Action } from './actions';

import * as actionTypes from './actionTypes';
import * as actions from './actions';

import run from '../../api';

function* runRequest(action: Action) {
  try {
    const { data } = yield call(run, action.payload);
    yield put(actions.runSuccess(data));
  } catch (e) {
    yield put(actions.runFailure('Internal error'));
  }
}

function* runRequestWithTimeout(action: Action) {
  const { timeout } = yield race({
    response: call(runRequest, action),
    cancel: take(actionTypes.CANCEL_RUN),
    timeout: call(delay, 25000),
  });

  if (timeout) yield put(actions.runFailure('Timeout error'));
}

export default function* saga(): Saga {
  yield takeLatest(actionTypes.RUN_REQUEST, runRequestWithTimeout);
}
