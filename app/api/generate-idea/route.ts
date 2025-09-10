import { domains, generateUniqueIdea, missingPieces, readExistingIdeas } from '@/lib/gemini'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    let { domain, subdomain, missingPiece } = body
    
    // If no parameters provided, select random ones
    if (!domain || !subdomain || !missingPiece) {
      const domainKeys = Object.keys(domains)
      const randomDomain = domainKeys[Math.floor(Math.random() * domainKeys.length)]
      const subdomains = domains[randomDomain as keyof typeof domains]
      const randomSubdomain = subdomains[Math.floor(Math.random() * subdomains.length)]
      const missingPieceKeys = Object.keys(missingPieces)
      const randomMissingPiece = missingPieceKeys[Math.floor(Math.random() * missingPieceKeys.length)]
      
      domain = randomDomain
      subdomain = randomSubdomain
      missingPiece = randomMissingPiece
    }
    
    const idea = await generateUniqueIdea(domain, subdomain, missingPiece)
    
    return NextResponse.json({
      success: true,
      idea
    })
    
  } catch (error) {
    console.error('Error in generate-idea API:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate idea' },
      { status: 500 }
    )
  }
}

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
