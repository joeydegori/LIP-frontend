import axios from 'axios';

export const authAxios = axios.create({});

// This function intercept the axios request and add "Authorization" header with the token.
authAxios.interceptors.request.use((config) => {
    const jwtToken = JSON.parse(localStorage.getItem('token'));
    if (jwtToken) config.headers['Authorization'] = `Bearer ${jwtToken}`;
    return config;
});
