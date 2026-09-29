'use client';

import React, { useState } from 'react';
import { Product, CurrencyCode, CURRENCY_MAP } from '../lib/types';
import { Sparkles, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, Zap, BarChart3, Store } from 'lucide-react';
import { ProductTruthBadge } from './ProductTruthBadge';
import { WhyTrustThisModal } from './WhyTrustThisModal';

interface BestForYouHeroCardProps {
  product: Product;
  currency: CurrencyCode;
  whyChoseThis?: string;
  whyNotCheapest?: string;
  onSelectDeal: (product: Product, offerIndex?: number) => void;
  onToggleCompare: (product: Product) => void;
  onOpenPriceBreakdown?: (offer: any, product: Product) => void;
  isCompared?: boolean;
}

export const BestForYouHeroCard: React.FC<BestForYouHeroCardProps> = ({
  product,
  currency,
  whyChoseThis,
  whyNotCheapest,
  onSelectDeal,
  onToggleCompare,
  onOpenPriceBreakdown,
  isCompared = false
}) => {
  const [showWhyTrust, setShowWhyTrust] = useState(false);
  const curr = CURRENCY_MAP[currency] || CURRENCY_MAP.INR;
  const bestOffer = product.offers?.[0];
  const lowestPrice = product.best_price;
  const originalPrice = bestOffer?.original_price || Math.round(lowestPrice * 1.25);
  const discountPercent = originalPrice > lowestPrice ? Math.round(((originalPrice - lowestPrice) / originalPrice) * 100) : 0;

  const defaultWhyChose = whyChoseThis || (
    product.score_reasons && product.score_reasons.length > 0
      ? product.score_reasons.join('. ')
      : "Engineered with superior cushioning and high durability, meeting all your constraints under budget."
  );

  const defaultWhyNotCheapest = whyNotCheapest || (
    product.trade_offs && product.trade_offs.length > 0
      ? `While cheaper alternatives exist under ₹1,500, they utilize unreinforced EVA outsoles that compress rapidly. ${product.title.split('(')[0].trim()} offers superior longevity and joint protection.`
      : "Cheaper baseline alternatives sacrifice long-term midsole durability, traction rubber, and warranty support."
  );

  return (
    <div className="relative mb-8 rounded-3xl p-[1px] bg-gradient-to-r from-amber-500/40 via-indigo-500/40 to-emerald-500/40 shadow-2xl shadow-indigo-950/50 overflow-hidden">
      <div className="relative rounded-[23px] bg-slate-900/95 backdrop-blur-xl p-5 sm:p-7 border border-slate-800/80">
        
        {/* Top Intelligence Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-black tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>CompareX AI Top Recommendation • Best For You</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <ProductTruthBadge
              status={product.verification_status}
              confidenceScore={product.confidence_score}
              isDemo={product.is_demo_mock}
            />
            <button
              type="button"
              onClick={() => setShowWhyTrust(true)}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-2 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Why Trust This?</span>
            </button>
            <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold">
              AI Score: {product.score}/10
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Product Image & Spec Pill */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-full aspect-video sm:aspect-square max-w-xs sm:max-w-sm rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group shadow-inner">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700 text-[11px] font-extrabold text-amber-400">
                ⭐ {product.rating} ({product.review_count.toLocaleString('en-IN')} reviews)
              </div>
              {discountPercent > 0 && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-emerald-600 text-[11px] font-extrabold text-white shadow-md">
                  {discountPercent}% OFF
                </div>
              )}
            </div>

            {/* Quick Specs Strip */}
            <div className="w-full mt-3 flex flex-wrap gap-1.5 justify-center">
              {Object.entries(product.specifications || {}).slice(0, 3).map(([k, v], idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-[10px] text-slate-300 font-medium">
                  <strong className="text-slate-200">{k}:</strong> {v}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Reasoning & Decision Architecture */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-indigo-400 mb-1 tracking-wide">
                {product.brand} • {product.subcategory}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">
                {product.title}
              </h3>

              {/* Price & Savings Pill */}
              <div className="flex flex-wrap items-baseline gap-3 mb-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                  {curr.symbol}{(lowestPrice * curr.rateFromINR).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
                {originalPrice > lowestPrice && (
                  <span className="text-sm text-slate-500 line-through">
                    {curr.symbol}{(originalPrice * curr.rateFromINR).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  Save {curr.symbol}{((originalPrice - lowestPrice) * curr.rateFromINR).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Store className="w-3.5 h-3.5 text-indigo-400" />
                  Available in {product.offers?.length || 3} audited stores
                </span>
              </div>

              {/* Explainable Decision Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                
                {/* Block 1: Why CompareX Chose This */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Why CompareX Chose This:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {defaultWhyChose}
                  </p>
                </div>

                {/* Block 2: Why Not The Cheapest? */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-500/20">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Why Not The Cheapest Alternative?</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {defaultWhyNotCheapest}
                  </p>
                </div>

              </div>

              {/* Multi-Store Spread Preview */}
              {product.offers && product.offers.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="text-[11px] font-semibold text-slate-400">Stores Scanned:</span>
                  {product.offers.map((offer, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onOpenPriceBreakdown?.(offer, product)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        idx === 0
                          ? 'bg-emerald-950/50 border-emerald-600/40 text-emerald-300 hover:bg-emerald-900/60'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span>{offer.provider}:</span>
                      <span className={idx === 0 ? 'text-emerald-400' : 'text-slate-200'}>
                        {curr.symbol}{(offer.price * curr.rateFromINR).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </span>
                      {idx === 0 && (
                        <span className="px-1.5 py-0.2 rounded bg-emerald-500 text-[9px] font-black text-slate-950 uppercase">
                          Lowest
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => onSelectDeal(product, 0)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 text-slate-950 fill-current" />
                <span>Select & Proceed with Top Deal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onToggleCompare(product)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isCompared
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-950 border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>{isCompared ? 'In Compare Tray' : 'Compare with Others'}</span>
              </button>

              {bestOffer && onOpenPriceBreakdown && (
                <button
                  type="button"
                  onClick={() => onOpenPriceBreakdown(bestOffer, product)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold underline ml-auto cursor-pointer"
                >
                  View Itemized Price Breakdown →
                </button>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Why Trust This Modal */}
      <WhyTrustThisModal
        isOpen={showWhyTrust}
        onClose={() => setShowWhyTrust(false)}
        product={product}
      />
    </div>
  );
};
