import React, { useEffect, useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { MapView } from './components/MapView';
import './App.css';
import { getLockers } from './api/lockers';

function App() {
  const [user, setUser] = useState(null);
  const [lockers, setLockers] = useState([]);

  useEffect(() => {
    if (user) {
      getLockers().then(res => setLockers(res.data));
    }
  }, [user]);

  if (!user) return <LoginForm onLogin={setUser} />;

  return (
    <div className="App">
      <h1>Welcome, {user.email}</h1>
      <MapView lockers={lockers} />
    </div>
  );
}

export default App;