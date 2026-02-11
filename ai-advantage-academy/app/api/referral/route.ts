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

    const { referredUserId, bonusType } = body

    // Create referral record
    const { data: referral, error: referralError } = await supabase
      .from('referrals')
      .insert({
        referrer_id: user.id,
        referred_user_id: referredUserId,
        bonus_type: bonusType || 'discount_20',
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select()

    if (referralError) throw referralError

    // Create bonus record for referrer
    const { error: bonusError } = await supabase.from('bonuses').insert({
      user_id: user.id,
      type: bonusType || 'discount_20',
      value: 20, // 20% discount
      expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString() // 90 days
    })

    if (bonusError) console.error('Bonus creation error:', bonusError)

    return NextResponse.json({
      success: true,
      referral_id: referral[0].id,
      message: 'Referral tracked!'
    })
  } catch (error) {
    console.error('[v0] Referral API error:', error)
    return NextResponse.json({ error: 'Failed to track referral' }, { status: 500 })
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

    // Get referral stats
    const { data: referrals, error: referralsError } = await supabase
      .from('referrals')
      .select('*')
      .eq('referrer_id', user.id)

    if (referralsError) throw referralsError

    const successfulReferrals = referrals.filter((r) => r.status === 'completed').length
    const pendingReferrals = referrals.filter((r) => r.status === 'pending').length

    // Get available bonuses
    const { data: bonuses, error: bonusesError } = await supabase
      .from('bonuses')
      .select('*')
      .eq('user_id', user.id)
      .gt('expires_at', new Date().toISOString())

    if (bonusesError) throw bonusesError

    return NextResponse.json({
      totalReferrals: referrals.length,
      successfulReferrals,
      pendingReferrals,
      availableBonuses: bonuses
    })
  } catch (error) {
    console.error('[v0] Get referrals error:', error)
    return NextResponse.json({ error: 'Failed to fetch referrals' }, { status: 500 })
  }
}
