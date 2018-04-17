// @flow

import { call, put, takeLatest } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import type { Action } from './actions';

import * as actionTypes from './actionTypes';
import * as actions from './actions';

import run from '../../api';

const errorMessage =
  'Error: Failed to fetch output due to timeout or internal error';

function* runRequest(action: Action) {
  try {
    const payload = yield call(run, action.payload);
    yield put(actions.runSuccess(payload));
  } catch (e) {
    yield put(actions.runFailure(errorMessage));
  }
}

export default function* saga(): Saga {
  yield takeLatest(actionTypes.RUN_REQUEST, runRequest);
}
