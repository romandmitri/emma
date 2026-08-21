> Looking to hire me? Checkout my [introduction](https://github.com/romandmitri/introduction) repository for a curated list!

# emma

The `emma` project is a platform that helps you write a convert a personal autobiography (aka memoire) into tailored resume and embedded a chatbot that talks
like you!

This project is hosted on [emma.romandmitri.com](https://emma.romandmitri.com) via Vercel... because free.

---

# Repository Setup

## Secrets & Configuration

Create `/.env` (or `/.env.local`) file with the following keys, as needed:

```env
AUTH_DURATION=100d
AUTH_SECRET=abc...
BASE_URL=http://localhost:2200
DEV_ALPHA=bravo!
DEV_DISPLAY=true
DATABASE_URL=postgresql://postgres:postgres@localhost:2232/postgres
VERCEL_AI_GATEWAY_KEY=vck...
WORKOS_API_KEY=sk_test_a2V...cDQ
WORKOS_CLIENT_ID=client_01M...3SG
```

## Local Database (Docker)

Spin up PostgreSQL locally with Docker:

```bash
npm run db:up       # Start local PostgreSQL container
npm run db:logs     # Follow database logs
npm run db:connect  # Open interactive psql shell into the container
npm run db:down     # Stop local PostgreSQL container
```

## Database Migrations & Seeding (Kysely)

```bash
npm run db:create <name>    # Create a new migration file
npm run db:migrate          # Apply all pending migrations (latest)
npm run db:migrate:status   # Check status of migrations
npm run db:seed             # Seed database (local dev or cluster based on NODE_ENV)
npm run db:reset            # Reset public schema, re-run migrations, and seed local data
```

## Deployment & Build

When deployed to Vercel with NeonDB:

- The build script (`npm run build`) automatically executes `npm run db:migrate` before building Next.js to ensure target database schemas are updated before
  traffic hits the deployment.

## Development

```bash
npm install
npm run db:up
npm run db:migrate
npm run db:seed
npm run dev
```
