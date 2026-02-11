'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard, DollarSign, Wallet, Lock, CheckCircle } from 'lucide-react'
import { useState } from 'react'

const PROGRAMS = {
  'quick-start': {
    name: 'Quick Start',
    duration: '1 Week',
    price: 10,
    description: 'Test the waters with AI basics'
  },
  'core-mastery': {
    name: 'Core Mastery',
    duration: '4 Weeks',
    price: 32,
    description: 'Solid foundation + first projects'
  },
  'deep-transformation': {
    name: 'Deep Transformation',
    duration: '12 Weeks',
    price: 84,
    description: '3x the depth, projects & mastery'
  }
}

type ProgramKey = keyof typeof PROGRAMS

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const programId = (searchParams.get('program') || 'core-mastery') as ProgramKey
  const program = PROGRAMS[programId] || PROGRAMS['core-mastery']

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'crypto'>('card')
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)

  const handlePayment = async (method: string) => {
    setLoading(true)
    // Simulate payment processing
    setTimeout(() => {
      setCompleted(true)
      setLoading(false)
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 2000)
    }, 2000)
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-7xl text-green-400">✓</div>
          <h1 className="text-3xl font-bold text-white">Payment Successful!</h1>
          <p className="text-slate-300">Welcome to the {program.name} program. You{`'`}ll be assigned to the next cohort...</p>
          <div className="animate-pulse flex justify-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border-b border-slate-700/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Complete Your Enrollment</h1>
          <p className="text-slate-300">Secure payment • 7-14 day money-back guarantee</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <Card className="bg-slate-800/50 border-slate-700/50 mb-8">
              <CardHeader>
                <CardTitle className="text-white">Program Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-start pb-4 border-b border-slate-700/50">
                  <div>
                    <p className="text-white font-semibold text-lg">{program.name}</p>
                    <p className="text-slate-400 text-sm">{program.duration} • {program.description}</p>
                  </div>
                  <p className="text-2xl font-bold text-blue-400">${program.price}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-semibold">What{`'`}s Included:</h4>
                  <ul className="space-y-2">
                    {['Full video & text curriculum', 'Weekly cohort sessions', 'Community forum access', 'Certificate of completion', 'Lifetime access to content'].map(
                      (item, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    id: 'card',
                    name: 'Credit/Debit Card',
                    icon: CreditCard,
                    description: 'Visa, Mastercard, American Express'
                  },
                  {
                    id: 'transfer',
                    name: 'Bank Transfer',
                    icon: DollarSign,
                    description: 'Direct bank transfer (same day)'
                  },
                  {
                    id: 'crypto',
                    name: 'Cryptocurrency',
                    icon: Wallet,
                    description: 'USDT, BTC, ETH, USDC'
                  }
                ].map((method) => {
                  const Icon = method.icon
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as 'card' | 'transfer' | 'crypto')}
                      className={`w-full p-4 rounded-lg border-2 transition text-left ${
                        paymentMethod === method.id ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700/50 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-semibold">{method.name}</p>
                          <p className="text-slate-400 text-sm">{method.description}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            {/* Payment Details */}
            {paymentMethod === 'card' && (
              <Card className="bg-slate-800/50 border-slate-700/50 mt-6">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Card Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Expiry</label>
                      <input type="text" placeholder="MM/YY" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">CVV</label>
                      <input type="text" placeholder="123" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {paymentMethod === 'crypto' && (
              <Card className="bg-slate-800/50 border-slate-700/50 mt-6">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Crypto Payment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-3">Send exactly this amount to continue:</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center bg-slate-800 p-3 rounded">
                        <span className="text-white">0.00024 BTC</span>
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Copy</button>
                      </div>
                      <div className="flex justify-between items-center bg-slate-800 p-3 rounded">
                        <span className="text-white">10 USDT (Polygon)</span>
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Copy</button>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs">Payments typically confirm within 5-10 minutes. After payment, reply with transaction hash below for instant verification.</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Summary */}
          <div className="order-1 lg:order-2">
            <Card className="bg-slate-800/50 border-slate-700/50 sticky top-20">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-slate-400">
                    <span>{program.name}</span>
                    <span>${program.price}</span>
                  </div>
                  <div className="border-t border-slate-700/50 pt-2 flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>${program.price}</span>
                  </div>
                </div>

                <Button
                  onClick={() => handlePayment(paymentMethod)}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Pay ${program.price}
                    </>
                  )}
                </Button>

                <div className="bg-slate-700/30 border border-slate-700/50 rounded-lg p-4 space-y-2">
                  <h4 className="text-white font-semibold text-sm">Guarantee</h4>
                  <p className="text-slate-400 text-xs">Not happy? Get a full refund within 14 days, no questions asked.</p>
                </div>

                <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-4 space-y-2">
                  <h4 className="text-white font-semibold text-sm flex items-center gap-2">
                    <Lock className="w-4 h-4 text-blue-400" />
                    Secure
                  </h4>
                  <p className="text-slate-400 text-xs">Your payment is encrypted and secure. We use industry-standard SSL protection.</p>
                </div>

                <Link href="/profile">
                  <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700 bg-transparent">
                    Back to Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
