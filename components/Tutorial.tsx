'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, BookOpen } from 'lucide-react';

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  tips: string[];
  icon: string;
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 1,
    title: 'Selamat Datang di Jurnal Trading',
    description: 'Aplikasi ini dirancang untuk membantu Anda tracking transaksi trading dan meningkatkan disiplin sebagai trader profesional.',
    tips: [
      'Jurnal trading adalah tool esensial untuk improvement',
      'Consistency adalah kunci kesuksesan jangka panjang',
      'Data yang akurat = decision making yang lebih baik'
    ],
    icon: '📖'
  },
  {
    id: 2,
    title: 'Cara Menambah Transaksi',
    description: 'Klik "Tambah Transaksi" untuk mencatat setiap trading Anda. Pilih arah (Buy/Sell), hasil (Win/Loss), dan P/L.',
    tips: [
      'Selalu record transaksi secepatnya setelah trade selesai',
      'Jangan skip transaksi yang loss - itu penting untuk learning',
      'Catat juga alasan Anda enter dan exit'
    ],
    icon: '💱'
  },
  {
    id: 3,
    title: 'Target & Misi Harian',
    description: 'Setiap hari ada 4 misi yang bisa Anda selesaikan untuk earn points dan unlock rewards.',
    tips: [
      'Transaksi Pertama: buat 1 transaksi',
      'Transaksi Menang: buat minimal 1 transaksi menang',
      'Master Disiplin: ikuti stop loss atau 4 transaksi',
      'Hari Menguntungkan: P/L harian harus positif'
    ],
    icon: '🎯'
  },
  {
    id: 4,
    title: 'Level System & XP',
    description: 'Dapatkan XP setiap kali selesaikan misi. Kumpulkan XP untuk naik level dan unlock fitur eksklusif.',
    tips: [
      'Fokus pada consistency, bukan big wins',
      'Level reflect progress Anda sebagai trader',
      'Setiap level membuka achievement baru'
    ],
    icon: '⭐'
  },
  {
    id: 5,
    title: 'Trophy Collection',
    description: 'Setiap misi yang selesai memberikan trophy. Kumpulkan trophy dengan berbagai rarity level (Umum, Langka, Epic, Legendaris).',
    tips: [
      'Trophy adalah bukti progress Anda',
      'Semakin banyak misi, semakin banyak trophy',
      'Rarity trophy menunjukkan difficulty level'
    ],
    icon: '🏆'
  },
  {
    id: 6,
    title: 'Fitur Analytics & Laporan',
    description: 'Lihat statistik mingguan Anda di tab "Mingguan" dan laporan detail di tab "Laporan".',
    tips: [
      'Review stats setiap akhir minggu',
      'Identifikasi pattern dan improvement area',
      'Gunakan data untuk optimize strategy'
    ],
    icon: '📊'
  },
  {
    id: 7,
    title: 'Background Music & Settings',
    description: 'Pilih dari 4 playlist musik untuk fokus, atau customize settings sesuai preferensi Anda.',
    tips: [
      'Musik dapat meningkatkan focus dan mood',
      'Coba different playlists untuk find your vibe',
      'Backup data Anda secara regular di Settings'
    ],
    icon: '🎵'
  },
  {
    id: 8,
    title: 'Siap Memulai!',
    description: 'Sekarang Anda siap untuk mulai tracking trading Anda. Ingat: disiplin dan consistency adalah kunci.',
    tips: [
      'Mulai dengan Harian tab',
      'Input minimal 1 transaksi untuk hari ini',
      'Check progress di trophy collection'
    ],
    icon: '🚀'
  }
];

interface TutorialProps {
  onComplete: () => void;
}

export default function Tutorial({ onComplete }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = TUTORIAL_STEPS[currentStep];

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 shadow-2xl w-full max-w-2xl overflow-hidden"
      >
        {/* Header Progress */}
        <div className="bg-slate-800/95 backdrop-blur border-b border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Tutorial Interaktif</h2>
            </div>
            <button
              onClick={handleSkip}
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              Skip
            </button>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <motion.div
              animate={{ width: `${((currentStep + 1) / TUTORIAL_STEPS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-2 rounded-full"
            />
          </div>
          <p className="text-slate-400 text-sm mt-2">
            Step {currentStep + 1} dari {TUTORIAL_STEPS.length}
          </p>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-8 space-y-6"
          >
            {/* Icon */}
            <div className="text-center">
              <div className="text-6xl mb-4">{step.icon}</div>
            </div>

            {/* Title */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-slate-300 text-lg">{step.description}</p>
            </div>

            {/* Tips */}
            <div className="bg-slate-700/30 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-slate-300 mb-3">Tips:</p>
              {step.tips.map((tip, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-3 text-slate-300"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{tip}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer Navigation */}
        <div className="bg-slate-800/95 backdrop-blur border-t border-slate-700 p-6 flex gap-3">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              currentStep === 0
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-50'
                : 'bg-slate-700 text-white hover:bg-slate-600'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Sebelumnya
          </button>

          <div className="flex-1" />

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 rounded-lg text-white font-semibold transition-all"
          >
            {currentStep === TUTORIAL_STEPS.length - 1 ? 'Selesai' : 'Lanjut'}
            {currentStep < TUTORIAL_STEPS.length - 1 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
