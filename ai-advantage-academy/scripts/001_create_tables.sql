-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  age INTEGER,
  location TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Create quiz_responses table
CREATE TABLE IF NOT EXISTS public.quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  availability_hours_per_week INTEGER,
  ai_familiarity TEXT,
  profession TEXT,
  goals TEXT,
  learning_preferences TEXT,
  profile_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "quiz_responses_select_own" ON public.quiz_responses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "quiz_responses_insert_own" ON public.quiz_responses FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create programs table
CREATE TABLE IF NOT EXISTS public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  duration_weeks INTEGER NOT NULL,
  price_usd DECIMAL(10, 2),
  description TEXT,
  best_for TEXT,
  outcomes TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "programs_select_all" ON public.programs FOR SELECT USING (TRUE);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  program_id UUID NOT NULL REFERENCES public.programs(id),
  enrollment_date TIMESTAMP DEFAULT NOW(),
  program_start_date TIMESTAMP,
  program_end_date TIMESTAMP,
  completion_percentage INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active', -- active, completed, paused
  payment_status TEXT DEFAULT 'pending', -- pending, completed, failed
  payment_method TEXT, -- 'card', 'crypto', 'bank_transfer'
  transaction_id TEXT,
  cohort_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "enrollments_select_own" ON public.enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "enrollments_insert_own" ON public.enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "enrollments_update_own" ON public.enrollments FOR UPDATE USING (auth.uid() = user_id);

-- Create cohorts table
CREATE TABLE IF NOT EXISTS public.cohorts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES public.programs(id),
  cohort_number INTEGER,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  max_members INTEGER DEFAULT 100,
  status TEXT DEFAULT 'upcoming', -- upcoming, active, completed
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.cohorts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cohorts_select_all" ON public.cohorts FOR SELECT USING (TRUE);

-- Create referrals table
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  referral_code TEXT UNIQUE,
  discount_percentage INTEGER DEFAULT 20,
  status TEXT DEFAULT 'pending', -- pending, completed
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "referrals_select_own" ON public.referrals FOR SELECT USING (auth.uid() = referrer_id);
CREATE POLICY "referrals_insert_own" ON public.referrals FOR INSERT WITH CHECK (auth.uid() = referrer_id);

-- Create content_modules table
CREATE TABLE IF NOT EXISTS public.content_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES public.programs(id),
  week_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  video_url TEXT,
  estimated_duration_minutes INTEGER,
  order_index INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.content_modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "content_modules_select_all" ON public.content_modules FOR SELECT USING (TRUE);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  enrollment_id UUID NOT NULL REFERENCES public.enrollments(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES public.content_modules(id),
  completed BOOLEAN DEFAULT FALSE,
  progress_percentage INTEGER DEFAULT 0,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_progress_select_own" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_progress_insert_own" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_progress_update_own" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);
