import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Dashboard.css'
import { getBookings } from '../api/bookings'
import { fetchLockers } from '../api/lockers'

export default function Dashboard() {
  const [bookings, setBookings] = useState([])
  const [lockers, setLockers] = useState([])

  useEffect(() => {
    getBookings()
      .then(res => setBookings(res.data))
      .catch(console.error)

    fetchLockers()
      .then(data => setLockers(data))
      .catch(console.error)
  }, [])

  return (
    <div className="dashboard-container bg-white p-4 rounded shadow-sm mt-4">
      <h1 className="mb-3">Dashboard</h1>
      <p>You are now logged in!</p>
      <p>
        <a href="/lockers" className="link-primary">Browse available lockers</a>
      </p>
      {lockers.length > 0 && (
        <div className="table-responsive mt-4">
          <h2 className="h5">Available lockers</h2>
          <table className="table table-sm align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Address</th>
                <th>Size</th>
                <th>Hourly</th>
                <th>Daily</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {lockers.map(l => (
                <tr key={l.id}>
                  <td>{l.id}</td>
                  <td>{l.address}</td>
                  <td>{l.size}</td>
                  <td>{l.hourlyPrice}</td>
                  <td>{l.dailyPrice}</td>
                  <td>
                    <a className="btn btn-sm btn-primary" href={`/booking/${l.id}`}>
                      Book
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
                <th></th>
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
                  <td>
                    <a className="btn btn-sm btn-secondary" href={`/share/${b.id}`}>Share</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
