import axios from 'axios';

// Fallback to the current host so API calls work outside the Docker network
const API =
  process.env.REACT_APP_API_URL ||
  `http://${window.location.hostname}:8000/api`;

export const createBooking = data => axios.post(`${API}/bookings`, data);