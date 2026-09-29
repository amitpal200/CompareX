'use client';

import React from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle, AlertTriangle, Sparkles, MessageSquare } from 'lucide-react';
import { SentimentAnalysis } from '../lib/types';

interface SentimentBreakdownProps {
  sentiment: SentimentAnalysis;
  itemTitle?: string;
}

export const SentimentBreakdown: React.FC<SentimentBreakdownProps> = ({
  sentiment,
  itemTitle
}) => {
  if (!sentiment) return null;

  return (
    <div className="w-full bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 sm:p-5 text-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <h4 className="font-bold text-white tracking-wide">
            AI Customer Review Synthesis
          </h4>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">
          Analyzed {sentiment.totalReviewsAnalyzed.toLocaleString()} Verified Reviews
        </span>
      </div>

      {/* Sentiment Distribution Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-[11px] font-semibold mb-1.5">
          <span className="text-emerald-400 flex items-center gap-1">
            <ThumbsUp className="w-3 h-3" /> {sentiment.positivePercentage}% Positive
          </span>
          <span className="text-slate-400">{sentiment.neutralPercentage}% Neutral</span>
          <span className="text-rose-400 flex items-center gap-1">
            <ThumbsDown className="w-3 h-3" /> {sentiment.negativePercentage}% Critical
          </span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden bg-slate-800 flex">
          <div
            style={{ width: `${sentiment.positivePercentage}%` }}
            className="bg-emerald-500 h-full rounded-l-full"
          />
          <div
            style={{ width: `${sentiment.neutralPercentage}%` }}
            className="bg-slate-600 h-full"
          />
          <div
            style={{ width: `${sentiment.negativePercentage}%` }}
            className="bg-rose-500 h-full rounded-r-full"
          />
        </div>
      </div>

      {/* Pros and Cons Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        {/* Pros */}
        <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-400" /> Top Praises
          </span>
          {sentiment.topPros.map((pro, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
              <span className="text-emerald-400 font-bold">•</span>
              <span>{pro}</span>
            </div>
          ))}
        </div>

        {/* Cons */}
        <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-rose-300 tracking-wider flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-rose-400" /> Watchouts
          </span>
          {sentiment.topCons.map((con, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
              <span className="text-rose-400 font-bold">•</span>
              <span>{con}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Buyer Verdict Box */}
      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-start gap-2">
        <MessageSquare className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white block mb-0.5">Agent Consensus Verdict:</span>
          <p className="italic leading-relaxed">{sentiment.buyerVerdict}</p>
        </div>
      </div>
    </div>
  );
};
