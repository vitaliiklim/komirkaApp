import React from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './LandingPage.css'

export default function LandingPage() {
  const navigate = useNavigate()
  return (
    <div className="landing-container text-center d-flex flex-column justify-content-center align-items-center">
      <h1 className="display-4 mb-3">Welcome to KomirkaApp</h1>
      <p className="lead mb-4">Secure Locker Rentals Made Easy</p>
      <div>
        <button className="btn btn-primary me-2" onClick={() => navigate('/auth/login')}>Login</button>
        <button className="btn btn-secondary" onClick={() => navigate('/auth/register')}>Register</button>
      </div>
    </div>
  )
}