'use client'

import React from "react"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const QUIZ_SECTIONS = [
  {
    title: 'Personal Information',
    description: 'Help us get to know you',
    questions: [
      { id: 'name', label: 'Full Name', type: 'text', required: true },
      { id: 'email', label: 'Email Address', type: 'email', required: true },
      { id: 'age', label: 'Age Range', type: 'select', options: ['18-25', '26-35', '36-45', '46-55', '56+'], required: true },
      { id: 'location', label: 'Country', type: 'text', required: true },
      { id: 'occupation', label: 'Current Occupation', type: 'text', required: false }
    ]
  },
  {
    title: 'Availability & Commitment',
    description: 'How much time can you dedicate to learning?',
    questions: [
      {
        id: 'hours_per_week',
        label: 'How many hours per week can you dedicate to learning?',
        type: 'select',
        options: ['< 5 hours', '5-10 hours', '10-15 hours', '15-20 hours', '20+ hours'],
        required: true
      },
      {
        id: 'preferred_schedule',
        label: 'When do you prefer to learn?',
        type: 'checkbox',
        options: ['Early mornings', 'Afternoons', 'Evenings', 'Weekends', 'Flexible'],
        required: true
      },
      {
        id: 'commitment_level',
        label: 'How committed are you to completing a full program?',
        type: 'select',
        options: ['Very committed', 'Somewhat committed', 'Testing the waters', 'Not sure yet'],
        required: true
      }
    ]
  },
  {
    title: 'AI Familiarity & Skills',
    description: 'Your current experience with AI tools',
    questions: [
      {
        id: 'ai_exposure',
        label: 'How would you describe your current AI knowledge?',
        type: 'select',
        options: ['Never used AI', 'Heard about it but never tried', 'Tried ChatGPT or similar once', 'Regular user of AI tools', 'Advanced user'],
        required: true
      },
      {
        id: 'tools_used',
        label: 'Which AI tools have you used? (Select all that apply)',
        type: 'checkbox',
        options: ['ChatGPT', 'Claude', 'Gemini/Bard', 'Midjourney', 'Copilot', 'Zapier/Automation', 'None'],
        required: false
      },
      {
        id: 'ai_use_case',
        label: 'How have you used AI?',
        type: 'textarea',
        placeholder: 'Describe your experience...',
        required: false
      },
      {
        id: 'biggest_ai_barrier',
        label: 'What{`\'`}s your biggest barrier to using AI effectively?',
        type: 'select',
        options: ['Don{`\'`}t know where to start', 'Overwhelmed by options', 'Privacy/security concerns', 'Cost', 'Time constraints', 'Not sure it{`\'`}s useful'],
        required: true
      }
    ]
  },
  {
    title: 'Professional Goals & AI Applications',
    description: 'How AI can help your career',
    questions: [
      {
        id: 'job_role',
        label: 'What{`\'`}s your primary job role or business type?',
        type: 'select',
        options: ['Content Creator', 'Freelancer', 'Business Owner', 'Remote Worker', 'Employee', 'Student', 'Job Seeker', 'Other'],
        required: true
      },
      {
        id: 'income_goal',
        label: 'What{`\'`}s your primary goal with AI?',
        type: 'checkbox',
        options: ['Create additional income', 'Do my job faster/better', 'Learn new skills', 'Stay competitive', 'Start a new business', 'Improve existing business', 'Job security'],
        required: true
      },
      {
        id: 'biggest_work_challenge',
        label: 'What{`\'`}s your biggest work/business challenge right now?',
        type: 'textarea',
        placeholder: 'E.g., content creation takes too long, managing tasks is overwhelming...',
        required: false
      },
      {
        id: 'income_level',
        label: 'Current monthly income range',
        type: 'select',
        options: ['$0-500', '$500-2000', '$2000-5000', '$5000-10000', '$10000+', 'Prefer not to say'],
        required: false
      },
      {
        id: 'desired_income',
        label: 'Your desired monthly income?',
        type: 'text',
        placeholder: 'E.g., $5000',
        required: false
      }
    ]
  },
  {
    title: 'Learning Preferences & Outcomes',
    description: 'How you learn best and what success looks like',
    questions: [
      {
        id: 'learning_style',
        label: 'How do you learn best?',
        type: 'select',
        options: ['Videos & tutorials', 'Written guides & documentation', 'Hands-on projects', 'Community discussion', 'Live mentorship', 'Mix of everything'],
        required: true
      },
      {
        id: 'accountability_preference',
        label: 'What keeps you accountable?',
        type: 'checkbox',
        options: ['Learning cohort/group', 'Public commitment', 'Progress tracking', 'Mentorship', 'Financial investment', 'Certificates/badges'],
        required: true
      },
      {
        id: 'success_metric',
        label: 'How will you measure success after completing the program?',
        type: 'textarea',
        placeholder: 'E.g., launching a new income stream, saving 10 hours/week, getting promoted...',
        required: false
      },
      {
        id: 'program_preference',
        label: 'Which program length appeals to you most?',
        type: 'select',
        options: ['1 Week Quick Start ($7-12)', '4 Week Core Mastery ($25-39)', '12 Week Deep Transformation ($69-99)', 'Not sure yet'],
        required: true
      },
      {
        id: 'motivational_message',
        label: 'What{`\'`}s one thing you hope to achieve with AI in the next 90 days?',
        type: 'textarea',
        placeholder: 'Your biggest AI goal...',
        required: false
      }
    ]
  }
]

