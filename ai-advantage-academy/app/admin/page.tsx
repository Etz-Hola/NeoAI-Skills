'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Users, DollarSign, TrendingUp, Plus, Settings } from 'lucide-react'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Total Users', value: '2,483', change: '+12%', icon: Users, color: 'text-blue-400' },
    { label: 'Total Revenue', value: '$42,500', change: '+8%', icon: DollarSign, color: 'text-green-400' },
    { label: 'Enrollments', value: '847', change: '+23%', icon: TrendingUp, color: 'text-purple-400' },
    { label: 'Completion Rate', value: '72%', change: '+5%', icon: BarChart3, color: 'text-cyan-400' }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <Card key={i} className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-slate-400 text-sm">{stat.label}</p>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-green-400">{stat.change} this month</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-700/50">
          {['overview', 'programs', 'cohorts', 'users', 'content'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 border-b-2 transition capitalize ${
                activeTab === tab ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Revenue by Program</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Quick Start', revenue: '$8,400', students: '140' },
                    { name: 'Core Mastery', revenue: '$24,500', students: '280' },
                    { name: 'Deep Transformation', revenue: '$9,600', students: '48' }
                  ].map((program, i) => (
                    <div key={i} className="p-4 bg-slate-700/30 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-white">{program.name}</p>
                        <p className="text-green-400 font-bold">{program.revenue}</p>
                      </div>
                      <p className="text-sm text-slate-400">{program.students} enrolled</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'programs' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Program
              </Button>
            </div>
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Manage Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Quick Start', duration: '1 Week', status: 'Active' },
                    { name: 'Core Mastery', duration: '4 Weeks', status: 'Active' },
                    { name: 'Deep Transformation', duration: '12 Weeks', status: 'Active' }
                  ].map((program, i) => (
                    <div key={i} className="p-4 bg-slate-700/30 rounded flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{program.name}</p>
                        <p className="text-sm text-slate-400">{program.duration}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-green-500/20 border border-green-500 rounded text-green-400 text-sm">{program.status}</span>
                        <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 bg-transparent">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'cohorts' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Cohort
              </Button>
            </div>
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Active Cohorts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Core Mastery - Week 1', members: 28, startDate: '2026-02-10' },
                    { name: 'Quick Start - Week 1', members: 15, startDate: '2026-02-17' },
                    { name: 'Deep Transformation - Cohort 3', members: 12, startDate: '2026-02-03' }
                  ].map((cohort, i) => (
                    <div key={i} className="p-4 bg-slate-700/30 rounded flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{cohort.name}</p>
                        <p className="text-sm text-slate-400">{cohort.members} members • Started {cohort.startDate}</p>
                      </div>
                      <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 bg-transparent">
                        Manage
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'users' && (
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">User Management</CardTitle>
              <CardDescription className="text-slate-400">Search, filter, and manage user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center">
                <p className="text-slate-400 mb-4">User management features coming soon</p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">View in Supabase</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Module
              </Button>
            </div>
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Content Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { week: 1, title: 'AI Fundamentals', lessons: 3 },
                    { week: 2, title: 'Prompting Like a Pro', lessons: 3 },
                    { week: 3, title: 'Automation & Workflows', lessons: 2 },
                    { week: 4, title: 'Income Projects', lessons: 3 }
                  ].map((module, i) => (
                    <div key={i} className="p-4 bg-slate-700/30 rounded flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">Week {module.week}: {module.title}</p>
                        <p className="text-sm text-slate-400">{module.lessons} lessons</p>
                      </div>
                      <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 bg-transparent">
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}
