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
      className="theme-toggle-button relative px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-600"
      aria-label="Toggle theme"
    >
      <div className="flex items-center space-x-2">
        {/* Icon container */}
        <div className="relative w-5 h-5 bg-black dark:bg-white rounded-full flex items-center justify-center">
          <Sun 
            className={`absolute inset-0 w-3 h-3 text-white dark:text-black transition-all duration-300 ${
              isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
            }`}
          />
          <Moon 
            className={`absolute inset-0 w-3 h-3 text-white dark:text-black transition-all duration-300 ${
              isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
            }`}
          />
        </div>
        
        {/* Text */}
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {isDark ? 'Light' : 'Dark'}
        </span>
        
        {/* Chevron indicators */}
        <div className="flex space-x-0.5">
          <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-500 dark:bg-gray-400 rounded-full"></div>
        </div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      </div>
    </button>
  )
}
