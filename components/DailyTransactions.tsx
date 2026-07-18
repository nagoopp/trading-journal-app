'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DailyData, Transaction, PsychologicalEval } from '@/lib/types';
import TransactionForm from './TransactionForm';
import PsychologicalForm from './PsychologicalForm';
import AnimatedTransactionCard from './AnimatedTransactionCard';
import DailyQuests from './DailyQuests';
import { calculateDailyStats } from '@/lib/calculations';

interface DailyTransactionsProps {
  todayData?: DailyData;
  onAddTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (index: number) => void;
  onUpdateTransaction: (index: number, transaction: Transaction) => void;
  onAddPsychologicalEval: (evaluation: PsychologicalEval) => void;
  currentDate: Date;
}

export default function DailyTransactions({
  todayData,
  onAddTransaction,
  onDeleteTransaction,
  onUpdateTransaction,
  onAddPsychologicalEval,
  currentDate
}: DailyTransactionsProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Partial<Transaction>>({});

  const transactions = todayData?.transactions || [];
  const stats = calculateDailyStats(transactions);

  const canAddMore = transactions.length < 4;
  const isMaxLoss = stats.totalProfit <= -92;
  const isTargetHit = stats.totalProfit >= 130;

  const handleEditStart = (index: number) => {
    setEditingIndex(index);
    setEditValues(transactions[index]);
  };

  const handleEditSave = (index: number) => {
    if (editingIndex === index && editValues.id) {
      onUpdateTransaction(index, editValues as Transaction);
      setEditingIndex(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Daily Quests */}
      <DailyQuests todayData={todayData} />

      {/* Daily Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-4 rounded-lg border-2 ${
            isTargetHit ? 'bg-emerald-900/30 border-emerald-500' : 'bg-slate-800 border-slate-700'
          }`}
        >
          <div className="text-sm text-slate-400">P/L Harian</div>
          <motion.div
            animate={stats.totalProfit > 0 ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            className={`text-3xl font-bold ${stats.totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}
          >
            ${stats.totalProfit}
          </motion.div>
          <div className="text-xs text-slate-500">Target: $130</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-4 rounded-lg border-2 ${
            canAddMore ? 'bg-slate-800 border-slate-700' : 'bg-red-900/30 border-red-500'
          }`}
        >
          <div className="text-sm text-slate-400">Transaksi</div>
          <motion.div
            animate={!canAddMore ? { rotate: [0, -5, 5, 0] } : {}}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            className="text-3xl font-bold text-cyan-400"
          >
            {stats.count}/4
          </motion.div>
          {!canAddMore && <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-xs text-red-400"
          >
            Batas tercapai!
          </motion.div>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 rounded-lg bg-slate-800 border border-slate-700"
        >
          <div className="text-sm text-slate-400">Tingkat Menang</div>
          <motion.div
            animate={stats.winRate > 50 ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            className="text-3xl font-bold text-blue-400"
          >
            {stats.winRate.toFixed(0)}%
          </motion.div>
          <div className="text-xs text-slate-500">{stats.wins}M {stats.losses}K</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`p-4 rounded-lg border-2 ${
            isMaxLoss ? 'bg-red-900/30 border-red-500' : 'bg-slate-800 border-slate-700'
          }`}
        >
          <div className="text-sm text-slate-400">Batas Kerugian Maks</div>
          <motion.div
            animate={isMaxLoss ? { scale: [1.05, 1, 1.05] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
            className={`text-3xl font-bold ${stats.totalProfit <= -92 ? 'text-red-400' : 'text-yellow-400'}`}
          >
            ${-92 - stats.totalProfit}
          </motion.div>
          <div className="text-xs text-slate-500">Sisa</div>
        </motion.div>
      </div>

      {/* Add Transaction Button */}
      <TransactionForm
        onAdd={onAddTransaction}
        isDisabled={!canAddMore || isMaxLoss}
      />

      {/* Transactions List */}
      <AnimatePresence mode="popLayout">
        <div className="space-y-3">
          {transactions.map((tx, idx) => (
            <AnimatedTransactionCard
              key={tx.id}
              transaction={tx}
              index={idx}
              onDelete={() => onDeleteTransaction(idx)}
              onEdit={() => handleEditStart(idx)}
            />
          ))}
        </div>
      </AnimatePresence>

      {/* Psychological Evaluation */}
      {transactions.length > 0 && (
        <PsychologicalForm
          initialData={todayData?.psychological}
          onSubmit={onAddPsychologicalEval}
        />
      )}
    </div>
  );
}
