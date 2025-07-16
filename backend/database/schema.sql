-- Brand BOS Database Schema for Supabase
-- Phase 1: CIA System Implementation

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- User Tables
-- =====================================================

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    company_name TEXT,
    role TEXT DEFAULT 'user',
    avatar_url TEXT,
    phone TEXT,
    timezone TEXT DEFAULT 'America/New_York',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- CIA System Tables
-- =====================================================

-- CIA Sessions: Track each CIA conversation
CREATE TABLE IF NOT EXISTS public.cia_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    lead_id TEXT, -- External lead ID from GHL or other CRM
    lead_name TEXT,
    lead_email TEXT,
    lead_phone TEXT,
    lead_company TEXT,
    current_phase INTEGER DEFAULT 1,
    status TEXT DEFAULT 'active', -- active, completed, abandoned
    ai_model TEXT DEFAULT 'gpt-4', -- gpt-4, claude, etc.
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    last_activity_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CIA Phase Responses: Store each Q&A exchange
CREATE TABLE IF NOT EXISTS public.cia_phase_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES public.cia_sessions(id) ON DELETE CASCADE,
    phase_number INTEGER NOT NULL,
    phase_name TEXT NOT NULL,
    question_prompt TEXT NOT NULL,
    user_response TEXT,
    ai_analysis JSONB DEFAULT '{}', -- Store AI analysis of the response
    response_timestamp TIMESTAMPTZ DEFAULT NOW(),
    response_time_seconds INTEGER, -- Time taken to respond
    sentiment_score DECIMAL(3,2), -- -1.00 to 1.00
    keywords TEXT[], -- Extracted keywords
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CIA Master Archives: Compiled session summaries
CREATE TABLE IF NOT EXISTS public.cia_master_archives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES public.cia_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    summary TEXT NOT NULL,
    key_insights JSONB DEFAULT '{}',
    pain_points TEXT[],
    goals TEXT[],
    recommended_solutions TEXT[],
    authority_score INTEGER DEFAULT 0, -- 0-100
    engagement_score INTEGER DEFAULT 0, -- 0-100
    conversion_likelihood TEXT, -- low, medium, high
    follow_up_strategy TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CIA Templates: Customizable CIA conversation templates
CREATE TABLE IF NOT EXISTS public.cia_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    industry TEXT,
    phases JSONB NOT NULL, -- Store phase structure and prompts
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- Indexes for Performance
-- =====================================================

CREATE INDEX idx_cia_sessions_user_id ON public.cia_sessions(user_id);
CREATE INDEX idx_cia_sessions_status ON public.cia_sessions(status);
CREATE INDEX idx_cia_sessions_lead_email ON public.cia_sessions(lead_email);
CREATE INDEX idx_cia_phase_responses_session_id ON public.cia_phase_responses(session_id);
CREATE INDEX idx_cia_phase_responses_phase ON public.cia_phase_responses(phase_number);
CREATE INDEX idx_cia_master_archives_user_id ON public.cia_master_archives(user_id);
CREATE INDEX idx_cia_master_archives_session_id ON public.cia_master_archives(session_id);

-- =====================================================
-- Row Level Security (RLS) Policies
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cia_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cia_phase_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cia_master_archives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cia_templates ENABLE ROW LEVEL SECURITY;

-- User Profiles: Users can only see and edit their own profile
CREATE POLICY "Users can view own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- CIA Sessions: Users can only see their own sessions
CREATE POLICY "Users can view own CIA sessions" ON public.cia_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own CIA sessions" ON public.cia_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own CIA sessions" ON public.cia_sessions
    FOR UPDATE USING (auth.uid() = user_id);

-- CIA Phase Responses: Users can only see responses from their sessions
CREATE POLICY "Users can view own phase responses" ON public.cia_phase_responses
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.cia_sessions
            WHERE cia_sessions.id = cia_phase_responses.session_id
            AND cia_sessions.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create phase responses for own sessions" ON public.cia_phase_responses
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.cia_sessions
            WHERE cia_sessions.id = cia_phase_responses.session_id
            AND cia_sessions.user_id = auth.uid()
        )
    );

-- CIA Master Archives: Users can only see their own archives
CREATE POLICY "Users can view own archives" ON public.cia_master_archives
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own archives" ON public.cia_master_archives
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- CIA Templates: Users can see their own templates and defaults
CREATE POLICY "Users can view templates" ON public.cia_templates
    FOR SELECT USING (auth.uid() = user_id OR is_default = true);

CREATE POLICY "Users can create own templates" ON public.cia_templates
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own templates" ON public.cia_templates
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own templates" ON public.cia_templates
    FOR DELETE USING (auth.uid() = user_id AND is_default = false);

-- =====================================================
-- Functions and Triggers
-- =====================================================

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update trigger to tables with updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cia_sessions_updated_at BEFORE UPDATE ON public.cia_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cia_master_archives_updated_at BEFORE UPDATE ON public.cia_master_archives
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cia_templates_updated_at BEFORE UPDATE ON public.cia_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update last_activity_at in CIA sessions
CREATE OR REPLACE FUNCTION update_session_activity()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.cia_sessions
    SET last_activity_at = NOW()
    WHERE id = NEW.session_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update session activity when new response is added
CREATE TRIGGER update_session_activity_on_response
AFTER INSERT ON public.cia_phase_responses
    FOR EACH ROW EXECUTE FUNCTION update_session_activity();