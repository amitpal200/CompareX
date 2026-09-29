'use client';

import React, { useState } from 'react';
import { TrendingDown, TrendingUp, Calendar, AlertCircle, Sparkles } from 'lucide-react';
import { PriceHistoryPoint, CurrencyCode, CURRENCY_MAP } from '../lib/types';

interface PriceChartProps {
  history: PriceHistoryPoint[];
  currentPrice: number;
  currency?: CurrencyCode;
  buyAdvice?: 'Buy Now' | 'Wait for Sale' | 'Fair Price' | 'Prices Rising Soon' | 'Stable Fare';
  itemTitle?: string;
}

export const PriceChart: React.FC<PriceChartProps> = ({
  history,
  currentPrice,
  currency = 'INR',
  buyAdvice = 'Buy Now',
  itemTitle
}) => {
  const [activeRange, setActiveRange] = useState<'30d' | '60d' | '90d'>('90d');
  const [hoveredPoint, setHoveredPoint] = useState<PriceHistoryPoint | null>(null);

  const curr = CURRENCY_MAP[currency] || CURRENCY_MAP['INR'];
  const formatPrice = (p: number) => `${curr.symbol}${Math.round(p * curr.rateFromINR).toLocaleString('en-IN')}`;

  if (!history || history.length === 0) return null;

  const prices = history.map(h => h.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice || 1;

  // SVG dimensions
  const width = 460;
  const height = 160;
  const paddingX = 35;
  const paddingY = 25;

  const getCoordinates = (index: number, price: number) => {
    const x = paddingX + (index / (history.length - 1)) * (width - paddingX * 2);
    const normalizedY = (price - minPrice) / priceRange;
    const y = height - paddingY - normalizedY * (height - paddingY * 2);
    return { x, y };
  };

  const pointsString = history
    .map((h, i) => {
      const { x, y } = getCoordinates(i, h.price);
      return `${x},${y}`;
    })
    .join(' ');

  const isAtLowest = currentPrice <= minPrice;

  return (
    <div className="w-full bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 sm:p-5 text-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-200 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            Verified Historical Price Trend
          </span>
          {isAtLowest && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] border border-emerald-500/30">
              🎯 90-Day All-Time Low
            </span>
          )}
        </div>

        {/* AI Advice Pill */}
        <div className="flex items-center gap-1.5">
          <span className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold flex items-center gap-1 ${
            buyAdvice === 'Buy Now'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : buyAdvice === 'Wait for Sale'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
          }`}>
            <Sparkles className="w-3 h-3" />
            Advice: {buyAdvice}
          </span>
        </div>
      </div>

      {/* SVG Interactive Chart */}
      <div className="relative w-full h-[160px] select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={width - paddingX}
            y2={paddingY}
            stroke="#334155"
            strokeDasharray="3 3"
            strokeOpacity="0.4"
          />
          <line
            x1={paddingX}
            y1={height - paddingY}
            x2={width - paddingX}
            y2={height - paddingY}
            stroke="#334155"
            strokeDasharray="3 3"
            strokeOpacity="0.4"
          />

          {/* Area under curve */}
          <polygon
            points={`${paddingX},${height - paddingY} ${pointsString} ${width - paddingX},${height - paddingY}`}
            fill="url(#priceGradient)"
          />

          {/* Trend Line */}
          <polyline
            fill="none"
            stroke="#818cf8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={pointsString}
          />

          {/* Data Points */}
          {history.map((h, idx) => {
            const { x, y } = getCoordinates(idx, h.price);
            const isHovered = hoveredPoint?.date === h.date;

            return (
              <g key={idx} className="cursor-pointer">
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 6 : 4}
                  fill={isHovered ? '#38bdf8' : '#6366f1'}
                  stroke="#0f172a"
                  strokeWidth="2"
                  onMouseEnter={() => setHoveredPoint(h)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Dynamic Tooltip */}
        {hoveredPoint && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-indigo-500/50 shadow-xl backdrop-blur-md pointer-events-none text-center animate-in fade-in">
            <span className="text-[10px] text-slate-400 block">{hoveredPoint.date}</span>
            <span className="text-xs font-black text-white">{formatPrice(hoveredPoint.price)}</span>
          </div>
        )}
      </div>

      {/* Footer Metrics */}
      <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <div>
          Lowest: <span className="text-emerald-400 font-bold">{formatPrice(minPrice)}</span>
        </div>
        <div>
          Highest: <span className="text-slate-300 font-medium">{formatPrice(maxPrice)}</span>
        </div>
        <div>
          Current: <span className="text-white font-extrabold">{formatPrice(currentPrice)}</span>
        </div>
      </div>
    </div>
  );
};
