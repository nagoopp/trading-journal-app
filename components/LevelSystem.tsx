'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, Target, Award } from 'lucide-react';

interface LevelSystemProps {
  totalTrades: number;
  weeklyProfit: number;
  daysTraded: number;
  winRate: number;
}

export interface LevelInfo {
  level: number;
  title: string;
  icon: React.ReactNode;
  color: string;
  minTrades: number;
  description: string;
}

const LEVELS: LevelInfo[] = [
  {
    level: 1,
    title: 'Trader Pemula',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
    minTrades: 0,
    description: 'Baru memulai perjalanan Anda',
  },
  {
    level: 2,
    title: 'Trader Konsisten',
    icon: <Target className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500',
    minTrades: 15,
    description: 'Trading dengan tujuan',
  },
  {
    level: 3,
    title: 'Trader Disiplin',
    icon: <Shield className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500',
    minTrades: 40,
    description: 'Ahli dalam disiplin',
  },
  {
    level: 4,
    title: 'Trader Elite',
    icon: <Award className="w-6 h-6" />,
    color: 'from-yellow-500 to-orange-500',
    minTrades: 80,
    description: 'Status legendaris tercapai',
  },
];

export function getLevelInfo(totalTrades: number): LevelInfo {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalTrades >= LEVELS[i].minTrades) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

export function getProgressToNextLevel(totalTrades: number): { current: number; next: number; percentage: number } {
  const currentLevel = getLevelInfo(totalTrades);
  const nextLevel = LEVELS[Math.min(currentLevel.level, LEVELS.length - 1)];
  const nextNextLevel = LEVELS[Math.min(currentLevel.level, LEVELS.length - 1)];

  if (currentLevel.level === LEVELS.length) {
    return { current: totalTrades, next: totalTrades, percentage: 100 };
  }

  const levelThreshold = nextNextLevel?.minTrades || totalTrades;
  const prevLevelThreshold = currentLevel?.minTrades || 0;
  const range = levelThreshold - prevLevelThreshold;
  const progress = totalTrades - prevLevelThreshold;
  const percentage = Math.min(100, Math.round((progress / range) * 100));

  return { current: totalTrades, next: levelThreshold, percentage };
}

export default function LevelSystem({ totalTrades, weeklyProfit, daysTraded, winRate }: LevelSystemProps) {
  const levelInfo = getLevelInfo(totalTrades);
  const progress = getProgressToNextLevel(totalTrades);

  const isLevelUp = totalTrades > 0 && totalTrades % 15 === 0 && totalTrades !== 0;

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r p-1 rounded-xl"
        style={{
          background: `linear-gradient(135deg, ${levelInfo.color.split(' ').join(', ')})`,
        }}
      >
        <div className="bg-slate-900 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <motion.p className="text-slate-400 text-sm">LEVEL SAAT INI</motion.p>
              <motion.h2 className="text-3xl font-bold text-white">{levelInfo.title}</motion.h2>
              <p className="text-slate-400 text-sm mt-1">{levelInfo.description}</p>
            </div>
            <motion.div
              animate={{
                scale: isLevelUp ? [1, 1.2, 1] : 1,
                rotate: isLevelUp ? [0, 10, -10, 0] : 0,
              }}
              transition={{
                duration: 0.6,
                times: isLevelUp ? [0, 0.5, 1] : undefined,
              }}
              className={`text-5xl ${
                isLevelUp ? 'animate-bounce' : ''
              }`}
            >
              {levelInfo.icon}
            </motion.div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">PROGRES KE LEVEL BERIKUTNYA</span>
              <span className="text-emerald-400 font-semibold">{progress.percentage}%</span>
            </div>
            <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress.percentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
              />
            </div>
            <p className="text-xs text-slate-500 text-center mt-2">
              {totalTrades} / {progress.next} transaksi
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50"
        >
          <p className="text-slate-400 text-xs">PROFIT MINGGUAN</p>
          <motion.p
            animate={weeklyProfit > 0 ? { scale: [1, 1.1, 1] } : {}}
            transition={{ delay: 0.3 }}
            className={`text-2xl font-bold ${weeklyProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}
          >
            ${weeklyProfit > 0 ? '+' : ''}{weeklyProfit.toFixed(0)}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50"
        >
          <p className="text-slate-400 text-xs">TINGKAT MENANG</p>
          <motion.p
            animate={winRate > 50 ? { scale: [1, 1.1, 1] } : {}}
            transition={{ delay: 0.3 }}
            className={`text-2xl font-bold ${winRate > 50 ? 'text-emerald-400' : 'text-orange-400'}`}
          >
            {winRate.toFixed(0)}%
          </motion.p>
        </motion.div>
      </div>

      <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
        <p className="text-slate-400 text-xs mb-2">PENCAPAIAN LEVEL</p>
        <div className="space-y-2">
          {LEVELS.map((level, idx) => {
            const isCurrentOrPassed = level.level <= levelInfo.level;
            return (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-center gap-2 text-xs p-2 rounded transition-colors ${
                  isCurrentOrPassed ? 'text-slate-300 bg-slate-700/20' : 'text-slate-600'
                }`}
              >
                <motion.div
                  animate={isCurrentOrPassed ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {level.icon}
                </motion.div>
                <span>
                  <strong>Level {level.level}:</strong> {level.title} ({level.minTrades}+ transaksi)
                </span>
                {isCurrentOrPassed && <span className="ml-auto text-emerald-400">✓</span>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
