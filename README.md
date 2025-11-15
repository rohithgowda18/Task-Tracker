# Task Tracker — Full-Stack Sample Application

A compact, developer-friendly Task Tracker built with a React + Vite frontend and a Spring Boot backend. The project is intended as a learning/demo app and a starting point for production-ready features.

Key goals:
- Simple task list and task management UI
- Clean separation between frontend and backend
- Easy local development with Vite proxying and a Maven wrapper for the backend

Repository layout
- `frontend/` — React + Vite app (TypeScript). Dev server runs on :5173.
- `taskTrackerbackend/` — Spring Boot REST API. Runs on :8080 by default.

Tech stack
- Frontend: React 18, Vite, TypeScript, Axios
- Backend: Spring Boot (Java 21), Spring Data JPA, PostgreSQL (runtime)

Prerequisites
- Node.js (16+ recommended) and npm
- Java 21 (or matching your Maven toolchain)
- Maven (use the included `mvnw` wrapper if you don't have Maven installed)
- PostgreSQL (optional; the app is configured for a local Postgres but can be adjusted)

Quick Start — Backend (PowerShell)
1. Start the backend (from the repo root):

```powershell
cd 'C:\Users\rohit\OneDrive\Desktop\study\projects\Task-Tracker\taskTrackerbackend'
./mvnw -DskipTests spring-boot:run
# or build and run the jar:
./mvnw -DskipTests package
java -jar target\taskTracker-0.0.1-SNAPSHOT.jar
```

By default the server listens on `http://localhost:8080`. Database settings are in `taskTrackerbackend/src/main/resources/application.properties` (default points to Postgres on port `5433`).

Quick Start — Frontend (PowerShell)
1. In a separate terminal run:

```powershell
cd 'C:\Users\rohit\OneDrive\Desktop\study\projects\Task-Tracker\frontend'
npm install
npm run dev
```

The frontend dev server runs at `http://localhost:5173`. During development the Vite server proxies `/api/*` to the backend (see `frontend/vite.config.ts`).

Environment variables
- Frontend: `VITE_API_URL` can be used to change API base in production builds. For development the Vite proxy is preferred.
- Backend: edit `taskTrackerbackend/src/main/resources/application.properties` or use environment variables to configure datasource and other properties.

Docker (optional)
- There are `docker-compose.yml` files in both `frontend/` and `taskTrackerbackend/` if you want containerized runs. Inspect them and adapt as needed.

API Reference (development mapping)
- The frontend sends requests to `/api/...` which Vite rewrites and forwards to the backend's `/...` endpoints.

Common endpoints
- GET  /api/task-lists                     -> backend GET /task-lists
- POST /api/task-lists                     -> backend POST /task-lists
- GET  /api/task-lists/{id}                -> backend GET /task-lists/{id}
- PUT  /api/task-lists/{id}                -> backend PUT /task-lists/{id}
- DELETE /api/task-lists/{id}              -> backend DELETE /task-lists/{id}
- Nested tasks: /api/task-lists/{taskListId}/tasks...

Example requests (PowerShell)
- List task lists (direct to backend):
```powershell
Invoke-RestMethod -Uri 'http://localhost:8080/task-lists' -Method Get -Headers @{Accept='application/json'} | ConvertTo-Json -Depth 5
```

- Via Vite dev server (proxied):
```powershell
Invoke-RestMethod -Uri 'http://localhost:5173/api/task-lists' -Method Get -Headers @{Accept='application/json'} | ConvertTo-Json -Depth 5
```

Troubleshooting tips
- If `GET /api/task-lists` returns objects without `id` values:
	- Call the backend directly (port 8080) to confirm the backend's response.
	- Check the mapper implementations (mappers convert entities to DTOs) to ensure `id` is included.
	- Verify that the persisted entities have IDs in the database.
- If you see CORS errors in the browser, the Vite proxy is the easiest workaround for development. For production, configure CORS in the backend or use a reverse proxy.

Development notes
- Use the provided `mvnw` wrapper to avoid Maven setup issues.
- Use `git` branches for feature work; keep `main` stable.

Contributing
- Fork the repo, create a feature branch, push and open a pull request. Include a short description and notes about how to test your changes.

License
- Add a LICENSE file if you plan to open-source this project. (None included by default.)

Contact & help
- If you want help debugging the backend mapping or finishing missing endpoints (tasks CRUD), tell me which area to work on and I can produce focused patches and test commands.

---
This README was updated to be more actionable and professional. Edit any paths or commands if your environment differs.

