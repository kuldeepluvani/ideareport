'use client'

import { motion } from 'framer-motion'
import { Clock, Tag } from 'lucide-react'

interface Idea {
  id: string
  timestamp: string
  domain: string
  subdomain: string
  missingPiece: string
  text: string
  tags: string
}

interface IdeaBubbleProps {
  idea: Idea
}

export default function IdeaBubble({ idea }: IdeaBubbleProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-4 hover:glass-card-intense transition-all duration-300 relative"
    >
      {/* Tags in top right corner */}
      <div className="absolute top-3 right-3 flex flex-wrap gap-1 justify-end">
        <span className="text-xs bg-gray-200/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
          {idea.domain}
        </span>
        <span className="text-xs bg-gray-200/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
          {idea.subdomain}
        </span>
        <span className="text-xs bg-gray-200/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
          {idea.missingPiece}
        </span>
        <span className="text-xs bg-blue-500/20 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
          {idea.tags}
        </span>
      </div>

      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center">
            <Tag className="h-4 w-4 text-blue-500" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {formatTime(idea.timestamp)}
            </span>
          </div>
          
          <div className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            {idea.text.split('\n').map((line, index) => (
              <p key={index} className="mb-1 last:mb-0">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
