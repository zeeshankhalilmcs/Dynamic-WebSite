CREATE TABLE IF NOT EXISTS blog_posts (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  author TEXT NOT NULL,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  featured_image TEXT NOT NULL,
  reading_time TEXT NOT NULL DEFAULT '4 min read',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'published'
);
