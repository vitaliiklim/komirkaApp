import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { login, register } from '../api/auth'
import 'bootstrap/dist/css/bootstrap.min.css'
import './AuthForm.css'

export default function AuthForm() {
  const { mode } = useParams() // 'login' or 'register'
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (mode === 'register') {
        await register({ email, password })
        alert('Registration successful!')
        navigate('/')
      } else {
        const { token } = await login({ email, password })
        localStorage.setItem('token', token)
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        navigate('/lockers')
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    }
  }

  return (
    <div className="auth-container bg-white p-4 rounded shadow-sm mt-5">
      <h2 className="text-center mb-4">{mode === 'register' ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {mode === 'register' ? 'Register' : 'Login'}
        </button>
      </form>
      <button className="btn btn-link mt-3" onClick={() => navigate(mode === 'login' ? '/auth/register' : '/auth/login')}>
        {mode === 'login' ? 'Need an account? Register' : 'Have an account? Login'}
      </button>
    </div>
  )
}