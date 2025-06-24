import axios from 'axios';

// Use current hostname if REACT_APP_API_URL is not provided
const API =
  process.env.REACT_APP_API_URL ||
  `http://${window.location.hostname}:8000/api`;

export async function fetchLockers(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = `${API}/lockers${query ? `?${query}` : ''}`;
  const res = await axios.get(url);
  return res.data;
}