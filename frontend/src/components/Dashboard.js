import React from 'react'
import './Dashboard.css'

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>You are now logged in!</p>
      <p>
        <a href="/lockers">Browse available lockers</a>
      </p>
    </div>
  )
}
