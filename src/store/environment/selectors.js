// @flow

import type { Map } from 'immutable';

export const output = (state: Map) => state.getIn(['environment', 'output']);
export const outputPython = (state: Map) =>
  state.getIn(['environment', 'outputPython']);
export const loading = (state: Map) => state.getIn(['environment', 'loading']);
