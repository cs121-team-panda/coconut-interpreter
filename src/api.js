import request from './utils/request';
import toFormData from './utils/payload';

const baseUrl = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

const run = payload =>
  request(`${baseUrl}/coconut`, {
    method: 'POST',
    body: toFormData(payload),
  });

export default run;
