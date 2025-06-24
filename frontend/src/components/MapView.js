import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import { fetchLockers } from '../api/lockers';
import './MapView.css';

export default function MapView() {
  const [lockers, setLockers] = useState([]);
  const [size, setSize] = useState('');
  const [video, setVideo] = useState(false);
  const [cooling, setCooling] = useState(false);
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    handleLoad();
  }, []);

  const handleLoad = () => {
    const params = {};
    if (size) params.size = size;
    if (video) params.video = true;
    if (cooling) params.cooling = true;
    if (maxPrice) params.maxPrice = maxPrice;
    fetchLockers(params).then(setLockers).catch(console.error);
  };

  return (
    <div className="map-wrapper">
      <div className="filter-container">
        <select value={size} onChange={e => setSize(e.target.value)}>
          <option value="">All sizes</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={video}
            onChange={e => setVideo(e.target.checked)}
          />
          Video
        </label>
        <label>
          <input
            type="checkbox"
            checked={cooling}
            onChange={e => setCooling(e.target.checked)}
          />
          Cooling
        </label>
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
        <button onClick={handleLoad}>Apply</button>
      </div>
      <MapContainer center={[49.5535, 25.5948]} zoom={13} className="map-container">
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
        ))}
      </MapContainer>
    </div>
  );
}
