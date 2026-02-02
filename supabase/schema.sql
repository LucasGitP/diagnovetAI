-- Run this in Supabase Dashboard → SQL Editor to create tables for production.
-- Then set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your deployment (e.g. Vercel).

-- Users (passwords stored in plain text for this prototype; use hashing in production)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  full_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  phone TEXT,
  professional_title TEXT,
  license TEXT
);

-- Clinics (one per user)
CREATE TABLE IF NOT EXISTS clinics (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  legal_name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Reports
CREATE TABLE IF NOT EXISTS reports (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  animal_name TEXT NOT NULL,
  age TEXT NOT NULL,
  unit TEXT NOT NULL,
  species TEXT NOT NULL,
  breed TEXT NOT NULL DEFAULT '',
  gender TEXT NOT NULL,
  referring_professional TEXT NOT NULL DEFAULT '',
  professional_email TEXT NOT NULL DEFAULT '',
  guardian TEXT NOT NULL,
  guardian_email TEXT NOT NULL DEFAULT '',
  study_type TEXT NOT NULL,
  image_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reports_user_id ON reports(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at DESC);
