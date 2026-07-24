# Bluechip Site - Next.js scaffold

This project is a minimal Next.js + TypeScript scaffold for the BlueChip Solution marketing site with a single contact API backed by Postgres using a repository pattern.

Setup

1. Copy `.env.example` to `.env.local` and fill `DATABASE_URL`.
2. Install dependencies:

```bash
npm install
```

3. Run dev server:

```bash
npm run dev
```

Database migration: apply `migrations/001_create_inquiries.sql` to your Postgres database. If you run Postgres in Docker (example container `flowcrm-db`), you can create the database and apply migration as follows:

```powershell
# create database (runs inside the container)
docker exec -e PGPASSWORD=password flowcrm-db psql -U user -d bizdb -c "CREATE DATABASE bluechip;"

# copy migration into container and apply it
docker cp "migrations/001_create_inquiries.sql" flowcrm-db:/tmp/001_create_inquiries.sql
docker exec -e PGPASSWORD=password flowcrm-db psql -U user -d bluechip -f /tmp/001_create_inquiries.sql
```

Then set `DATABASE_URL` in `.env.local` (example included).

## Admin export

The admin CSV export endpoint is available at `/api/admin/export` and requires a bearer token.

Set `ADMIN_EXPORT_TOKEN` in your environment, then request:

```bash
curl -H "Authorization: Bearer $ADMIN_EXPORT_TOKEN" https://your-site.com/api/admin/export
```

## Migration runner

This project uses `node-pg-migrate` as a migration runner. Run:

```bash
npm run migrate
```

Set `DATABASE_URL` before running migrations.

## Staging CI

The CI workflow will run migrations against `STAGING_DATABASE_URL` when available. Configure your repo secret `STAGING_DATABASE_URL` in GitHub.
