import axios from 'axios';
const API = process.env.REACT_APP_API_URL;

export const createBooking = data => axios.post(`${API}/bookings`, data);