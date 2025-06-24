import axios from 'axios';

// Resolve API endpoint based on current hostname when not provided via env var
const API =
  process.env.REACT_APP_API_URL ||
  `http://${window.location.hostname}:8000/api`;

export const pay = data => axios.post(`${API}/payments`, data);