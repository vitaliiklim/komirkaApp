import React from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

export default function LandingPage() {
  const navigate = useNavigate()
  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to KomirkaApp</h1>
      <p className="landing-subtitle">Secure Locker Rentals Made Easy</p>
      <div className="landing-buttons">
        <button className="btn-primary" onClick={() => navigate('/auth/login')}>Login</button>
        <button className="btn-secondary" onClick={() => navigate('/auth/register')}>Register</button>
      </div>
    </div>
  )
}