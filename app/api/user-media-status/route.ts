import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const userId = searchParams.get('userId')
  const mediaId = searchParams.get('mediaId')

  if (!userId || !mediaId) {
    return NextResponse.json(
      { error: 'Missing userId or mediaId' },
      { status: 400 }
    )
  }

  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('user_media_status')
      .select('id')
      .eq('user_id', userId)
      .eq('media_id', mediaId)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw error
    }

    return NextResponse.json({ exists: !!data })
  } catch (error) {
    console.error('Error checking user media status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
