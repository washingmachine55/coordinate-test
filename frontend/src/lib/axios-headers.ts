import axios from 'axios';

const url = 'https://localhost:3000';
const timeoutValue = 5000;
const token = localStorage.getItem('token');

const axiosInstance = axios.create({
	baseURL: url,
	timeout: timeoutValue,
	headers: {
		'Content-Type': 'application/json',
		Authorization: token,
	},
});

const axiosInstanceWithoutHeaders = axios.create({
	baseURL: url,
	timeout: timeoutValue,
	headers: { 'Content-Type': 'application/json' },
});

export { axiosInstance, axiosInstanceWithoutHeaders };