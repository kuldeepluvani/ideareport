import { GoogleGenAI } from '@google/genai'
import { domainCategories, domains, missingPieces } from './domains'
import { Idea, supabase, supabaseAdmin } from './supabase'

// API Key random selection
const API_KEYS = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2
].filter(Boolean) // Remove any undefined values

// Function to get random API key
function getRandomApiKey(): string {
  if (API_KEYS.length === 0) {
    throw new Error('No Gemini API keys found. Please set GEMINI_API_KEY_1 and/or GEMINI_API_KEY_2 in your environment variables.')
  }
  
  const randomIndex = Math.floor(Math.random() * API_KEYS.length)
  const key = API_KEYS[randomIndex]
  if (!key) {
    throw new Error('API key is undefined')
  }
  console.log(`Using Gemini API Key ${randomIndex + 1} (random selection)`)
  return key
}

// Function to create Gemini instance with random key
function createGeminiInstance() {
  return new GoogleGenAI({
    apiKey: getRandomApiKey()
  })
}

// Read existing ideas from Supabase
async function readExistingIdeas(): Promise<Idea[]> {
  try {
    const { data, error } = await supabase
      .from('ideas')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error reading ideas from Supabase:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Error reading ideas:', error)
    return []
  }
}

// Write idea to Supabase
async function writeIdeaToSupabase(idea: Idea) {
  try {
    const { error } = await supabaseAdmin
      .from('ideas')
      .insert([{
        timestamp: idea.timestamp,
        domain: idea.domain,
        subdomain: idea.subdomain,
        missing_piece: idea.missing_piece,
        text: idea.text,
        tags: idea.tags
      }])
    
    if (error) {
      console.error('Error writing idea to Supabase:', error)
      throw error
    }
  } catch (error) {
    console.error('Error writing idea:', error)
    throw error
  }
}

// Generate unique idea using Gemini
async function generateUniqueIdea(domain: string, subdomain: string, missingPiece: string): Promise<any> {
  const existingIdeas = await readExistingIdeas()
  
  const ai = createGeminiInstance()
  
  const prompt = `
You are an expert SaaS innovation strategist creating breakthrough software solutions. Generate a cutting-edge SaaS business idea with these specifications:

🎯 CORE REQUIREMENTS:
- Main Domain: ${domain}
- Subdomain: ${subdomain}
- Innovation Angle: ${missingPiece}
- Format: EXACTLY ONE LINE (no line breaks, no bullet points, no formatting)
- Structure: Problem → Solution → Market → Differentiation (all in one sentence)
- Tags: (${domain}) (${subdomain})

🚀 INNOVATION GUIDELINES:
- Focus on SOFTWARE-ONLY solutions (no physical products)
- Leverage emerging technologies: AI/ML, blockchain, IoT, edge computing, quantum computing
- Target underserved markets or create new market categories
- Emphasize automation, intelligence, and scalability
- Consider modern tech stacks: microservices, serverless, real-time processing
- Think about API-first, headless, and composable architectures

💡 IDEA GENERATION FRAMEWORK:
Create ONE SINGLE SENTENCE that covers:
1. PROBLEM: Identify a specific, painful problem in ${subdomain}
2. SOLUTION: Describe a software platform that solves this with ${missingPiece} approach
3. MARKET: Define the target market size and specific customer segments
4. DIFFERENTIATION: Explain unique technical advantages and competitive moats

🔍 TECHNICAL FOCUS AREAS:
- AI/ML: Predictive analytics, natural language processing, computer vision, recommendation engines
- Real-time: Live data processing, instant collaboration, real-time analytics
- Automation: Workflow automation, intelligent routing, self-healing systems
- Integration: API ecosystems, webhook systems, data synchronization
- Security: Zero-trust architecture, encryption, compliance automation
- Scalability: Cloud-native, microservices, auto-scaling, global distribution

⚠️ AVOID THESE COMMON PATTERNS:
${existingIdeas.slice(0, 8).map(idea => `- ${idea.text}`).join('\n')}

🎨 CREATIVITY REQUIREMENTS:
- Think like a startup founder solving billion-dollar problems
- Consider B2B SaaS with recurring revenue models
- Focus on software that can scale globally
- Emphasize technical innovation over business model innovation
- Create ideas that would excite VCs and technical teams

CRITICAL: Generate EXACTLY ONE LINE with no line breaks, bullet points, or special formatting. The response must be a single, flowing sentence that covers all four elements (problem, solution, market, differentiation).

Generate a completely unique, technically innovative SaaS idea that pushes the boundaries of what's possible in ${subdomain}.
`

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 1000, // Enable thinking mode with budget
        },
      }
    })
    
    const text = response.text
    
    if (!text) {
      throw new Error('No response text received from Gemini API')
    }
    
    // Parse the response to extract the idea
    const ideaText = text.trim().replace(/\n/g, ' ').replace(/\s+/g, ' ')
    
    const idea: Idea = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      domain,
      subdomain,
      missing_piece: missingPiece,
      text: ideaText,
      tags: `(${domain}) (${subdomain})`
    }
    
    await writeIdeaToSupabase(idea)
    return idea
    
  } catch (error) {
    console.error('Error generating idea with current API key:', error)
    
    // Try with a different random API key if first one fails
    try {
      console.log('Retrying with alternative random API key...')
      const ai = createGeminiInstance()
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt,
        config: {
          thinkingConfig: {
            thinkingBudget: 1000, // Enable thinking mode with budget
          },
        }
      })
      
      const text = response.text
      
      if (!text) {
        throw new Error('No response text received from Gemini API')
      }
      
      // Parse the response to extract the idea
      const ideaText = text.trim().replace(/\n/g, ' ').replace(/\s+/g, ' ')
      
      const idea: Idea = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        domain,
        subdomain,
        missing_piece: missingPiece,
        text: ideaText,
        tags: `(${domain}) (${subdomain})`
      }
      
      await writeIdeaToSupabase(idea)
      return idea
      
    } catch (retryError) {
      console.error('Error generating idea with alternative random API key:', retryError)
      throw new Error('Failed to generate idea with both API keys')
    }
  }
}

export { domainCategories, domains, generateUniqueIdea, missingPieces, readExistingIdeas }

