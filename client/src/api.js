import axios, { CancelToken } from 'axios';
import { CANCEL } from 'redux-saga';

import toFormData from './utils/payload';

const baseUrl = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

const run = payload => {
  const source = CancelToken.source();
  const request = axios.post(`${baseUrl}/coconut`, toFormData(payload), {
    cancelToken: source.token,
  });
  request[CANCEL] = () => source.cancel();
  return request;
};

export default run;
