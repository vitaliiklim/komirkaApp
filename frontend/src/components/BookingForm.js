import React, { useState } from 'react';
import { createBooking } from '../api/bookings';

export function BookingForm({ lockerId }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    await createBooking({ lockerId, from, to });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="datetime-local" value={from} onChange={e => setFrom(e.target.value)} />
      <input type="datetime-local" value={to} onChange={e => setTo(e.target.value)} />
      <button type="submit">Book</button>
    </form>
  );
}