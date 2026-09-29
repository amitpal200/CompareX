'use client';

import React from 'react';
import { X, Sparkles, CheckCircle2, Award, Zap, HelpCircle, BarChart3 } from 'lucide-react';
import { ScoreBreakdown } from '../lib/types';

interface ScoreBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
  overallScore: number;
  breakdown?: ScoreBreakdown;
  reasons: string[];
}

export const ScoreBreakdownModal: React.FC<ScoreBreakdownModalProps> = ({
  isOpen,
  onClose,
  productTitle,
  overallScore,
  breakdown,
  reasons
}) => {
  if (!isOpen) return null;

  const b = breakdown || {
    performance: 9.5,
    price: 9.0,
    reviews: 9.2,
    specs: 9.4,
    delivery: 8.8,
    match: 9.6
  };

  const dimensions = [
    { label: 'Compute & Performance', score: b.performance, color: 'from-indigo-500 to-violet-500' },
    { label: 'Price & Value for Money', score: b.price, color: 'from-emerald-500 to-teal-500' },
    { label: 'Review Sentiment & Quality', score: b.reviews, color: 'from-amber-500 to-orange-500' },
    { label: 'Hardware Specifications', score: b.specs, color: 'from-cyan-500 to-blue-500' },
    { label: 'Delivery & Fulfillment', score: b.delivery, color: 'from-purple-500 to-pink-500' },
    { label: 'User Constraint Match', score: b.match, color: 'from-rose-500 to-red-500' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">CompareX AI Score Breakdown</h3>
                <span className="text-xs font-mono font-black px-2 py-0.5 rounded-lg bg-indigo-600 text-white shadow-sm">
                  {overallScore.toFixed(1)} / 10
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-xs mt-0.5">{productTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Dimension Progress Bars */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
              Dimensional Evaluation Meters
            </span>
            <div className="space-y-3">
              {dimensions.map((dim, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">{dim.label}</span>
                    <span className="font-mono font-bold text-white">{dim.score.toFixed(1)}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${dim.color} transition-all duration-500`}
                      style={{ width: `${(dim.score / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Explainable Reasons */}
          <div className="pt-2 border-t border-slate-800/80">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
              Why CompareX AI Awarded This Score
            </span>
            <div className="space-y-2">
              {reasons.map((r, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Deterministic Multi-Factor Scoring</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
