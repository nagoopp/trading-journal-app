# Trading Journal App

Professional Trading Journal application with comprehensive tracking, trophy collection system, daily quests, and level progression.

## Features

### Core Trading Features
- **Daily Transaction Tracking**: Log buy/sell trades with win/loss results
- **Daily Quests**: 4 daily missions to complete for progression
- **Weekly Analytics**: Detailed performance analysis and statistics
- **Level System**: Earn XP and advance levels as you complete trades
- **Trophy Collection**: Collect trophies of different rarity levels (Common, Rare, Epic, Legendary)

### User Interface
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Dark Theme**: Easy on the eyes with beautiful gradient backgrounds
- **Animated Transitions**: Smooth animations using Framer Motion
- **Music Player**: 4 themed playlists (Focus, Upbeat, Funny, Epic)

### Settings & Customization
- **Customizable Targets**: Set daily profit targets and loss limits
- **Data Management**: Export/Import trading data as JSON
- **Help Center**: Comprehensive FAQ and tutorials
- **Settings Panel**: Adjust preferences like max trades per day

### Additional Features
- **Splash Screen**: Motivational opening with randomized quotes
- **Achievement Notifications**: Get notified when completing quests
- **Local Storage**: All data persists in browser
- **No Backend Required**: Completely client-side application

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **State Management**: React Hooks with localStorage

## Getting Started

### Prerequisites
- Node.js 18+ or higher
- pnpm (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/trading-journal-app.git

# Navigate to project directory
cd trading-journal-app

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Usage

1. **First Launch**: You'll see a motivational splash screen - click "Bismillah, Mulai Sekarang" to start
2. **Daily Tab**: Add your daily trades and complete quests
3. **Weekly Tab**: View your weekly performance statistics
4. **Report Tab**: Detailed analytics and psychological evaluation
5. **Trophy Koleksi**: View your collected trophies organized by rarity
6. **Settings**: Customize your trading parameters and export/import data
7. **Help**: Access help center with FAQs and tips

## Features Guide

### Music Player
Located in the header, you can:
- Switch between 4 playlists (Fokus Trading, Seru & Motivasi, Lucu & Ceria, Epic Gaming)
- Adjust volume
- Mute/unmute music

### Daily Quests
Complete 4 daily missions:
- Transaksi Pertama (Make first trade)
- Transaksi Menang (Make at least 1 winning trade)
- Master Disiplin (Hit stop loss or 4 trades)
- Hari Menguntungkan (Positive day)

### Trophy System
Earn trophies by completing quests. Each trophy has:
- Unique emoji icon
- Rarity level (Common, Rare, Epic, Legendary)
- Collection date
- Description

### Level & XP
- Earn XP from completed trades
- Advance levels to unlock achievements
- Track your progress in Profile Dashboard

## Data Storage

All data is stored locally in your browser using localStorage:
- `tradingData`: All transaction records
- `trophies`: Collected trophies
- `userSettings`: Your preferences

You can export all data from Settings to backup or transfer.

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New" → "Project"
4. Select your GitHub repository
5. Click "Deploy"

The app will be live at: `https://trading-journal-app.vercel.app`

### Deploy Elsewhere

```bash
# Build for production
pnpm run build

# Start production server
pnpm start
```

## Development

```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Start production build locally
pnpm start

# Run linting
pnpm lint
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## File Structure

```
trading-journal-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── DailyQuests.tsx
│   ├── Settings.tsx
│   ├── HelpCenter.tsx
│   ├── TrophyCollection.tsx
│   ├── BackgroundMusic.tsx
│   ├── SplashScreen.tsx
│   └── ... (other components)
├── lib/
│   ├── types.ts
│   ├── calculations.ts
│   └── utils.ts
├── public/
└── package.json
```

## Tips for Success

1. **Consistency**: Log your trades daily for accurate tracking
2. **Set Realistic Targets**: Your daily target and loss limits should be achievable
3. **Review Regularly**: Check weekly reports to identify patterns
4. **Complete Quests**: Try to complete daily quests for motivation
5. **Backup Data**: Export your data regularly as backup

## Future Enhancements

Potential features for future versions:
- Cloud sync with backend database
- Multiple account profiles
- Advanced charting and analysis
- Mobile app version
- Real-time trade notifications
- Integration with trading platforms

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Disclaimer

This application is for tracking and educational purposes only. It is not financial advice. Always consult with a financial advisor before making trading decisions.

---

**Happy Trading! Success requires consistency, discipline, and continuous learning.**
