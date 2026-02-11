// Program Configuration
export const PROGRAMS = {
  'quick-start': {
    id: 'quick-start',
    name: 'Quick Start',
    duration: '1 Week',
    durationDays: 7,
    price: 10,
    priceRange: '$7–$12',
    description: 'Test the waters with AI basics',
    tagline: 'Quick wins & confidence boost',
    bestFor: 'Busy professionals and curious beginners',
    features: [
      'Quick wins & confidence boost',
      'Video tutorials & guides',
      'Beginner AI tools',
      'Certificate',
      'Lifetime access'
    ],
    modules: ['AI Fundamentals & Tool Mastery'],
    category: 'beginner'
  },
  'core-mastery': {
    id: 'core-mastery',
    name: 'Core Mastery',
    duration: '4 Weeks',
    durationDays: 28,
    price: 32,
    priceRange: '$25–$39',
    description: 'Solid foundation + first projects',
    tagline: 'Practical skills for daily use',
    bestFor: 'Professionals ready to level up',
    features: [
      'Practical daily-use skills',
      'Hands-on projects',
      'Community access',
      'Private cohort group',
      'Certificate',
      'Lifetime access'
    ],
    modules: [
      'AI Fundamentals & Tool Mastery',
      'Prompting Like a Pro',
      'Automation & Workflows',
      'Your Income Project'
    ],
    category: 'intermediate',
    popular: true
  },
  'deep-transformation': {
    id: 'deep-transformation',
    name: 'Deep Transformation',
    duration: '12 Weeks',
    durationDays: 84,
    price: 84,
    priceRange: '$69–$99',
    description: '3x the depth, projects & mastery',
    tagline: 'Advanced AI techniques & income growth',
    bestFor: 'Serious learners ready for deep mastery',
    features: [
      'Advanced AI techniques',
      'Real-world income projects',
      'Weekly live Q&A',
      'Private cohort community',
      'Mentorship access',
      'Premium certificate',
      'Lifetime access',
      'Alumni network'
    ],
    modules: [
      'AI Fundamentals & Tool Mastery',
      'Prompting Like a Pro',
      'Automation & Workflows',
      'Content Creation with AI',
      'Business Automation',
      'Advanced Income Projects'
    ],
    category: 'advanced'
  }
} as const

// Referral Tiers
export const REFERRAL_TIERS = [
  { referrals: 1, bonus: '20% Off Next Program' },
  { referrals: 4, bonus: '30% Off Next Program' },
  { referrals: 8, bonus: '50% Off Next Program' },
  { referrals: 15, bonus: 'Free Program' },
  { referrals: 25, bonus: 'Free Program + $500 Credit' }
]

// Quiz Categories
export const QUIZ_CATEGORIES = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Help us get to know you'
  },
  {
    id: 'availability',
    title: 'Availability & Commitment',
    description: 'How much time can you dedicate to learning?'
  },
  {
    id: 'ai-experience',
    title: 'AI Familiarity & Skills',
    description: 'Your current experience with AI tools'
  },
  {
    id: 'goals',
    title: 'Professional Goals & AI Applications',
    description: 'How AI can help your career'
  },
  {
    id: 'learning',
    title: 'Learning Preferences & Outcomes',
    description: 'How you learn best and what success looks like'
  }
]

// Payment Methods
export const PAYMENT_METHODS = {
  card: {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, American Express',
    icon: 'CreditCard'
  },
  transfer: {
    id: 'transfer',
    name: 'Bank Transfer',
    description: 'Direct bank transfer (same day)',
    icon: 'DollarSign'
  },
  crypto: {
    id: 'crypto',
    name: 'Cryptocurrency',
    description: 'USDT, BTC, ETH, USDC',
    icon: 'Wallet'
  }
}

// Testimonials
export const TESTIMONIALS = [
  {
    name: 'Amara',
    role: 'Content Creator, Nigeria',
    text: 'Went from 0 to 6 figures in 3 months using AI tools. Game-changer for my YouTube channel.'
  },
  {
    name: 'James',
    role: 'Freelancer, UK',
    text: 'Automated 70% of my workflow. Now I take fewer jobs but make more money.'
  },
  {
    name: 'Fatima',
    role: 'Business Owner, UAE',
    text: 'AI transformed my e-commerce business. This course showed me exactly how.'
  },
  {
    name: 'Mohammed',
    role: 'Marketing Manager, Egypt',
    text: 'Used AI to scale my marketing efforts. Been able to handle 3x more campaigns with the same team.'
  },
  {
    name: 'Sarah',
    role: 'Consultant, USA',
    text: "The practical projects helped me show clients what's possible with AI. Landed 2 new contracts."
  },
  {
    name: 'Chen',
    role: 'Student, Singapore',
    text: 'Learned more in 4 weeks than I could have in a year of YouTube tutorials. Worth every penny.'
  }
]

// Cohort Schedule (Example)
export const NEXT_COHORT_START = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now

// Site Config
export const SITE_CONFIG = {
  name: 'AI Advantage Academy',
  description: 'Master AI before 2027. Learn practical skills to turn trends into income.',
  tagline: 'Your AI Edge Starts Here',
  email: 'hello@aiadvantage.com',
  socialLinks: {
    twitter: 'https://twitter.com/aiadvantage',
    linkedin: 'https://linkedin.com/company/aiadvantage',
    instagram: 'https://instagram.com/aiadvantage'
  }
}

// Feature Flags (for Phase 2)
export const FEATURES = {
  AUTOMATED_CRYPTO: false, // Coming in Phase 2
  ADVANCED_ANALYTICS: false,
  EMAIL_SEQUENCES: false,
  MOBILE_APP: false,
  MENTOR_BOOKING: false
}
