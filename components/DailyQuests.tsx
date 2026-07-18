'use client';

import { motion } from 'framer-motion';
import { DailyData } from '@/lib/types';
import { CheckCircle2, Circle, Zap, Target, Shield } from 'lucide-react';
import { calculateDailyStats } from '@/lib/calculations';

interface Quest {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  condition: (data: DailyData | undefined) => boolean;
  color: string;
  reward: string;
}

const DAILY_QUESTS: Quest[] = [
  {
    id: 'first-trade',
    title: 'Transaksi Pertama',
    description: 'Eksekusi transaksi pertama hari ini',
    icon: <Zap className="w-5 h-5" />,
    condition: (data) => (data?.transactions.length ?? 0) >= 1,
    color: 'from-blue-500 to-cyan-500',
    reward: '🎯 +10 XP',
  },
  {
    id: 'win-trade',
    title: 'Transaksi Menang',
    description: 'Dapatkan minimal 1 transaksi menang',
    icon: <Target className="w-5 h-5" />,
    condition: (data) => (data?.transactions.filter(t => t.result === 'win').length ?? 0) >= 1,
    color: 'from-emerald-500 to-green-500',
    reward: '✨ +15 XP',
  },
  {
    id: 'stop-loss',
    title: 'Master Disiplin',
    description: 'Berhenti trading saat batas tercapai',
    icon: <Shield className="w-5 h-5" />,
    condition: (data) => {
      const stats = calculateDailyStats(data?.transactions ?? []);
      return stats.totalPL <= -92 || (data?.transactions.length ?? 0) >= 4;
    },
    color: 'from-purple-500 to-pink-500',
    reward: '🛡️ +25 XP',
  },
  {
    id: 'positive-day',
    title: 'Hari Menguntungkan',
    description: 'Akhiri hari dengan P/L positif',
    icon: <CheckCircle2 className="w-5 h-5" />,
    condition: (data) => {
      const stats = calculateDailyStats(data?.transactions ?? []);
      return stats.totalPL > 0;
    },
    color: 'from-yellow-500 to-orange-500',
    reward: '🏆 +20 XP',
  },
];

export interface DailyQuestsProps {
  todayData: DailyData | undefined;
}

export default function DailyQuests({ todayData }: DailyQuestsProps) {
  const completedQuests = DAILY_QUESTS.filter(q => q.condition(todayData));
  const totalReward = completedQuests.length * 15 + 10;

  return (
    <div className="space-y-3">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-4"
      >
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Misi Harian
        </h3>
        <motion.div
          animate={completedQuests.length > 0 ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-3 py-1 rounded-full text-sm font-semibold text-yellow-300"
        >
          {completedQuests.length}/{DAILY_QUESTS.length}
        </motion.div>
      </motion.div>

      <div className="space-y-2">
        {DAILY_QUESTS.map((quest, idx) => {
          const isCompleted = quest.condition(todayData);

          return (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-3 rounded-lg border-2 transition-all ${
                isCompleted
                  ? `bg-gradient-to-r ${quest.color} bg-opacity-10 border-transparent`
                  : 'border-slate-700/50 bg-slate-800/20 hover:border-slate-600/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  animate={isCompleted ? { scale: [1, 1.2, 1], rotate: 360 } : {}}
                  transition={{ duration: 0.6 }}
                  className={`mt-0.5 ${isCompleted ? 'text-emerald-400' : 'text-slate-500'}`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </motion.div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <motion.div
                      animate={isCompleted ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                      className={isCompleted ? 'text-xl' : 'text-slate-400'}
                    >
                      {quest.icon}
                    </motion.div>
                    <p className={`font-semibold text-sm ${isCompleted ? 'text-slate-100' : 'text-slate-300'}`}>
                      {quest.title}
                    </p>
                  </div>
                  <p className="text-xs text-slate-400">{quest.description}</p>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isCompleted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="text-right whitespace-nowrap"
                >
                  <p className="text-xs font-bold text-yellow-400">{quest.reward}</p>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-3 text-center"
      >
        <p className="text-xs text-slate-400 mb-1">HADIAH MISI HARI INI</p>
        <motion.p
          animate={completedQuests.length > 0 ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold text-purple-300"
        >
          +{totalReward} XP
        </motion.p>
      </motion.div>
    </div>
  );
}
