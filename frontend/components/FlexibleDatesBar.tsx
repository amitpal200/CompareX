'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, TrendingDown, ChevronLeft, ChevronRight, Sparkles, Loader2 } from 'lucide-react';
import { FlexibleDateFare, FlexibleDatesResponse } from '@/lib/types';

interface FlexibleDatesBarProps {
  origin: string;
  destination: string;
  currentDate: string;
  onSelectDate: (newDate: string) => void;
  currencySymbol?: string;
  currencyRate?: number;
}

export default function FlexibleDatesBar({
  origin,
  destination,
  currentDate,
  onSelectDate,
  currencySymbol = '₹',
  currencyRate = 1,
}: FlexibleDatesBarProps) {
  const [data, setData] = useState<FlexibleDatesResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!origin || !destination || !currentDate) return;

    let isMounted = true;
    setLoading(true);

    const fetchFlexible = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/flights/flexible-dates?origin=${encodeURIComponent(
            origin
          )}&destination=${encodeURIComponent(destination)}&departure_date=${encodeURIComponent(
            currentDate
          )}`
        );
        if (res.ok) {
          const resData: FlexibleDatesResponse = await res.json();
          if (isMounted) {
            setData(resData);
          }
        }
      } catch (err) {
        console.error('Failed to fetch flexible dates:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFlexible();

    return () => {
      isMounted = false;
    };
  }, [origin, destination, currentDate]);

  if (!data || !data.dates || data.dates.length === 0) {
    if (loading) {
      return (
        <div className="p-3 glass-panel border border-slate-800 rounded-2xl flex items-center justify-center gap-2 text-xs text-slate-400">
          <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
          <span>Scanning adjacent dates for cheaper fares...</span>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="glass-panel border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold text-slate-200">
            Flexible Dates Fare Scanner (±3 Days)
          </span>
          {data.max_savings > 0 && (
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              Save up to {currencySymbol}{Math.round(data.max_savings * currencyRate).toLocaleString('en-IN')} on {data.cheapest_date}
            </span>
          )}
        </div>

        <span className="text-[11px] text-slate-400">
          Click any date to instantly compare live airline fares
        </span>
      </div>

      {/* Date Carousel Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {data.dates.map((item) => {
          const isSelected = item.date === currentDate;
          const displayPrice = Math.round(item.lowest_fare * currencyRate);
          const diff = Math.round(item.diff_vs_base * currencyRate);

          return (
            <button
              key={item.date}
              type="button"
              onClick={() => onSelectDate(item.date)}
              className={`p-2.5 rounded-xl border text-center transition-all relative ${
                isSelected
                  ? 'bg-purple-600/30 border-purple-500 shadow-md shadow-purple-500/20 ring-1 ring-purple-500/50'
                  : item.is_cheapest
                  ? 'bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-400'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              {item.is_cheapest && !isSelected && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold bg-emerald-500 text-slate-950 px-1.5 py-0.2 rounded-full uppercase">
                  Cheapest
                </span>
              )}

              <div className="text-[11px] font-medium text-slate-400">
                {item.day_name.slice(0, 3)}, {item.date.slice(8)} {new Date(item.date).toLocaleString('default', { month: 'short' })}
              </div>

              <div className="text-xs font-black text-slate-100 font-mono mt-1">
                {currencySymbol}{displayPrice.toLocaleString('en-IN')}
              </div>

              <div className="text-[10px] mt-0.5">
                {isSelected ? (
                  <span className="text-purple-300 font-bold">Selected</span>
                ) : diff < 0 ? (
                  <span className="text-emerald-400 font-semibold font-mono">
                    -{currencySymbol}{Math.abs(diff).toLocaleString('en-IN')}
                  </span>
                ) : diff > 0 ? (
                  <span className="text-slate-500 font-mono">
                    +{currencySymbol}{diff.toLocaleString('en-IN')}
                  </span>
                ) : (
                  <span className="text-slate-500 font-mono">Same</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
