-- Migration: extend inquiries with review and bot detection fields
ALTER TABLE inquiries
  ADD COLUMN IF NOT EXISTS user_ip text,
  ADD COLUMN IF NOT EXISTS user_agent text,
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS region text,
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS is_bot boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS reviewed boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS reviewed_at timestamptz;

CREATE INDEX IF NOT EXISTS inquiries_user_ip_idx ON inquiries (user_ip);
CREATE INDEX IF NOT EXISTS inquiries_is_bot_idx ON inquiries (is_bot);
CREATE INDEX IF NOT EXISTS inquiries_reviewed_idx ON inquiries (reviewed);
