-- Migration: create inquiries table
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  first_name text,
  last_name text,
  company text,
  phone text,
  email text NOT NULL,
  industry text,
  inquiry_type text NOT NULL,
  message text,
  ip text,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  is_validated boolean DEFAULT false,
  validated_at timestamptz,
  reviewed boolean DEFAULT false,
  reviewed_at timestamptz,
  country text,
  region text,
  city text,
  user_ip text,
  is_bot boolean DEFAULT false
);

CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries (created_at DESC);
