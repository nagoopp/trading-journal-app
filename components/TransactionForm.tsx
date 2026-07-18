'use client';

import { useState } from 'react';
import { Transaction } from '@/lib/types';

interface TransactionFormProps {
  onAdd: (transaction: Transaction) => void;
  isDisabled?: boolean;
}

const PAIRS = ['XAUUSD', 'BTCUSD', 'EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD'];

export default function TransactionForm({ onAdd, isDisabled }: TransactionFormProps) {
  const [open, setOpen] = useState(false);
  const [pair, setPair] = useState<string>('XAUUSD');
  const [customPair, setCustomPair] = useState('');
  const [direction, setDirection] = useState<'Buy' | 'Sell'>('Buy');
  const [result, setResult] = useState<'Win' | 'Loss'>('Win');
  const [profitLoss, setProfitLoss] = useState<number>(69);
  const [entryTime, setEntryTime] = useState('09:30');
  const [reason, setReason] = useState('');

  const handleAddTransaction = () => {
    const selectedPair = customPair || pair;
    if (!selectedPair || !reason.trim()) {
      alert('Mohon isi semua field');
      return;
    }

    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      pair: selectedPair,
      direction,
      result,
      profitLoss,
      entryTime,
      reason
    };

    onAdd(newTransaction);
    resetForm();
  };

  const resetForm = () => {
    setPair('XAUUSD');
    setCustomPair('');
    setDirection('Buy');
    setResult('Win');
    setProfitLoss(69);
    setEntryTime('09:30');
    setReason('');
    setOpen(false);
  };

  const handleResultChange = (newResult: 'Win' | 'Loss') => {
    setResult(newResult);
    setProfitLoss(newResult === 'Win' ? 69 : -23);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        disabled={isDisabled}
        className={`w-full py-3 rounded-lg font-semibold transition-all ${
          isDisabled
            ? 'bg-red-900 text-red-200 cursor-not-allowed'
            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
        }`}
      >
        + Tambah Transaksi
      </button>
    );
  }

  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Input Transaksi Baru</h3>
        <button
          onClick={() => setOpen(false)}
          className="text-slate-400 hover:text-white text-2xl"
        >
          ×
        </button>
      </div>

      {/* Pair Selection */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-300">Pasangan</label>
          <select
            value={pair}
            onChange={e => setPair(e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 text-white"
          >
            {PAIRS.map(p => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-300">Custom Pair</label>
          <input
            type="text"
            value={customPair}
            onChange={e => setCustomPair(e.target.value.toUpperCase())}
            placeholder="Atau custom..."
            className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 text-white placeholder-slate-500"
          />
        </div>
      </div>

      {/* Direction Toggle */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-slate-300">Arah</label>
        <div className="flex gap-2">
          {(['Buy', 'Sell'] as const).map(dir => (
            <button
              key={dir}
              onClick={() => setDirection(dir)}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                direction === dir
                  ? dir === 'Buy'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-red-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {dir}
            </button>
          ))}
        </div>
      </div>

      {/* Result Toggle */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-slate-300">Hasil</label>
        <div className="flex gap-2">
          {(['Win', 'Loss'] as const).map(res => (
            <button
              key={res}
              onClick={() => handleResultChange(res)}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                result === res
                  ? res === 'Win'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-red-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {res}
            </button>
          ))}
        </div>
      </div>

      {/* Profit/Loss Amount */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-300">P/L ($)</label>
          <input
            type="number"
            value={profitLoss}
            onChange={e => setProfitLoss(Number(e.target.value))}
            className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-300">Entry Time</label>
          <input
            type="time"
            value={entryTime}
            onChange={e => setEntryTime(e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 text-white"
          />
        </div>
      </div>

      {/* Reason */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-slate-300">Alasan Entry (wajib)</label>
        <textarea
          value={reason}
          onChange={e => setReason(e.target.value)}
          placeholder="Analisa, setup, atau catatan trading..."
          maxLength={150}
          className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 text-white placeholder-slate-500 resize-none"
          rows={3}
        />
        <div className="text-xs text-slate-400 mt-1">{reason.length}/150</div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 pt-4">
        <button
          onClick={handleAddTransaction}
          className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold text-white transition-all"
        >
          ✓ Simpan Transaksi
        </button>
        <button
          onClick={() => setOpen(false)}
          className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold text-white transition-all"
        >
          Batal
        </button>
      </div>
    </div>
  );
}
