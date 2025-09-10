import { readExistingIdeas } from '@/lib/gemini'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const ideas = await readExistingIdeas()
    
    // Transform Supabase data to match expected format
    const formattedIdeas = ideas.map(idea => ({
      id: idea.id || idea.timestamp,
      timestamp: idea.timestamp,
      domain: idea.domain,
      subdomain: idea.subdomain,
      missingPiece: idea.missing_piece,
      text: idea.text,
      tags: idea.tags
    }))
    
    return NextResponse.json({
      success: true,
      ideas: formattedIdeas
    })
    
  } catch (error) {
    console.error('Error in ideas API:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch ideas' },
      { status: 500 }
    )
  }
}
