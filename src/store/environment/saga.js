import { call, put, takeLatest } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';
import * as actions from './actions';

import * as api from '../../api';

function* runRequest(action) {
  try {
    const { output } = yield call(api.run, action.payload);
    yield put(actions.runSuccess(output));
  } catch (e) {
    yield put(actions.runFailure(e.toString()));
  }
}

export default function* saga() {
  yield takeLatest(actionTypes.RUN_REQUEST, runRequest);
}
