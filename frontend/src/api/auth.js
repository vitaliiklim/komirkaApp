import axios from 'axios'

const API = process.env.REACT_APP_API_URL

export async function login({ email, password }) {
  const res = await axios.post(
    `${API}/auth/login`,
    { email, password },
    { headers: { 'Content-Type': 'application/json' } }
  )
  return res.data
}

export async function register({ email, password }) {
  const res = await axios.post(
    `${API}/auth/register`,
    { email, password },
    { headers: { 'Content-Type': 'application/json' } }
  )
  return res.data
}