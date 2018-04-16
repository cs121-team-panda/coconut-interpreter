import axios from 'axios';

import toFormData from './utils/payload';

const baseUrl = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

const run = payload => axios.post(`${baseUrl}/coconut`, toFormData(payload));

export default run;
