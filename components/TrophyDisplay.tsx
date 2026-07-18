'use client';

import { motion } from 'framer-motion';
import { Trophy } from '@/lib/types';

interface TrophyDisplayProps {
  trophy: Trophy;
}

export default function TrophyDisplay({ trophy }: TrophyDisplayProps) {
  const rarityColors = {
    common: 'from-slate-400 to-slate-500',
    rare: 'from-blue-400 to-cyan-500',
    epic: 'from-purple-400 to-pink-500',
    legendary: 'from-yellow-400 to-orange-500',
  };

  const rarityBorders = {
    common: 'border-slate-400',
    rare: 'border-cyan-400',
    epic: 'border-pink-400',
    legendary: 'border-yellow-400',
  };

  const rarityLabels = {
    common: 'Umum',
    rare: 'Langka',
    epic: 'Epic',
    legendary: 'Legendaris',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 10 }}
      whileTap={{ scale: 0.95 }}
      className={`relative h-32 rounded-lg border-2 ${rarityBorders[trophy.rarity]} overflow-hidden group cursor-pointer`}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${rarityColors[trophy.rarity]} opacity-20`} />

      {/* Trophy Content */}
      <div className="relative h-full flex flex-col items-center justify-center p-3 text-center">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl mb-2"
        >
          {trophy.icon}
        </motion.div>

        <p className="text-sm font-bold text-white line-clamp-2">{trophy.title}</p>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-xs font-semibold mt-1 px-2 py-1 rounded-full bg-gradient-to-r ${rarityColors[trophy.rarity]} text-white`}
        >
          {rarityLabels[trophy.rarity]}
        </motion.span>

        {/* Hover Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute inset-0 bg-gradient-to-br from-slate-900/95 to-slate-800/95 flex items-center justify-center text-center p-3 rounded-lg"
        >
          <div>
            <p className="text-xs text-slate-300 mb-1">{trophy.description}</p>
            <p className="text-xs text-slate-400">
              Diraih: {new Date(trophy.dateEarned).toLocaleDateString('id-ID')}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Shine Effect */}
      <motion.div
        animate={{ x: ['0%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
      />
    </motion.div>
  );
}
