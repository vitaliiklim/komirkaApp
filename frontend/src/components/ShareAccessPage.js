import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createKey } from '../api/accessKeys';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ShareAccessPage() {
  const { id } = useParams();
  const [expires, setExpires] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const { data } = await createKey({
      bookingId: parseInt(id, 10),
      expiresAt: expires,
    });
    alert(`Access code: ${data.code}`);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Share Access</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Expires At</label>
          <input
            type="datetime-local"
            className="form-control"
            value={expires}
            onChange={e => setExpires(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Generate Code
        </button>
      </form>
    </div>
  );
}
