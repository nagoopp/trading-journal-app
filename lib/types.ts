export interface Transaction {
  id: string;
  pair: string;
  direction: 'Buy' | 'Sell';
  result: 'Win' | 'Loss';
  profitLoss: number;
  entryTime: string;
  reason: string;
}

export interface PsychologicalEval {
  condition?: 'Fresh' | 'Tired' | 'Emotional';
  revengeTrade?: boolean;
  revengeTradeNote?: string;
  fomoEntry?: boolean;
  fomoEntryNote?: string;
  overrideRule?: boolean;
  overrideRuleNote?: string;
  emotionEntry?: 1 | 2 | 3 | 4 | 5;
  emotionExit?: 1 | 2 | 3 | 4 | 5;
  successfulStop4?: boolean;
  successfulStopMaxLoss?: boolean;
}

export interface DailyData {
  date: string;
  transactions: Transaction[];
  psychological: PsychologicalEval;
}

export interface WeeklyStats {
  totalProfit: number;
  tradingDays: number;
  targetHitDays: number;
  maxLossDays: number;
  winRate: number;
  averageRR: number;
  totalTrades: number;
  winTrades: number;
}

export interface DangerPatterns {
  overrideCount: number;
  revengeCount: number;
  noReasonCount: number;
  warnings: string[];
}

export interface Trophy {
  id: string;
  questId: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  dateEarned: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface TrophyCollection {
  trophies: Trophy[];
  totalCount: number;
  lastUpdated: string;
}
