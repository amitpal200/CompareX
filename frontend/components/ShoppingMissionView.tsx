'use client';

import React from 'react';
import { ShoppingMissionData, Product, CurrencyCode, CURRENCY_MAP } from '../lib/types';
import { CheckCircle2, Sparkles, Target, Wallet, Layers, ShieldCheck, ExternalLink, ArrowRight } from 'lucide-react';

interface ShoppingMissionViewProps {
  mission: ShoppingMissionData;
  currency?: CurrencyCode;
  onSelectProduct?: (product: Product) => void;
  onSelectDeal?: (product: Product, providerIndex?: number) => void;
}

export const ShoppingMissionView: React.FC<ShoppingMissionViewProps> = ({
  mission,
  currency = 'INR',
  onSelectProduct,
  onSelectDeal,
}) => {
  const curr = CURRENCY_MAP[currency] || CURRENCY_MAP['INR'];
  const formatPrice = (p: number) => `${curr.symbol}${Math.round(p * curr.rateFromINR).toLocaleString('en-IN')}`;

  const tasks = mission.tasks || [];
  const totalAllocated = mission.allocated_total || tasks.reduce((sum, t) => sum + t.allocated_budget, 0);
  const remaining = mission.remaining_budget ?? Math.max(0, mission.total_budget - totalAllocated);

  return (
    <div className="mb-10 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-indigo-950/40 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-indigo-400" />
              Shopping Mission Mode
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Autonomous Plan Generated
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{mission.goal}</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            CompareX AI decomposed your setup goal into <strong className="text-slate-200">{tasks.length} synchronized hardware tasks</strong> with verified compatibility.
          </p>
        </div>

        {/* Budget Allocation Stats */}
        <div className="flex items-center gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800 self-start md:self-auto">
          <div className="px-3 py-1">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Mission Budget</div>
            <div className="text-lg font-black text-white">{formatPrice(mission.total_budget)}</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="px-3 py-1">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Allocated Spend</div>
            <div className="text-lg font-black text-indigo-400">{formatPrice(totalAllocated)}</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="px-3 py-1">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Remaining Buffer</div>
            <div className="text-lg font-black text-emerald-400">{formatPrice(remaining)}</div>
          </div>
        </div>
      </div>

      {/* Task Checklist & Component Cards */}
      <div className="relative z-10 mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {tasks.map((task, idx) => {
          const product = task.selected_product;
          const bestPrice = product ? product.best_price : task.allocated_budget;
          const offers = product?.offers || [];
          const bestOffer = offers[0];

          return (
            <div
              key={task.task_id || idx}
              className="bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Task Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center border border-indigo-500/30">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                        {task.category}
                      </div>
                      <div className="text-sm font-semibold text-white">
                        {task.title}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Allocated</span>
                    <span className="text-xs font-bold text-slate-300">{formatPrice(task.allocated_budget)}</span>
                  </div>
                </div>

                {/* Selected Product Details */}
                {product && (
                  <div className="flex gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 mt-2">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0 bg-slate-800"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white line-clamp-1">
                        {product.title}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-black text-emerald-400">
                          {formatPrice(bestPrice)}
                        </span>
                        {bestOffer && (
                          <span className="text-[11px] font-medium text-slate-400">
                            via <strong className="text-slate-200">{bestOffer.provider}</strong>
                          </span>
                        )}
                        {product.badge && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      
                      {/* Micro Specs */}
                      {product.specifications && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {Object.entries(product.specifications).slice(0, 2).map(([k, v]) => (
                            <span key={k} className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                              {k}: <span className="text-slate-300">{v.split('(')[0]}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Task Action Bar */}
              {product && (
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/60">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Verified stock & multi-store fulfillment
                  </span>
                  <div className="flex gap-2">
                    {onSelectProduct && (
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="text-xs text-indigo-300 hover:text-indigo-200 font-semibold px-2 py-1 rounded bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-800/60 transition"
                      >
                        Inspect Product
                      </button>
                    )}
                    {bestOffer && onSelectDeal && (
                      <button
                        onClick={() => onSelectDeal(product, 0)}
                        className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-2.5 py-1 rounded transition flex items-center gap-1 shadow-sm shadow-indigo-500/30"
                      >
                        Buy at {bestOffer.provider}
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
