'use client';

import React from 'react';
import { History, X, Clock, ArrowRight, Trash2, Sparkles, Search } from 'lucide-react';
import { SearchHistoryItem } from '../lib/types';

interface SavedHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: SearchHistoryItem[];
  onSelectQuery: (query: string) => void;
  onClearHistory: () => void;
}

export const SavedHistoryDrawer: React.FC<SavedHistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectQuery,
  onClearHistory
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-slate-950/95 border-l border-slate-800 backdrop-blur-xl shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center">
            <History className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Saved Search History</h4>
            <span className="text-[11px] text-slate-400">{history.length} Queries Cached</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
              title="Clear all history"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* History Items List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2.5">
        {history.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-xs">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No queries in history yet. Your search queries will be saved automatically.</p>
          </div>
        ) : (
          history.map(item => (
            <div
              key={item.id}
              onClick={() => {
                onSelectQuery(item.query);
                onClose();
              }}
              className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800/80 hover:border-indigo-500/50 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                <span className="font-semibold text-indigo-400 uppercase tracking-wider">
                  {item.category === 'shopping' ? '🛍️ Product' : item.category === 'travel' ? '✈️ Flight' : '🏨 Hotel'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {item.timestamp}
                </span>
              </div>
              <p className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                "{item.query}"
              </p>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                <span>{item.resultsCount} options evaluated</span>
                <span className="text-indigo-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Rerun <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/40 text-[11px] text-slate-400 text-center">
        🔒 Agent queries and consensus weights are cached locally.
      </div>
    </div>
  );
};
