import ThemeToggle from '@/components/ThemeToggle'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IDEAFORGE - Neumorphism AI Idea Generator',
  description: 'AI-powered SaaS idea generator with beautiful neumorphism design',
  keywords: ['saas', 'startup', 'ideas', 'ai', 'gemini', 'neumorphism', 'design'],
  authors: [{ name: 'IDEAFORGE Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">
          {/* Theme Toggle Button - Fixed Position */}
          <div className="fixed top-4 right-4 z-[9999]">
            <ThemeToggle />
          </div>
          {children}
        </div>
      </body>
    </html>
  )
}
