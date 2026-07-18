'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onEnter: () => void;
}

export default function SplashScreen({ onEnter }: SplashScreenProps) {
  const quotes = [
    "Jangan pernah mengulangi kegagalan kemarin",
    "Disiplin adalah kunci kesuksesan trading",
    "Setiap hari adalah kesempatan baru",
    "Kontrol emosi, kontrol keuntungan"
  ];

  const [randomQuote, setRandomQuote] = useState(quotes[0]);

  useEffect(() => {
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-[9999] flex items-center justify-center"
    >
      {/* Background animated circles */}
      <motion.div
        initial={{ opacity: 0.1 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute top-20 left-10 w-64 h-64 bg-cyan-500 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0.1 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
        className="absolute bottom-20 right-10 w-80 h-80 bg-emerald-500 rounded-full blur-3xl"
      />

      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* Main Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="text-7xl inline-block"
          >
            📊
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Trading Journal
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg text-slate-400 mb-12"
        >
          Sistem Manajemen Disiplin Trading Profesional
        </motion.p>

        {/* Quote Section */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
          className="mb-12 relative"
        >
          <div className="relative bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 border border-emerald-500/30 rounded-2xl p-8 backdrop-blur-sm">
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-2xl"
            >
              ✨
            </motion.div>

            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.2em' }}
              animate={{ opacity: 1, letterSpacing: '0.02em' }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-xl md:text-2xl font-semibold text-emerald-300 leading-relaxed"
            >
              "{randomQuote}"
            </motion.p>

            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 right-1/2 transform translate-x-1/2 text-2xl"
            >
              ✨
            </motion.div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-slate-400 mb-12 text-sm md:text-base leading-relaxed"
        >
          Mulai hari ini dengan fokus penuh. Catat setiap transaksi, pantau psikologi trading, dan raih kesuksesan konsisten.
        </motion.p>

        {/* Enter Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="relative px-12 py-4 text-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all overflow-hidden group"
        >
          {/* Button background animation */}
          <motion.div
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-emerald-600 -z-10"
          />

          <span className="relative flex items-center justify-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl"
            >
              ✨
            </motion.span>
            Bismillah, Mulai Sekarang
            <motion.span
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl"
            >
              ✨
            </motion.span>
          </span>
        </motion.button>

        {/* Bottom decorative text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2 }}
          className="text-slate-500 text-xs mt-8"
        >
          💪 Konsistensi adalah kesuksesan • 📈 Tracking adalah power • 🎯 Fokus adalah senjata
        </motion.p>
      </div>

      {/* Floating particles */}
      {typeof window !== 'undefined' && [...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: -100,
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full blur-sm"
        />
      ))}
    </motion.div>
  );
}
