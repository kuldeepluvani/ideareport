-- Create the ideas table in Supabase
CREATE TABLE IF NOT EXISTS ideas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  timestamp TEXT NOT NULL,
  domain TEXT NOT NULL,
  subdomain TEXT NOT NULL,
  missing_piece TEXT NOT NULL,
  text TEXT NOT NULL,
  tags TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_ideas_created_at ON ideas(created_at DESC);

-- Create an index on domain for filtering
CREATE INDEX IF NOT EXISTS idx_ideas_domain ON ideas(domain);

-- Grant access to anonymous role
GRANT ALL ON ideas TO anon;
GRANT ALL ON ideas TO authenticated;

-- Enable Row Level Security (RLS)
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read ideas
CREATE POLICY "Allow public read access" ON ideas
  FOR SELECT USING (true);

-- Create a policy that allows anyone to insert ideas (for the app to work)
CREATE POLICY "Allow public insert access" ON ideas
  FOR INSERT WITH CHECK (true);

-- Optional: Create a policy that allows updates (if needed later)
-- CREATE POLICY "Allow public update access" ON ideas
--   FOR UPDATE USING (true);

-- Optional: Create a policy that allows deletes (if needed later)
-- CREATE POLICY "Allow public delete access" ON ideas
--   FOR DELETE USING (true);
