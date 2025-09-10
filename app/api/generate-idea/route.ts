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
    
    // Parse CSV data
    const parsedIdeas = ideas.map(line => {
      const [timestamp, domain, subdomain, missingPiece, text, tags] = line.split(',')
      return {
        id: timestamp,
        timestamp,
        domain,
        subdomain,
        missingPiece,
        text: text.replace(/^"|"$/g, '').replace(/""/g, '"'), // Remove quotes and unescape
        tags
      }
    }).reverse() // Show newest first
    
    return NextResponse.json({
      success: true,
      ideas: parsedIdeas
    })
    
  } catch (error) {
    console.error('Error in ideas API:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch ideas' },
      { status: 500 }
    )
  }
}
