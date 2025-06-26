import axios from 'axios';

const API =
  process.env.REACT_APP_API_URL ||
  `http://${window.location.hostname}:8000/api`;

export const createKey = data => axios.post(`${API}/accesskeys`, data);
