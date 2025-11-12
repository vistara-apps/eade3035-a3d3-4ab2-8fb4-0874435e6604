'use client'

import { useState } from 'react'
import { X, TrendingUp, AlertCircle } from 'lucide-react'

interface Market {
  id: string
  question: string
  options: string[]
}

interface BetModalProps {
  market: Market
  onClose: () => void
}

export function BetModal({ market, onClose }: BetModalProps) {
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [amount, setAmount] = useState<string>('10')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!selectedOption) return

    setIsSubmitting(true)
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface rounded-lg border border-white/10 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-fg">Place Your Bet</h2>
          <button
            onClick={onClose}
            className="text-fg/60 hover:text-fg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Question */}
          <div>
            <h3 className="text-lg font-medium text-fg mb-2">{market.question}</h3>
            <div className="flex items-start gap-2 p-3 bg-primary/10 rounded-lg">
              <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-fg/80">
                This bet uses gasless transactions on Base. You won't pay any gas fees!
              </p>
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-medium text-fg mb-3">
              Select Your Prediction
            </label>
            <div className="space-y-2">
              {market.options.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedOption(option)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedOption === option
                      ? 'border-primary bg-primary/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-fg">{option}</span>
                    {selectedOption === option && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-fg mb-3">
              Bet Amount (Points)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              className="w-full px-4 py-3 bg-bg border border-white/10 rounded-lg text-fg focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter amount"
            />
            <div className="flex gap-2 mt-2">
              {['10', '25', '50', '100'].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(preset)}
                  className="flex-1 px-3 py-2 bg-bg border border-white/10 rounded-lg text-sm text-fg hover:border-primary transition-colors"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!selectedOption || isSubmitting}
            className="w-full bg-primary text-white py-4 rounded-lg font-medium hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <TrendingUp className="w-5 h-5" />
                Confirm Bet
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
