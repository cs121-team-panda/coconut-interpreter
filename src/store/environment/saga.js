// @flow

import { call, put, takeLatest } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import type { Action } from './actions';

import * as actionTypes from './actionTypes';
import * as actions from './actions';

import run from '../../api';

function* runRequest(action: Action) {
  try {
    const payload = yield call(run, action.payload);
    yield put(actions.runSuccess(payload));
  } catch (e) {
    yield put(actions.runFailure(e.toString()));
  }
}

export default function* saga(): Saga {
  yield takeLatest(actionTypes.RUN_REQUEST, runRequest);
}
