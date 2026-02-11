'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, CheckCircle, Clock, Download, Share2, MessageSquare } from 'lucide-react'

interface Lesson {
  id: string
  title: string
  type: 'video' | 'text' | 'project'
  duration: string
  description: string
  content: string
  videoUrl?: string
  resources?: { name: string; url: string }[]
  nextLessonId?: string
  completed: boolean
}

function getIcon(type: string) {
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

export default function LessonPage({ params }: { params: { id: string } }) {
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [completed, setCompleted] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [notes, setNotes] = useState('')

  useEffect(() => {
    // Simulate loading lesson data
    const mockLesson: Lesson = {
      id: params.id,
      title: 'ChatGPT Prompting Basics',
      type: 'video',
      duration: '24 min',
      description: 'Learn how to write effective prompts to get the best results from ChatGPT',
      content:
        'In this lesson, we{`'`}ll explore the fundamentals of prompt engineering. You{\`'\`}ll learn how to structure your prompts, provide context, and get more accurate responses.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      resources: [
        { name: 'Prompt Templates PDF', url: '#' },
        { name: 'ChatGPT Tips Cheat Sheet', url: '#' },
        { name: 'Examples & Case Studies', url: '#' }
      ],
      nextLessonId: 'lesson-2',
      completed: false
    }
    setLesson(mockLesson)
    setCompleted(mockLesson.completed)
  }, [params.id])

  const handleComplete = () => {
    setCompleted(true)
    // Save to database
    console.log('[v0] Lesson marked as complete:', params.id)
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-pulse text-center space-y-4">
          <div className="text-6xl">📚</div>
          <p className="text-white">Loading lesson...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-slate-300 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <Button onClick={handleComplete} disabled={completed} className={`${completed ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}>
            {completed ? <CheckCircle className="w-4 h-4 mr-2" /> : null}
            {completed ? 'Completed' : 'Mark Complete'}
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Lesson Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{getIcon(lesson.type)}</span>
            <span className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-500 rounded text-blue-400 text-sm font-semibold">
              {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{lesson.title}</h1>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {lesson.duration}
            </span>
            {completed && <span className="flex items-center gap-1 text-green-400"><CheckCircle className="w-4 h-4" /> Completed</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            {lesson.type === 'video' && lesson.videoUrl && (
              <Card className="bg-slate-800/50 border-slate-700/50 overflow-hidden">
                <div className="relative w-full pt-[56.25%]">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={lesson.videoUrl}
                    title={lesson.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </Card>
            )}

            {/* Content */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Lesson Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 leading-relaxed mb-4">{lesson.description}</p>
                  <p className="text-slate-400 leading-relaxed">{lesson.content}</p>
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            {lesson.resources && lesson.resources.length > 0 && (
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Download className="w-5 h-5 text-blue-400" />
                    Resources & Downloads
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {lesson.resources.map((resource, i) => (
                    <a key={i} href={resource.url} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded hover:bg-slate-700/50 transition">
                      <Download className="w-4 h-4 text-blue-400" />
                      <span className="text-white hover:underline">{resource.name}</span>
                    </a>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Notes Section */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Your Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your notes here... They{`'`}ll be saved automatically."
                  className="w-full h-32 px-4 py-3 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                />
                <p className="text-xs text-slate-500 mt-2">Notes are saved automatically to your profile</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Module Progress */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white text-lg">Module Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Week 1: Fundamentals</span>
                    <span className="text-blue-400 font-semibold">33%</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '33%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Discussion */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                  Cohort Discussion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4">Have questions? Chat with your cohort members about this lesson.</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Join Discussion
                </Button>
              </CardContent>
            </Card>

            {/* Next Steps */}
            {lesson.nextLessonId && (
              <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/50">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Next Lesson</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-sm mb-4">Ready to continue? Move to the next lesson.</p>
                  <Link href={`/dashboard/lesson/${lesson.nextLessonId}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Continue to Next Lesson</Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Share */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white text-lg">Share</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700 flex items-center justify-center gap-2 bg-transparent">
                  <Share2 className="w-4 h-4" />
                  Share Progress
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
