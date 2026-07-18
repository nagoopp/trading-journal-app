'use client';

import { useState, useEffect } from 'react';
import { PsychologicalEval } from '@/lib/types';

interface PsychologicalFormProps {
  initialData?: PsychologicalEval;
  onSubmit: (evaluation: PsychologicalEval) => void;
}

export default function PsychologicalForm({ initialData, onSubmit }: PsychologicalFormProps) {
  const [open, setOpen] = useState(false);
  const [condition, setCondition] = useState<'Fresh' | 'Tired' | 'Emotional'>(initialData?.condition || 'Fresh');
  const [revengeTrade, setRevengeTrade] = useState(initialData?.revengeTrade || false);
  const [revengeNote, setRevengeNote] = useState(initialData?.revengeTradeNote || '');
  const [fomoEntry, setFomoEntry] = useState(initialData?.fomoEntry || false);
  const [fomoNote, setFomoNote] = useState(initialData?.fomoEntryNote || '');
  const [overrideRule, setOverrideRule] = useState(initialData?.overrideRule || false);
  const [overrideNote, setOverrideNote] = useState(initialData?.overrideRuleNote || '');
  const [emotionEntry, setEmotionEntry] = useState<1 | 2 | 3 | 4 | 5>(initialData?.emotionEntry || 3);
  const [emotionExit, setEmotionExit] = useState<1 | 2 | 3 | 4 | 5>(initialData?.emotionExit || 3);
  const [successStop4, setSuccessStop4] = useState(initialData?.successfulStop4 || false);
  const [successStopLoss, setSuccessStopLoss] = useState(initialData?.successfulStopMaxLoss || false);

  const handleSubmit = () => {
    const evaluation: PsychologicalEval = {
      condition,
      revengeTrade,
      revengeTradeNote: revengeNote,
      fomoEntry,
      fomoEntryNote: fomoNote,
      overrideRule,
      overrideRuleNote: overrideNote,
      emotionEntry,
      emotionExit,
      successfulStop4: successStop4,
      successfulStopMaxLoss: successStopLoss
    };
    onSubmit(evaluation);
    setOpen(false);
  };

  const emotionLabels: Record<1 | 2 | 3 | 4 | 5, string> = {
    1: 'Very Calm',
    2: 'Calm',
    3: 'Neutral',
    4: 'Tense',
    5: 'Very Tense'
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">📋 Evaluasi Psikologis Hari Ini</h3>
        {initialData && (
          <div className="text-xs text-emerald-400">✓ Tersimpan</div>
        )}
      </div>

      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all text-slate-300"
        >
          {initialData ? '✏️ Edit Evaluasi' : '➕ Isi Evaluasi'}
        </button>
      ) : (
        <div className="space-y-4">
          {/* Pre-trading condition */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-300">Kondisi Sebelum Trading</label>
            <select
              value={condition}
              onChange={e => setCondition(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 text-white"
            >
              <option value="Fresh">Fresh & Siap</option>
              <option value="Tired">Lelah</option>
              <option value="Emotional">Emosi/Stress</option>
            </select>
          </div>

          {/* Revenge Trade */}
          <div>
            <label className="flex items-center gap-2 mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={revengeTrade}
                onChange={e => setRevengeTrade(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold text-slate-300">Revenge Trade?</span>
            </label>
            {revengeTrade && (
              <textarea
                value={revengeNote}
                onChange={e => setRevengeNote(e.target.value)}
                placeholder="Catatan..."
                className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 text-white placeholder-slate-500 text-sm"
                rows={2}
              />
            )}
          </div>

          {/* FOMO Entry */}
          <div>
            <label className="flex items-center gap-2 mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={fomoEntry}
                onChange={e => setFomoEntry(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold text-slate-300">FOMO Entry?</span>
            </label>
            {fomoEntry && (
              <textarea
                value={fomoNote}
                onChange={e => setFomoNote(e.target.value)}
                placeholder="Catatan..."
                className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 text-white placeholder-slate-500 text-sm"
                rows={2}
              />
            )}
          </div>

          {/* Override Rule */}
          <div>
            <label className="flex items-center gap-2 mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={overrideRule}
                onChange={e => setOverrideRule(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold text-slate-300">Override Sendiri?</span>
            </label>
            {overrideRule && (
              <textarea
                value={overrideNote}
                onChange={e => setOverrideNote(e.target.value)}
                placeholder="Catatan..."
                className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 text-white placeholder-slate-500 text-sm"
                rows={2}
              />
            )}
          </div>

          {/* Emotion Levels */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-2 block text-slate-300">Emosi Entry (1-5)</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(level => (
                  <button
                    key={level}
                    onClick={() => setEmotionEntry(level as any)}
                    className={`flex-1 py-2 rounded text-xs font-semibold transition-all ${
                      emotionEntry === level
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <div className="text-xs text-slate-500 mt-1">{emotionLabels[emotionEntry]}</div>
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block text-slate-300">Emosi Exit (1-5)</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(level => (
                  <button
                    key={level}
                    onClick={() => setEmotionExit(level as any)}
                    className={`flex-1 py-2 rounded text-xs font-semibold transition-all ${
                      emotionExit === level
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <div className="text-xs text-slate-500 mt-1">{emotionLabels[emotionExit]}</div>
            </div>
          </div>

          {/* Success Checks */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2 cursor-pointer p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all">
              <input
                type="checkbox"
                checked={successStop4}
                onChange={e => setSuccessStop4(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold">Berhenti di Trade ke-4?</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all">
              <input
                type="checkbox"
                checked={successStopLoss}
                onChange={e => setSuccessStopLoss(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold">Berhenti di Max Loss?</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold transition-all"
            >
              ✓ Simpan Evaluasi
            </button>
            <button
              onClick={() => setOpen(false)}
              className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-all"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
