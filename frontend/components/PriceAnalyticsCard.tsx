'use client';

import React from 'react';
import { TrendingDown, TrendingUp, Minus, Bell, Sparkles } from 'lucide-react';
import { PriceAnalytics } from '@/lib/types';
import Link from 'next/link';

interface PriceAnalyticsCardProps {
  analytics: PriceAnalytics;
  origin: string;
  destination: string;
  currencySymbol?: string;
  currencyRate?: number;
}

export default function PriceAnalyticsCard({
  analytics,
  origin,
  destination,
  currencySymbol = '₹',
  currencyRate = 1,
}: PriceAnalyticsCardProps) {
  const lowest = Math.round((analytics.lowest ?? analytics.lowest_price ?? 0) * currencyRate);
  const average = Math.round((analytics.average ?? analytics.average_price ?? 0) * currencyRate);
  const highest = Math.round((analytics.highest ?? analytics.highest_price ?? 0) * currencyRate);
  const savings = Math.round((analytics.savings_vs_avg ?? analytics.potential_savings ?? 0) * currencyRate);

  const getTrendIcon = () => {
    if (analytics.price_trend === 'falling') {
      return <TrendingDown className="w-4 h-4 text-emerald-400" />;
    }
    if (analytics.price_trend === 'rising') {
      return <TrendingUp className="w-4 h-4 text-rose-400" />;
    }
    return <Minus className="w-4 h-4 text-amber-400" />;
  };

  const getTrendText = () => {
    if (analytics.price_trend === 'falling') {
      return 'Prices are currently lower than usual. Great time to book!';
    }
    if (analytics.price_trend === 'rising') {
      return 'Fares are surging due to route demand. Lock in your fare now.';
    }
    return 'Prices are currently typical for this travel window.';
  };

  return (
    <div className="glass-panel border border-slate-800/80 rounded-2xl p-4 md:p-5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Summary Metrics */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Route Fare Analytics ({origin} → {destination})
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-4 mt-2">
            <div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                Lowest Fare
              </div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                {currencySymbol}{lowest.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="border-l border-slate-800 pl-4">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                Route Average
              </div>
              <div className="text-xl sm:text-2xl font-bold text-slate-200 font-mono">
                {currencySymbol}{average.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="border-l border-slate-800 pl-4">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                Max Peak Fare
              </div>
              <div className="text-xl sm:text-2xl font-bold text-slate-400 font-mono">
                {currencySymbol}{highest.toLocaleString('en-IN')}
              </div>
            </div>

            {savings > 0 && (
              <div className="hidden sm:block border-l border-slate-800 pl-4">
                <div className="text-[11px] text-emerald-400 uppercase tracking-wider font-semibold">
                  Potential Savings
                </div>
                <div className="text-lg font-bold text-emerald-400 font-mono">
                  Save ~{currencySymbol}{savings.toLocaleString('en-IN')}
                </div>
              </div>
            )}
          </div>

          {/* Trend Note */}
          <div className="flex items-center gap-2 mt-3 text-xs text-slate-300">
            {getTrendIcon()}
            <span>{getTrendText()}</span>
          </div>
        </div>

        {/* Right: Price Radar Button */}
        <div className="flex-shrink-0 flex items-center">
          <Link
            href={`/price-radar?origin=${origin}&destination=${destination}&target_price=${lowest}`}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-purple-300 hover:text-purple-200 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Bell className="w-3.5 h-3.5 text-purple-400" />
            <span>Track with Price Radar</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
