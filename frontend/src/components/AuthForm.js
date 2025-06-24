import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { login, register } from '../api/auth'
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
        alert('Registration successful! You can now login.')
        navigate('/auth/login')
      } else {
        const { token } = await login({ email, password })
        localStorage.setItem('token', token)
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        navigate('/dashboard')
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    }
  }

  return (
    <div className="auth-container">
      <h2>{mode === 'register' ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary">
          {mode === 'register' ? 'Register' : 'Login'}
        </button>
      </form>
      <button className="link-button" onClick={() => navigate(mode === 'login' ? '/auth/register' : '/auth/login')}>
        {mode === 'login' ? 'Need an account? Register' : 'Have an account? Login'}
      </button>
    </div>
  )
}