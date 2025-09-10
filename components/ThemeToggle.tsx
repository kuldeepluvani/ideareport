'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="neu-button relative px-4 py-2 group"
      aria-label="Toggle theme"
    >
      <div className="flex items-center space-x-2">
        {/* Icon container */}
        <div className="neu-icon w-6 h-6">
          <Sun 
            className={`absolute inset-0 w-3 h-3 text-gray-600 dark:text-gray-300 transition-all duration-300 ${
              isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
            }`}
          />
          <Moon 
            className={`absolute inset-0 w-3 h-3 text-gray-600 dark:text-gray-300 transition-all duration-300 ${
              isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
            }`}
          />
        </div>
        
        {/* Text */}
        <span className="text-sm font-medium neu-text">
          {isDark ? 'Light' : 'Dark'}
        </span>
      </div>
      
      {/* Tooltip */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-2 neu-card text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        <span className="neu-text">{isDark ? 'Switch to light mode' : 'Switch to dark mode'}</span>
      </div>
    </button>
  )
}
