# 1. Keep the database schema in the repo

- Status: accepted
- Date: 2026-11-25

## Context

The database schema lives only in Supabase, so the repo cannot recreate the database. The standard Supabase workflow (CLI + migrations) needs Docker, which is not set up yet.

## Decision

Dump the `public` schema with `pg_dump` into `supabase/schema.sql`. Writing it by hand from `types.d.ts` was ruled out: it would be guesswork.

## Steps

Whoever has the database password runs these; it is never shared with tools or agents.

1. `brew install libpq`
2. Copy the **Session pooler** connection string (Supabase dashboard → Connect) and remove `:[YOUR-PASSWORD]`. `pg_dump` will prompt for it.
3. From the repo root:

   ```bash
   /opt/homebrew/opt/libpq/bin/pg_dump "<connection string>" --schema-only --schema=public --file=supabase/schema.sql
   ```

4. Review `supabase/schema.sql` before committing it.

## Next step

Adopt Supabase CLI with Docker: `supabase db pull` creates the first migration, and `supabase/schema.sql` is deleted.
