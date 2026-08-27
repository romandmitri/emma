> Looking to hire me? Check out my [introduction](https://github.com/romandmitri/introduction) repository for a curated list!

# emma

The `emma` project is a platform that helps you convert a personal autobiography (or memoir) into a tailored resume and embed a chatbot that talks like you!

Hosted on [emma.romandmitri.com](https://emma.romandmitri.com) via Vercel.

### Highlights

* Embedded chat widget
* AI/LLM tooling integration

> **Note:** This project is an early work-in-progress focused on fast prototyping and rapid deployment. It takes shortcuts that are not representative of
> production-grade work (e.g., using Next.js on Vercel for quick hosting, and using AI assistance to accelerate initial setup).
>
> If you are interested in a full monorepo with CI/CD pipelines and GCP orchestration, check out
> my [infrastructure](https://github.com/romandmitri/monorepo-docker-gke) repository.


---

# Repository Setup

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
