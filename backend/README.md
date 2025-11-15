# Startup Landing App - Backend API

Express.js backend with PostgreSQL and Prisma ORM.

## Setup

1. **Install dependencies:**
   ```bash
   cd backend
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your PostgreSQL connection string:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/startup_db?schema=public"
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

3. **Set up database:**
   ```bash
   pnpm prisma:generate
   pnpm prisma:migrate
   ```

4. **Run the server:**
   ```bash
   pnpm dev
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### Startups
- `GET /api/startups` - Get all startups (query params: `search`, `category`)
- `GET /api/startups/:id` - Get startup by ID
- `GET /api/startups/slug/:slug` - Get startup by slug
- `GET /api/startups/author/:authorId` - Get startups by author
- `POST /api/startups` - Create new startup
- `PATCH /api/startups/:id/views` - Increment views

### Authors
- `GET /api/authors/:id` - Get author by ID
- `GET /api/authors/github/:githubId` - Get author by GitHub ID
- `POST /api/authors` - Create or update author

## Database Schema

- **Author**: Users who create startups
- **Startup**: Startup pitches with title, description, category, image, pitch content, and views

