# AGENTS.md

## Cursor Cloud specific instructions

Next.js (Turbopack) site backed by Supabase, Mapbox, and Algolia. Node deps are installed automatically on VM startup.

- Dev server: `npm run dev` (port 3000; pass `-- --port <n>` to change). Lint: `npm run lint`. Build: `npm run build`. Typecheck: `npm run typecheck`.
- IMPORTANT: `src/lib/env.ts` validates env vars with zod **at import time**. Empty-string values fail validation (`min(1)` / email), so do NOT `cp .env.example .env.local` verbatim — its blank keys crash the dev server with a Zod error on `/`.
- For local dev without external services, a minimal `.env.local` containing only a valid `NEXT_PUBLIC_SITE_URL` (e.g. `http://127.0.0.1:3000`) is enough to boot; leave the Supabase/Mapbox/Algolia keys unset (omit them entirely rather than leaving them blank).
- Full functionality (map tiles, search index, DB content) requires real Supabase/Mapbox/Algolia credentials. Local Supabase (`npm run db:reset`, `db:test`) uses the `supabase` CLI, which needs Docker.
