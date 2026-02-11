'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import QuizForm from '@/components/quiz-form'

export default function QuizPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (data: any) => {
    try {
      console.log('[v0] Quiz data:', data)
      
      // Submit to API to save to Supabase
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save quiz')
      }

      setSubmitted(true)
      
      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = '/profile'
      }, 2000)
    } catch (error) {
      console.error('[v0] Quiz submission error:', error)
      alert('Error saving your assessment. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl">✨</div>
          <h1 className="text-3xl font-bold text-white">Assessment Complete!</h1>
          <p className="text-slate-300">Analyzing your responses and creating your personalized profile...</p>
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
          <h1 className="text-4xl font-bold text-white mb-2">Your AI Mastery Assessment</h1>
          <p className="text-slate-300">40 questions • ~15 minutes • Free & no credit card needed</p>
        </div>
      </div>

      {/* Quiz Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <QuizForm onSubmit={handleSubmit} />
      </div>
    </main>
  )
}
