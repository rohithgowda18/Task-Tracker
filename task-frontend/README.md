# Task Frontend

This is a small React + Vite frontend for the Task Tracker app.

Run instructions (PowerShell):

1. Install dependencies:

```powershell
cd "c:\Users\rohit\OneDrive\Desktop\study\projects\Task-Tracker\task-frontend"
npm install
```

2. Run dev server:

```powershell
npm run dev
```

Open http://localhost:5173/ in your browser.

If your backend runs on a different host/port, create a `.env` file in this folder with:

```
VITE_API_URL=http://localhost:8080
```

The frontend expects the REST endpoints described in the project PDF (e.g. `/task-lists`, `/task-lists/:id/tasks`).
