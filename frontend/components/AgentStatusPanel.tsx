'use client';

import React, { useState } from 'react';
import { CheckCircle2, Loader2, Circle, ChevronDown, ChevronUp, Cpu, Sparkles, Activity, Layers, Store, CheckCheck } from 'lucide-react';
import { AgentStep } from '../lib/types';

interface AgentStatusPanelProps {
  steps: AgentStep[];
  isSearching: boolean;
  detectedType: 'shopping' | 'travel' | 'hotel';
  rawListingsCount?: number;
  canonicalCount?: number;
}

export const AgentStatusPanel: React.FC<AgentStatusPanelProps> = ({
  steps,
  isSearching,
  detectedType,
  rawListingsCount = 127,
  canonicalCount = 24
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!steps || steps.length === 0) return null;

  const validSteps = steps.filter((s): s is AgentStep => Boolean(s && s.status));
  const completedCount = validSteps.filter(s => s.status === 'done').length;
  const isAllDone = validSteps.length > 0 && completedCount === validSteps.length;

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl transition-all mb-8">
      {/* Header */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30">
            <Cpu className="w-4 h-4 text-indigo-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-white tracking-wide">
                Agentic Orchestration Graph
              </h3>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${
                isAllDone 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
              }`}>
                {isAllDone ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Consensus Reached ({completedCount}/{steps.length})</span>
                  </>
                ) : (
                  <>
                    <Loader2 className="w-3 h-3 text-indigo-400 animate-spin" />
                    <span>Executing Pipeline ({completedCount}/{steps.length})</span>
                  </>
                )}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Autonomous reasoning across {detectedType === 'shopping' ? 'Shopping APIs & 6 Multi-Store Catalogs' : detectedType === 'hotel' ? 'Live Hotel Inventories across Booking, Agoda & MMT' : 'Aviation GDS & Airline Direct Connectors'}
            </p>
          </div>
        </div>

        <button 
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Toggle agent steps"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Live Pipeline Funnel Metrics Strip */}
      {detectedType === 'shopping' && (
        <div className="mt-3.5 pt-3 border-t border-slate-800/60 flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] text-slate-300">
          <div className="flex items-center gap-1 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800">
            <Store className="w-3.5 h-3.5 text-indigo-400" />
            <span>Stores Audited: <strong className="text-white">6 Verified</strong></span>
          </div>
          <div className="text-slate-600 hidden sm:inline">→</div>
          <div className="flex items-center gap-1 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Raw Listings Scanned: <strong className="text-white">{rawListingsCount}+</strong></span>
          </div>
          <div className="text-slate-600 hidden sm:inline">→</div>
          <div className="flex items-center gap-1 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800">
            <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Canonical Models Matched: <strong className="text-emerald-400">{canonicalCount}</strong></span>
          </div>
        </div>
      )}

      {/* Steps List */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {validSteps.map((step, idx) => {
            const isDone = step.status === 'done';
            const isActive = step.status === 'active';

            return (
              <div 
                key={step.id || idx}
                className={`p-3 rounded-xl border transition-all text-xs ${
                  isDone
                    ? 'bg-slate-950/40 border-slate-800 text-slate-300'
                    : isActive
                    ? 'bg-indigo-950/30 border-indigo-500/40 text-indigo-200 shadow-sm shadow-indigo-500/10 ring-1 ring-indigo-500/20'
                    : 'bg-slate-950/20 border-slate-800/40 text-slate-500 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2 font-medium mb-1">
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  ) : isActive ? (
                    <Loader2 className="w-3.5 h-3.5 text-indigo-400 animate-spin flex-shrink-0" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                  )}
                  <span className={isDone ? 'text-slate-200 font-semibold' : isActive ? 'text-indigo-300 font-semibold' : 'text-slate-500'}>
                    {step.step_name}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed pl-5.5">
                  {step.detail}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
