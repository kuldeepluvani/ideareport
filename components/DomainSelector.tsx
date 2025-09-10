'use client'

import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

interface DomainSelectorProps {
  selectedDomain: string
  selectedSubdomain: string
  selectedMissingPiece: string
  onDomainChange: (domain: string) => void
  onSubdomainChange: (subdomain: string) => void
  onMissingPieceChange: (missingPiece: string) => void
}

const domains = {
  "CRM": ["Lead Management", "Customer Support", "Sales Pipeline", "Contact Management"],
  "Marketing": ["Email Marketing", "Social Media", "Content Management", "Analytics"],
  "Analytics": ["Business Intelligence", "Customer Analytics", "Performance Tracking", "Reporting"],
  "Productivity": ["Project Management", "Task Management", "Team Collaboration", "Document Management"],
  "Finance": ["Accounting", "Invoicing", "Expense Tracking", "Financial Planning"],
  "HR": ["Recruitment", "Employee Management", "Payroll", "Performance Reviews"],
  "E-commerce": ["Inventory Management", "Order Processing", "Customer Service", "Analytics"],
  "Communication": ["Video Conferencing", "Team Chat", "File Sharing", "Scheduling"]
}

const missingPieces = {
  "AI-powered": "Leverage artificial intelligence for automation and insights",
  "Mobile-first": "Optimized primarily for mobile devices and workflows",
  "Integration-focused": "Seamless connectivity with popular business tools",
  "Real-time": "Live data processing and instant updates",
  "Privacy-focused": "Enhanced data protection and compliance features",
  "Cost-effective": "Affordable pricing for small to medium businesses",
  "User-friendly": "Intuitive interface requiring minimal training",
  "Scalable": "Designed to grow with business needs"
}

export default function DomainSelector({
  selectedDomain,
  selectedSubdomain,
  selectedMissingPiece,
  onDomainChange,
  onSubdomainChange,
  onMissingPieceChange,
}: DomainSelectorProps) {
  const [currentDomain, setCurrentDomain] = useState('')
  const [currentSubdomain, setCurrentSubdomain] = useState('')
  const [currentMissingPiece, setCurrentMissingPiece] = useState('')

  // Auto-select random values when component mounts
  useEffect(() => {
    const domainKeys = Object.keys(domains)
    const randomDomain = domainKeys[Math.floor(Math.random() * domainKeys.length)]
    const subdomains = domains[randomDomain as keyof typeof domains]
    const randomSubdomain = subdomains[Math.floor(Math.random() * subdomains.length)]
    const missingPieceKeys = Object.keys(missingPieces)
    const randomMissingPiece = missingPieceKeys[Math.floor(Math.random() * missingPieceKeys.length)]

    setCurrentDomain(randomDomain)
    setCurrentSubdomain(randomSubdomain)
    setCurrentMissingPiece(randomMissingPiece)

    // Update parent component
    onDomainChange(randomDomain)
    onSubdomainChange(randomSubdomain)
    onMissingPieceChange(randomMissingPiece)
  }, [])

  return (
    <div className="space-y-4">
      {/* Select SaaS Domain - Display Only */}
      <div className="neu-card-inset rounded-xl px-6 py-4 text-sm neu-text flex items-center justify-between">
        <span>Select SaaS Domain</span>
        <ChevronDown className="h-4 w-4 neu-text" />
      </div>

      {/* Select Subdomain - Display Only */}
      <div className="neu-card-inset rounded-xl px-6 py-4 text-sm neu-text flex items-center justify-between">
        <span>Select Subdomain</span>
        <ChevronDown className="h-4 w-4 neu-text" />
      </div>

      {/* Select Missing Piece - Display Only */}
      <div className="neu-card-inset rounded-xl px-6 py-4 text-sm neu-text flex items-center justify-between">
        <span>Select Missing Piece</span>
        <ChevronDown className="h-4 w-4 neu-text" />
      </div>

      {/* Configuration Status - Display Only */}
      <div className="neu-card-inset rounded-xl px-6 py-4 text-sm neu-text">
        Configuration Status
      </div>

      {/* Generation Settings - Display Only */}
      <div className="neu-card-inset rounded-xl px-6 py-4 text-sm neu-text">
        Generation Settings
      </div>
    </div>
  )
}