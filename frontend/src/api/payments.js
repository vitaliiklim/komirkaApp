import axios from 'axios';
const API = process.env.REACT_APP_API_URL;

export const pay = data => axios.post(`${API}/payments`, data);