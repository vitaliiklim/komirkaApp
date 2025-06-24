import axios from 'axios'

// Use build-time REACT_APP_API_URL if defined, otherwise fallback to the host
// name from the browser to support running inside a VM where "api" is not a
// resolvable domain outside the Docker network.
const API =
  process.env.REACT_APP_API_URL ||
  `http://${window.location.hostname}:8000/api`

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