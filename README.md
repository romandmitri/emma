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
DEV_ALPHA=bravo!
DATABASE_URL=postgresql://postgres:postgres@localhost:2232/postgres
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
npm run db:seed:local       # Seed with local demo users, API keys, memoirs, and resumes
npm run db:seed:cluster     # Seed with cluster/production safe base settings (idempotent)
npm run db:reset            # Reset public schema, re-run migrations, and seed local data
```

## Deployment & Build

When deployed to Vercel with NeonDB:

- The build script (`npm run build`) automatically executes `npm run db:migrate` before building Next.js to ensure target database schemas are updated before
  traffic hits the deployment.
- Cluster seeding can be executed via `npm run db:seed:cluster`.

## Development

```bash
npm install
npm run db:up
npm run db:migrate
npm run db:seed
npm run dev
```
