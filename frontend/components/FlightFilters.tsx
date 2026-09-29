'use client';

import React from 'react';
import { SlidersHorizontal, RotateCcw, Sunrise, Sun, Sunset, Moon } from 'lucide-react';
import { FlightFilterState, FlightOffer } from '@/lib/types';

interface FlightFiltersProps {
  flights: FlightOffer[];
  filterState: FlightFilterState;
  onChange: (newState: FlightFilterState) => void;
  currencySymbol?: string;
  currencyRate?: number;
}

export default function FlightFilters({
  flights,
  filterState,
  onChange,
  currencySymbol = '₹',
  currencyRate = 1,
}: FlightFiltersProps) {
  // Dynamically extract unique airlines and count
  const airlineCounts: Record<string, number> = {};
  let minFare = Infinity;
  let maxFare = 0;

  flights.forEach((f) => {
    airlineCounts[f.airline] = (airlineCounts[f.airline] || 0) + 1;
    if (f.total_fare < minFare) minFare = f.total_fare;
    if (f.total_fare > maxFare) maxFare = f.total_fare;
  });

  const availableAirlines = Object.keys(airlineCounts).sort();

  // Reset helper
  const handleReset = () => {
    onChange({
      maxPrice: maxFare > 0 ? maxFare : 25000,
      stops: [],
      airlines: [],
      cabinClasses: [],
      timeOfDay: [],
      refundableOnly: false,
      maxDurationMinutes: 1440,
    });
  };

  const toggleStop = (stop: number) => {
    const current = [...filterState.stops];
    const index = current.indexOf(stop);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(stop);
    }
    onChange({ ...filterState, stops: current });
  };

  const toggleAirline = (airline: string) => {
    const current = [...filterState.airlines];
    const index = current.indexOf(airline);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(airline);
    }
    onChange({ ...filterState, airlines: current });
  };

  const toggleTimeOfDay = (period: 'morning' | 'afternoon' | 'evening' | 'night') => {
    const current = [...filterState.timeOfDay];
    const index = current.indexOf(period);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(period);
    }
    onChange({ ...filterState, timeOfDay: current });
  };

  return (
    <div className="glass-panel border border-slate-800/80 rounded-2xl p-4 md:p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2 text-slate-100 font-bold text-sm">
          <SlidersHorizontal className="w-4 h-4 text-purple-400" />
          <span>Filters</span>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-slate-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Max Price Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300">Max Budget</span>
          <span className="font-mono font-bold text-purple-400">
            {currencySymbol}{Math.round(filterState.maxPrice * currencyRate).toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min={minFare !== Infinity ? minFare : 2000}
          max={maxFare > 0 ? maxFare : 30000}
          step={200}
          value={filterState.maxPrice}
          onChange={(e) => onChange({ ...filterState, maxPrice: Number(e.target.value) })}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>{currencySymbol}{Math.round((minFare !== Infinity ? minFare : 2000) * currencyRate).toLocaleString('en-IN')}</span>
          <span>{currencySymbol}{Math.round((maxFare > 0 ? maxFare : 30000) * currencyRate).toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Stops */}
      <div className="space-y-2.5">
        <span className="text-xs font-semibold text-slate-300 block">Stops</span>
        <div className="space-y-1.5">
          {[
            { label: 'Non-stop', value: 0 },
            { label: '1 Stop', value: 1 },
            { label: '2+ Stops', value: 2 },
          ].map((item) => {
            const isChecked = filterState.stops.includes(item.value);
            return (
              <label
                key={item.value}
                className="flex items-center justify-between text-xs text-slate-300 hover:text-white cursor-pointer py-1 px-1.5 rounded-lg hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleStop(item.value)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-purple-600 focus:ring-purple-500/30 accent-purple-600"
                  />
                  <span>{item.label}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Airlines (Dynamically extracted) */}
      <div className="space-y-2.5">
        <span className="text-xs font-semibold text-slate-300 block">Airlines</span>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {availableAirlines.map((airline) => {
            const isChecked = filterState.airlines.includes(airline);
            return (
              <label
                key={airline}
                className="flex items-center justify-between text-xs text-slate-300 hover:text-white cursor-pointer py-1 px-1.5 rounded-lg hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-2 truncate">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleAirline(airline)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-purple-600 focus:ring-purple-500/30 accent-purple-600"
                  />
                  <span className="truncate">{airline}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  {airlineCounts[airline]}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Departure Time of Day */}
      <div className="space-y-2.5">
        <span className="text-xs font-semibold text-slate-300 block">Departure Time</span>
        <div className="grid grid-cols-2 gap-2">
          {[
            { key: 'morning' as const, label: 'Morning', time: '06 - 12', icon: Sunrise },
            { key: 'afternoon' as const, label: 'Afternoon', time: '12 - 18', icon: Sun },
            { key: 'evening' as const, label: 'Evening', time: '18 - 24', icon: Sunset },
            { key: 'night' as const, label: 'Night', time: '00 - 06', icon: Moon },
          ].map(({ key, label, time, icon: Icon }) => {
            const isChecked = filterState.timeOfDay.includes(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleTimeOfDay(key)}
                className={`p-2 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                  isChecked
                    ? 'bg-purple-950/50 border-purple-500 text-purple-200'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-[10px] font-mono text-slate-500">{time}</span>
                </div>
                <span className="text-xs font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Refundable Only Toggle */}
      <div className="pt-2 border-t border-slate-800/80">
        <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
          <span>Refundable Fares Only</span>
          <input
            type="checkbox"
            checked={filterState.refundableOnly}
            onChange={(e) => onChange({ ...filterState, refundableOnly: e.target.checked })}
            className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-purple-600 focus:ring-purple-500/30 accent-purple-600"
          />
        </label>
      </div>
    </div>
  );
}
