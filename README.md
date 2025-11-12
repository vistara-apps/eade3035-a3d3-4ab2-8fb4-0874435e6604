# FriendBet - Social Prediction Markets

A Base Mini App for creating and participating in hyper-personal prediction markets with your Farcaster friends.

## Features

- 🎯 **Personalized Markets**: Create custom prediction markets for your friend group
- ⚡ **Gasless Transactions**: Powered by Coinbase Paymaster on Base
- 🔗 **Farcaster Integration**: Native social features and notifications
- 💎 **OnchainKit**: Beautiful UI components for Base identity and wallet
- 📱 **Mobile-First**: Optimized for mobile experience

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (L2 on Ethereum)
- **Wallet**: OnchainKit + Coinbase Wallet
- **Social**: Farcaster MiniKit SDK
- **Styling**: Tailwind CSS with Coinbase theme
- **State**: React Query

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
# Add your OnchainKit API key
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Deployment

Deploy to Vercel or any Next.js-compatible platform:

```bash
npm run build
npm start
```

## Key Files

- `app/page.tsx` - Main app with market feed
- `app/components/MarketCard.tsx` - Market display component
- `app/components/BetModal.tsx` - Betting interface
- `app/components/CreateMarketModal.tsx` - Market creation
- `public/.well-known/farcaster.json` - Farcaster manifest

## Base Mini App Features

- ✅ OnchainKit integration for wallet and identity
- ✅ MiniKit SDK for Farcaster context
- ✅ Gasless transactions via Paymaster
- ✅ Frame-based sharing
- ✅ Social notifications
- ✅ Mobile-optimized UI

## License

MIT
