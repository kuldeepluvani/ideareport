import { domainCategories, domains, missingPieces } from '@/lib/gemini'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      domains,
      missingPieces,
      domainCategories
    })
  } catch (error) {
    console.error('Error in domains API:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch domains' },
      { status: 500 }
    )
  }
}
