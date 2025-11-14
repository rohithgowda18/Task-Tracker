# Task-Tracker

Small full-stack Task Tracker application (React + Vite frontend and Spring Boot backend).

**Repository layout**
- `frontend/` — React + Vite app (TypeScript). Dev server runs on port `5173`.
- `taskTrackerbackend/` — Spring Boot backend. Runs on port `8080` by default.

**Prerequisites**
- Java 21 (for the backend)
- Maven (or use the included `mvnw` wrapper)
- Node.js (16+ recommended) and npm
- PostgreSQL if you want the runtime DB (backend `application.properties` points at localhost:5433 by default)

**Quick start (backend)**
1. Open a PowerShell terminal and start the backend:

```powershell
cd 'c:\Users\rohit\OneDrive\Desktop\study\projects\Task-Tracker\taskTrackerbackend'
./mvnw -DskipTests spring-boot:run
# or build and run the jar:
./mvnw -DskipTests package
java -jar target\taskTracker-0.0.1-SNAPSHOT.jar
```

The backend will listen on `http://localhost:8080` by default. Check `src/main/resources/application.properties` for DB settings.

**Quick start (frontend)**
1. In another PowerShell terminal run:

```powershell
cd 'c:\Users\rohit\OneDrive\Desktop\study\projects\Task-Tracker\frontend'
npm install
npm run dev
```

The frontend dev server runs at `http://localhost:5173` and uses a Vite proxy so API calls to `/api/*` are forwarded to the backend.

**Environment / Configuration**
- Frontend: create a `.env` or set `VITE_API_URL` to change the API base used at runtime (dev server uses Vite proxy).
- Backend: DB and other configs live in `taskTrackerbackend/src/main/resources/application.properties`.

**API endpoints (frontend ↔ backend mapping)**
- `GET /api/task-lists`  -> proxied to backend `GET /task-lists`
- `POST /api/task-lists` -> proxied to backend `POST /task-lists`
- `GET /api/task-lists/{id}` -> proxied to backend `GET /task-lists/{id}`
- `PUT /api/task-lists/{id}` -> proxied to backend `PUT /task-lists/{id}`
- `DELETE /api/task-lists/{id}` -> proxied to backend `DELETE /task-lists/{id}`
- Nested tasks paths follow `/api/task-lists/{taskListId}/tasks...` (proxied to `/task-lists/{taskListId}/tasks...`).


