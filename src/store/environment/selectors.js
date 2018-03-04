export const output = state => state.getIn(['environment', 'output']);
export const outputPython = state =>
  state.getIn(['environment', 'outputPython']);
export const loading = state => state.getIn(['environment', 'loading']);
