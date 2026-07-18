'use client';

import { motion } from 'framer-motion';
import { Transaction } from '@/lib/types';
import { Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';

interface AnimatedTransactionCardProps {
  transaction: Transaction;
  index: number;
  onDelete: () => void;
  onEdit: () => void;
}

export default function AnimatedTransactionCard({
  transaction,
  index,
  onDelete,
  onEdit,
}: AnimatedTransactionCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const isWin = transaction.result === 'win';
  const profitLoss = isWin ? transaction.amount : -transaction.amount;

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={isDeleting ? { opacity: 0, x: 20, scale: 0.9 } : { opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className={`p-4 rounded-lg border-2 relative overflow-hidden group ${
        isWin
          ? 'border-emerald-500/50 bg-emerald-500/5'
          : 'border-red-500/50 bg-red-500/5'
      }`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className={`absolute inset-0 ${
            isWin
              ? 'bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0'
              : 'bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0'
          }`}
          style={{
            animation: 'shimmer 2s infinite',
          }}
        />
      </motion.div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  transaction.direction === 'buy'
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-orange-500/20 text-orange-300'
                }`}
              >
                {transaction.direction.toUpperCase()}
              </motion.div>
              <span className="text-slate-400 text-xs">{transaction.pair}</span>
            </div>
            <p className="text-slate-300 text-sm">{transaction.entryReason}</p>
          </div>
          <motion.div
            animate={isWin ? { scale: [1, 1.15, 1] } : { rotate: [0, -2, 2, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            className={`text-2xl font-bold ml-4 ${isWin ? 'text-emerald-400' : 'text-red-400'}`}
          >
            {isWin ? '+' : '-'}${Math.abs(profitLoss).toFixed(0)}
          </motion.div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
          <span>{transaction.entryTime}</span>
          <span className={isWin ? 'text-emerald-400' : 'text-red-400'}>{transaction.result}</span>
        </div>

        {transaction.notes && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xs text-slate-500 mb-3 italic"
          >
            📝 {transaction.notes}
          </motion.p>
        )}

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEdit}
            className="flex-1 px-3 py-2 rounded bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1"
          >
            <Edit2 className="w-3 h-3" /> Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            className="flex-1 px-3 py-2 rounded bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1"
          >
            <Trash2 className="w-3 h-3" /> Delete
          </motion.button>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </motion.div>
  );
}
