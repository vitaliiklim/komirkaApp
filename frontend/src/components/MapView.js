import React from 'react';

export function MapView({ lockers }) {
  return (
    <ul>
      {lockers.map(l => (
        <li key={l.id}>{l.locationName} ({l.latitude}, {l.longitude})</li>
      ))}
    </ul>
  );
}