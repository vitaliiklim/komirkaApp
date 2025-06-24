# Komirka Backend

This directory contains the ASP.NET Core Web API for the Komirka application.

## Requirements
* .NET 7 SDK
* MySQL server (or Docker for containerized setup)

## Running from Source
```bash
cd backend
 dotnet restore
 dotnet run
```
The API will be accessible at `http://localhost:5000`.

## Running with Docker Compose
To start the API together with a MySQL database and the React frontend, execute from the repository root:
```bash
docker-compose up --build
```
This command builds the images and launches `db`, `api` and `frontend` services.

## Configuration
Database and JWT settings are defined in `appsettings.json`. They can also be overridden via environment variables such as `ConnectionStrings__DefaultConnection`.
