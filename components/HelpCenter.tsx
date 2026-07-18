'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen, HelpCircle, Zap } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: '1',
    category: 'Fitur Dasar',
    question: 'Bagaimana cara menambah transaksi trading?',
    answer: 'Klik tombol "Tambah Transaksi" di halaman Harian, pilih arah trading (Buy/Sell), hasil transaksi (Win/Loss), dan masukkan P/L Anda. Tekan "Simpan Transaksi" untuk menyimpan.',
  },
  {
    id: '2',
    category: 'Fitur Dasar',
    question: 'Apa itu misi harian?',
    answer: 'Misi harian adalah target yang harus dicapai setiap hari untuk meningkatkan level dan mendapatkan trophy. Ada 4 misi: transaksi pertama, transaksi menang, master disiplin, dan hari menguntungkan.',
  },
  {
    id: '3',
    category: 'Trophy',
    question: 'Bagaimana cara mendapatkan trophy?',
    answer: 'Trophy akan otomatis diberikan ketika Anda menyelesaikan misi harian. Setiap trophy memiliki rarity level (Umum, Langka, Epic, Legendaris).',
  },
  {
    id: '4',
    category: 'Trophy',
    question: 'Bisa kumpulin trophy sebanyak apa?',
    answer: 'Tidak ada batas jumlah trophy. Semakin banyak Anda menyelesaikan misi harian, semakin banyak trophy yang bisa Anda kumpulkan.',
  },
  {
    id: '5',
    category: 'Level System',
    question: 'Bagaimana sistem level bekerja?',
    answer: 'Setiap misi yang diselesaikan akan memberikan poin pengalaman (XP). Kumpulkan XP untuk naik level dan buka reward eksklusif.',
  },
  {
    id: '6',
    category: 'Data',
    question: 'Bagaimana cara backup data saya?',
    answer: 'Buka Pengaturan, klik "Export Data (JSON)" untuk mendownload file backup semua data trading dan trophy Anda.',
  },
  {
    id: '7',
    category: 'Data',
    question: 'Bagaimana cara restore data dari backup?',
    answer: 'Buka Pengaturan, klik "Import Data", pilih file JSON yang sudah didownload sebelumnya, dan data akan di-restore secara otomatis.',
  },
  {
    id: '8',
    category: 'Musik',
    question: 'Bagaimana cara mengubah musik latar?',
    answer: 'Klik tombol musik di header sebelah "Jurnal Trading". Pilih dari 4 playlist berbeda: Fokus Trading, Seru & Motivasi, Lucu & Ceria, atau Epic Gaming.',
  },
];

interface HelpCenterProps {
  onClose: () => void;
}

export default function HelpCenter({ onClose }: HelpCenterProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', ...new Set(FAQ_DATA.map(item => item.category))];
  const filteredFAQ = selectedCategory === 'Semua' 
    ? FAQ_DATA 
    : FAQ_DATA.filter(item => item.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 shadow-2xl w-full max-w-3xl max-h-96 overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-800/95 backdrop-blur border-b border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Help Center</h2>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-3">
            {filteredFAQ.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-700/30 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-slate-700/50 transition-all"
                >
                  <div className="flex items-center gap-3 text-left">
                    <HelpCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-white font-semibold">{item.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      expandedId === item.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {expandedId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-slate-800/50 px-4 py-3 border-t border-slate-600"
                    >
                      <p className="text-slate-300 leading-relaxed">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Tips Section */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
            <div className="flex gap-3">
              <Zap className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-emerald-400 mb-2">Tips & Trik</h3>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>- Consistent trading adalah kunci kesuksesan jangka panjang</li>
                  <li>- Selalu terapkan stop loss untuk mengelola risiko</li>
                  <li>- Review jurnal trading setiap akhir minggu</li>
                  <li>- Gunakan musik latar untuk meningkatkan fokus</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-800/95 backdrop-blur border-t border-slate-700 p-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 rounded-lg text-white font-semibold transition-all"
          >
            Tutup
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
