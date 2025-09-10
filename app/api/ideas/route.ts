import { readExistingIdeas } from '@/lib/gemini'
import { NextResponse } from 'next/server'

// Proper CSV parsing function
function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false
  let i = 0
  
  while (i < line.length) {
    const char = line[i]
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"'
        i += 2
      } else {
        // Toggle quote state
        inQuotes = !inQuotes
        i++
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      result.push(current.trim())
      current = ''
      i++
    } else {
      current += char
      i++
    }
  }
  
  // Add the last field
  result.push(current.trim())
  return result
}

export async function GET() {
  try {
    const ideas = await readExistingIdeas()
    
    // Parse CSV data with proper handling
    const parsedIdeas = ideas.map(line => {
      try {
        const [timestamp, domain, subdomain, missingPiece, text, tags] = parseCSVLine(line)
        return {
          id: timestamp,
          timestamp,
          domain,
          subdomain,
          missingPiece,
          text: text || '', // Handle undefined text
          tags: tags || ''
        }
      } catch (parseError) {
        console.error('Error parsing line:', line, parseError)
        return null
      }
    }).filter(idea => idea !== null).reverse() // Show newest first
    
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
