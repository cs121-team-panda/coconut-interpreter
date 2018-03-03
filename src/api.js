import request from './utils/request';
import { toFormData } from './utils/payload';

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://coconut-interpreter-flask.herokuapp.com';

export const run = payload =>
  request(`${baseUrl}/coconut`, {
    method: 'POST',
    body: toFormData(payload),
  });
