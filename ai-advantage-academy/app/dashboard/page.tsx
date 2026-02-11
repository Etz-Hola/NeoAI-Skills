'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, CheckCircle, Users, Award, Calendar, AlertCircle, BookOpen, Zap, LogOut } from 'lucide-react'
import { ProtectedRoute } from '@/components/protected-route'
import { useAuth } from '@/hooks/use-auth'
import { createClient } from '@/lib/supabase/client'

interface ProgramModule {
  id: string
  week: number
  title: string
  description: string
  duration: string
  completed: boolean
  lessons: { id: string; title: string; type: 'video' | 'text' | 'project'; completed: boolean }[]
}

function DashboardContent() {
  const [countdown, setCountdown] = useState<{ days: number; hours: number; minutes: number } | null>(null)
  const [program, setProgram] = useState({
    name: 'Core Mastery',
    duration: '4 Weeks',
    startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    progress: 0
  })

  const [modules, setModules] = useState<ProgramModule[]>([
    {
      id: '1',
      week: 1,
      title: 'AI Fundamentals & Tool Mastery',
      description: 'Learn the basics of AI tools and how to use them effectively',
      duration: '3 hours',
      completed: false,
      lessons: [
        { id: '1-1', title: 'What is AI & Why It Matters', type: 'video', completed: false },
        { id: '1-2', title: 'ChatGPT, Claude & Gemini Comparison', type: 'text', completed: false },
        { id: '1-3', title: 'Your First AI Prompt Exercise', type: 'project', completed: false }
      ]
    },
    {
      id: '2',
      week: 2,
      title: 'Prompting Like a Pro',
      description: 'Master the art of writing effective prompts',
      duration: '3.5 hours',
      completed: false,
      lessons: [
        { id: '2-1', title: 'Prompt Engineering Fundamentals', type: 'video', completed: false },
        { id: '2-2', title: 'Templates & Frameworks', type: 'text', completed: false },
        { id: '2-3', title: 'Real-World Prompt Project', type: 'project', completed: false }
      ]
    },
    {
      id: '3',
      week: 3,
      title: 'Automation & Workflows',
      description: 'Automate repetitive tasks using AI',
      duration: '4 hours',
      completed: false,
      lessons: [
        { id: '3-1', title: 'Zapier & Make.com Basics', type: 'video', completed: false },
        { id: '3-2', title: 'Building Your First Workflow', type: 'project', completed: false }
      ]
    },
    {
      id: '4',
      week: 4,
      title: 'Your Income Project',
      description: 'Apply everything to create a real money-making project',
      duration: '5 hours',
      completed: false,
      lessons: [
        { id: '4-1', title: 'Income Opportunities Overview', type: 'text', completed: false },
        { id: '4-2', title: 'Launch Your Project', type: 'project', completed: false },
        { id: '4-3', title: 'Track & Scale Results', type: 'text', completed: false }
      ]
    }
  ])

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const diff = program.startDate.getTime() - now.getTime()

      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60)
        })
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [program.startDate])

  const totalLessons = modules.reduce((acc, mod) => acc + mod.lessons.length, 0)
  const completedLessons = modules.reduce((acc, mod) => acc + mod.lessons.filter((l) => l.completed).length, 0)
  const progress = Math.round((completedLessons / totalLessons) * 100)

  const toggleLessonComplete = (moduleId: string, lessonId: string) => {
    setModules(
      modules.map((mod) => {
        if (mod.id === moduleId) {
          return {
            ...mod,
            lessons: mod.lessons.map((lesson) => {
              if (lesson.id === lessonId) {
                return { ...lesson, completed: !lesson.completed }
              }
              return lesson
            })
          }
        }
        return mod
      })
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{program.name}</h1>
            <p className="text-sm text-slate-400">{program.duration}</p>
          </div>
          <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 bg-transparent">
            Settings
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cohort Start Countdown */}
        {countdown && countdown.days > 0 && (
          <Card className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border-orange-500/50 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-400" />
                Your Cohort Starts In:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-4xl font-bold text-orange-400">{countdown.days}</div>
                  <div className="text-sm text-slate-400 mt-1">Days</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-400">{countdown.hours}</div>
                  <div className="text-sm text-slate-400 mt-1">Hours</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-400">{countdown.minutes}</div>
                  <div className="text-sm text-slate-400 mt-1">Minutes</div>
                </div>
              </div>
              <p className="text-slate-300 mt-6 text-center">You{`'`}ll be added to your private cohort group and weekly Q&A sessions. Check your email for details!</p>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Progress', value: `${progress}%`, icon: CheckCircle },
            { label: 'Lessons Completed', value: `${completedLessons}/${totalLessons}`, icon: BookOpen },
            { label: 'Cohort Members', value: '24', icon: Users },
            { label: 'Days Left', value: countdown ? `${countdown.days}` : '-', icon: Calendar }
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <Card key={i} className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <Icon className="w-8 h-8 text-blue-400 opacity-50" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Progress Bar */}
        <Card className="bg-slate-800/50 border-slate-700/50 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="w-full bg-slate-700/50 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-slate-400 text-right">{progress}% Complete</p>
            </div>
          </CardContent>
        </Card>

        {/* Curriculum */}
        <h2 className="text-2xl font-bold text-white mb-6">Your Curriculum</h2>
        <div className="space-y-6 mb-12">
          {modules.map((module, moduleIdx) => (
            <Card key={module.id} className="bg-slate-800/50 border-slate-700/50 overflow-hidden">
              <CardHeader className="bg-slate-700/30 border-b border-slate-700/50">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full">Week {module.week}</span>
                      {module.completed && <CheckCircle className="w-5 h-5 text-green-400" />}
                    </div>
                    <h3 className="text-xl font-bold text-white">{module.title}</h3>
                    <p className="text-slate-400 text-sm mt-1">{module.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">{module.duration}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {module.lessons.filter((l) => l.completed).length}/{module.lessons.length} lessons
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {module.lessons.map((lesson) => {
                    const getIcon = (type: string) => {
                      switch (type) {
                        case 'video':
                          return '🎥'
                        case 'text':
                          return '📄'
                        case 'project':
                          return '⚡'
                        default:
                          return '📚'
                      }
                    }

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => toggleLessonComplete(module.id, lesson.id)}
                        className={`w-full p-4 rounded-lg border-2 transition text-left ${
                          lesson.completed ? 'bg-green-500/10 border-green-500/50' : 'bg-slate-700/30 border-slate-700/50 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition ${
                              lesson.completed ? 'bg-green-500 border-green-500' : 'border-slate-600'
                            }`}
                          >
                            {lesson.completed && <CheckCircle className="w-4 h-4 text-white" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium ${lesson.completed ? 'text-green-400 line-through' : 'text-white'}`}>{lesson.title}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}</p>
                          </div>
                          <span className="text-lg flex-shrink-0">{getIcon(lesson.type)}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-blue-500/50 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Need Help or Have Questions?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-300">Join your cohort community or attend weekly Q&A sessions to connect with other learners and get support.</p>
            <div className="flex gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Join Community Forum</Button>
              <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 bg-transparent">
                Schedule 1:1 Session
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute requireProfile>
      <DashboardContent />
    </ProtectedRoute>
  )
}
