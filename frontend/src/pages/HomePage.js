import React, { useEffect, useState } from 'react';
import { getLockers } from '../api/lockers';
import { MapView } from '../components/MapView';
import { BookingForm } from '../components/BookingForm';

export default function HomePage() {
  const [lockers, setLockers] = useState([]);
  useEffect(() => { getLockers().then(res => setLockers(res.data)); }, []);
  return (
    <div>
      <MapView lockers={lockers} />
      {lockers.map(l => <BookingForm key={l.id} lockerId={l.id} />)}
    </div>
  );
}