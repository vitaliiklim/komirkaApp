import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Dashboard.css'
import { getBookings } from '../api/bookings'

export default function Dashboard() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    getBookings()
      .then(res => setBookings(res.data))
      .catch(console.error)
  }, [])

  return (
    <div className="dashboard-container bg-white p-4 rounded shadow-sm mt-4">
      <h1 className="mb-3">Dashboard</h1>
      <p>You are now logged in!</p>
      <p>
        <a href="/lockers" className="link-danger">Browse available lockers</a>
      </p>
      {bookings.length > 0 && (
        <div className="table-responsive mt-4">
          <h2 className="h5">All bookings</h2>
          <table className="table table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Locker</th>
                <th>From</th>
                <th>To</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.lockerId}</td>
                  <td>{new Date(b.startTime).toLocaleString()}</td>
                  <td>{new Date(b.endTime).toLocaleString()}</td>
                  <td>{b.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
