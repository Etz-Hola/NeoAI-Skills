# AI Advantage Academy

A comprehensive web-based platform for teaching practical AI skills with personalized learning paths, cohort-based accountability, and real-world income generation focus.

## Overview

AI Advantage Academy helps learners of all ages master AI tools and techniques before 2027 through:
- Free personalized quiz assessment
- Tiered programs (1-week quick start to 12-week deep transformation)
- Cohort-based learning with community support
- Real-world income projects and practical applications
- Referral system for viral growth

## Key Features

### Landing Page
- Compelling hero with clear value proposition
- Program comparison table with pricing
- Testimonials from successful learners
- CTA to take free assessment

### Onboarding Quiz (40 Questions)
- Categorized multi-step form with progress tracking
- Covers: Personal info, availability, AI familiarity, professional goals, learning preferences
- Generates personalized profile and program recommendations

### Program Tiers
- **Quick Start** (1 week, $7-12): Test the waters with AI basics
- **Core Mastery** (4 weeks, $25-39): Solid foundation + projects
- **Deep Transformation** (12 weeks, $69-99): Advanced mastery + income projects

### Payment System
- Multiple payment methods: Cards, Bank Transfer, Cryptocurrency (USDT/BTC)
- 7-14 day money-back guarantee
- Secure checkout flow

### Learning Dashboard
- Personalized curriculum with weekly modules
- Progress tracking with countdown timers to cohort start
- Video, text, and project-based lessons
- Real-time lesson viewer with note-taking

### Cohort Community
- Live group discussions and Q&A sessions
- Member directory with progress tracking
- Upcoming events calendar
- Discussion channels for different topics

### Referral System
- Unique referral links for each user
- 20% discount for referrer, 15% for referee
- Tiered bonuses (unlock free programs at 15+ referrals)
- Real-time referral stats dashboard

### Admin Dashboard
- Overview stats (users, revenue, enrollments, completion rate)
- Program management
- Cohort scheduling and member tracking
- Content module management
- User management capabilities

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Database**: Supabase (PostgreSQL with RLS)
- **Auth**: Supabase Auth (Email/Password)
- **Payments**: Paystack + Manual crypto verification
- **Hosting**: Vercel
- **UI Components**: shadcn/ui

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm package manager
- Supabase account

### Installation

```bash
# Clone and install dependencies
pnpm install

# Set up environment variables (see .env.example)
cp .env.example .env.local

# Run migrations
pnpm run db:migrate

# Start development server
pnpm dev
```

### Environment Variables

Required variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
```

## Database Schema

Key tables:
- `profiles` - User profiles with AI experience levels
- `quiz_responses` - Full quiz submission data
- `programs` - Program details (Quick Start, Core Mastery, Deep Transformation)
- `enrollments` - User program enrollments with payment info
- `cohorts` - Scheduled learning cohorts
- `cohort_members` - Cohort membership tracking
- `modules` - Course curriculum modules
- `lessons` - Individual lessons with video/text/project content
- `referrals` - Referral tracking for bonus system
- `bonuses` - User bonus/discount tracking

See `scripts/001_create_tables.sql` for full schema.

## Project Structure

```
app/
├── page.tsx                 # Landing page
├── quiz/page.tsx           # Quiz assessment
├── profile/page.tsx        # Profile & recommendations
├── checkout/page.tsx       # Payment flow
├── dashboard/
│   ├── page.tsx           # Learning dashboard
│   ├── lesson/[id]/page.tsx # Lesson viewer
│   └── cohort/page.tsx    # Community page
├── referrals/page.tsx      # Referral system
├── admin/page.tsx          # Admin dashboard
└── api/
    ├── quiz/route.ts      # Quiz submission
    ├── enrollment/route.ts # Enrollment processing
    └── referral/route.ts  # Referral tracking

components/
├── quiz-form.tsx          # Multi-step quiz component
└── ui/                    # shadcn/ui components

lib/
├── supabase/
│   ├── client.ts         # Client-side Supabase
│   ├── server.ts         # Server-side Supabase
│   └── proxy.ts          # Session management
```

## Key Pages & Routes

| Route | Purpose | Status |
|-------|---------|--------|
| `/` | Landing page | ✅ |
| `/quiz` | Onboarding assessment | ✅ |
| `/profile` | User profile & recommendations | ✅ |
| `/checkout` | Payment checkout | ✅ |
| `/dashboard` | Learning dashboard | ✅ |
| `/dashboard/lesson/[id]` | Individual lesson | ✅ |
| `/dashboard/cohort` | Cohort community | ✅ |
| `/referrals` | Referral management | ✅ |
| `/admin` | Admin dashboard | ✅ |
| `/auth/login` | Login | ✅ |
| `/auth/sign-up` | Sign up | ✅ |

## MVP Features Implemented

✅ Landing page with value proposition
✅ Free 40-question quiz with profiling
✅ Personalized program recommendations
✅ Three-tier program pricing
✅ Secure checkout with multiple payment methods
✅ User authentication (Supabase Auth)
✅ Learning dashboard with progress tracking
✅ Module-based curriculum with lessons
✅ Cohort scheduling and countdown timers
✅ Community forum with peer discussion
✅ Referral system with bonus tracking
✅ Admin dashboard for management
✅ Database with RLS for security

## Phase 2 Roadmap

- Automated crypto payment verification (WalletConnect)
- Advanced analytics and user engagement tracking
- Automated email sequences for onboarding
- Mobile app (React Native)
- Additional program tracks (by profession)
- Video hosting optimization
- Advanced forum features (moderation, awards)
- Certificate generation and sharing
- One-on-one mentor booking

## Security Considerations

- Row-Level Security (RLS) on all data tables
- Secure password hashing with bcrypt
- HTTP-only session cookies
- CSRF protection
- Input validation and sanitization
- Parameterized queries to prevent SQL injection

## Deployment

Push to your Vercel project or GitHub and deploy:

```bash
# Using Vercel CLI
vercel deploy
```

The platform will automatically:
- Connect to your Supabase instance
- Run database migrations
- Set up environment variables
- Deploy to production with HTTPS

## Support & Contact

For issues or questions, contact: hello@aiadvantage.com

## License

Proprietary - All rights reserved
