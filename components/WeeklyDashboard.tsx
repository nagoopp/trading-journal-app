'use client';

import { WeeklyStats, DangerPatterns } from '@/lib/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface WeeklyDashboardProps {
  stats: WeeklyStats;
  patterns: DangerPatterns;
  weeklyData: any[];
}

export default function WeeklyDashboard({ stats, patterns, weeklyData }: WeeklyDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="text-sm text-slate-400 mb-2">Weekly Profit</div>
          <div className={`text-4xl font-bold ${stats.totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            ${stats.totalProfit}
          </div>
          <div className="text-xs text-slate-500 mt-2">Target: $910/week (7 days × $130)</div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="text-sm text-slate-400 mb-2">Performance</div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Win Rate:</span>
              <span className="font-bold text-blue-400">{stats.winRate.toFixed(0)}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Trades:</span>
              <span className="font-bold text-cyan-400">{stats.totalTrades}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Avg RR:</span>
              <span className="font-bold text-purple-400">{stats.averageRR.toFixed(2)}:1</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <div className="text-sm text-slate-400 mb-2">Days Summary</div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Trading Days:</span>
              <span className="font-bold text-white">{stats.tradingDays}/7</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-emerald-400">Target Hit:</span>
              <span className="font-bold">{stats.targetHitDays}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-red-400">Max Loss Hit:</span>
              <span className="font-bold">{stats.maxLossDays}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Profit Chart */}
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <h3 className="text-lg font-semibold mb-4">Profit per Hari</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="date" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
              formatter={(value: any) => [`$${value}`, 'Profit']}
            />
            <Legend />
            <Bar dataKey="profit" fill="#10b981" name="Daily Profit" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Danger Patterns */}
      {patterns.warnings.length > 0 && (
        <div className="bg-red-900/30 border-2 border-red-600 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-red-400">⚠️ Deteksi Pola Bahaya</h3>
          <div className="space-y-2">
            {patterns.warnings.map((warning, idx) => (
              <div key={idx} className="text-red-200 text-sm flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>{warning}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {patterns.warnings.length === 0 && (
        <div className="bg-emerald-900/30 border-2 border-emerald-600 p-6 rounded-lg">
          <div className="text-emerald-200 text-sm flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Tidak ada pola bahaya terdeteksi. Disiplin trading bagus minggu ini!</span>
          </div>
        </div>
      )}
    </div>
  );
}
