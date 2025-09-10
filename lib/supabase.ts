import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For server-side operations that need elevated permissions
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export interface Idea {
  id?: string
  timestamp: string
  domain: string
  subdomain: string
  missing_piece: string
  text: string
  tags: string
  created_at?: string
}

export interface IdeasTable {
  id: string
  timestamp: string
  domain: string
  subdomain: string
  missing_piece: string
  text: string
  tags: string
  created_at: string
}
