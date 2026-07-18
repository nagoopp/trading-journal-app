'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Upload, RotateCcw, Bell, Moon, Sun, DollarSign, Zap } from 'lucide-react';

interface UserSettings {
  dailyTarget: number;
  maxLossLimit: number;
  maxTrades: number;
  theme: 'dark' | 'light';
  enableNotifications: boolean;
  currency: string;
  language: 'id' | 'en';
}

interface SettingsProps {
  onClose: () => void;
  onSettingsChange: (settings: UserSettings) => void;
  currentSettings: UserSettings;
  onExportData: () => void;
  onImportData: () => void;
  onResetData: () => void;
}

export default function Settings({
  onClose,
  onSettingsChange,
  currentSettings,
  onExportData,
  onImportData,
  onResetData,
}: SettingsProps) {
  const [settings, setSettings] = useState<UserSettings>(currentSettings);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSave = () => {
    onSettingsChange(settings);
    onClose();
  };

  const handleChange = (key: keyof UserSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

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
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 shadow-2xl w-full max-w-2xl max-h-96 overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-800/95 backdrop-blur border-b border-slate-700 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Pengaturan</h2>
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
          {/* Target Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              Target Trading
            </h3>

            <div className="space-y-3 bg-slate-700/30 p-4 rounded-lg">
              <div>
                <label className="block text-sm text-slate-300 mb-2">Target Harian ($)</label>
                <input
                  type="number"
                  value={settings.dailyTarget}
                  onChange={e => handleChange('dailyTarget', Number(e.target.value))}
                  className="w-full px-4 py-2 bg-slate-700 rounded-lg border border-slate-600 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Batas Kerugian Maks ($)</label>
                <input
                  type="number"
                  value={settings.maxLossLimit}
                  onChange={e => handleChange('maxLossLimit', Math.abs(Number(e.target.value)))}
                  className="w-full px-4 py-2 bg-slate-700 rounded-lg border border-slate-600 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Maksimal Transaksi/Hari</label>
                <input
                  type="number"
                  value={settings.maxTrades}
                  onChange={e => handleChange('maxTrades', Number(e.target.value))}
                  className="w-full px-4 py-2 bg-slate-700 rounded-lg border border-slate-600 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Sun className="w-5 h-5 text-yellow-400" />
              Tampilan
            </h3>

            <div className="bg-slate-700/30 p-4 rounded-lg space-y-3">
              <div>
                <label className="block text-sm text-slate-300 mb-2">Tema</label>
                <div className="flex gap-2">
                  {(['dark', 'light'] as const).map(theme => (
                    <button
                      key={theme}
                      onClick={() => handleChange('theme', theme)}
                      className={`flex-1 py-2 rounded-lg transition-all capitalize font-semibold ${
                        settings.theme === theme
                          ? 'bg-cyan-500 text-white'
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      }`}
                    >
                      {theme === 'dark' ? <Moon className="w-4 h-4 mx-auto" /> : <Sun className="w-4 h-4 mx-auto" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Bahasa</label>
                <div className="flex gap-2">
                  {(['id', 'en'] as const).map(lang => (
                    <button
                      key={lang}
                      onClick={() => handleChange('language', lang)}
                      className={`flex-1 py-2 rounded-lg transition-all font-semibold capitalize ${
                        settings.language === lang
                          ? 'bg-cyan-500 text-white'
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      }`}
                    >
                      {lang === 'id' ? 'Indonesia' : 'English'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-400" />
              Notifikasi
            </h3>

            <div className="bg-slate-700/30 p-4 rounded-lg">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableNotifications}
                  onChange={e => handleChange('enableNotifications', e.target.checked)}
                  className="w-5 h-5 rounded bg-slate-600 border-slate-500 text-cyan-500"
                />
                <span className="text-slate-300">Aktifkan notifikasi pengingat trading</span>
              </label>
            </div>
          </div>

          {/* Data Management */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              Manajemen Data
            </h3>

            <div className="space-y-2">
              <button
                onClick={onExportData}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white font-semibold transition-all"
              >
                <Download className="w-4 h-4" />
                Export Data (JSON)
              </button>

              <button
                onClick={onImportData}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-semibold transition-all"
              >
                <Upload className="w-4 h-4" />
                Import Data
              </button>

              <button
                onClick={() => setShowResetConfirm(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-semibold transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Semua Data
              </button>
            </div>
          </div>
        </div>

        {/* Confirmation Dialog */}
        <AnimatePresence>
          {showResetConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
              onClick={() => setShowResetConfirm(false)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={e => e.stopPropagation()}
                className="bg-slate-800 rounded-lg p-6 border border-red-500 shadow-xl"
              >
                <h3 className="text-xl font-bold text-white mb-4">Konfirmasi Reset Data</h3>
                <p className="text-slate-300 mb-6">Tindakan ini akan menghapus semua data trading dan trophy Anda. Tidak dapat dibatalkan!</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-semibold transition-all"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => {
                      onResetData();
                      setShowResetConfirm(false);
                      onClose();
                    }}
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-semibold transition-all"
                  >
                    Reset
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-800/95 backdrop-blur border-t border-slate-700 p-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-semibold transition-all"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 rounded-lg text-white font-semibold transition-all"
          >
            Simpan Perubahan
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
