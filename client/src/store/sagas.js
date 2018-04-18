import { fork } from 'redux-saga/effects';
import environment from './environment';

export default function* sagas() {
  yield fork(environment.saga);
}
