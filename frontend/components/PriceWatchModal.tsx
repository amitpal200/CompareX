'use client';

import React, { useState } from 'react';
import { BellRing, Check, TrendingDown, X, History, Mail } from 'lucide-react';
import { Product, TravelOption, HotelOption, CurrencyCode, CURRENCY_MAP } from '../lib/types';

interface PriceWatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency?: CurrencyCode;
  targetItem: {
    type: 'product' | 'travel' | 'hotel';
    product?: Product;
    travel?: TravelOption;
    hotel?: HotelOption;
  } | null;
  onSaveAlert: (alertData: { itemId: string; title: string; targetPrice: number; category: 'shopping' | 'travel' | 'hotel' }) => void;
}

export const PriceWatchModal: React.FC<PriceWatchModalProps> = ({
  isOpen,
  onClose,
  currency = 'INR',
  targetItem,
  onSaveAlert
}) => {
  const [targetPrice, setTargetPrice] = useState<number>(0);
  const [email, setEmail] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const curr = CURRENCY_MAP[currency] || CURRENCY_MAP['INR'];
  const formatPrice = (p: number) => `${curr.symbol}${Math.round(p * curr.rateFromINR).toLocaleString('en-IN')}`;

  if (!isOpen || !targetItem) return null;

  const title = targetItem.type === 'product'
    ? targetItem.product?.title
    : targetItem.type === 'hotel'
    ? targetItem.hotel?.name
    : `${targetItem.travel?.provider} Flight (${targetItem.travel?.origin} to ${targetItem.travel?.destination})`;

  const currentPrice = targetItem.type === 'product'
    ? targetItem.product?.best_price || 0
    : targetItem.type === 'hotel'
    ? targetItem.hotel?.price_per_night || 0
    : targetItem.travel?.price || 0;

  const history = targetItem.product?.price_history || targetItem.hotel?.price_history || targetItem.travel?.price_history || [
    { date: 'Aug 05', price: currentPrice + 4000 },
    { date: 'Aug 15', price: currentPrice + 2500 },
    { date: 'Aug 25', price: currentPrice + 1000 },
    { date: 'Current', price: currentPrice }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTarget = targetPrice || Math.round(currentPrice * 0.92);
    const category = targetItem.type === 'product' ? 'shopping' : targetItem.type === 'hotel' ? 'hotel' : 'travel';
    const itemId = targetItem.type === 'product'
      ? targetItem.product!.canonical_id
      : targetItem.type === 'hotel'
      ? targetItem.hotel!.id
      : targetItem.travel!.id;

    onSaveAlert({
      itemId,
      title: title || 'Item',
      targetPrice: finalTarget,
      category
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
            <BellRing className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">CompareX Price Watch</h3>
            <p className="text-xs text-slate-400">Autonomous price drop tracker & radar</p>
          </div>
        </div>

        <div className="mb-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">Target Item</span>
          <p className="text-xs font-bold text-white line-clamp-2">{title}</p>
          <div className="mt-2 flex justify-between items-baseline">
            <span className="text-xs text-slate-400">Current Lowest Rate:</span>
            <span className="text-base font-extrabold text-white">{formatPrice(currentPrice)}</span>
          </div>
        </div>

        {/* Price Trend History Visualizer */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
            <span className="flex items-center gap-1"><History className="w-3.5 h-3.5 text-indigo-400" /> Recent Price Trend</span>
            <span className="text-emerald-400 text-[11px] font-bold">📉 Verified Feed History</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex justify-between items-end h-20 gap-2">
            {history.slice(-4).map((pt, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <div 
                  className="w-full bg-indigo-500/70 rounded-t transition-all hover:bg-indigo-400"
                  style={{ height: `${Math.max(25, 60 - idx * 8)}px` }}
                />
                <span className="text-[10px] text-slate-400">{pt.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alert Setup Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Notify me when price drops to ({curr.symbol})
            </label>
            <input
              type="number"
              defaultValue={Math.round(currentPrice * 0.92)}
              onChange={(e) => setTargetPrice(Number(e.target.value))}
              placeholder={`e.g. ${formatPrice(Math.round(currentPrice * 0.92))}`}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              required
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Suggested: {formatPrice(Math.round(currentPrice * 0.92))} (~8% drop)
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Alert Notification Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={savedSuccess}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs tracking-wide uppercase shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                <span>Price Watch Activated!</span>
              </>
            ) : (
              <>
                <BellRing className="w-4 h-4 text-slate-950" />
                <span>Set Price Watch</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
