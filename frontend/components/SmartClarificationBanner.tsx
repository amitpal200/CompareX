'use client';

import React from 'react';
import { ParsedIntentData } from '../lib/types';
import { Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

interface SmartClarificationBannerProps {
  intentData: ParsedIntentData;
  onSelectOption: (option: string) => void;
}

export const SmartClarificationBanner: React.FC<SmartClarificationBannerProps> = ({
  intentData,
  onSelectOption
}) => {
  if (!intentData.clarification_needed || !intentData.clarification_question) {
    return null;
  }

  const options = intentData.clarification_options || [];

  return (
    <div className="mb-6 bg-gradient-to-r from-amber-950/40 via-indigo-950/40 to-slate-900 border border-amber-500/30 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-xl animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0 text-amber-300">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
              CompareX Smart Clarification
            </span>
            <p className="text-sm sm:text-base font-semibold text-white mt-0.5">
              {intentData.clarification_question}
            </p>
          </div>
        </div>

        {/* Options chips */}
        <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
          {options.map((opt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectOption(opt)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-amber-500/20 text-slate-200 hover:text-amber-200 border border-slate-700/80 hover:border-amber-500/50 text-xs font-semibold transition-all duration-150 cursor-pointer shadow-sm active:scale-95"
            >
              <span>{opt}</span>
              <ArrowRight className="w-3 h-3 text-amber-400 opacity-70" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
