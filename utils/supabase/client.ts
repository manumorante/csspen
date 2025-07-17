import { createBrowserClient } from "@supabase/ssr"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || null
const anon_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || null

if (!url || !anon_key) {
  throw new Error("You must add the API keys for the Database.")
}

export const createClient = () => createBrowserClient(url, anon_key)
