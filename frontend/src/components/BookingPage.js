import React from 'react';
import { useParams } from 'react-router-dom';
import { BookingForm } from './BookingForm';

export default function BookingPage() {
  const { id } = useParams();
  return <BookingForm lockerId={id} />;
}
