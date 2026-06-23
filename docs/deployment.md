# Deployment Guide

## Local Development

Backend:

```bash
cd backend

uvicorn app.main:app --reload
```

Frontend:

```bash
cd frontend

npm run dev
```

---

## Docker

Build:

```bash
docker compose build
```

Run:

```bash
docker compose up
```

---

## Backend Environment Variables

```env
DATABASE_URL=
GROQ_API_KEY=
```

---

## Frontend Environment Variables

```env
VITE_API_URL=
```

---

## GitHub Actions

### Backend CI

Validates:

* Dependency installation
* FastAPI imports

### Frontend CI

Validates:

* Dependency installation
* Production build

---

## Recommended Production Setup

Frontend:

* Vercel

Backend:

* Render

Database:

* Render PostgreSQL
