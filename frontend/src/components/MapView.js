import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import { fetchLockers } from '../api/lockers';
import './MapView.css';

export default function MapView() {
  const [lockers, setLockers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLockers().then(setLockers).catch(console.error);
  }, []);

  return (
    <MapContainer center={[50.45, 30.52]} zoom={12} className="map-container">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {lockers.map(l => (
        <Marker key={l.id} position={[l.latitude, l.longitude]}>
          <Popup>
            <strong>{l.address}</strong>
            <br />
            Size: {l.size}
            <br />
            {l.hourlyPrice}$/h, {l.dailyPrice}$/day
            <br />
            {l.hasVideo && '📹 '} {l.hasCooling && '❄️ '}
            <br />
            <button onClick={() => navigate(`/booking/${l.id}`)}>Book</button>
          </Popup>
        </Marker>
      ))
    </MapContainer>
  );
}
