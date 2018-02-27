import request from './utils/request';

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://coconut-interpreter-flask.herokuapp.com';

export const run = payload =>
  request(`${baseUrl}/coconut`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
