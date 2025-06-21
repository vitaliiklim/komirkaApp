import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const login = async creds => {
  const res = await axios.post(
    `${API}/auth/login`,
    creds,
    { withCredentials: true }   // якщо ви використовуєте кукі; інакше можна забрати
  );
  return res.data;
};
