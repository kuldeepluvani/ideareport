'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TimerProps {
  onComplete: () => Promise<void>
  isGenerating: boolean
  onProgressUpdate: (stage: number) => void
  onStageTextUpdate: (text: string) => void
  onDomainReveal: (show: boolean) => void
  onSubdomainReveal: (show: boolean) => void
  getStageText: (timeLeft: number) => string
  progressStage: number
}

export default function Timer({ 
  onComplete, 
  isGenerating, 
  onProgressUpdate, 
  onStageTextUpdate,
  onDomainReveal,
  onSubdomainReveal,
  getStageText,
  progressStage
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(60) // 60 seconds (1 minute)
  const [progress, setProgress] = useState(0)
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    const interval = setInterval(async () => {
      setTimeLeft(prev => {
        if (prev <= 1 && !isWaiting) {
          setIsWaiting(true)
          // Call onComplete and wait for it to finish
          onComplete().then(() => {
            // Add extra delay after idea generation completes
            setTimeout(() => {
              setIsWaiting(false)
              setTimeLeft(60) // Reset to 60 seconds
            }, 5000) // 5 second delay to read the idea
          })
          return 0 // Set to 0 instead of keeping current time
        }
        if (prev <= 0) {
          return 0 // Prevent negative values
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [onComplete, isWaiting])

  useEffect(() => {
    setProgress((60 - timeLeft) / 60 * 100)
    
    // Calculate and update progress stage
    const totalTime = 60
    const elapsed = totalTime - timeLeft
    
    let stage = 0
    if (elapsed < 20) { // First 20 seconds
      stage = 0 // Main Domain Selected
    } else if (elapsed < 40) { // Next 20 seconds
      stage = 1 // Sub Domain Selected
    } else {
      stage = 2 // Idea cooking!!!
    }
    
    onProgressUpdate(stage)
    
    // Update stage text
    const stageText = getStageText(timeLeft)
    onStageTextUpdate(stageText)
    
    // Reveal domain at 20 seconds elapsed
    if (elapsed >= 20 && elapsed < 21) {
      onDomainReveal(true)
    }
    
    // Reveal subdomain at 40 seconds elapsed
    if (elapsed >= 40 && elapsed < 41) {
      onSubdomainReveal(true)
    }
    
    // Reset reveals at the start of each cycle
    if (elapsed < 2) {
      onDomainReveal(false)
      onSubdomainReveal(false)
    }
    
  }, [timeLeft, onProgressUpdate, onStageTextUpdate, onDomainReveal, onSubdomainReveal, getStageText])

  const getProgressText = (progress: number) => {
    if (isWaiting) return 'Popping idea on screen...'
    if (progress < 10) return 'Starting...'
    if (progress < 20) return 'Selecting domain'
    if (progress < 30) return 'Thinking...'
    if (progress < 40) return 'Analyzing trends'
    if (progress < 50) return 'Evaluating options'
    if (progress < 60) return 'Narrowing down'
    if (progress < 70) return 'Almost there...'
    if (progress < 80) return 'Finalizing choice'
    if (progress < 90) return 'Preparing result'
    if (progress < 95) return 'Adding finishing touches'
    return 'Complete!'
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full space-y-6">
      {/* Neumorphism Progress Bar */}
      <div className="w-full relative">
        <div className="neu-progress h-8 w-full">
          {/* Progress fill */}
          <motion.div
            className="neu-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold neu-text">
              {getProgressText(progress)}
            </span>
          </div>
          
          {/* Timer on the right side */}
          <div className="absolute inset-0 flex items-center justify-end pr-4">
            <motion.div
              animate={isGenerating ? { 
                scale: [1, 1.05, 1]
              } : {}}
              transition={{ duration: 0.5, repeat: isGenerating ? Infinity : 0 }}
              className="text-lg font-mono font-bold neu-headline"
            >
              {formatTime(timeLeft)}
            </motion.div>
          </div>
        </div>
      </div>
      
    </div>
  )
}