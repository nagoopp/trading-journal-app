'use client';

import { useRef } from 'react';
import { DailyData, WeeklyStats, DangerPatterns } from '@/lib/types';
import { calculateDailyStats } from '@/lib/calculations';
import { format } from 'date-fns';

interface WeeklyReportProps {
  stats: WeeklyStats;
  patterns: DangerPatterns;
  data: DailyData[];
  weekStart: Date;
  weekEnd: Date;
}

export default function WeeklyReport({ stats, patterns, data, weekStart, weekEnd }: WeeklyReportProps) {
  const reportRef = useRef<HTMLDivElement>(null);

  // Filter data for this week
  const weekDateStart = format(weekStart, 'yyyy-MM-dd');
  const weekDateEnd = format(weekEnd, 'yyyy-MM-dd');
  const weekData = data.filter(d => d.date >= weekDateStart && d.date <= weekDateEnd);

  // Generate report text
  const generateReport = () => {
    let report = `📊 TRADING JOURNAL REPORT\n`;
    report += `Week of ${format(weekStart, 'MMM dd')} - ${format(weekEnd, 'MMM dd, yyyy')}\n`;
    report += `${'='.repeat(50)}\n\n`;

    // Performance Summary
    report += `📈 PERFORMANCE SUMMARY\n`;
    report += `Weekly Profit: $${stats.totalProfit}\n`;
    report += `Weekly Target: $910 (7 days × $130)\n`;
    report += `Target Achievement: ${((stats.totalProfit / 910) * 100).toFixed(1)}%\n`;
    report += `Win Rate: ${stats.winRate.toFixed(1)}%\n`;
    report += `Total Trades: ${stats.totalTrades}\n`;
    report += `Wins: ${stats.winTrades} | Losses: ${stats.totalTrades - stats.winTrades}\n`;
    report += `Average Risk/Reward: ${stats.averageRR.toFixed(2)}:1\n`;
    report += `Trading Days: ${stats.tradingDays}/7\n`;
    report += `\n`;

    // Daily Breakdown
    report += `📅 DAILY BREAKDOWN\n`;
    weekData.forEach(day => {
      if (day.transactions.length > 0) {
        const dailyStats = calculateDailyStats(day.transactions);
        report += `\n${format(new Date(day.date), 'dddd, MMM dd')}:\n`;
        report += `  P/L: $${dailyStats.totalProfit} | Trades: ${dailyStats.count} | Win Rate: ${dailyStats.winRate.toFixed(0)}%\n`;
        
        // Check for violations
        const violations: string[] = [];
        if (dailyStats.totalProfit <= -92) violations.push('Hit max loss limit');
        if (day.psychological.overrideRule) violations.push('Rule override');
        if (day.psychological.revengeTrade) violations.push('Revenge trade');
        
        day.transactions.forEach(t => {
          if (!t.reason || t.reason.trim().length < 5) {
            violations.push('Entry without clear reason');
          }
        });

        if (violations.length > 0) {
          report += `  ⚠️ Issues: ${violations.join(', ')}\n`;
        }

        // Psychological notes
        if (Object.keys(day.psychological).length > 0) {
          const psych = day.psychological;
          if (psych.condition) report += `  Condition: ${psych.condition}\n`;
          if (psych.emotionEntry) report += `  Entry Emotion: ${psych.emotionEntry}/5\n`;
        }
      }
    });
    report += `\n`;

    // Patterns Detected
    report += `🎯 PSYCHOLOGICAL PATTERNS DETECTED\n`;
    if (patterns.overrideCount > 0) {
      report += `• Rule Override: ${patterns.overrideCount}x\n`;
    }
    if (patterns.revengeCount > 0) {
      report += `• Revenge Trading: ${patterns.revengeCount}x\n`;
    }
    if (patterns.noReasonCount > 0) {
      report += `• Trades Without Clear Reason: ${patterns.noReasonCount}x\n`;
    }
    if (patterns.warnings.length === 0) {
      report += `✓ No critical patterns detected\n`;
    }
    report += `\n`;

    // Recommendations
    report += `💡 RECOMMENDATIONS FOR NEXT WEEK\n`;
    if (stats.totalProfit < 910) {
      report += `• Profit below target: Focus on trade quality over quantity\n`;
    }
    if (stats.winRate < 60) {
      report += `• Win rate below 60%: Evaluate setup criteria and entry timing\n`;
    } else {
      report += `• Good win rate (${stats.winRate.toFixed(1)}%): Maintain current strategy\n`;
    }
    if (patterns.overrideCount > 0) {
      report += `• Reduce size on override trades or stick to rules strictly\n`;
    }
    if (patterns.revengeCount > 0) {
      report += `• Take breaks after losses to reset psychology\n`;
    }
    if (stats.averageRR < 2.5) {
      report += `• Average RR is low: Focus on R:R setups with better reward potential\n`;
    } else {
      report += `• Great RR ratio (${stats.averageRR.toFixed(2)}:1): Continue this execution\n`;
    }
    report += `• Review daily reason logs - ensure all entries have clear analysis\n`;
    report += `\n`;

    report += `Generated: ${new Date().toLocaleString()}\n`;
    return report;
  };

  const reportText = generateReport();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reportText);
    alert('✓ Report copied to clipboard!');
  };

  const downloadReport = () => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(reportText));
    element.setAttribute('download', `trading-report-${format(weekStart, 'yyyy-MM-dd')}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Report Content */}
      <div
        ref={reportRef}
        className="bg-slate-800 p-8 rounded-lg border border-slate-700 whitespace-pre-wrap font-mono text-sm text-slate-300 overflow-x-auto"
      >
        {reportText}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={copyToClipboard}
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold transition-all"
        >
          📋 Copy to Clipboard
        </button>
        <button
          onClick={downloadReport}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold transition-all"
        >
          ⬇️ Download as TXT
        </button>
        <button
          onClick={() => {
            const markdown = reportText.replace(/\n/g, '\n');
            navigator.clipboard.writeText(markdown);
            alert('✓ Markdown copied!');
          }}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition-all"
        >
          📝 Copy as Markdown
        </button>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="text-xs text-slate-400 mb-2">Weekly P/L</div>
          <div className={`text-2xl font-bold ${stats.totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            ${stats.totalProfit}
          </div>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="text-xs text-slate-400 mb-2">Win Rate</div>
          <div className="text-2xl font-bold text-blue-400">{stats.winRate.toFixed(1)}%</div>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="text-xs text-slate-400 mb-2">Avg RR</div>
          <div className="text-2xl font-bold text-purple-400">{stats.averageRR.toFixed(2)}:1</div>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="text-xs text-slate-400 mb-2">Total Trades</div>
          <div className="text-2xl font-bold text-cyan-400">{stats.totalTrades}</div>
        </div>
      </div>
    </div>
  );
}
