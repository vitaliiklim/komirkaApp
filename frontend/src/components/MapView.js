import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { fetchLockers } from '../api/lockers';
import './MapView.css';

// Ensure default marker icons load correctly when the app is bundled
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

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
        <div className="row g-2">
          <div className="col-auto">
            <select className="form-select" value={size} onChange={e => setSize(e.target.value)}>
              <option value="">All sizes</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div>
          <div className="col-auto form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={video}
              onChange={e => setVideo(e.target.checked)}
              id="videoCheck"
            />
            <label className="form-check-label" htmlFor="videoCheck">
              Video
            </label>
          </div>
          <div className="col-auto form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={cooling}
              onChange={e => setCooling(e.target.checked)}
              id="coolingCheck"
            />
            <label className="form-check-label" htmlFor="coolingCheck">
              Cooling
            </label>
          </div>
          <div className="col-auto">
            <input
              type="number"
              className="form-control"
              placeholder="Max price"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-primary" onClick={handleLoad}>Apply</button>
          </div>
        </div>
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
