# 🌿 Wellness Tracker

A full-stack wellness web app for logging **activity, sleep, hydration, meditation and health appointments** in one place, setting weekly goals, and seeing progress over time.

Built with **React + Vite** (frontend), **Node.js + Express** (REST API) and **PostgreSQL** (database).

| | |
|---|---|
| **Live app** | https://wellness-tracker-two-lime.vercel.app |
| **API** | https://wellness-tracker-htx7.onrender.com/api/health |
| **Unit** | ICT930 Advanced Web Application Development – Assessment 3 (group project) |

> The API is hosted on Render's free tier and sleeps when idle, so the **first request can take 30–60 seconds**. If login seems slow, wait a moment and try again.

---

## ✨ Features

- **Accounts** – register and log in; passwords hashed with bcrypt, routes protected with JWT. Each user only sees their own data.
- **Dashboard** – this week's totals for each module with progress towards weekly goals, a 7-day chart per metric, and the next appointment.
- **Activity, Sleep, Hydration & Meditation** – add, edit and delete entries; weekly summary and goal progress; full history pages.
- **Appointments** – upcoming and past views, with add / edit / delete.
- **Progress** – weekly summary, activity breakdown by type, and recommendations based on your goals.
- **Profile & goals** – edit your name, bio and weekly targets.
- **Responsive & accessible** – sidebar on desktop, slide-in menu on mobile; labelled form fields, keyboard-friendly dialogs and menus, and screen-reader friendly errors and loading states.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, React Router 7, Context API, Recharts, custom CSS |
| Backend | Node.js, Express 5, JSON Web Tokens, bcryptjs |
| Database | PostgreSQL (`pg` driver, parameterised queries) |
| Hosting | Vercel (frontend), Render (API + PostgreSQL) |
| Tooling | ESLint, Git / GitHub |

---

## 🏗️ Architecture

```
React (Vercel)  ──HTTPS + JWT──▶  Express API (Render)  ──SQL──▶  PostgreSQL (Render)
       ▲                                   │
       └──────────── JSON responses ◀──────┘
```

- All frontend requests go through `src/services/api.js`, which adds the JWT, shows server error messages, and logs the user out if the token has expired.
- On start-up the API runs `server/schema.sql` and `server/migrate.js`, which create any missing tables, repair older table layouts and add indexes – so a fresh database needs no manual setup.

---

## 📁 Project Structure

```
wellness-tracker/
├── src/                      # React frontend
│   ├── components/
│   │   ├── features/         # forms, edit dialogs, TrackerPage, charts, progress widgets
│   │   ├── layout/           # Navbar, Sidebar, PageHeader, Footer
│   │   ├── ui/               # Modal, Icon, ProgressBar, Loading, EmptyState, ErrorMessage
│   │   └── common/           # HistoryItem (entry row with Edit/Delete menu)
│   ├── context/              # Auth, Profile and one context per module
│   ├── pages/                # Dashboard, module pages, history pages, Profile, Login
│   ├── services/api.js       # fetch wrapper for the REST API
│   ├── utils/                # date helpers, module colours/icons
│   └── styles/global.css
├── server/                   # Express API
│   ├── routes/               # auth, profile, activities, sleep, hydration, meditation, appointments
│   ├── middleware/           # JWT authentication
│   ├── utils/errors.js       # turns bad input into 400 responses
│   ├── schema.sql            # table definitions
│   ├── migrate.js            # start-up schema repair + indexes
│   ├── db.js                 # PostgreSQL connection pool
│   └── index.js              # app entry point
├── vercel.json               # SPA routing for Vercel
└── index.html
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js 20+ and npm
- PostgreSQL 14+ (local install or a hosted database)

### 1. Clone
```bash
git clone https://github.com/ZsCypher21/wellness-tracker.git
cd wellness-tracker
```

### 2. Backend
```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=5000
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/wellness_tracker
DATABASE_SSL=false          # use true (or remove) for Render / hosted databases
JWT_SECRET=replace-with-a-long-random-string
```

Start the API (tables are created automatically on first run):
```bash
npm run dev      # or: npm start
```
Check it: http://localhost:5000/api/health

### 3. Frontend
In a second terminal, from the project root:
```bash
npm install
```

Create `.env` in the project root:
```env
VITE_API_URL=http://localhost:5000
```

Start the app:
```bash
npm run dev
```
Open http://localhost:5173 and register an account.

### Other scripts
```bash
npm run build    # production build into dist/
npm run lint     # ESLint for frontend and backend
```

> `.env` files contain secrets and are excluded from Git – never commit them.

---

## 🔌 API Reference

All routes are prefixed with `/api`. Routes marked 🔒 need an `Authorization: Bearer <token>` header.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Create an account → returns JWT |
| POST | `/auth/login` | Log in → returns JWT |
| GET 🔒 | `/profile` | Get name, email, bio and weekly goals |
| POST 🔒 | `/profile/update` | Update name, bio and goals |
| GET 🔒 | `/{module}/history` | All entries, newest first |
| GET 🔒 | `/{module}/recent` | Last 5 entries |
| POST 🔒 | `/{module}/add` | Add an entry |
| PUT 🔒 | `/{module}/:id` | Update an entry |
| DELETE 🔒 | `/{module}/:id` | Delete an entry |
| GET 🔒 | `/appointments/upcoming` | Future appointments |
| GET 🔒 | `/appointments/past` | Past appointments |
| GET | `/health` | Health check |

`{module}` is one of `activities`, `sleep`, `hydration`, `meditation` (appointments also support add / PUT / DELETE).

Errors are returned as JSON: `400` invalid input, `401` missing or expired token, `404` not found, `500` server error.

---

## ☁️ Deployment

**Backend (Render web service)**
- Root directory: `server` · Build: `npm install` · Start: `npm start`
- Environment variables: `DATABASE_URL` (Render PostgreSQL internal URL), `JWT_SECRET`, optional `FRONTEND_URL` (extra allowed CORS origins, comma-separated)

**Frontend (Vercel)**
- Framework: Vite · Build: `npm run build` · Output: `dist`
- Environment variable: `VITE_API_URL=https://wellness-tracker-htx7.onrender.com`
- `vercel.json` rewrites all routes to `index.html` so page refreshes work.

Every push to `main` redeploys both automatically.

---

## ✅ Testing

API test cases (run against the Express API with a fresh PostgreSQL 16 database) – all passing:

| Test case | Expected |
|---|---|
| Register; log in (email in any letter case) | 200 + JWT |
| View / update profile goals | 200, values saved |
| Add, edit, delete an activity | 200, list updated |
| Add sleep, hydration and meditation entries | 200, saved for that user only |
| Appointments split into upcoming and past | Correct list for each |
| Invalid number / missing required fields | 400 |
| Invalid or expired token | 401 |
| Unknown route / malformed JSON | 404 / 400 |
| Start-up repair of an old-layout database | Columns added, insert works |

ESLint reports no errors across the frontend and backend.

---

## ⚠️ Known Limitations

- No admin role; analytics cover the last 7 days only.
- All data is entered manually (no wearable integration).
- Free hosting tier causes a slow first request after inactivity.

## 🔮 Future Enhancements

- Monthly and long-term trend charts, reminders, and data export
- Pagination for long histories
- Rate limiting, stronger password rules, two-factor authentication and httpOnly cookie tokens
- Wearable device integration

---

## 👥 Team

| Name | Role |
|---|---|
| Prasana Lal Shrestha | Project lead, integration & deployment, documentation |
| Anjal Khadka | Database design & backend connection |
| Rajib Adhikari | Report & presentation |
