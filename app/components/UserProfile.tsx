'use client'

import { Trophy, TrendingUp, Users } from 'lucide-react'

interface UserProfileProps {
  username: string
  fid: string
  stats?: {
    totalBets: number
    marketsCreated: number
    winRate: number
  }
}

export function UserProfile({ username, fid, stats }: UserProfileProps) {
  const defaultStats = {
    totalBets: 0,
    marketsCreated: 0,
    winRate: 0,
  }

  const userStats = stats || defaultStats

  return (
    <div className="bg-surface rounded-lg border border-white/10 p-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-2xl font-bold text-primary">
            {username.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-fg">@{username}</h2>
          <p className="text-sm text-fg/60">FID: {fid}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-bg rounded-lg">
          <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-fg">{userStats.totalBets}</div>
          <div className="text-xs text-fg/60">Total Bets</div>
        </div>
        <div className="text-center p-4 bg-bg rounded-lg">
          <Users className="w-6 h-6 text-accent mx-auto mb-2" />
          <div className="text-2xl font-bold text-fg">{userStats.marketsCreated}</div>
          <div className="text-xs text-fg/60">Markets Created</div>
        </div>
        <div className="text-center p-4 bg-bg rounded-lg">
          <Trophy className="w-6 h-6 text-success mx-auto mb-2" />
          <div className="text-2xl font-bold text-fg">{userStats.winRate}%</div>
          <div className="text-xs text-fg/60">Win Rate</div>
        </div>
      </div>
    </div>
  )
}
