import axios from 'axios';

// Use current hostname if REACT_APP_API_URL is not provided
const API =
  process.env.REACT_APP_API_URL ||
  `http://${window.location.hostname}:8000/api`;

export async function fetchLockers() {
  const res = await axios.get(`${API}/lockers`);
  return res.data;
}