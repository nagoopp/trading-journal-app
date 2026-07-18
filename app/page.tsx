'use client';

import { useState, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TransactionForm from '@/components/TransactionForm';
import DailyTransactions from '@/components/DailyTransactions';
import WeeklyDashboard from '@/components/WeeklyDashboard';
import WeeklyReport from '@/components/WeeklyReport';
import LevelSystem from '@/components/LevelSystem';
import Achievement from '@/components/Achievement';
import BackgroundMusic from '@/components/BackgroundMusic';
import SplashScreen from '@/components/SplashScreen';
import TrophyCollection from '@/components/TrophyCollection';
import Settings from '@/components/Settings';
import DataManager from '@/components/DataManager';
import HelpCenter from '@/components/HelpCenter';
import { Transaction, PsychologicalEval, DailyData, Trophy } from '@/lib/types';
import { calculateDailyStats, calculateWeeklyStats, detectDangerPatterns } from '@/lib/calculations';
import { Settings as SettingsIcon, HelpCircle } from 'lucide-react';

export default function TradingJournal() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [data, setData] = useState<DailyData[]>([]);
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'report' | 'trophy'>('daily');
  const [totalTrades, setTotalTrades] = useState(0);
  const [showAchievement, setShowAchievement] = useState<{ title: string; description: string; icon: string; color: string } | null>(null);
  const [hasEnteredJournal, setHasEnteredJournal] = useState(false);
  const [trophies, setTrophies] = useState<Trophy[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [userSettings, setUserSettings] = useState({
    dailyTarget: 130,
    maxLossLimit: 92,
    maxTrades: 4,
    theme: 'dark' as const,
    enableNotifications: true,
    currency: 'USD',
    language: 'id' as const,
  });

  // Load data from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('tradingData');
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load data:', e);
      }
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (data.length > 0) {
      localStorage.setItem('tradingData', JSON.stringify(data));
    }
  }, [data]);

  // Load settings from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('userSettings');
    if (stored) {
      try {
        setUserSettings(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load settings:', e);
      }
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
  }, [userSettings]);

  // Load trophies from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('trophies');
    if (stored) {
      try {
        setTrophies(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load trophies:', e);
      }
    }
  }, []);

  // Save trophies to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (trophies.length > 0) {
      localStorage.setItem('trophies', JSON.stringify(trophies));
    }
  }, [trophies]);

  const todayData = data.find(d => d.date === format(currentDate, 'yyyy-MM-dd'));

  const addTransaction = (transaction: Transaction) => {
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    setData(prev => {
      const existing = prev.find(d => d.date === dateStr);
      const newData = existing
        ? prev.map(d =>
          d.date === dateStr
            ? { ...d, transactions: [...d.transactions, transaction] }
            : d
        )
        : [...prev, { date: dateStr, transactions: [transaction], psychological: {} }];

      // Calculate new total trades
      const newTotalTrades = newData.reduce((sum, day) => sum + day.transactions.length, 0);
      const oldTotalTrades = totalTrades;

      // Achievement triggers
      if (newTotalTrades !== oldTotalTrades) {
        setTotalTrades(newTotalTrades);

        if (newTotalTrades === 15) {
          setShowAchievement({
            title: 'Consistent Trader!',
            description: 'You have completed 15 trades. Level 2 unlocked!',
            icon: '🎯',
            color: '#10b981'
          });
        } else if (newTotalTrades === 40) {
          setShowAchievement({
            title: 'Disciplined Trader!',
            description: 'You have completed 40 trades. Level 3 unlocked!',
            icon: '🛡️',
            color: '#8b5cf6'
          });
        } else if (newTotalTrades === 80) {
          setShowAchievement({
            title: 'Elite Trader!',
            description: 'You have completed 80 trades. Maximum level achieved!',
            icon: '👑',
            color: '#f59e0b'
          });
        } else if (transaction.result === 'win') {
          setShowAchievement({
            title: 'Winning Trade!',
            description: 'Your discipline is paying off!',
            icon: '💰',
            color: '#10b981'
          });
        }
      }

      return newData;
    });
  };

  const addPsychologicalEval = (evaluation: PsychologicalEval) => {
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    setData(prev =>
      prev.map(d =>
        d.date === dateStr
          ? { ...d, psychological: evaluation }
          : d
      )
    );
  };

  const deleteTransaction = (index: number) => {
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    setData(prev =>
      prev.map(d =>
        d.date === dateStr
          ? { ...d, transactions: d.transactions.filter((_, i) => i !== index) }
          : d
      )
    );
  };

  const updateTransaction = (index: number, updated: Transaction) => {
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    setData(prev =>
      prev.map(d =>
        d.date === dateStr
          ? {
              ...d,
              transactions: d.transactions.map((t, i) => (i === index ? updated : t))
            }
          : d
      )
    );
  };

  const weekStart = startOfWeek(currentDate);
  const weekEnd = endOfWeek(currentDate);
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  const weeklyData = weekDays.map(day => {
    const dayData = data.find(d => d.date === format(day, 'yyyy-MM-dd'));
    if (!dayData || dayData.transactions.length === 0) {
      return { date: format(day, 'E'), dateStr: format(day, 'yyyy-MM-dd'), profit: 0, trades: 0 };
    }
    const stats = calculateDailyStats(dayData.transactions);
    return {
      date: format(day, 'E'),
      dateStr: format(day, 'yyyy-MM-dd'),
      profit: stats.totalProfit,
      trades: dayData.transactions.length
    };
  });

  const stats = calculateWeeklyStats(data, startOfWeek(currentDate), endOfWeek(currentDate));
  const patterns = detectDangerPatterns(data, startOfWeek(currentDate), endOfWeek(currentDate));

  // Award trophy for completed quests
  const checkAndAwardTrophy = (questId: string, questTitle: string, emoji: string, rarity: 'common' | 'rare' | 'epic' | 'legendary') => {
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    const trophyId = `${questId}-${dateStr}`;
    
    // Check if already awarded today
    if (trophies.some(t => t.id === trophyId)) {
      return;
    }

    const newTrophy: Trophy = {
      id: trophyId,
      questId,
      title: questTitle,
      description: `Misi selesai pada ${new Date(dateStr).toLocaleDateString('id-ID')}`,
      icon: emoji,
      color: rarity === 'legendary' ? 'from-yellow-400 to-orange-500' : rarity === 'epic' ? 'from-purple-400 to-pink-500' : rarity === 'rare' ? 'from-blue-400 to-cyan-500' : 'from-slate-400 to-slate-500',
      dateEarned: dateStr,
      rarity,
    };

    setTrophies(prev => [...prev, newTrophy]);
  };

  // Check daily quests and award trophies
  useEffect(() => {
    if (!todayData) return;
    
    const questsData = [
      {
        id: 'first-trade',
        condition: (todayData?.transactions.length ?? 0) >= 1,
        title: 'Transaksi Pertama',
        emoji: '⚡',
        rarity: 'common' as const,
      },
      {
        id: 'win-trade',
        condition: (todayData?.transactions.filter(t => t.result === 'Win').length ?? 0) >= 1,
        title: 'Transaksi Menang',
        emoji: '🎯',
        rarity: 'rare' as const,
      },
      {
        id: 'stop-loss',
        condition: calculateDailyStats(todayData?.transactions ?? []).totalProfit <= -92 || (todayData?.transactions.length ?? 0) >= 4,
        title: 'Master Disiplin',
        emoji: '🛡️',
        rarity: 'epic' as const,
      },
      {
        id: 'positive-day',
        condition: calculateDailyStats(todayData?.transactions ?? []).totalProfit > 0,
        title: 'Hari Menguntungkan',
        emoji: '🏆',
        rarity: 'legendary' as const,
      },
    ];

    questsData.forEach(quest => {
      if (quest.condition) {
        checkAndAwardTrophy(quest.id, quest.title, quest.emoji, quest.rarity);
      }
    });
  }, [todayData]);

  // Show splash screen if not entered yet
  if (!hasEnteredJournal) {
    return <SplashScreen onEnter={() => setHasEnteredJournal(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-8">
      <AnimatePresence>
        {showAchievement && (
          <Achievement
            title={showAchievement.title}
            description={showAchievement.description}
            icon={showAchievement.icon}
            color={showAchievement.color}
            onComplete={() => setShowAchievement(null)}
          />
        )}
        {showHelp && <HelpCenter onClose={() => setShowHelp(false)} />}
        {showSettings && (
          <Settings
            onClose={() => setShowSettings(false)}
            onSettingsChange={setUserSettings}
            currentSettings={userSettings}
            onExportData={() => DataManager.exportToJSON(data, trophies)}
            onImportData={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = '.json';
              input.onchange = async (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                  try {
                    const imported = await DataManager.importFromJSON(file);
                    setData(imported.data);
                    setTrophies(imported.trophies);
                    alert('Data berhasil diimport!');
                  } catch (error) {
                    alert('Gagal mengimport data');
                  }
                }
              };
              input.click();
            }}
            onResetData={() => {
              setData([]);
              setTrophies([]);
              localStorage.removeItem('tradingData');
              localStorage.removeItem('trophies');
            }}
          />
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                📊 Jurnal Trading
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <BackgroundMusic />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowHelp(true)}
                className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-all"
                title="Bantuan"
              >
                <HelpCircle className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-all"
                title="Pengaturan"
              >
                <SettingsIcon className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
          <p className="text-slate-400">Pelacak disiplin trader harian • Akun: $10,000 • Target harian: $130</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['daily', 'weekly', 'report', 'trophy'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tab === 'daily' && '📝 Harian'}
              {tab === 'weekly' && '📊 Mingguan'}
              {tab === 'report' && '📋 Laporan'}
              {tab === 'trophy' && '🏆 Trophy Koleksi'}
            </button>
          ))}
        </div>

        {/* Daily Tab */}
        {activeTab === 'daily' && (
          <div className="space-y-6">
            {/* Date Picker */}
            <div className="flex gap-4 items-center bg-slate-800 p-4 rounded-lg">
              <button
                onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)))}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all"
              >
                ← Sebelumnya
              </button>
              <input
                type="date"
                value={format(currentDate, 'yyyy-MM-dd')}
                onChange={e => setCurrentDate(new Date(e.target.value))}
                className="px-4 py-2 bg-slate-700 rounded-lg border border-slate-600"
              />
              <button
                onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)))}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all"
              >
                Berikutnya →
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-all ml-auto"
              >
                Hari Ini
              </button>
            </div>

            {/* Daily Status */}
            <DailyTransactions
              todayData={todayData}
              onAddTransaction={addTransaction}
              onDeleteTransaction={deleteTransaction}
              onUpdateTransaction={updateTransaction}
              onAddPsychologicalEval={addPsychologicalEval}
              currentDate={currentDate}
            />
          </div>
        )}

        {/* Weekly Tab */}
        {activeTab === 'weekly' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <WeeklyDashboard stats={stats} patterns={patterns} weeklyData={weeklyData} />
              </div>
              <div>
                <LevelSystem
                  totalTrades={totalTrades}
                  weeklyProfit={stats.totalProfit}
                  daysTraded={stats.tradingDays}
                  winRate={stats.winRate}
                />
              </div>
            </div>
          </div>
        )}

        {/* Report Tab */}
        {activeTab === 'report' && (
          <div>
            <WeeklyReport stats={stats} patterns={patterns} data={data} weekStart={weekStart} weekEnd={weekEnd} />
          </div>
        )}

        {/* Trophy Tab */}
        {activeTab === 'trophy' && (
          <TrophyCollection trophies={trophies} />
        )}
      </div>
    </div>
  );
}
