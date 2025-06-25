import React, { useState } from 'react';
import { createBooking } from '../api/bookings';
import 'bootstrap/dist/css/bootstrap.min.css';

export function BookingForm({ lockerId }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    await createBooking({
      lockerId,
      startTime: from,
      endTime: to,
    });
    alert('Booking created');
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-light rounded mb-3">
      <div className="row g-2 mb-2">
        <div className="col">
          <input
            type="datetime-local"
            className="form-control"
            value={from}
            onChange={e => setFrom(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="datetime-local"
            className="form-control"
            value={to}
            onChange={e => setTo(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Book
      </button>
    </form>
  );
}