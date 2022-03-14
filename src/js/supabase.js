import { createClient } from '@supabase/supabase-js'

const REACT_APP_SUPABASE_URL = 'https://qxgdolgewtvoyrwdbwdo.supabase.co'
const REACT_APP_SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4Z2RvbGdld3R2b3lyd2Rid2RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU3OTIyMTgsImV4cCI6MTk2MTM2ODIxOH0.HFgR00_0kY41zY6zwu7HZaz9JBEgqcj6dXSKKDn7Q0Q'

export const supabase = createClient(
  REACT_APP_SUPABASE_URL,
  REACT_APP_SUPABASE_KEY
)
