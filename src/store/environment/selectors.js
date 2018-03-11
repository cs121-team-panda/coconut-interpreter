// @flow

import type { Map } from 'immutable';

export const output = (state: Map) => state.getIn(['environment', 'output']);
export const outputPython = (state: Map) =>
  state.getIn(['environment', 'outputPython']);
export const loading = (state: Map) => state.getIn(['environment', 'loading']);
export const coconutErrorLine = (state: Map) =>
  state.getIn(['environment', 'coconutError', 'line']);
export const coconutErrorCall = (state: Map) =>
  state.getIn(['environment', 'coconutError', 'call']);
export const pythonErrorLine = (state: Map) =>
  state.getIn(['environment', 'pythonError', 'line']);
export const pythonErrorCall = (state: Map) =>
  state.getIn(['environment', 'pythonError', 'call']);
