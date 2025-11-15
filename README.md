# Startup Landing App

A full-stack application for entrepreneurs to submit startup ideas, browse pitches, and connect with other entrepreneurs.

## Project Structure

```
startup-landing-app/
├── backend/          # Express.js API with PostgreSQL & Prisma
├── frontend/         # Next.js 15 frontend application
└── README.md         # This file
```

## Quick Start

### Backend Setup

```bash
cd backend
pnpm install
cp .env.example .env
# Edit .env with your PostgreSQL connection string
pnpm prisma:generate
pnpm prisma:migrate
pnpm dev
```

The backend API will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
pnpm install
# Edit .env with your configuration
pnpm dev
```

The frontend will run on `http://localhost:3000`

## Tech Stack

### Backend
- Node.js + Express.js
- PostgreSQL
- Prisma ORM
- TypeScript

### Frontend
- Next.js 15
- React 19
- TypeScript
- TailwindCSS
- NextAuth.js

## Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://user:password@localhost:5432/startup_db?schema=public"
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
AUTH_SECRET=your_auth_secret_here
AUTH_GITHUB_ID=your_github_client_id_here
AUTH_GITHUB_SECRET=your_github_client_secret_here
```

## API Endpoints

See `backend/README.md` for detailed API documentation.

## Development

1. Start the backend server first
2. Then start the frontend development server
3. Both should be running simultaneously for the app to work