interface QuizFormProps {
  onSubmit: (data: any) => void
}

export default function QuizForm({ onSubmit }: QuizFormProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const currentQuestions = QUIZ_SECTIONS[currentSection].questions

  const validateSection = () => {
    const newErrors: Record<string, string> = {}
    currentQuestions.forEach((q) => {
      if (q.required && !formData[q.id]) {
        newErrors[q.id] = 'This field is required'
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateSection()) {
      setCurrentSection((prev) => Math.min(prev + 1, QUIZ_SECTIONS.length - 1))
      setErrors({})
    }
  }

  const handlePrev = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0))
    setErrors({})
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateSection()) {
      onSubmit(formData)
    }
  }

  const handleChange = (id: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }))
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[id]
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (id: string, option: string) => {
    const current = formData[id] || []
    const updated = current.includes(option) ? current.filter((item: string) => item !== option) : [...current, option]
    handleChange(id, updated)
  }

  const isLastSection = currentSection === QUIZ_SECTIONS.length - 1
  const isFirstSection = currentSection === 0

  return (
    <form onSubmit={handleSubmit}>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">{QUIZ_SECTIONS[currentSection].title}</h2>
          <span className="text-sm text-slate-400">
            Section {currentSection + 1} of {QUIZ_SECTIONS.length}
          </span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentSection + 1) / QUIZ_SECTIONS.length) * 100}%` }}
          />
        </div>
        <p className="text-slate-400 mt-2">{QUIZ_SECTIONS[currentSection].description}</p>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {currentQuestions.map((question) => (
          <div key={question.id} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
            <label className="block text-white font-medium mb-3">
              {question.label}
              {question.required && <span className="text-red-400 ml-1">*</span>}
            </label>

            {question.type === 'text' && (
              <input
                type="text"
                placeholder={question.placeholder}
                value={formData[question.id] || ''}
                onChange={(e) => handleChange(question.id, e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            )}

            {question.type === 'email' && (
              <input
                type="email"
                placeholder={question.placeholder}
                value={formData[question.id] || ''}
                onChange={(e) => handleChange(question.id, e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            )}

            {question.type === 'textarea' && (
              <textarea
                placeholder={question.placeholder}
                value={formData[question.id] || ''}
                onChange={(e) => handleChange(question.id, e.target.value)}
                rows={4}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            )}

            {question.type === 'select' && (
              <select
                value={formData[question.id] || ''}
                onChange={(e) => handleChange(question.id, e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">Select an option...</option>
                {question.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {question.type === 'checkbox' && (
              <div className="space-y-2">
                {question.options?.map((option) => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData[question.id]?.includes(option) || false}
                      onChange={() => handleCheckboxChange(question.id, option)}
                      className="w-4 h-4 bg-slate-700 border border-slate-600 rounded cursor-pointer"
                    />
                    <span className="text-slate-300">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {errors[question.id] && <p className="text-red-400 text-sm mt-2">{errors[question.id]}</p>}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex gap-4 mt-8">
        <Button
          type="button"
          onClick={handlePrev}
          disabled={isFirstSection}
          variant="outline"
          className="border-slate-600 text-white hover:bg-slate-800 disabled:opacity-50 bg-transparent"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex-1" />

        {!isLastSection ? (
          <Button
            type="button"
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
            Complete Assessment
          </Button>
        )}
      </div>
    </form>
  )
}
