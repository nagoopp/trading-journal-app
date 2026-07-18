'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

export interface AchievementProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  onComplete?: () => void;
}

export default function Achievement({ title, description, icon, color, onComplete }: AchievementProps) {
  const [showParticles, setShowParticles] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowParticles(false);
      onComplete?.();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const Particles = () => (
    <>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200 - 100,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 1.5, delay: Math.random() * 0.3 }}
          className="pointer-events-none fixed"
        >
          <Sparkles className="w-4 h-4" style={{ color }} />
        </motion.div>
      ))}
    </>
  );

  return (
    <motion.div
      initial={{ scale: 0, y: 100, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0, y: -100, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
    >
      {showParticles && <Particles />}

      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 0.6,
          times: [0, 0.5, 1],
        }}
        className="bg-gradient-to-br p-1 rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${color}20, ${color}40)`,
          border: `2px solid ${color}`,
        }}
      >
        <div className="bg-slate-900 rounded-2xl p-8 text-center max-w-sm">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="text-6xl mb-4 inline-block"
          >
            {icon}
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-white mb-2"
          >
            {title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-slate-300 mb-4"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 1, duration: 2.5, ease: 'easeInOut' }}
            className="h-1 bg-gradient-to-r rounded-full"
            style={{
              background: `linear-gradient(90deg, ${color}, ${color}80)`,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
