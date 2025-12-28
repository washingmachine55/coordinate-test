import axios from 'axios';

// axios.defaults.baseURL = 'https://localhost:3000';
export const axiosInstance = axios.create({
	baseURL: 'https://localhost:3000',
});
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
axiosInstance.defaults.headers.common['Authorization'] = localStorage.getItem('token');
axiosInstance.defaults.timeout = 10000;