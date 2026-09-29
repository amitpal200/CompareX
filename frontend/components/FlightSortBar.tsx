'use client';

import React from 'react';
import { ArrowUpDown, Zap, DollarSign, Clock, Calendar } from 'lucide-react';

export type FlightSortOption = 'best' | 'cheapest' | 'fastest' | 'earliest';

interface FlightSortBarProps {
  currentSort: FlightSortOption;
  onSortChange: (option: FlightSortOption) => void;
  totalCount: number;
  isLive?: boolean;
  dataTimestamp?: string;
}

export default function FlightSortBar({
  currentSort,
  onSortChange,
  totalCount,
  isLive = true,
  dataTimestamp,
}: FlightSortBarProps) {
  const sortTabs = [
    { key: 'best' as const, label: 'Best Overall', icon: Zap, subtitle: 'Price & Time Balance' },
    { key: 'cheapest' as const, label: 'Cheapest', icon: DollarSign, subtitle: 'Lowest Fares First' },
    { key: 'fastest' as const, label: 'Fastest', icon: Clock, subtitle: 'Shortest Duration' },
    { key: 'earliest' as const, label: 'Earliest', icon: Calendar, subtitle: 'Departure Time' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 glass-panel border border-slate-800/80 rounded-2xl p-2.5">
      {/* Sort Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {sortTabs.map(({ key, label, icon: Icon }) => {
          const isActive = currentSort === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSortChange(key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 font-bold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Live Data Status & Count */}
      <div className="flex items-center justify-between sm:justify-end gap-3 px-2 text-xs">
        <span className="text-slate-400 font-medium">
          <strong className="text-slate-100 font-mono">{totalCount}</strong> flights
        </span>

        {isLive && (
          <div
            className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-800/40"
            title={dataTimestamp ? `Verified at ${dataTimestamp}` : 'Real-time verified timetable'}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Data</span>
          </div>
        )}
      </div>
    </div>
  );
}
