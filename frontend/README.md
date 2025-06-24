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

## Building for Production
```bash
npm run build
```
The optimized output will be in the `build/` directory. You can serve it with any static file server or via Docker.

### Docker
You can build and run the frontend using Docker:
```bash
cd frontend
docker build -t komirka-frontend .
docker run -p 3000:80 komirka-frontend
```
The application is also included in `docker-compose.yml` and can be launched alongside the backend using `docker-compose up --build` from the repository root.

When `REACT_APP_API_URL` is not provided during the build, the frontend will
call the API at `http://<current-hostname>:8000/api`. To point it to a different
address, supply the `REACT_APP_API_URL` build argument.
