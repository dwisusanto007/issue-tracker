-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create categories enum type
CREATE TYPE issue_category AS ENUM (
  'politics_government',
  'economy_business',
  'social_issues',
  'environment_climate',
  'education',
  'health',
  'infrastructure',
  'technology',
  'law_justice',
  'culture_religion'
);

-- Create severity enum type
CREATE TYPE severity_level AS ENUM (
  'low',
  'medium',
  'high',
  'critical'
);

-- Create issue status enum type
CREATE TYPE issue_status AS ENUM (
  'active',
  'monitoring',
  'resolved',
  'archived'
);

-- Create event type enum type
CREATE TYPE event_type AS ENUM (
  'created',
  'updated',
  'merged',
  'resolved',
  'archived'
);

-- Create issues table
CREATE TABLE IF NOT EXISTS issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  summary TEXT,
  category issue_category,
  severity severity_level DEFAULT 'medium',
  region VARCHAR(100)[],
  tags VARCHAR(50)[],
  source VARCHAR(100) NOT NULL,
  source_url TEXT NOT NULL,
  embedding vector(1536),  -- OpenAI text-embedding-3-small dimension
  first_reported_at TIMESTAMP NOT NULL,
  status issue_status DEFAULT 'active',
  current_version INTEGER DEFAULT 1,
  sentiment DECIMAL(3,2) DEFAULT 0.0,  -- -1.0 to 1.0
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create issue_events table (for version control)
CREATE TABLE IF NOT EXISTS issue_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  event_type event_type NOT NULL,
  changes JSONB,
  metadata JSONB,
  parent_version INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(issue_id, version)
);

-- Create scraped_articles table (raw scraping results)
CREATE TABLE IF NOT EXISTS scraped_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(200),
  published_at TIMESTAMP,
  source VARCHAR(100) NOT NULL,
  raw_html TEXT,
  is_processed BOOLEAN DEFAULT FALSE,
  issue_id UUID REFERENCES issues(id) ON DELETE SET NULL,
  scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create conversations table (for chatbot)
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(100),
  messages JSONB DEFAULT '[]'::jsonb,
  context JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_issues_category ON issues(category);
CREATE INDEX idx_issues_severity ON issues(severity);
CREATE INDEX idx_issues_status ON issues(status);
CREATE INDEX idx_issues_created_at ON issues(created_at DESC);
CREATE INDEX idx_issues_source ON issues(source);
CREATE INDEX idx_issues_first_reported_at ON issues(first_reported_at DESC);

-- Full-text search index for Indonesian content
CREATE INDEX idx_issues_title_fulltext ON issues USING GIN(to_tsvector('indonesian', title));
CREATE INDEX idx_issues_description_fulltext ON issues USING GIN(to_tsvector('indonesian', description));

-- Vector similarity search index (HNSW for fast approximate search)
CREATE INDEX idx_issues_embedding ON issues USING hnsw (embedding vector_cosine_ops);

-- Event indexes
CREATE INDEX idx_issue_events_issue_id ON issue_events(issue_id);
CREATE INDEX idx_issue_events_version ON issue_events(issue_id, version);
CREATE INDEX idx_issue_events_created_at ON issue_events(created_at DESC);

-- Scraped articles indexes
CREATE INDEX idx_scraped_articles_source ON scraped_articles(source);
CREATE INDEX idx_scraped_articles_is_processed ON scraped_articles(is_processed);
CREATE INDEX idx_scraped_articles_scraped_at ON scraped_articles(scraped_at DESC);
CREATE INDEX idx_scraped_articles_url ON scraped_articles(url);

-- Conversations indexes
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_conversations_created_at ON conversations(created_at DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_issues_updated_at BEFORE UPDATE ON issues
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample categories data for reference
COMMENT ON TYPE issue_category IS 'Categories for Indonesian national issues';
COMMENT ON TYPE severity_level IS 'Severity levels: low, medium, high, critical';
COMMENT ON TYPE issue_status IS 'Issue status: active, monitoring, resolved, archived';
COMMENT ON TYPE event_type IS 'Event types for version control: created, updated, merged, resolved, archived';
