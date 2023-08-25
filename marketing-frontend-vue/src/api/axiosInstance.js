import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://example.com/api/',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

export default instance;
