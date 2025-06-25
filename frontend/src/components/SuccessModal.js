import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SuccessModal({ show, onClose }) {
  if (!show) return null;
  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">Registration successful</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>You can now log in to your account or browse lockers on the map.</p>
            <ul>
              <li>Proceed to <a href="/auth/login">Login</a></li>
              <li><a href="/lockers">View lockers</a> available for booking</li>
              <li>Return to <a href="/">Home page</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
