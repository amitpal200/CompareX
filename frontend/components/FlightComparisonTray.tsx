'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Scale, X, ArrowRight, Plane } from 'lucide-react';
import { FlightOffer } from '@/lib/types';

interface FlightComparisonTrayProps {
  pinnedFlights: FlightOffer[];
  onRemove: (flightId: string) => void;
  onClear: () => void;
  currencySymbol?: string;
  currencyRate?: number;
}

export default function FlightComparisonTray({
  pinnedFlights,
  onRemove,
  onClear,
  currencySymbol = '₹',
  currencyRate = 1,
}: FlightComparisonTrayProps) {
  const router = useRouter();

  if (pinnedFlights.length === 0) return null;

  const handleCompareClick = () => {
    // Store selected flights in sessionStorage for `/compare` page
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('compare_flights', JSON.stringify(pinnedFlights));
    }
    const ids = pinnedFlights.map((f) => f.id).join(',');
    router.push(`/compare?ids=${ids}`);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 pointer-events-none">
      <div className="max-w-5xl mx-auto glass-panel border border-purple-500/50 bg-[#0B1224]/95 shadow-2xl rounded-2xl p-4 pointer-events-auto backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-300">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Header & Badges */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>Compare Flights</span>
                <span className="text-xs font-mono font-bold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
                  {pinnedFlights.length} / 3 Selected
                </span>
              </div>
              <div className="text-xs text-slate-400">
                Compare price, duration, baggage & refund policies side by side
              </div>
            </div>
          </div>

          {/* Mini Cards of Selected Flights */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
            {pinnedFlights.map((flight) => {
              const fare = Math.round(flight.total_fare * currencyRate);
              return (
                <div
                  key={flight.id}
                  className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-200 relative group flex-shrink-0"
                >
                  <Plane className="w-3.5 h-3.5 text-purple-400" />
                  <span className="font-semibold">{flight.airline_code} {flight.flight_number}</span>
                  <span className="text-purple-300 font-mono font-bold">
                    {currencySymbol}{fare.toLocaleString('en-IN')}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemove(flight.id)}
                    className="w-4 h-4 rounded-full bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300 flex items-center justify-center transition-colors ml-1"
                    title="Remove"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClear}
              className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleCompareClick}
              disabled={pinnedFlights.length < 2}
              className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md ${
                pinnedFlights.length >= 2
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <span>View Comparison</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
