-- Ticker Tape Real-Time Data System Schema
-- This extends the existing Brand BOS database

-- =====================================================
-- Ticker Tables
-- =====================================================

-- Ticker items table for all feed content
CREATE TABLE IF NOT EXISTS public.ticker_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL CHECK (category IN ('general', 'insights', 'performance')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('success', 'info', 'warning', 'update')),
    priority INTEGER DEFAULT 3 CHECK (priority >= 1 AND priority <= 5), -- 1=highest, 5=lowest
    source_data JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ticker sources configuration for automated fetching
CREATE TABLE IF NOT EXISTS public.ticker_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL,
    source_name TEXT NOT NULL UNIQUE,
    source_type TEXT NOT NULL CHECK (source_type IN ('api', 'rss', 'webhook', 'internal')),
    endpoint_url TEXT,
    api_key_name TEXT, -- Reference to env variable name
    refresh_interval_minutes INTEGER DEFAULT 30,
    is_enabled BOOLEAN DEFAULT true,
    last_fetch_at TIMESTAMPTZ,
    last_success_at TIMESTAMPTZ,
    fetch_count INTEGER DEFAULT 0,
    error_count INTEGER DEFAULT 0,
    last_error TEXT,
    config JSONB DEFAULT '{}', -- Source-specific configuration
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User-specific ticker preferences
CREATE TABLE IF NOT EXISTS public.ticker_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    enabled_categories TEXT[] DEFAULT ARRAY['general', 'insights', 'performance'],
    priority_threshold INTEGER DEFAULT 5, -- Show items with priority <= this value
    custom_filters JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Ticker engagement tracking for improving relevance
CREATE TABLE IF NOT EXISTS public.ticker_engagement (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    ticker_item_id UUID REFERENCES public.ticker_items(id) ON DELETE CASCADE,
    action TEXT NOT NULL CHECK (action IN ('view', 'click', 'dismiss', 'share')),
    action_timestamp TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'
);

-- =====================================================
-- Indexes for Performance
-- =====================================================

CREATE INDEX idx_ticker_items_category ON public.ticker_items(category);
CREATE INDEX idx_ticker_items_priority ON public.ticker_items(priority);
CREATE INDEX idx_ticker_items_active ON public.ticker_items(is_active);
CREATE INDEX idx_ticker_items_created_at ON public.ticker_items(created_at DESC);
CREATE INDEX idx_ticker_items_expires_at ON public.ticker_items(expires_at);

CREATE INDEX idx_ticker_sources_category ON public.ticker_sources(category);
CREATE INDEX idx_ticker_sources_enabled ON public.ticker_sources(is_enabled);
CREATE INDEX idx_ticker_sources_last_fetch ON public.ticker_sources(last_fetch_at);

CREATE INDEX idx_ticker_engagement_user_id ON public.ticker_engagement(user_id);
CREATE INDEX idx_ticker_engagement_item_id ON public.ticker_engagement(ticker_item_id);
CREATE INDEX idx_ticker_engagement_timestamp ON public.ticker_engagement(action_timestamp DESC);

-- =====================================================
-- Row Level Security (RLS) Policies
-- =====================================================

-- Enable RLS on all ticker tables
ALTER TABLE public.ticker_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticker_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticker_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticker_engagement ENABLE ROW LEVEL SECURITY;

-- Ticker Items: All authenticated users can view active items
CREATE POLICY "Users can view active ticker items" ON public.ticker_items
    FOR SELECT USING (is_active = true AND (expires_at IS NULL OR expires_at > NOW()));

-- Ticker Sources: Only admins can manage (implement admin check)
CREATE POLICY "Admins can manage ticker sources" ON public.ticker_sources
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Ticker Preferences: Users can manage their own preferences
CREATE POLICY "Users can view own ticker preferences" ON public.ticker_preferences
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own ticker preferences" ON public.ticker_preferences
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ticker preferences" ON public.ticker_preferences
    FOR UPDATE USING (auth.uid() = user_id);

-- Ticker Engagement: Users can track their own engagement
CREATE POLICY "Users can create own engagement records" ON public.ticker_engagement
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own engagement records" ON public.ticker_engagement
    FOR SELECT USING (auth.uid() = user_id);

-- =====================================================
-- Functions and Triggers
-- =====================================================

-- Function to clean up expired ticker items
CREATE OR REPLACE FUNCTION cleanup_expired_ticker_items()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM public.ticker_items
    WHERE (expires_at IS NOT NULL AND expires_at < NOW())
       OR (created_at < NOW() - INTERVAL '24 hours' AND priority > 3);
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate ticker item relevance score
CREATE OR REPLACE FUNCTION calculate_ticker_relevance(
    item_priority INTEGER,
    item_created_at TIMESTAMPTZ,
    user_engagement_count INTEGER DEFAULT 0
) RETURNS FLOAT AS $$
DECLARE
    age_hours FLOAT;
    relevance_score FLOAT;
BEGIN
    -- Calculate age in hours
    age_hours := EXTRACT(EPOCH FROM (NOW() - item_created_at)) / 3600;
    
    -- Base score from priority (1-5, inverted so 1 is highest)
    relevance_score := (6 - item_priority) * 20;
    
    -- Time decay factor (newer items score higher)
    relevance_score := relevance_score * (1 / (1 + age_hours / 24));
    
    -- Engagement boost
    relevance_score := relevance_score + (user_engagement_count * 5);
    
    RETURN relevance_score;
END;
$$ LANGUAGE plpgsql;

-- Apply update triggers to ticker tables
CREATE TRIGGER update_ticker_items_updated_at BEFORE UPDATE ON public.ticker_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ticker_sources_updated_at BEFORE UPDATE ON public.ticker_sources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ticker_preferences_updated_at BEFORE UPDATE ON public.ticker_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- Initial Data Seeding
-- =====================================================

-- Insert default ticker sources
INSERT INTO public.ticker_sources (category, source_name, source_type, endpoint_url, refresh_interval_minutes, is_enabled, config)
VALUES 
    ('general', 'hacker_news', 'api', 'https://hacker-news.firebaseio.com/v0', 15, true, 
     '{"item_limit": 10, "min_score": 100, "keywords": ["AI", "marketing", "business", "startup", "SEO", "growth"]}'),
    
    ('general', 'tech_news', 'api', 'https://newsapi.org/v2/top-headlines', 30, true,
     '{"category": "technology", "country": "us", "page_size": 20}'),
    
    ('insights', 'ai_insights_engine', 'internal', NULL, 5, true,
     '{"model": "gpt-4", "max_tokens": 150, "temperature": 0.7}'),
    
    ('performance', 'google_ads_monitor', 'internal', NULL, 5, true,
     '{"check_campaigns": true, "alert_threshold": 0.2}'),
    
    ('performance', 'content_performance', 'internal', NULL, 10, true,
     '{"track_views": true, "track_engagement": true}')
ON CONFLICT (source_name) DO NOTHING;