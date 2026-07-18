'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Trophy } from '@/lib/types';
import { Award, TrendingUp, Zap, Crown } from 'lucide-react';

interface ProfileDashboardProps {
  totalTrades: number;
  totalProfit: number;
  winRate: number;
  trophies: Trophy[];
  level: number;
  totalXP: number;
  weeklyData: any[];
}

export default function ProfileDashboard({
  totalTrades,
  totalProfit,
  winRate,
  trophies,
  level,
  totalXP,
  weeklyData,
}: ProfileDashboardProps) {
  const trophyByRarity = {
    common: trophies.filter(t => t.rarity === 'common').length,
    rare: trophies.filter(t => t.rarity === 'rare').length,
    epic: trophies.filter(t => t.rarity === 'epic').length,
    legendary: trophies.filter(t => t.rarity === 'legendary').length,
  };

  const rarityData = [
    { name: 'Umum', value: trophyByRarity.common, color: '#64748b' },
    { name: 'Langka', value: trophyByRarity.rare, color: '#06b6d4' },
    { name: 'Epic', value: trophyByRarity.epic, color: '#a855f7' },
    { name: 'Legendaris', value: trophyByRarity.legendary, color: '#f59e0b' },
  ];

  const stats = [
    { label: 'Total Transaksi', value: totalTrades, icon: Trophy, color: 'text-cyan-400' },
    { label: 'Total Profit/Loss', value: `$${totalProfit}`, icon: TrendingUp, color: totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400' },
    { label: 'Win Rate', value: `${winRate.toFixed(1)}%`, icon: Award, color: 'text-yellow-400' },
    { label: 'Total Trophy', value: trophies.length, icon: Crown, color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 rounded-xl p-8"
      >
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-4xl">
            ⭐
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2">Level {level} Trader</h2>
            <p className="text-slate-300">Total XP: {totalXP.toLocaleString()}</p>
            <div className="w-full bg-slate-700 rounded-full h-3 mt-3">
              <motion.div
                animate={{ width: `${(totalXP % 1000) / 10}%` }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-3 rounded-full"
              />
            </div>
            <p className="text-xs text-slate-400 mt-2">{totalXP % 1000}/1000 XP hingga level berikutnya</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-400 font-semibold">{stat.label}</p>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800 rounded-lg p-6 border border-slate-700"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Performa Mingguan</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404854" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
              <Legend />
              <Bar dataKey="profit" fill="#06b6d4" name="Profit/Loss" />
              <Bar dataKey="trades" fill="#a855f7" name="Transaksi" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Trophy Rarity Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800 rounded-lg p-6 border border-slate-700"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Distribusi Trophy</h3>
          {trophies.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={rarityData.filter(d => d.value > 0)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {rarityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center">
              <p className="text-slate-400">Belum ada trophy. Selesaikan misi harian untuk mulai!</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Trophy Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800 rounded-lg p-6 border border-slate-700"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Ringkasan Trophy</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {rarityData.map((rarity, idx) => (
            <div key={idx} className="bg-slate-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">
                {rarity.name === 'Umum' && '⚪'}
                {rarity.name === 'Langka' && '🔵'}
                {rarity.name === 'Epic' && '🟣'}
                {rarity.name === 'Legendaris' && '🟡'}
              </div>
              <p className="text-slate-400 text-sm font-semibold mb-1">{rarity.name}</p>
              <p className="text-2xl font-bold" style={{ color: rarity.color }}>
                {rarity.value}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
