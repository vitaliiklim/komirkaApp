import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="brand">KomirkaApp</div>
      <Link to="/">Home</Link>
      <Link to="/lockers">Lockers</Link>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
}