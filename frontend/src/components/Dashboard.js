import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Dashboard.css'

export default function Dashboard() {
  return (
    <div className="dashboard-container bg-white p-4 rounded shadow-sm mt-4">
      <h1 className="mb-3">Dashboard</h1>
      <p>You are now logged in!</p>
      <p>
        <a href="/lockers" className="link-primary">Browse available lockers</a>
      </p>
    </div>
  )
}
