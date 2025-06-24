import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export async function fetchLockers() {
  const res = await axios.get(`${API}/lockers`);
  return res.data;
}