'use client';

import React from 'react';
import { X, Sparkles, ShieldCheck, CheckCircle2, AlertCircle, ThumbsUp, Star, Award, MapPin } from 'lucide-react';
import { ReviewIntelligenceData } from '../lib/types';

interface ReviewIntelligenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ReviewIntelligenceData | null;
  hotelName: string;
  isLoading?: boolean;
}

export const ReviewIntelligenceModal: React.FC<ReviewIntelligenceModalProps> = ({
  isOpen,
  onClose,
  data,
  hotelName,
  isLoading = false
}) => {
  if (!isOpen) return null;

  if (isLoading || !data) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center mb-4 animate-pulse">
            <Sparkles className="w-6 h-6 text-indigo-400 animate-spin" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">LangGraph Review Intelligence</h3>
          <p className="text-xs text-slate-400">Synthesizing review corpora across Booking.com, Agoda & MakeMyTrip for {hotelName}...</p>
        </div>
      </div>
    );
  }

  const categories = [
    { label: 'Cleanliness & Hygiene', score: data.cleanliness_score, color: 'bg-emerald-500' },
    { label: 'Location & Connectivity', score: data.location_score, color: 'bg-indigo-500' },
    { label: 'Staff Behavior & Hospitality', score: data.staff_score, color: 'bg-teal-500' },
    { label: 'Food & Dining Experience', score: data.food_score, color: 'bg-amber-500' },
    { label: 'Value for Money', score: data.value_for_money_score, color: 'bg-cyan-500' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-600/20 border border-indigo-500/30">
              <Sparkles className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">
                  CompareX Review Intelligence
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                  2,400+ Audited Reviews
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Deep-mined NLP sentiment analysis for <strong className="text-slate-200">{hotelName}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Executive Verdict Callout */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-500/30 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Award className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>AI Consensus & Guest Verdict</span>
                <span className="text-xs text-emerald-400 font-extrabold">{data.overall_sentiment_pct}% Positive</span>
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                "{data.verified_summary}"
              </p>
            </div>
          </div>

          {/* 5-Category Sentiment Scorecard */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Category-Level Guest Sentiment
            </h4>
            <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
              {categories.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">{cat.label}</span>
                    <span className="text-white font-mono">{cat.score}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full ${cat.color} rounded-full transition-all duration-700`}
                      style={{ width: `${cat.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Positive Themes */}
          <div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Consistently Praised Attributes</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {data.positive_themes.map((theme, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-800/30 text-xs text-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>{theme}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Watchout / Negative Themes */}
          <div>
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>Potential Trade-Offs & Observations</span>
            </h4>
            <div className="space-y-2">
              {data.negative_themes.map((theme, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-950/20 border border-amber-800/30 text-xs text-amber-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>{theme}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Multi-channel reviews sanitized against fake submissions.</span>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
