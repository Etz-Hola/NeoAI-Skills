import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = await createClient()

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { programId, paymentMethod, amount, transactionId } = body

    // Create enrollment record
    const { data: enrollment, error: enrollmentError } = await supabase
      .from('enrollments')
      .insert({
        user_id: user.id,
        program_id: programId,
        payment_method: paymentMethod,
        amount_paid: amount,
        transaction_id: transactionId,
        status: 'active',
        enrolled_at: new Date().toISOString(),
        started_at: new Date().toISOString()
      })
      .select()

    if (enrollmentError) throw enrollmentError

    // Assign to next available cohort
    const { data: cohorts } = await supabase
      .from('cohorts')
      .select('*')
      .eq('program_id', programId)
      .gte('start_date', new Date().toISOString())
      .order('start_date', { ascending: true })
      .limit(1)

    if (cohorts && cohorts.length > 0) {
      const { error: cohortError } = await supabase.from('cohort_members').insert({
        cohort_id: cohorts[0].id,
        user_id: user.id,
        joined_at: new Date().toISOString()
      })

      if (cohortError) console.error('Cohort assignment error:', cohortError)
    }

    // Update user profile with enrollment status
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        current_program: programId,
        enrollment_status: 'active'
      })
      .eq('id', user.id)

    if (profileError) console.error('Profile update error:', profileError)

    return NextResponse.json({
      success: true,
      enrollment_id: enrollment[0].id,
      message: 'Enrollment successful! Welcome to your program.'
    })
  } catch (error) {
    console.error('[v0] Enrollment API error:', error)
    return NextResponse.json({ error: 'Failed to process enrollment' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: enrollments, error } = await supabase
      .from('enrollments')
      .select(
        `
        *,
        program:program_id(id, name, duration),
        cohort:cohort_members(cohort_id)
      `
      )
      .eq('user_id', user.id)
      .order('enrolled_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(enrollments)
  } catch (error) {
    console.error('[v0] Get enrollments error:', error)
    return NextResponse.json({ error: 'Failed to fetch enrollments' }, { status: 500 })
  }
}
