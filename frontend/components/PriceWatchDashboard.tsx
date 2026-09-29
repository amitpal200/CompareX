'use client';

import React, { useState } from 'react';
import { BellRing, Check, TrendingDown, Trash2, Play, AlertCircle, ArrowUpRight, ShieldCheck, Mail, Sparkles } from 'lucide-react';
import { PriceAlert, CurrencyCode, CURRENCY_MAP } from '../lib/types';

interface PriceWatchDashboardProps {
  alerts: PriceAlert[];
  currency?: CurrencyCode;
  onSimulateDrop: (alertId: string) => void;
  onDeleteAlert: (alertId: string) => void;
  onOpenItem: (alert: PriceAlert) => void;
}

export const PriceWatchDashboard: React.FC<PriceWatchDashboardProps> = ({
  alerts,
  currency = 'INR',
  onSimulateDrop,
  onDeleteAlert,
  onOpenItem
}) => {
  const curr = CURRENCY_MAP[currency] || CURRENCY_MAP['INR'];
  const formatPrice = (p: number) => `${curr.symbol}${Math.round(p * curr.rateFromINR).toLocaleString('en-IN')}`;

  const triggeredCount = alerts.filter(a => a.status === 'triggered').length;

  return (
    <div className="w-full max-w-5xl mx-auto py-6 animate-in fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-500/30 rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <BellRing className="w-7 h-7 text-amber-400 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  CompareX Autonomous Price Watch Radar
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                  Live Agent
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Background worker checks retailer feeds every 15 minutes. Automatically notifies you when your target drops.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block font-semibold">Active Radars</span>
              <span className="text-lg font-black text-white">{alerts.length}</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block font-semibold">Deals Triggered</span>
              <span className="text-lg font-black text-emerald-400">{triggeredCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Table/List */}
      {alerts.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-3xl p-8">
          <BellRing className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No Active Price Radars</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Click the 🔔 icon on any laptop, flight, or hotel to set a target threshold. CompareX will monitor prices autonomously.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map(alert => {
            const isTriggered = alert.status === 'triggered';
            const priceDiff = alert.currentPrice - alert.targetPrice;

            return (
              <div
                key={alert.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isTriggered
                    ? 'bg-emerald-950/20 border-emerald-500/50 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/30'
                    : 'bg-slate-900/70 hover:bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Left Title & Status */}
                  <div className="flex-1 min-w-[240px]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                        {alert.category === 'shopping' ? '🛍️ Product' : alert.category === 'travel' ? '✈️ Flight' : '🏨 Hotel'}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400">Audited via {alert.provider}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-[11px] text-slate-500">Checked {alert.lastChecked}</span>
                    </div>

                    <h4 className="text-base font-bold text-white">{alert.itemTitle}</h4>

                    {isTriggered ? (
                      <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>TARGET REACHED! Email notification dispatched.</span>
                      </div>
                    ) : (
                      <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
                        <span>Waiting for price to drop by {formatPrice(Math.max(0, priceDiff))}</span>
                      </div>
                    )}
                  </div>

                  {/* Middle Pricing */}
                  <div className="flex items-center gap-6 text-center">
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Target Price</span>
                      <span className="text-base font-extrabold text-amber-400">
                        {formatPrice(alert.targetPrice)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Current Price</span>
                      <span className={`text-base font-extrabold ${isTriggered ? 'text-emerald-400 font-black' : 'text-white'}`}>
                        {formatPrice(alert.currentPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2.5">
                    {!isTriggered && (
                      <button
                        onClick={() => onSimulateDrop(alert.id)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all active:scale-95"
                        title="Simulate store price drop"
                      >
                        <Play className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>Simulate Price Drop</span>
                      </button>
                    )}

                    <button
                      onClick={() => onDeleteAlert(alert.id)}
                      className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-500 hover:text-red-400 border border-slate-800 transition-colors"
                      title="Delete Radar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
