'use client';

import React from 'react';
import { X, ShieldCheck, Tag, Truck, Receipt, AlertCircle, ExternalLink, CheckCircle2 } from 'lucide-react';
import { PriceBreakdownData, CurrencyCode, CURRENCY_MAP } from '../lib/types';

interface PriceBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PriceBreakdownData | null;
  currency?: CurrencyCode;
}

export const PriceBreakdownModal: React.FC<PriceBreakdownModalProps> = ({
  isOpen,
  onClose,
  data,
  currency = 'INR'
}) => {
  if (!isOpen || !data) return null;

  const curr = CURRENCY_MAP[currency] || CURRENCY_MAP['INR'];
  const formatMoney = (val: number) =>
    `${curr.symbol}${Math.round(val * curr.rateFromINR).toLocaleString('en-IN')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{data.provider}</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Verified Offer
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Itemized Price Breakdown & Discount Audit</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Breakdown List */}
        <div className="p-5 space-y-3.5 text-xs">
          {/* Base / Listed Price */}
          <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
            <span className="text-slate-300 flex items-center gap-2">
              <span>Listed Store Price</span>
              {data.mrp > data.listed_price && (
                <span className="text-[11px] text-slate-500 line-through">
                  MRP {formatMoney(data.mrp)}
                </span>
              )}
            </span>
            <span className="font-semibold text-white">{formatMoney(data.listed_price)}</span>
          </div>

          {/* Delivery */}
          <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
            <span className="text-slate-300 flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Standard Delivery & Handling</span>
            </span>
            <span className={`font-semibold ${data.delivery_fee === 0 ? 'text-emerald-400' : 'text-slate-200'}`}>
              {data.delivery_fee === 0 ? 'FREE' : formatMoney(data.delivery_fee)}
            </span>
          </div>

          {/* Discounts */}
          {data.verified_discount > 0 && (
            <div className="flex items-center justify-between py-1 border-b border-slate-800/60 text-emerald-400">
              <span className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" />
                <span>Verified Instant Discount</span>
              </span>
              <span className="font-bold">- {formatMoney(data.verified_discount)}</span>
            </div>
          )}

          {/* Effective Price Total */}
          <div className="pt-2 flex items-center justify-between text-sm">
            <div>
              <span className="font-bold text-white block">Effective Final Price</span>
              <span className="text-[10px] text-slate-400">{data.delivery_estimate}</span>
            </div>
            <div className="text-right">
              <span className="text-xl font-extrabold text-emerald-400 block">
                {formatMoney(data.effective_price)}
              </span>
              {data.savings_vs_mrp > 0 && (
                <span className="text-[10px] font-semibold text-indigo-300 block">
                  You save {formatMoney(data.savings_vs_mrp)} vs MRP
                </span>
              )}
            </div>
          </div>

          {/* Offer terms note */}
          {data.offer_terms && (
            <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-indigo-200">
              <div className="flex items-center gap-1.5 font-semibold text-[11px] mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Offer Terms & Eligibility</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                {data.offer_terms}
              </p>
            </div>
          )}

          {/* Mandatory Disclaimer */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400/90 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {data.disclaimer}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
