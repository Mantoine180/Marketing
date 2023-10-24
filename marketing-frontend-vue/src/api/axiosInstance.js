import axios from 'axios';
import Cookies from 'js-cookie';
const authToken = Cookies.get('authToken');

const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 1000,
    headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}`}
});

export default instance;
