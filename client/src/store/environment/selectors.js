// @flow

import { createSelector } from 'reselect';
import type { Map } from 'immutable';

export const output = (state: Map) => state.getIn(['environment', 'output']);
export const outputPython = (state: Map) =>
  state.getIn(['environment', 'outputPython']);
export const loading = (state: Map) => state.getIn(['environment', 'loading']);
export const error = (state: Map) => state.getIn(['environment', 'error']);
export const coconutErrorLine = (state: Map) =>
  state.getIn(['environment', 'coconutError', 'line']);
export const coconutErrorCall = (state: Map) =>
  state.getIn(['environment', 'coconutError', 'call']);
export const pythonErrorLine = (state: Map) =>
  state.getIn(['environment', 'pythonError', 'line']);
export const pythonErrorCall = (state: Map) =>
  state.getIn(['environment', 'pythonError', 'call']);
export const argsTarget = (state: Map) =>
  state.getIn(['environment', 'args', 'target']);

export const args = createSelector(argsTarget, target => ({ target }));
export const isError = createSelector(
  [error, coconutErrorCall, pythonErrorCall],
  (err, cocoErrorCall, pyErrorCall) => err || cocoErrorCall || pyErrorCall
);
