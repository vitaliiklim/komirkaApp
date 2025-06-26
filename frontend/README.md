# Komirka Frontend

This folder contains the React application that interacts with the Komirka API.

## Prerequisites
* Node.js 18+

## Development Setup
```bash
cd frontend
npm install
REACT_APP_API_URL=http://localhost:5000/api npm start
```
This runs the app in development mode on `http://localhost:3000`.

## Map Filters
The locker map now includes a filter panel allowing you to filter by size,
additional services and maximum price. The React component issues GET requests
with query parameters, so the backend must run the latest code from this
repository.

## UI Refresh
The interface now uses Bootstrap 5 for styling. Marker icons on the map load
properly thanks to an explicit Leaflet configuration.

## Theme Toggle
The UI now includes a light/dark mode switch in the navigation bar. The
preference is saved in `localStorage` and applied on future visits.

