'use client'

import { useEffect, useState } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'
import { ConnectWallet } from '@coinbase/onchainkit/wallet'
import { PlusCircle, TrendingUp, Users, Trophy } from 'lucide-react'
import { MarketCard } from './components/MarketCard'
import { CreateMarketModal } from './components/CreateMarketModal'
import { UserProfile } from './components/UserProfile'

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

export default function Home() {
  const [isReady, setIsReady] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'trending' | 'friends' | 'my-bets'>('trending')
  const [markets, setMarkets] = useState<Market[]>([
    {
      id: '1',
      question: 'Will Alex get divorced in 2025?',
      description: 'Based on recent social media activity and friend group discussions',
      options: ['Yes', 'No'],
      creator: {
        fid: '9152',
        username: 'alice',
        pfpUrl: 'https://i.imgur.com/placeholder1.png',
      },
      totalBets: 24,
      resolutionDate: '2025-12-31',
      status: 'open',
    },
    {
      id: '2',
      question: 'Will Sarah have more than 4 drinks at the holiday party?',
      description: 'Annual holiday party prediction - track record suggests high probability',
      options: ['Over 4', 'Under 4', 'Exactly 4'],
      creator: {
        fid: '8234',
        username: 'bob',
        pfpUrl: 'https://i.imgur.com/placeholder2.png',
      },
      totalBets: 18,
      resolutionDate: '2024-12-25',
      status: 'open',
    },
    {
      id: '3',
      question: 'Over/under 6.5 likes on John\'s next Instagram post',
      description: 'John\'s average engagement has been declining lately',
      options: ['Over 6.5', 'Under 6.5'],
      creator: {
        fid: '7456',
        username: 'charlie',
        pfpUrl: 'https://i.imgur.com/placeholder3.png',
      },
      totalBets: 31,
      resolutionDate: '2024-12-20',
      status: 'open',
    },
  ])

  useEffect(() => {
    // CRITICAL: Call sdk.actions.ready() to prevent infinite loading
    sdk.actions.ready()
    setIsReady(true)
  }, [])

  const handleCreateMarket = (marketData: Omit<Market, 'id' | 'totalBets' | 'status'>) => {
    const newMarket: Market = {
      ...marketData,
      id: Date.now().toString(),
      totalBets: 0,
      status: 'open',
    }
    setMarkets([newMarket, ...markets])
    setShowCreateModal(false)
  }

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center">
          <div className="animate-pulse-slow mb-4">
            <TrendingUp className="w-16 h-16 text-primary mx-auto" />
          </div>
          <p className="text-fg text-lg">Loading FriendBet...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-bg pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface border-b border-white/10 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-fg">FriendBet</h1>
                <p className="text-xs text-fg/60">Social Prediction Markets</p>
              </div>
            </div>
            <ConnectWallet />
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-surface border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{markets.length}</div>
              <div className="text-xs text-fg/60">Active Markets</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">
                {markets.reduce((sum, m) => sum + m.totalBets, 0)}
              </div>
              <div className="text-xs text-fg/60">Total Bets</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">24</div>
              <div className="text-xs text-fg/60">Friends Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-surface border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('trending')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'trending'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-fg/60 hover:text-fg'
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-2" />
              Trending
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'friends'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-fg/60 hover:text-fg'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Friends
            </button>
            <button
              onClick={() => setActiveTab('my-bets')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'my-bets'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-fg/60 hover:text-fg'
              }`}
            >
              <Trophy className="w-4 h-4 inline mr-2" />
              My Bets
            </button>
          </div>
        </div>
      </div>

      {/* Markets Grid */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 gap-4 animate-fade-in">
          {markets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>

        {markets.length === 0 && (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-fg/20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-fg mb-2">No markets yet</h3>
            <p className="text-fg/60 mb-6">Be the first to create a prediction market!</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-accent transition-colors"
            >
              Create Market
            </button>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-accent transition-all hover:scale-110 flex items-center justify-center z-40"
        aria-label="Create new market"
      >
        <PlusCircle className="w-6 h-6" />
      </button>

      {/* Create Market Modal */}
      {showCreateModal && (
        <CreateMarketModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateMarket}
        />
      )}
    </main>
  )
}
