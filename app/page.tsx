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
      {/* AI-Powered Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Neural Network Background */}
        <div className="neural-network"></div>
        
        {/* Floating AI Elements */}
        <div className="floating-ai" style={{ top: '10%', left: '10%' }}></div>
        <div className="floating-ai" style={{ top: '20%', right: '15%' }}></div>
        <div className="floating-ai" style={{ bottom: '30%', left: '20%' }}></div>
        <div className="floating-ai" style={{ bottom: '10%', right: '10%' }}></div>
        
        {/* AI Flow Elements */}
        <div className="ai-flow-element" style={{ top: '5%', left: '0%' }}></div>
        <div className="ai-flow-element" style={{ top: '60%', right: '0%' }}></div>
        <div className="ai-flow-element" style={{ bottom: '20%', left: '30%' }}></div>
        
        {/* Data Streams */}
        <div className="data-stream" style={{ left: '15%', top: '0%' }}></div>
        <div className="data-stream" style={{ left: '85%', top: '0%' }}></div>
        <div className="data-stream" style={{ left: '50%', top: '0%' }}></div>
        <div className="data-stream" style={{ left: '25%', top: '0%' }}></div>
        <div className="data-stream" style={{ left: '75%', top: '0%' }}></div>
      </div>
      {/* Enhanced Magical Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-3 h-3 particle"></div>
        <div className="absolute top-40 right-20 w-2 h-2 particle"></div>
        <div className="absolute bottom-40 left-20 w-4 h-4 particle"></div>
        <div className="absolute bottom-20 right-10 w-3 h-3 particle"></div>
        <div className="absolute top-60 left-1/2 w-2 h-2 particle"></div>
        <div className="absolute bottom-60 right-1/3 w-3 h-3 particle"></div>
        <div className="absolute top-80 left-1/4 w-2 h-2 particle"></div>
        <div className="absolute bottom-80 right-1/4 w-3 h-3 particle"></div>
      </div>

      {/* AuraGloss Header */}
      <header className="sticky top-0 z-50 glass-card glass-blur-xl border-b border-blue-500/20 dark:border-blue-500/30 dark:bg-slate-900/80">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4">
              <Dna className="h-8 w-8 text-blue-500 dark:text-blue-400 dna-helix luminous-text" />
              <h1 className="text-3xl font-bold ai-headline tracking-tight">IDEAFORGE</h1>
              <Atom className="h-8 w-8 text-blue-600 dark:text-blue-500 molecular-bond luminous-text" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 ai-subtitle font-medium luminous-text">AI-Powered Innovation Laboratory</p>
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
          
          {/* AuraGloss Three-Stage Progress Bar */}
          <div className="ai-progress">
            <div className="flex flex-col sm:flex-row rounded-2xl overflow-hidden glass-card glass-blur-lg shadow-2xl">
              {/* Stage 1 - Domain Analysis */}
              <div className={`flex-1 p-3 sm:p-4 text-center border-b sm:border-b-0 sm:border-r border-blue-500/20 dark:border-blue-500/30 transition-all duration-700 ${
                progressStage >= 0 ? 'glass-stage-active bg-blue-500/10 dark:bg-blue-500/20' : 'glass-stage'
              }`}>
                <div className="flex flex-row sm:flex-col items-center justify-center space-x-2 sm:space-x-0 sm:space-y-2">
                  <div className="relative">
                    <Microscope className={`h-4 w-4 sm:h-5 sm:w-5 ${progressStage >= 0 ? 'text-blue-500 dark:text-blue-400 scientific-pulse luminous-text' : 'text-gray-600 dark:text-gray-300'}`} />
                    <div className="absolute -top-1 -right-1">
                      <Calculator className="h-1.5 w-1.5 sm:h-2 sm:w-2 text-blue-400 dark:text-blue-500 molecular-bond luminous-text" />
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold">
                    {showDomain ? (
                      <span className="ai-headline text-sm aurora-text">{selectedDomain}</span>
                    ) : (
                      <span className={progressStage >= 0 ? 'text-blue-500 dark:text-blue-400 font-bold luminous-text' : 'text-gray-700 dark:text-gray-200'}>
                        Domain Analysis
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Stage 2 - Subdomain Selection */}
              <div className={`flex-1 p-3 sm:p-4 text-center border-b sm:border-b-0 sm:border-r border-blue-500/20 dark:border-blue-500/30 transition-all duration-700 ${
                progressStage >= 1 ? 'glass-stage-active bg-blue-500/10 dark:bg-blue-500/20' : 'glass-stage'
              }`}>
                <div className="flex flex-row sm:flex-col items-center justify-center space-x-2 sm:space-x-0 sm:space-y-2">
                  <div className="relative">
                    <Beaker className={`h-4 w-4 sm:h-5 sm:w-5 ${progressStage >= 1 ? 'text-blue-600 dark:text-blue-500 scientific-pulse luminous-text' : 'text-gray-600 dark:text-gray-300'}`} />
                    <div className="absolute -top-1 -right-1">
                      <TestTube className="h-1.5 w-1.5 sm:h-2 sm:w-2 text-blue-500 dark:text-blue-600 molecular-bond luminous-text" />
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold">
                    {showSubdomain ? (
                      <span className="ai-headline text-sm aurora-text">{selectedSubdomain}</span>
                    ) : (
                      <span className={progressStage >= 1 ? 'text-blue-600 dark:text-blue-500 font-bold luminous-text' : 'text-gray-700 dark:text-gray-200'}>
                        Subdomain Selection
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Stage 3 - Idea Generation */}
              <div className={`flex-1 p-3 sm:p-4 text-center transition-all duration-700 ${
                progressStage >= 2 ? 'glass-stage-active bg-blue-500/10 dark:bg-blue-500/20' : 'glass-stage'
              }`}>
                <div className="flex flex-row sm:flex-col items-center justify-center space-x-2 sm:space-x-0 sm:space-y-2">
                  <div className="relative">
                    <Brain className={`h-4 w-4 sm:h-5 sm:w-5 ${progressStage >= 2 ? 'text-blue-700 dark:text-blue-600 scientific-pulse luminous-text' : 'text-gray-400 dark:text-gray-500'}`} />
                    <div className="absolute -top-1 -right-1">
                      <Dna className="h-1.5 w-1.5 sm:h-2 sm:w-2 text-blue-600 dark:text-blue-700 dna-helix luminous-text" />
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold">
                    <span className={progressStage >= 2 ? 'ai-headline text-sm font-bold aurora-text' : 'text-gray-700 dark:text-gray-200'}>
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
                    className="glass-card rounded-2xl p-4 hover:glass-card-intense transition-all duration-500 shadow-lg hover:shadow-xl group relative"
                  >
                    {/* Tags in top right corner */}
                    <div className="absolute top-3 right-3 flex flex-wrap gap-1 justify-end">
                      {idea.tags.split(',').map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-blue-500/20 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-blue-600/20 dark:from-blue-500/30 dark:to-blue-600/30 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300">
                        <Atom className="h-4 w-4 text-blue-500 dark:text-blue-400 luminous-text" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 text-sm mb-3">
                          <span className="px-2 py-1 bg-blue-500/20 dark:bg-blue-500/30 rounded-full text-blue-600 dark:text-blue-400 font-semibold text-xs">
                            {idea.domain}
                          </span>
                          <span className="text-gray-400 dark:text-gray-500">•</span>
                          <span className="px-2 py-1 bg-blue-600/20 dark:bg-blue-600/30 rounded-full text-blue-700 dark:text-blue-500 font-semibold text-xs">
                            {idea.subdomain}
                          </span>
                          <span className="text-gray-400 dark:text-gray-500">•</span>
                          <span className="px-2 py-1 bg-blue-700/20 dark:bg-blue-700/30 rounded-full text-blue-800 dark:text-blue-600 font-semibold text-xs">
                            {idea.missingPiece}
                          </span>
                        </div>
                        <p className="text-gray-800 dark:text-gray-100 font-medium leading-relaxed mb-3 text-sm luminous-text">
                          {idea.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mb-4 glass-card shadow-lg">
                  <Microscope className="h-8 w-8 text-blue-500 luminous-text" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2 luminous-text">Analyzing Innovation Patterns...</h3>
                <p className="text-gray-500 dark:text-gray-400 luminous-text">Your first AI-generated idea will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}