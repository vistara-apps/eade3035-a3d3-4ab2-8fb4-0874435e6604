'use client'

import { useState } from 'react'
import { X, PlusCircle, MinusCircle, Calendar } from 'lucide-react'

interface CreateMarketModalProps {
  onClose: () => void
  onCreate: (market: any) => void
}

export function CreateMarketModal({ onClose, onCreate }: CreateMarketModalProps) {
  const [question, setQuestion] = useState('')
  const [description, setDescription] = useState('')
  const [options, setOptions] = useState(['', ''])
  const [resolutionDate, setResolutionDate] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, ''])
    }
  }

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSubmit = async () => {
    if (!question || !resolutionDate || options.some(o => !o.trim())) return

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    onCreate({
      question,
      description,
      options: options.filter(o => o.trim()),
      resolutionDate,
      creator: {
        fid: '9152',
        username: 'you',
        pfpUrl: '',
      },
    })

    setIsSubmitting(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface rounded-lg border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-fg">Create Prediction Market</h2>
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
            <label className="block text-sm font-medium text-fg mb-2">
              Market Question *
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-4 py-3 bg-bg border border-white/10 rounded-lg text-fg focus:outline-none focus:border-primary transition-colors"
              placeholder="e.g., Will Alex get divorced in 2025?"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-fg mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-bg border border-white/10 rounded-lg text-fg focus:outline-none focus:border-primary transition-colors resize-none"
              placeholder="Add context or details about this prediction..."
            />
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-medium text-fg mb-2">
              Prediction Options *
            </label>
            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="flex-1 px-4 py-3 bg-bg border border-white/10 rounded-lg text-fg focus:outline-none focus:border-primary transition-colors"
                    placeholder={`Option ${index + 1}`}
                  />
                  {options.length > 2 && (
                    <button
                      onClick={() => removeOption(index)}
                      className="p-3 text-danger hover:bg-danger/10 rounded-lg transition-colors"
                      aria-label="Remove option"
                    >
                      <MinusCircle className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {options.length < 5 && (
              <button
                onClick={addOption}
                className="mt-2 flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                Add Option
              </button>
            )}
          </div>

          {/* Resolution Date */}
          <div>
            <label className="block text-sm font-medium text-fg mb-2">
              Resolution Date *
            </label>
            <div className="relative">
              <input
                type="date"
                value={resolutionDate}
                onChange={(e) => setResolutionDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-bg border border-white/10 rounded-lg text-fg focus:outline-none focus:border-primary transition-colors"
              />
              <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-fg/40 pointer-events-none" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!question || !resolutionDate || options.some(o => !o.trim()) || isSubmitting}
            className="w-full bg-primary text-white py-4 rounded-lg font-medium hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating Market...
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5" />
                Create Market
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
