'use client';

import { motion } from 'framer-motion';
import { Trophy } from '@/lib/types';
import TrophyDisplay from './TrophyDisplay';
import { Award, Trophy as TrophyIcon } from 'lucide-react';

interface TrophyCollectionProps {
  trophies: Trophy[];
}

export default function TrophyCollection({ trophies }: TrophyCollectionProps) {
  const totalCount = trophies.length;

  const rarityGroups = {
    legendary: trophies.filter(t => t.rarity === 'legendary'),
    epic: trophies.filter(t => t.rarity === 'epic'),
    rare: trophies.filter(t => t.rarity === 'rare'),
    common: trophies.filter(t => t.rarity === 'common'),
  };

  const rarityStats = {
    legendary: {
      label: 'Legendaris',
      color: 'from-yellow-400 to-orange-500',
      textColor: 'text-yellow-400',
      count: rarityGroups.legendary.length,
    },
    epic: {
      label: 'Epic',
      color: 'from-purple-400 to-pink-500',
      textColor: 'text-purple-400',
      count: rarityGroups.epic.length,
    },
    rare: {
      label: 'Langka',
      color: 'from-blue-400 to-cyan-500',
      textColor: 'text-cyan-400',
      count: rarityGroups.rare.length,
    },
    common: {
      label: 'Umum',
      color: 'from-slate-400 to-slate-500',
      textColor: 'text-slate-400',
      count: rarityGroups.common.length,
    },
  };

  return (
    <div className="space-y-6">
      {/* Trophy Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {/* Total Trophies */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 p-4 text-center"
        >
          <div className="text-4xl mb-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🏆
            </motion.span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Total Trophy</p>
          <motion.p
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            className="text-3xl font-bold text-cyan-400"
          >
            {totalCount}
          </motion.p>
        </motion.div>

        {/* Rarity Stats */}
        {Object.entries(rarityStats).map(([rarity, stat], idx) => (
          <motion.div
            key={rarity}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 p-4 text-center"
          >
            <p className="text-slate-400 text-xs mb-2">{stat.label}</p>
            <motion.p
              animate={stat.count > 0 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              className={`text-2xl font-bold ${stat.textColor}`}
            >
              {stat.count}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>

      {/* Trophy Grid by Rarity */}
      {totalCount === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg border border-slate-700"
        >
          <TrophyIcon className="w-16 h-16 text-slate-600 mx-auto mb-4 opacity-50" />
          <p className="text-slate-400 text-lg mb-2">Belum Ada Trophy</p>
          <p className="text-slate-500 text-sm">Selesaikan misi harian untuk mengumpulkan trophy!</p>
        </motion.div>
      ) : (
        <>
          {/* Legendary Trophies */}
          {rarityGroups.legendary.length > 0 && (
            <div>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg font-bold text-yellow-400 mb-4 flex items-center gap-2"
              >
                <span className="text-2xl">👑</span>
                Trophy Legendaris ({rarityGroups.legendary.length})
              </motion.h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {rarityGroups.legendary.map((trophy, idx) => (
                  <motion.div
                    key={trophy.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <TrophyDisplay trophy={trophy} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* Epic Trophies */}
          {rarityGroups.epic.length > 0 && (
            <div>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2"
              >
                <span className="text-2xl">⚡</span>
                Trophy Epic ({rarityGroups.epic.length})
              </motion.h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {rarityGroups.epic.map((trophy, idx) => (
                  <motion.div
                    key={trophy.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <TrophyDisplay trophy={trophy} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* Rare Trophies */}
          {rarityGroups.rare.length > 0 && (
            <div>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2"
              >
                <span className="text-2xl">✨</span>
                Trophy Langka ({rarityGroups.rare.length})
              </motion.h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {rarityGroups.rare.map((trophy, idx) => (
                  <motion.div
                    key={trophy.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <TrophyDisplay trophy={trophy} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* Common Trophies */}
          {rarityGroups.common.length > 0 && (
            <div>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg font-bold text-slate-400 mb-4 flex items-center gap-2"
              >
                <span className="text-2xl">🎯</span>
                Trophy Umum ({rarityGroups.common.length})
              </motion.h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {rarityGroups.common.map((trophy, idx) => (
                  <motion.div
                    key={trophy.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <TrophyDisplay trophy={trophy} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
