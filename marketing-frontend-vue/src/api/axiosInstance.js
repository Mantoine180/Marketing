import axios from 'axios';
import Cookies from 'js-cookie';

const authToken = Cookies.get('authToken');

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT),
    headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}`}
});

export default instance;