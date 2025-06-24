import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import AuthForm from './components/AuthForm';
import MapView from './components/MapView';
import Dashboard from './components/Dashboard';
import BookingPage from './components/BookingPage';

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/:mode" element={<AuthForm />} />
        <Route path="/lockers" element={<MapView />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/booking/:id" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}