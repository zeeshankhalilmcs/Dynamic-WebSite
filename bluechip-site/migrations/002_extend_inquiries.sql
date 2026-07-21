-- Migration: extend inquiries for geo and review tracking
ALTER TABLE inquiries
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS last_name text,
  ADD COLUMN IF NOT EXISTS user_ip text,
  ADD COLUMN IF NOT EXISTS user_agent text,
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS region text,
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS is_bot boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS reviewed boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS reviewed_at timestamptz,
  ADD COLUMN IF NOT EXISTS is_validated boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS validated_at timestamptz;

CREATE INDEX IF NOT EXISTS inquiries_user_ip_idx ON inquiries (user_ip);
CREATE INDEX IF NOT EXISTS inquiries_is_bot_idx ON inquiries (is_bot);
CREATE INDEX IF NOT EXISTS inquiries_reviewed_idx ON inquiries (reviewed);
