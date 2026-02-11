import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = await createClient()

    // Get current user
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Create or update profile
    const { error: profileError } = await supabase.from('profiles').upsert({
      id: user.id,
      full_name: body.name,
      email: body.email,
      age_range: body.age,
      location: body.location,
      occupation: body.occupation,
      hours_per_week: body.hours_per_week,
      preferred_schedule: body.preferred_schedule,
      commitment_level: body.commitment_level,
      ai_experience_level: body.ai_exposure,
      tools_used: body.tools_used,
      job_role: body.job_role,
      learning_style: body.learning_style,
      goals: body.income_goal,
      updated_at: new Date().toISOString()
    })

    if (profileError) throw profileError

    // Save quiz responses
    const { error: quizError } = await supabase.from('quiz_responses').insert({
      user_id: user.id,
      responses: body,
      created_at: new Date().toISOString()
    })

    if (quizError) throw quizError

    return NextResponse.json({ success: true, user_id: user.id })
  } catch (error) {
    console.error('[v0] Quiz API error:', error)
    return NextResponse.json({ error: 'Failed to save quiz' }, { status: 500 })
  }
}
