# Migration Guide: Sanity to Express.js + PostgreSQL

This guide documents the migration from Sanity CMS to a custom Express.js backend with PostgreSQL and Prisma ORM.

## What Changed

### Backend (New)
- **Location**: `/backend`
- **Stack**: Express.js + PostgreSQL + Prisma ORM
- **API Base URL**: `http://localhost:5000/api`

### Frontend Updates
- Replaced Sanity client with custom API client (`lib/api.ts`)
- Updated all pages to use new API endpoints
- Changed field names: `_id` → `id`, `_createdAt` → `createdAt`

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
pnpm install
cp .env.example .env
# Edit .env with your PostgreSQL connection string
pnpm prisma:generate
pnpm prisma:migrate
pnpm dev
```

### 2. Frontend Setup

Add to your `.env`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Update Remaining Files

You still need to update these files manually:

1. **`app/(root)/startup/[id]/page.tsx`** - Startup detail page
2. **`app/(root)/user/[id]/page.tsx`** - User profile page  
3. **`app/(root)/startup/create/page.tsx`** - Create startup page
4. **`components/View.tsx`** - View counter component
5. **`components/UserStartups.tsx`** - User startups list
6. **`lib/actions.ts`** - Server actions (createPitch)

## API Endpoints

### Startups
- `GET /api/startups?search=query&category=cat` - List startups
- `GET /api/startups/:id` - Get by ID
- `GET /api/startups/slug/:slug` - Get by slug
- `GET /api/startups/author/:authorId` - Get by author
- `POST /api/startups` - Create startup
- `PATCH /api/startups/:id/views` - Increment views

### Authors
- `GET /api/authors/:id` - Get by ID
- `GET /api/authors/github/:githubId` - Get by GitHub ID
- `POST /api/authors` - Create/update author

## Field Mapping

| Sanity | New API |
|--------|---------|
| `_id` | `id` |
| `_createdAt` | `createdAt` |
| `_updatedAt` | `updatedAt` |
| `author._ref` | `authorId` |
| `author->` | `author` (included) |

## Next Steps

1. Update remaining frontend files (see list above)
2. Test all functionality
3. Remove Sanity dependencies from `package.json`
4. Delete Sanity-related files:
   - `/sanity` directory
   - `/app/studio` directory
   - Sanity config files

