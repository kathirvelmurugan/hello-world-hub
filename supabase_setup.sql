-- 1. Create the monitor logs table
CREATE TABLE IF NOT EXISTS alchemy_monitor_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    status TEXT NOT NULL,
    response_time_ms INTEGER,
    error_type TEXT,
    error_message TEXT
);

-- 2. Enable Real-time for the table
ALTER PUBLICATION supabase_realtime ADD TABLE alchemy_monitor_logs;

-- 3. Add RLS Policies (Allow everyone to read for the dashboard)
ALTER TABLE alchemy_monitor_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access" ON alchemy_monitor_logs FOR SELECT USING (true);

-- 4. Set up the automated monitoring (Requires pg_cron extension)
-- Note: Replace project-id and service-role-key with your actual values
-- CREATE EXTENSION IF NOT EXISTS pg_cron;
-- SELECT cron.schedule(
--   'alchemy-health-check',
--   '*/1 * * * *', -- Every minute
--   $$
--   SELECT
--     net.http_post(
--       url:='https://<project-id>.supabase.co/functions/v1/check-alchemy-health',
--       headers:='{"Content-Type": "application/json", "Authorization": "Bearer <service-role-key>"}'::jsonb,
--       body:='{}'::jsonb
--     );
--   $$
-- );
