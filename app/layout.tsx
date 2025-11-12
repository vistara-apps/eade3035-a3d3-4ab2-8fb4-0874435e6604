import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'FriendBet - Social Prediction Markets',
  description: 'Social prediction markets for your Farcaster friends',
  openGraph: {
    title: 'FriendBet',
    description: 'Social prediction markets for your Farcaster friends',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
