import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeContext } from '../ThemeContext';

export default function NavBar() {
  const { theme, toggle } = useContext(ThemeContext);
  const navbarClass = `navbar navbar-expand-lg mb-3 ${
    theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'
  }`;

  return (
    <nav className={navbarClass}>
      <div className="container">
        <Link className="navbar-brand" to="/">KomirkaApp</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/lockers">Lockers</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
          </ul>
          <button
            className="btn btn-outline-secondary ms-3"
            onClick={toggle}
          >
            {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </div>
    </nav>
  );
}