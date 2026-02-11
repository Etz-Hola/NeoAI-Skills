# AI Advantage Academy - Setup Guide

## Quick Start

### 1. Verify Supabase Connection
- Supabase integration is **already configured** in your Vercel project
- All environment variables are automatically set
- You can see them in your project's "Vars" section in v0

### 2. Create Database Tables
The database schema has been created. To apply it to your Supabase instance:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open the file `/scripts/001_create_tables.sql` from this project
4. Copy and paste the entire SQL into the Supabase SQL editor
5. Click **Run** to execute

This will create:
- `profiles` - User profile information
- `quiz_responses` - Assessment data
- `programs` - Program offerings
- `enrollments` - Payment records
- `cohorts` - Learning groups
- `modules` & `lessons` - Course content
- `referrals` & `bonuses` - Growth system

### 3. Test the User Flow
1. **Landing Page** (`/`) - View pricing and features
2. **Sign Up** (`/auth/sign-up`) - Create test account
3. **Quiz** (`/quiz`) - Complete 40-question assessment
4. **Profile** (`/profile`) - See personalized recommendation
5. **Checkout** (`/checkout`) - View payment options (not live yet)
6. **Dashboard** (`/dashboard`) - View curriculum (protected route)

### 4. Environment Variables
All required variables are automatically set in Vercel:
- `SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_URL` - Public Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Admin key for API routes
- `POSTGRES_URL*` - Database connection strings

No manual setup needed—they're already configured!

## User Authentication Flow

### Sign-Up
```
User fills form → Supabase creates auth.users entry → Email confirmation sent
→ Quiz page → Quiz submission → profiles table auto-created (via trigger)
→ Profile page displays recommendations
```

### Login
```
User enters credentials → Supabase validates → Session created
→ Can access protected pages (profile, dashboard, checkout, etc.)
```

### Protected Routes
Routes that require authentication:
- `/profile` - View personalized profile and recommendations
- `/dashboard` - Main learning platform
- `/checkout` - Payment page
- `/dashboard/lesson/[id]` - Individual lessons
- `/dashboard/cohort` - Community features
- `/referrals` - Referral dashboard

## Data Models

### User Profile
Automatically created after quiz completion with:
- Full name, email, location
- AI experience level
- Learning preferences
- Income goals
- Job role/business type

### Quiz Responses
40-question assessment covering:
- Personal information
- Availability & time commitment
- AI familiarity
- Professional goals
- Learning preferences

### Programs
Three tiers:
1. **Quick Start** - 1 week, $7-12 (for testing/busy users)
2. **Core Mastery** - 4 weeks, $25-39 (solid foundation)
3. **Deep Transformation** - 12 weeks, $69-99 (advanced mastery)

### Cohorts
Learning groups with:
- Weekly start dates
- Max 25 members per cohort
- Private discussion channels
- Weekly Q&A sessions
- Mentor assignments

## API Routes

### POST `/api/quiz`
Saves quiz responses and creates user profile
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": "26-35",
  "location": "USA",
  "hours_per_week": "10-15 hours",
  "job_role": "Freelancer",
  "ai_exposure": "Regular user",
  "income_goal": "Create additional income"
}
```

### POST `/api/enrollment`
Creates enrollment record after payment
```json
{
  "program_id": "uuid",
  "amount": 3999,
  "currency": "USD",
  "payment_method": "card"
}
```

### POST `/api/referral`
Tracks referral and applies discount
```json
{
  "referral_code": "user_email_slug"
}
```

## Customization Guide

### Change Program Pricing
Edit `/lib/config.ts` and update the `PROGRAMS` constant

### Customize Quiz Questions
Edit `/components/quiz-form.tsx` and modify `QUIZ_SECTIONS`

### Change Curriculum
Edit `/app/dashboard/page.tsx` and update the `modules` state

### Customize Cohort Schedule
Add cohort records to Supabase `cohorts` table with desired start dates

## Debugging

### Check User Authentication
In browser console:
```javascript
// Get current user
const { data: { user } } = await supabase.auth.getUser()
console.log(user)

// Check session
const { data: { session } } = await supabase.auth.getSession()
console.log(session)
```

### View User Profile Data
In Supabase SQL editor:
```sql
SELECT * FROM profiles WHERE id = 'your-user-id'
```

### Check Quiz Responses
```sql
SELECT * FROM quiz_responses WHERE user_id = 'your-user-id'
```

### Common Issues

**Issue**: "Unauthorized" error on quiz submission
- **Solution**: User must be logged in. Check if session exists via `supabase.auth.getUser()`

**Issue**: Profile not created after quiz
- **Solution**: Check if `handle_new_user` trigger is active in Supabase (SQL Editor → Triggers tab)

**Issue**: Protected pages redirect to sign-up
- **Solution**: This is working correctly! Users must be authenticated. Sign up first.

## Deployment to Vercel

1. Push changes to GitHub
2. Vercel auto-deploys from connected repo
3. Ensure all SUPABASE_* env vars are set in Vercel project settings
4. Test user flow in production

## Next Phase Features

- [ ] Stripe/Paystack payment integration
- [ ] Email notifications via Supabase Auth
- [ ] Student progress tracking dashboard
- [ ] Certificate generation
- [ ] Live Q&A session scheduling
- [ ] Content streaming and video uploads
- [ ] Advanced analytics for admins
- [ ] API documentation for partners

---

**Questions?** Check the `INTEGRATION_STATUS.md` file for detailed information about Supabase integration.
