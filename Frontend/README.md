# TaskFlow React Frontend

Ready-to-connect React frontend for a beginner full-stack Task Management project.

## Tech
- React + Vite
- React Router
- Axios
- Plain CSS (no Tailwind dependency)

## Run
```bash
npm install
copy .env.example .env
npm run dev
```

PowerShell alternative:
```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

Set the backend base URL in `.env`:
```env
VITE_API_URL=http://localhost:8000/api
```

## Expected backend endpoints

### Auth
- `POST /api/auth/register` body: `{ name, email, password }`
- `POST /api/auth/login` body: `{ email, password }`
- `GET /api/auth/me` header: `Authorization: Bearer <token>`

Login/register responses should contain a token under either `token` or `accessToken`, and ideally:
```json
{ "token": "...", "user": { "id": "...", "name": "...", "email": "..." } }
```

### Tasks
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `POST /api/tasks` body: `{ title, description, priority, status, dueDate }`
- `PATCH /api/tasks/:id` body: partial task fields
- `DELETE /api/tasks/:id`

Task list responses can be either an array or `{ tasks: [...] }`.
Single-task responses can be either the task itself or `{ task: {...} }`.

## Suggested task document
```json
{
  "title": "Learn Express middleware",
  "description": "Understand auth and error middleware",
  "priority": "high",
  "status": "pending",
  "dueDate": "2026-09-10T00:00:00.000Z"
}
```

## Important backend requirement
Every protected task request must be associated with the logged-in user. The backend should never return another user's tasks and should verify ownership before update/delete.

## Frontend routes
- `/login`
- `/register`
- `/dashboard`
- `/tasks/new`
- `/tasks/:id/edit`
