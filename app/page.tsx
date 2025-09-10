'use client'

import Timer from '@/components/Timer'
import { AnimatePresence, motion } from 'framer-motion'
import { Atom, Beaker, Brain, Calculator, Dna, Microscope, TestTube } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Idea {
  id: string
  timestamp: string
  domain: string
  subdomain: string
  missingPiece: string
  text: string
  tags: string
}

export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [selectedDomain, setSelectedDomain] = useState('')
  const [selectedSubdomain, setSelectedSubdomain] = useState('')
  const [selectedMissingPiece, setSelectedMissingPiece] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [progressStage, setProgressStage] = useState(0)
  const [stageText, setStageText] = useState('Looking for domain...')
  const [showDomain, setShowDomain] = useState(false)
  const [showSubdomain, setShowSubdomain] = useState(false)

  // Load initial ideas
  useEffect(() => {
    fetchIdeas()
  }, [])


  const fetchIdeas = async () => {
    try {
      const response = await fetch('/api/ideas')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setIdeas(data.ideas || [])
    } catch (error) {
      console.error('Error fetching ideas:', error)
    }
  }

  const generateNewIdea = async (): Promise<void> => {
    // Always select random domains, subdomains, and missing pieces
    const response = await fetch('/api/domains')
    const data = await response.json()
    
    if (data.success) {
      const domains = data.domains
      const missingPieces = data.missingPieces
      
      const domainKeys = Object.keys(domains)
      const randomDomain = domainKeys[Math.floor(Math.random() * domainKeys.length)]
      const subdomains = domains[randomDomain]
      const randomSubdomain = subdomains[Math.floor(Math.random() * subdomains.length)]
      const missingPieceKeys = Object.keys(missingPieces)
      const randomMissingPiece = missingPieceKeys[Math.floor(Math.random() * missingPieceKeys.length)]

      setSelectedDomain(randomDomain)
      setSelectedSubdomain(randomSubdomain)
      setSelectedMissingPiece(randomMissingPiece)

      setIsGenerating(true)
      try {
        const ideaResponse = await fetch('/api/generate-idea', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            domain: randomDomain,
            subdomain: randomSubdomain,
            missingPiece: randomMissingPiece,
          }),
        })

        const ideaData = await ideaResponse.json()
        if (ideaData.success) {
          setIdeas(prev => [ideaData.idea, ...prev.slice(0, 99)])
        }
      } catch (error) {
        console.error('Error generating idea:', error)
      } finally {
        setIsGenerating(false)
      }
    }
  }

  const getStageText = (timeLeft: number) => {
    const totalTime = 60
    const elapsed = totalTime - timeLeft
    
    // Stage 1: Domain Selection (0-20 seconds)
    if (elapsed < 5) return 'Looking for domain...'
    else if (elapsed < 10) return 'Thinking...'
    else if (elapsed < 15) return 'Got few domains selected'
    else if (elapsed < 20) return 'Analyzing market trends...'
    
    // Stage 2: Subdomain Selection (20-40 seconds)
    else if (elapsed < 25) return 'Deep diving into subcategories...'
    else if (elapsed < 30) return 'Thinking...'
    else if (elapsed < 35) return 'Got few subdomains selected'
    else if (elapsed < 40) return 'Analyzing feature requirements...'
    
    // Stage 3: Idea Cooking (40-60 seconds)
    else if (elapsed < 45) return 'Crafting unique value proposition...'
    else if (elapsed < 50) return 'Thinking...'
    else if (elapsed < 55) return 'Got innovative concepts'
    else if (elapsed < 60) return 'Polishing the final idea...'
    else return 'Almost ready...'
  }

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* Neumorphism Header */}
      <header className="sticky top-0 z-50 neu-card mx-4 mt-4">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4">
              <div className="neu-icon w-12 h-12">
                        <Dna className="h-6 w-6 text-orange-500 dark:text-orange-400" />
              </div>
              <h1 className="text-3xl font-bold neu-headline tracking-tight">IDEAFORGE</h1>
              <div className="neu-icon w-12 h-12">
                <Atom className="h-6 w-6 text-orange-600 dark:text-orange-500" />
              </div>
            </div>
            <p className="text-sm neu-text mt-2 font-medium">AI-Powered Innovation Laboratory</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-3 relative z-10 h-screen flex flex-col">
        {/* Progress Bar at Top */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          
          {/* Neumorphism Three-Stage Progress Bar */}
          <div className="neu-card-inset p-2">
            <div className="flex flex-col sm:flex-row rounded-2xl overflow-hidden">
              {/* Stage 1 - Domain Analysis */}
              <div className={`flex-1 p-3 sm:p-4 text-center border-b sm:border-b-0 sm:border-r border-gray-300 dark:border-gray-600 transition-all duration-700 ${
                progressStage >= 0 ? 'neu-card-inset bg-orange-50 dark:bg-orange-900/20' : ''
              }`}>
                <div className="flex flex-row sm:flex-col items-center justify-center space-x-2 sm:space-x-0 sm:space-y-2">
                  <div className="relative">
                    <div className="neu-icon w-8 h-8 sm:w-10 sm:h-10">
                      <Microscope className={`h-4 w-4 sm:h-5 sm:w-5 ${progressStage >= 0 ? 'text-orange-500 dark:text-orange-400' : 'text-gray-600 dark:text-gray-300'}`} />
                    </div>
                    <div className="absolute -top-1 -right-1">
                      <div className="neu-icon w-3 h-3 sm:w-4 sm:h-4">
                        <Calculator className="h-1.5 w-1.5 sm:h-2 sm:w-2 text-orange-400 dark:text-orange-500" />
                      </div>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold">
                    {showDomain ? (
                      <span className="neu-headline text-sm">{selectedDomain}</span>
                    ) : (
                      <span className={progressStage >= 0 ? 'text-orange-500 dark:text-orange-400 font-bold' : 'text-gray-600 dark:text-gray-300'}>
                        Domain Analysis
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Stage 2 - Subdomain Selection */}
              <div className={`flex-1 p-3 sm:p-4 text-center border-b sm:border-b-0 sm:border-r border-gray-300 dark:border-gray-600 transition-all duration-700 ${
                progressStage >= 1 ? 'neu-card-inset bg-orange-50 dark:bg-orange-900/20' : ''
              }`}>
                <div className="flex flex-row sm:flex-col items-center justify-center space-x-2 sm:space-x-0 sm:space-y-2">
                  <div className="relative">
                    <div className="neu-icon w-8 h-8 sm:w-10 sm:h-10">
                      <Beaker className={`h-4 w-4 sm:h-5 sm:w-5 ${progressStage >= 1 ? 'text-orange-600 dark:text-orange-500' : 'text-gray-600 dark:text-gray-300'}`} />
                    </div>
                    <div className="absolute -top-1 -right-1">
                      <div className="neu-icon w-3 h-3 sm:w-4 sm:h-4">
                        <TestTube className="h-1.5 w-1.5 sm:h-2 sm:w-2 text-orange-500 dark:text-orange-600" />
                      </div>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold">
                    {showSubdomain ? (
                      <span className="neu-headline text-sm">{selectedSubdomain}</span>
                    ) : (
                      <span className={progressStage >= 1 ? 'text-orange-600 dark:text-orange-500 font-bold' : 'text-gray-600 dark:text-gray-300'}>
                        Subdomain Selection
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Stage 3 - Idea Generation */}
              <div className={`flex-1 p-3 sm:p-4 text-center transition-all duration-700 ${
                progressStage >= 2 ? 'neu-card-inset bg-orange-50 dark:bg-orange-900/20' : ''
              }`}>
                <div className="flex flex-row sm:flex-col items-center justify-center space-x-2 sm:space-x-0 sm:space-y-2">
                  <div className="relative">
                    <div className="neu-icon w-8 h-8 sm:w-10 sm:h-10">
                      <Brain className={`h-4 w-4 sm:h-5 sm:w-5 ${progressStage >= 2 ? 'text-orange-700 dark:text-orange-600' : 'text-gray-400 dark:text-gray-500'}`} />
                    </div>
                    <div className="absolute -top-1 -right-1">
                      <div className="neu-icon w-3 h-3 sm:w-4 sm:h-4">
                        <Dna className="h-1.5 w-1.5 sm:h-2 sm:w-2 text-orange-600 dark:text-orange-700" />
                      </div>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold">
                    <span className={progressStage >= 2 ? 'text-orange-700 dark:text-orange-600 font-bold' : 'text-gray-600 dark:text-gray-300'}>
                      Innovation Synthesis
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timer Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          <Timer 
            onComplete={generateNewIdea}
            isGenerating={isGenerating}
            onProgressUpdate={setProgressStage}
            onStageTextUpdate={setStageText}
            onDomainReveal={setShowDomain}
            onSubdomainReveal={setShowSubdomain}
            getStageText={getStageText}
            progressStage={progressStage}
          />
        </motion.div>


        {/* Chat-Style Ideas Container */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {ideas.length > 0 ? (
              <AnimatePresence>
                {ideas.slice(0, 100).map((idea, index) => (
                  <motion.div
                    key={idea.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="neu-card rounded-2xl p-4 hover:neu-card transition-all duration-500 group relative"
                  >
                    {/* Tags in top right corner */}
                    <div className="absolute top-3 right-3 flex flex-wrap gap-1 justify-end">
                      {idea.tags.match(/\(([^)]+)\)/g)?.map((tag, tagIndex) => (
                        <span key={tagIndex} className="neu-tag-accent text-xs font-medium">
                          {tag.replace(/[()]/g, '')}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="neu-icon w-8 h-8 flex-shrink-0">
                        <Atom className="h-4 w-4 text-orange-500 dark:text-orange-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 text-sm mb-3">
                          <span className="neu-tag text-xs font-semibold">
                            {idea.domain}
                          </span>
                          <span className="neu-text">•</span>
                          <span className="neu-tag text-xs font-semibold">
                            {idea.subdomain}
                          </span>
                          <span className="neu-text">•</span>
                          <span className="neu-tag text-xs font-semibold">
                            {idea.missingPiece}
                          </span>
                        </div>
                        <p className="neu-text font-medium leading-relaxed mb-3 text-sm">
                          {idea.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="text-center py-8">
                <div className="neu-icon w-16 h-16 mx-auto mb-4">
                  <Microscope className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold neu-text mb-2">Analyzing Innovation Patterns...</h3>
                <p className="neu-text">Your first AI-generated idea will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}