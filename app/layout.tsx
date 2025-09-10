import ThemeToggle from '@/components/ThemeToggle'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SaaS Idea Generator',
  description: 'Automated SaaS idea generator powered by Gemini Pro 2.5',
  keywords: ['saas', 'startup', 'ideas', 'ai', 'gemini'],
  authors: [{ name: 'Your Name' }],
  viewport: 'width=device-width, initial-scale=1',
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
