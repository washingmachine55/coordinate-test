import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${JWT_TOKEN}`;

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3000';
