import { Transaction, DailyData, WeeklyStats, DangerPatterns } from './types';
import { format } from 'date-fns';

export function calculateDailyStats(transactions: Transaction[]) {
  const totalProfit = transactions.reduce((sum, t) => sum + t.profitLoss, 0);
  const wins = transactions.filter(t => t.result === 'Win').length;
  const losses = transactions.filter(t => t.result === 'Loss').length;
  const winRate = transactions.length > 0 ? (wins / transactions.length) * 100 : 0;

  // Calculate realized RR based on actual profit/loss values
  const totalWinValue = transactions
    .filter(t => t.result === 'Win')
    .reduce((sum, t) => sum + t.profitLoss, 0);
  const totalLossValue = Math.abs(
    transactions
      .filter(t => t.result === 'Loss')
      .reduce((sum, t) => sum + t.profitLoss, 0)
  );
  const avgRR = losses > 0 ? totalWinValue / (totalLossValue / losses) : totalWinValue || 0;

  return {
    totalProfit,
    wins,
    losses,
    winRate,
    avgRR,
    count: transactions.length
  };
}

export function calculateWeeklyStats(
  data: DailyData[],
  weekStart: Date,
  weekEnd: Date
): WeeklyStats {
  const weekDateStart = format(weekStart, 'yyyy-MM-dd');
  const weekDateEnd = format(weekEnd, 'yyyy-MM-dd');

  const weekData = data.filter(d => {
    const date = d.date;
    return date >= weekDateStart && date <= weekDateEnd;
  });

  let totalProfit = 0;
  let tradingDays = 0;
  let targetHitDays = 0;
  let maxLossDays = 0;
  let totalTrades = 0;
  let totalWins = 0;

  let totalRRSum = 0;
  let daysWithTrades = 0;

  weekData.forEach(day => {
    if (day.transactions.length > 0) {
      tradingDays++;
      const stats = calculateDailyStats(day.transactions);
      
      totalProfit += stats.totalProfit;
      totalTrades += stats.count;
      totalWins += stats.wins;

      // Check if target hit ($130)
      if (stats.totalProfit >= 130) {
        targetHitDays++;
      }

      // Check if max loss hit ($-92)
      if (stats.totalProfit <= -92) {
        maxLossDays++;
      }

      if (stats.count > 0) {
        totalRRSum += stats.avgRR;
        daysWithTrades++;
      }
    }
  });

  const winRate = totalTrades > 0 ? (totalWins / totalTrades) * 100 : 0;
  const averageRR = daysWithTrades > 0 ? totalRRSum / daysWithTrades : 0;

  return {
    totalProfit,
    tradingDays,
    targetHitDays,
    maxLossDays,
    winRate,
    averageRR,
    totalTrades,
    winTrades: totalWins
  };
}

export function detectDangerPatterns(
  data: DailyData[],
  weekStart: Date,
  weekEnd: Date
): DangerPatterns {
  const weekDateStart = format(weekStart, 'yyyy-MM-dd');
  const weekDateEnd = format(weekEnd, 'yyyy-MM-dd');

  const weekData = data.filter(d => {
    const date = d.date;
    return date >= weekDateStart && date <= weekDateEnd;
  });

  let overrideCount = 0;
  let revengeCount = 0;
  let noReasonCount = 0;
  const warnings: string[] = [];

  weekData.forEach((day, dayIndex) => {
    // Check for override rule
    if (day.psychological.overrideRule) {
      overrideCount++;
    }

    // Check for revenge trade
    if (day.psychological.revengeTrade) {
      revengeCount++;
    }

    // Check for entries without clear reason
    day.transactions.forEach(t => {
      if (!t.reason || t.reason.trim().length < 5) {
        noReasonCount++;
      }
    });
  });

  if (overrideCount >= 2) {
    warnings.push(`⚠️ Risk Override: Rules broken ${overrideCount}x this week - CRITICAL!`);
  }

  if (revengeCount >= 1) {
    warnings.push(`⚠️ Revenge Trading: Detected ${revengeCount}x - Hurts psychology`);
  }

  if (noReasonCount >= 2) {
    warnings.push(`⚠️ No Analysis: ${noReasonCount} trades without clear reason`);
  }

  return {
    overrideCount,
    revengeCount,
    noReasonCount,
    warnings
  };
}
