import request from './utils/request';

const baseUrl = 'https://coconut-interpreter-flask.herokuapp.com';

export const run = payload =>
  request(`${baseUrl}/coconut`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
