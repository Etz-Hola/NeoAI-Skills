'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Award, Clock, Target, Users } from 'lucide-react'

interface QuizData {
  name?: string
  email?: string
  job_role?: string
  hours_per_week?: string
  ai_exposure?: string
  learning_style?: string
}

interface Recommendation {
  program: string
  duration: string
  price: string
  reason: string
  benefits: string[]
}

import { ProtectedRoute } from '@/components/protected-route'

function ProfileContent() {
  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProfileData = async () => {
      const supabase = createClient()
      
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          setIsLoading(false)
          return
        }

        // Fetch user profile from Supabase
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) throw error

        const data: QuizData = {
          name: profile.full_name,
          email: user.email,
          job_role: profile.job_role,
          hours_per_week: profile.hours_per_week,
          ai_exposure: profile.ai_experience_level,
          learning_style: profile.learning_style
        }
        
        setQuizData(data)
        generateRecommendation(data)
      } catch (error) {
        console.error('[v0] Error fetching profile:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfileData()
  }, [])

  const generateRecommendation = (data: QuizData) => {
    const hours = data.hours_per_week || ''
    const exposure = data.ai_exposure || ''
    const role = data.job_role || ''

    // Logic to recommend program tiers
    let recommendation: Recommendation

    if (hours.includes('5 hours') || exposure.includes('Never')) {
      // Quick Start for busy or inexperienced users
      recommendation = {
        program: 'Quick Start',
        duration: '1 Week',
        price: '$7–$12',
        reason: `Based on your ${hours.toLowerCase()} availability and ${exposure.toLowerCase()} with AI, we recommend starting with our Quick Start program to build confidence and momentum.`,
        benefits: [
          'Perfect for testing the waters',
          'Fits your busy schedule',
          'Quick wins to build momentum',
          'Decide on longer commitment afterward'
        ]
      }
    } else if (hours.includes('10-15') || exposure.includes('Heard about it')) {
      // Core Mastery for moderate commitment
      recommendation = {
        program: 'Core Mastery',
        duration: '4 Weeks',
        price: '$25–$39',
        reason: `With ${hours.toLowerCase()} and ${exposure.toLowerCase()} AI tools, you're ready for our Core Mastery track. This gives you solid practical skills you can apply immediately as a ${role.toLowerCase()}.`,
        benefits: [
          'Solid foundation for your role',
          'Hands-on projects you\'ll use',
          'Community cohort for accountability',
          'Real-world results in 4 weeks'
        ]
      }
    } else {
      // Deep Transformation for highly committed learners
      recommendation = {
        program: 'Deep Transformation',
        duration: '12 Weeks',
        price: '$69–$99',
        reason: `You've got the time, motivation, and drive for deep transformation. Our 12-week program will take you from fundamentals to advanced mastery with significant income/career impact.`,
        benefits: [
          '3x deeper than other programs',
          'Advanced income-generation strategies',
          'Weekly mentorship & Q&A',
          'Alumni network & ongoing support'
        ]
      }
    }

    setRecommendation(recommendation)
  }

  if (isLoading || !quizData || !recommendation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="animate-pulse text-center space-y-4">
          <div className="text-6xl">🔄</div>
          <p className="text-white">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border-b border-slate-700/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome, {quizData.name || 'Learner'}! 🎯</h1>
          <p className="text-slate-300">Your AI Mastery Profile & Personalized Recommendation</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Your Profile Summary */}
        <Card className="bg-slate-800/50 border-slate-700/50 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-400" />
              Your AI Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Name', value: quizData.name },
                { label: 'Role', value: quizData.job_role },
                { label: 'Availability', value: quizData.hours_per_week },
                { label: 'AI Experience', value: quizData.ai_exposure },
                { label: 'Learning Style', value: quizData.learning_style },
                { label: 'Email', value: quizData.email }
              ]
                .filter((item) => item.value)
                .map((item, i) => (
                  <div key={i}>
                    <p className="text-sm text-slate-400 mb-1">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendation */}
        <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/50 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              Your Recommended Program
            </CardTitle>
            <CardDescription className="text-slate-300">{recommendation.reason}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">{recommendation.program}</h3>
              <div className="flex items-baseline gap-4">
                <span className="text-2xl font-bold text-blue-400">{recommendation.duration}</span>
                <span className="text-3xl font-bold text-white">{recommendation.price}</span>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                What You'll Get
              </h4>
              <ul className="space-y-2">
                {recommendation.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <span className="text-blue-400 font-bold mt-0.5">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                Timeline
              </h4>
              <p className="text-slate-300 text-sm">
                Start your cohort within days of enrollment. Cohorts begin every Monday for maximum support and
                accountability.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA and Alternatives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Ready to Enroll?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300">
                Proceed to payment and join the next cohort. Flexible options: Cards, Transfers, or Crypto.
              </p>
              <Link href={`/checkout?program=${recommendation.program.toLowerCase().replace(' ', '-')}`}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2">
                  Enroll Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Explore Other Programs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300">Want to see all three options before deciding?</p>
              <Link href="/#programs">
                <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700 bg-transparent">
                  View All Programs
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Referral CTA */}
        <Card className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-purple-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Share & Earn</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-4">Know someone who needs this? Refer a friend and get 20% off your next program!</p>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={`${window.location.origin}/?ref=${quizData.email?.split('@')[0]}`}
                className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-300 text-sm"
              />
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/?ref=${quizData.email?.split('@')[0]}`)
                  alert('Referral link copied!')
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  )
}
