'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, Gift, Link as LinkIcon, TrendingUp, Users } from 'lucide-react'

interface ReferralStats {
  totalReferrals: number
  successfulReferrals: number
  pendingReferrals: number
  availableBonuses: any[]
}

export default function ReferralsPage() {
  const [stats, setStats] = useState<ReferralStats | null>(null)
  const [referralLink, setReferralLink] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Fetch referral stats
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/referral')
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('[v0] Error fetching referral stats:', error)
      }
    }

    // Generate referral link (using user ID from localStorage for now)
    const userEmail = localStorage.getItem('user_email') || 'user'
    const username = userEmail.split('@')[0]
    setReferralLink(`${window.location.origin}/?ref=${username}`)

    fetchStats()
  }, [])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Refer & Earn</h1>
          <p className="text-slate-300">Share your unique link and earn 20% off your next program for each successful referral</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Referral Link */}
        <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/50 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-purple-400" />
              Your Referral Link
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-300">Share this link with friends. When they sign up and complete a program, you both get bonuses!</p>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded text-slate-300 text-sm"
              />
              <Button onClick={handleCopyLink} className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-sm text-slate-300">
                💡 <strong>Pro tip:</strong> Share on LinkedIn, Twitter, or WhatsApp to reach more people. Include a personal message about how AI has helped you!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              label: 'Total Referrals',
              value: stats?.totalReferrals || 0,
              icon: Users,
              color: 'text-blue-400'
            },
            {
              label: 'Successful Referrals',
              value: stats?.successfulReferrals || 0,
              icon: TrendingUp,
              color: 'text-green-400'
            },
            {
              label: 'Available Bonuses',
              value: stats?.availableBonuses.length || 0,
              icon: Gift,
              color: 'text-purple-400'
            }
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <Card key={i} className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color} opacity-70`} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* How It Works */}
        <Card className="bg-slate-800/50 border-slate-700/50 mb-8">
          <CardHeader>
            <CardTitle className="text-white">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: 'Share Your Link',
                  description: 'Copy your referral link and share it with friends on any platform'
                },
                {
                  step: 2,
                  title: 'They Take the Quiz',
                  description: 'When they click your link and complete the free AI assessment'
                },
                {
                  step: 3,
                  title: 'They Enroll',
                  description: 'If they purchase any program through your link'
                },
                {
                  step: 4,
                  title: 'You Both Win',
                  description: 'You get 20% off your next program, they get 15% off their purchase'
                }
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500 flex items-center justify-center">
                    <span className="text-purple-400 font-semibold">{item.step}</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-white font-semibold">{item.title}</p>
                    <p className="text-slate-400 text-sm mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bonus Tiers */}
        <Card className="bg-slate-800/50 border-slate-700/50 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Bonus Tiers</CardTitle>
            <CardDescription className="text-slate-400">The more you refer, the bigger your bonuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { referrals: '1-3', bonus: '20% Off', color: 'from-blue-600/20 to-blue-600/10' },
                { referrals: '4-7', bonus: '30% Off', color: 'from-green-600/20 to-green-600/10' },
                { referrals: '8-15', bonus: '50% Off', color: 'from-purple-600/20 to-purple-600/10' },
                { referrals: '15+', bonus: 'Free Program', color: 'from-pink-600/20 to-pink-600/10' }
              ].map((tier, i) => (
                <div key={i} className={`bg-gradient-to-br ${tier.color} border border-slate-700/50 rounded-lg p-4 text-center`}>
                  <p className="text-slate-400 text-sm mb-2">Referrals</p>
                  <p className="text-white font-bold text-lg mb-3">{tier.referrals}</p>
                  <p className="text-green-400 font-semibold">{tier.bonus}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">FAQ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              {
                q: 'How long does it take to get my bonus?',
                a: 'Once your referred friend completes their program, your 20% bonus will be applied to your next program purchase immediately.'
              },
              {
                q: "Can I use my referral link on social media?",
                a: 'Absolutely! We encourage sharing on LinkedIn, Twitter, TikTok, WhatsApp, and any other platform. The more you share, the more people you help.'
              },
              {
                q: 'Is there a limit to how many people I can refer?',
                a: 'No limit! Keep referring and unlock bigger bonuses. Plus, you help more people master AI.'
              },
              {
                q: "What if my friend doesn't complete the program?",
                a: 'The referral remains pending. Once they complete their program or any program within 12 months, the bonus activates.'
              }
            ].map((item, i) => (
              <div key={i}>
                <p className="text-white font-semibold mb-2">{item.q}</p>
                <p className="text-slate-400 text-sm">{item.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
