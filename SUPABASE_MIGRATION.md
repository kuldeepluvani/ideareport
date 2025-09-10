# Supabase Migration Instructions

## Environment Variables Setup

### Local Development (.env.local)
The following environment variables have been created in `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://tvvstxpxheferzuwkjuu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2dnN0eHB4aGVmZXJ6dXdranV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NzkzOTcsImV4cCI6MjA3MzA1NTM5N30.sZ0jERtxNrxosJpeKYJtPNLVI5GP2_C1NpkljWfLAqw
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2dnN0eHB4aGVmZXJ6dXdranV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NzkzOTcsImV4cCI6MjA3MzA1NTM5N30.sZ0jERtxNrxosJpeKYJtPNLVI5GP2_C1NpkljWfLAqw

# Gemini API Key (if not already set)
GEMINI_API_KEY=your_gemini_api_key_here
```

### Vercel Deployment Environment Variables

You need to add these environment variables to your Vercel project:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add the following variables:

#### Required Environment Variables for Vercel:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://tvvstxpxheferzuwkjuu.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2dnN0eHB4aGVmZXJ6dXdranV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NzkzOTcsImV4cCI6MjA3MzA1NTM5N30.sZ0jERtxNrxosJpeKYJtPNLVI5GP2_C1NpkljWfLAqw` | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2dnN0eHB4aGVmZXJ6dXdranV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NzkzOTcsImV4cCI6MjA3MzA1NTM5N30.sZ0jERtxNrxosJpeKYJtPNLVI5GP2_C1NpkljWfLAqw` | Production, Preview, Development |

#### Optional Environment Variables (if you have them):

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `GEMINI_API_KEY` | Your Gemini API key | Production, Preview, Development |
| `GEMINI_API_KEY_1` | Your first Gemini API key | Production, Preview, Development |
| `GEMINI_API_KEY_2` | Your second Gemini API key | Production, Preview, Development |

## Database Setup

### 1. Create the Supabase Table

Run the SQL script in your Supabase SQL editor:

```sql
-- Copy and paste the contents of supabase-setup.sql
```

Or execute it via the Supabase dashboard:
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-setup.sql`
4. Run the script

### 2. Migrate Existing CSV Data (Optional)

If you want to migrate your existing CSV data to Supabase:

1. Make sure your environment variables are set up
2. Run the migration script:

```bash
npx tsx scripts/migrate-csv-to-supabase.ts
```

## What Changed

### Code Changes:
- ✅ Replaced CSV file operations with Supabase database operations
- ✅ Updated `lib/gemini.ts` to use Supabase instead of CSV
- ✅ Updated API routes (`/api/ideas` and `/api/generate-idea`) to work with Supabase
- ✅ Created Supabase client configuration in `lib/supabase.ts`
- ✅ Added proper TypeScript interfaces for database operations

### Files Modified:
- `lib/gemini.ts` - Replaced CSV functions with Supabase functions
- `lib/supabase.ts` - New Supabase client configuration
- `app/api/ideas/route.ts` - Updated to work with Supabase data structure
- `app/api/generate-idea/route.ts` - Updated to work with Supabase data structure
- `.env.local` - Added Supabase environment variables

### Files Created:
- `supabase-setup.sql` - SQL script to create the database table
- `scripts/migrate-csv-to-supabase.ts` - Migration script for existing data

## Testing

After setting up the environment variables and database:

1. Start your development server: `npm run dev`
2. Test idea generation to ensure it saves to Supabase
3. Test the ideas list to ensure it loads from Supabase
4. Deploy to Vercel and verify everything works in production

## Security Notes

- The `NEXT_PUBLIC_SUPABASE_ANON_KEY` is safe to expose publicly (it's designed for client-side use)
- The `SUPABASE_SERVICE_ROLE_KEY` should only be used server-side and is already configured correctly
- Row Level Security (RLS) is enabled on the ideas table with appropriate policies
