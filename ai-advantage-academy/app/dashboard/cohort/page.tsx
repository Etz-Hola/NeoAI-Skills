'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, Users, Calendar, Video, Heart, MessageCircle, Share2 } from 'lucide-react'

interface Member {
  id: string
  name: string
  role: string
  avatar: string
  progress: number
}

interface Message {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  replies: number
}

export default function CohortPage() {
  const [members] = useState<Member[]>([
    { id: '1', name: 'Amara', role: 'Content Creator', avatar: '👩‍💼', progress: 75 },
    { id: '2', name: 'James', role: 'Freelancer', avatar: '👨‍💻', progress: 60 },
    { id: '3', name: 'Fatima', role: 'Business Owner', avatar: '👩‍🏫', progress: 85 },
    { id: '4', name: 'Mohammed', role: 'Developer', avatar: '👨‍💼', progress: 45 },
    { id: '5', name: 'Sarah', role: 'Marketer', avatar: '👩‍🔬', progress: 70 },
    { id: '6', name: 'Chen', role: 'Student', avatar: '👨‍🎓', progress: 50 }
  ])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      author: 'Amara',
      avatar: '👩‍💼',
      content: 'Just completed week 2! The prompt templates lesson really helped me understand how to get better results from ChatGPT.',
      timestamp: '2h ago',
      likes: 8,
      replies: 3
    },
    {
      id: '2',
      author: 'James',
      avatar: '👨‍💻',
      content: 'Has anyone tried using Zapier automation with ChatGPT? I{`'`}m trying to automate client emails.',
      timestamp: '4h ago',
      likes: 5,
      replies: 7
    },
    {
      id: '3',
      author: 'Fatima',
      avatar: '👩‍🏫',
      content: 'The income project is amazing! Already implemented one idea from week 1 and made $50 this week 🎉',
      timestamp: '6h ago',
      likes: 24,
      replies: 12
    }
  ])

  const [newMessage, setNewMessage] = useState('')

  const handlePostMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: String(messages.length + 1),
      author: 'You',
      avatar: '👤',
      content: newMessage,
      timestamp: 'just now',
      likes: 0,
      replies: 0
    }

    setMessages([message, ...messages])
    setNewMessage('')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-white">Your Cohort Community</h1>
          <p className="text-sm text-slate-400 mt-1">Connect with 24 learners on this journey</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Post Input */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Share your progress, ask questions, or celebrate wins with your cohort..."
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                    rows={3}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 bg-transparent">
                      Cancel
                    </Button>
                    <Button onClick={handlePostMessage} className="bg-blue-600 hover:bg-blue-700 text-white">
                      Post
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Messages Feed */}
            <div className="space-y-4">
              {messages.map((message) => (
                <Card key={message.id} className="bg-slate-800/50 border-slate-700/50">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="text-3xl flex-shrink-0">{message.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-white font-semibold">{message.author}</p>
                          <span className="text-xs text-slate-500">{message.timestamp}</span>
                        </div>
                        <p className="text-slate-300 mb-4">{message.content}</p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-slate-400 hover:text-red-400 transition">
                            <Heart className="w-4 h-4" />
                            <span className="text-xs">{message.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-slate-400 hover:text-blue-400 transition">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-xs">{message.replies}</span>
                          </button>
                          <button className="flex items-center gap-1 text-slate-400 hover:text-slate-300 transition">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: 'Weekly Q&A Session', date: 'Tomorrow, 3 PM', icon: '❓' },
                  { title: 'Live Mentor Office Hours', date: 'Fri, 2 PM', icon: '👨‍🏫' },
                  { title: 'Project Showcase', date: 'Sun, 5 PM', icon: '🎪' }
                ].map((event, i) => (
                  <div key={i} className="p-3 bg-slate-700/30 rounded hover:bg-slate-700/50 transition cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{event.icon}</span>
                      <p className="font-semibold text-white text-sm">{event.title}</p>
                    </div>
                    <p className="text-xs text-slate-400 ml-6">{event.date}</p>
                  </div>
                ))}
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2">
                  <Video className="w-4 h-4" />
                  Join Next Session
                </Button>
              </CardContent>
            </Card>

            {/* Cohort Members */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  Cohort Members ({members.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {members.map((member) => (
                  <div key={member.id} className="p-3 bg-slate-700/30 rounded hover:bg-slate-700/50 transition">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{member.avatar}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm">{member.name}</p>
                        <p className="text-xs text-slate-400">{member.role}</p>
                      </div>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${member.progress}%` }} />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{member.progress}% Complete</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Discussion Channels */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                  Channels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {['#general', '#projects', '#questions', '#wins'].map((channel, i) => (
                  <button key={i} className="w-full text-left p-2 rounded hover:bg-slate-700/50 transition text-slate-300 hover:text-white">
                    {channel}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
