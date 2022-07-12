import axios from 'axios';
import { getItem } from '../utils/localStorage';

const axiosClient = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_SERVER}/api`,
    withCredentials: true,
    headers: {
        'content-type': 'application/json',
    },
});

axiosClient.interceptors.request.use(async (config) => {
    const token = getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        console.log(error);
        if (error.response.status === 401) {
            return window.location.href = '/';
        }
        throw error.response.data;
    }
);

export default axiosClient;