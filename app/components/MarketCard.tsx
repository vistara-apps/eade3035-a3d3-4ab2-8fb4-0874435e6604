'use client'

import { Calendar, Users, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { BetModal } from './BetModal'

interface Market {
  id: string
  question: string
  description: string
  options: string[]
  creator: {
    fid: string
    username: string
    pfpUrl: string
  }
  totalBets: number
  resolutionDate: string
  status: 'open' | 'resolved' | 'canceled'
}

interface MarketCardProps {
  market: Market
}

export function MarketCard({ market }: MarketCardProps) {
  const [showBetModal, setShowBetModal] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <>
      <div className="bg-surface rounded-lg border border-white/10 p-6 hover:border-primary/50 transition-all cursor-pointer">
        {/* Creator Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {market.creator.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium text-fg">@{market.creator.username}</div>
            <div className="text-xs text-fg/60">Market Creator</div>
          </div>
        </div>

        {/* Question */}
        <h3 className="text-lg font-semibold text-fg mb-2 leading-tight">
          {market.question}
        </h3>
        <p className="text-sm text-fg/70 mb-4 line-clamp-2">{market.description}</p>

        {/* Options Preview */}
        <div className="flex flex-wrap gap-2 mb-4">
          {market.options.map((option, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
            >
              {option}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-fg/60 mb-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {market.totalBets} bets
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(market.resolutionDate)}
            </span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            market.status === 'open' 
              ? 'bg-success/20 text-success' 
              : 'bg-fg/20 text-fg/60'
          }`}>
            {market.status}
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setShowBetModal(true)}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-accent transition-colors flex items-center justify-center gap-2"
        >
          <TrendingUp className="w-4 h-4" />
          Place Bet
        </button>
      </div>

      {showBetModal && (
        <BetModal
          market={market}
          onClose={() => setShowBetModal(false)}
        />
      )}
    </>
  )
}
