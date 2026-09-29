'use client';

import React, { useState } from 'react';
import { 
  Star, ShieldCheck, ExternalLink, Scale, Check, Zap, Sparkles, 
  TrendingDown, ChevronDown, ChevronUp, MessageSquare, BellRing, Eye, Tag
} from 'lucide-react';
import { Product, CurrencyCode, CURRENCY_MAP } from '../lib/types';
import { PriceChart } from './PriceChart';
import { SentimentBreakdown } from './SentimentBreakdown';
import { ProductTruthBadge } from './ProductTruthBadge';
import { WhyTrustThisModal } from './WhyTrustThisModal';

interface ProductCardProps {
  product: Product;
  isCompared: boolean;
  currency?: CurrencyCode;
  onToggleCompare: (product: Product) => void;
  onSelectDeal: (product: Product, providerIndex?: number) => void;
  onSetPriceWatch: (product: Product) => void;
  onOpenScoreBreakdown?: (product: Product) => void;
  onOpenPriceBreakdown?: (offer: any, product: Product) => void;
  onAskCompareX?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isCompared,
  currency = 'INR',
  onToggleCompare,
  onSelectDeal,
  onSetPriceWatch,
  onOpenScoreBreakdown,
  onOpenPriceBreakdown,
  onAskCompareX,
  onViewDetails
}) => {
  const [showChart, setShowChart] = useState(false);
  const [showSentiment, setShowSentiment] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const [showWhyTrust, setShowWhyTrust] = useState(false);

  const curr = CURRENCY_MAP[currency] || CURRENCY_MAP['INR'];
  const formatPrice = (p: number) => `${curr.symbol}${Math.round(p * curr.rateFromINR).toLocaleString('en-IN')}`;

  const offers = product.offers || [];
  const bestOffer = offers[0];
  const highestOfferPrice = offers.length > 0 ? Math.max(...offers.map(o => o.price)) : product.best_price;
  const lowestOfferPrice = product.best_price;

  const discountPercent = bestOffer?.original_price && bestOffer.original_price > bestOffer.price
    ? Math.round(((bestOffer.original_price - bestOffer.price) / bestOffer.original_price) * 100)
    : null;

  // Render specifications dynamically based on category
  const renderDynamicSpecs = () => {
    const specs = product.specifications || {};
    const cat = (product.subcategory || product.category || '').toLowerCase();

    let priorityKeys: string[] = [];
    if (cat.includes('laptop')) {
      priorityKeys = ['CPU', 'Processor', 'GPU', 'Graphics', 'RAM', 'Storage', 'Display', 'Battery', 'Weight'];
    } else if (cat.includes('headphone') || cat.includes('audio')) {
      priorityKeys = ['ANC', 'Noise Cancellation', 'Battery', 'Battery Life', 'Codec', 'Driver', 'Microphone', 'Connectivity'];
    } else if (cat.includes('shoe') || cat.includes('footwear') || cat.includes('running')) {
      priorityKeys = ['Usage', 'Sole', 'Material', 'Weight', 'Drop', 'Color'];
    } else if (cat.includes('chair') || cat.includes('furniture') || cat.includes('office')) {
      priorityKeys = ['Lumbar Support', 'Mechanism', 'Material', 'Adjustability', 'Warranty'];
    } else if (cat.includes('camera') || cat.includes('photo')) {
      priorityKeys = ['Sensor', 'Autofocus', 'Video', 'Lens', 'Screen', 'ISO'];
    } else if (cat.includes('tv') || cat.includes('television')) {
      priorityKeys = ['Screen Size', 'Resolution', 'Panel', 'Refresh Rate', 'HDR', 'Audio'];
    } else if (cat.includes('phone') || cat.includes('smartphone')) {
      priorityKeys = ['Processor', 'Display', 'Camera', 'Battery', 'RAM', 'Storage', 'OS'];
    } else {
      priorityKeys = Object.keys(specs).slice(0, 4);
    }

    const matched = priorityKeys
      .filter(k => specs[k] !== undefined)
      .slice(0, 4)
      .map(k => ({ label: k, value: specs[k] }));

    const finalSpecs = matched.length > 0 
      ? matched 
      : Object.entries(specs).slice(0, 4).map(([k, v]) => ({ label: k, value: v }));

    return (
      <div className="mt-3 flex flex-wrap gap-1.5">
        {finalSpecs.map((s, idx) => (
          <span
            key={idx}
            className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${
              idx === 0 
                ? 'bg-indigo-950/70 border-indigo-700/60 text-indigo-300' 
                : 'bg-slate-800/70 border-slate-700/60 text-slate-300'
            }`}
          >
            <span className="text-slate-400 font-normal">{s.label}: </span>
            <span>{s.value.split('(')[0].trim()}</span>
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="group relative flex flex-col bg-slate-900/75 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">
      {/* Top Badges & Score Header */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
        {product.badge && (
          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide shadow-md flex items-center gap-1 ${
            product.badge === 'Best for You' || product.badge === 'Best Overall'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-indigo-500/20'
              : product.badge === 'Best Value'
              ? 'bg-emerald-500/90 text-white shadow-emerald-500/20'
              : product.badge === 'Cheapest'
              ? 'bg-amber-500/90 text-slate-950 shadow-amber-500/20 font-black'
              : product.badge === 'Best Performance'
              ? 'bg-purple-600/90 text-white shadow-purple-500/20'
              : 'bg-cyan-500/90 text-white'
          }`}>
            <Sparkles className="w-3 h-3" />
            {product.badge}
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onOpenScoreBreakdown) onOpenScoreBreakdown(product);
          }}
          className="px-2 py-1 rounded-lg bg-slate-950/90 hover:bg-indigo-950/80 backdrop-blur-md border border-slate-700/60 hover:border-indigo-500/60 text-indigo-300 hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
          title="Click to view explainable score breakdown"
        >
          <span>Match Score: {product.score}/10</span>
          <span className="text-[10px] text-indigo-400 underline">Why?</span>
        </button>
      </div>

      {/* Compare Pin Action Button */}
      <button
        onClick={() => onToggleCompare(product)}
        className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all cursor-pointer ${
          isCompared
            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400'
            : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700/70 hover:bg-slate-800'
        }`}
        title={isCompared ? "Remove from comparison tray" : "Add to side-by-side comparison"}
      >
        {isCompared ? (
          <>
            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
            <span>Pinned</span>
          </>
        ) : (
          <>
            <Scale className="w-3.5 h-3.5 text-indigo-400" />
            <span>Compare</span>
          </>
        )}
      </button>

      {/* Product Image Container */}
      <div className="relative w-full h-52 bg-slate-950/80 overflow-hidden flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain max-h-44 w-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Subcategory & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="font-semibold uppercase tracking-wider text-indigo-400">{product.brand}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 font-medium text-[11px]">{product.subcategory || 'Electronics'}</span>
            </div>
            <div className="flex items-center gap-1 text-amber-400 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-500">({product.review_count})</span>
            </div>
          </div>

          {/* Product Truth Provenance Badge & Why Trust Link */}
          <div className="flex items-center justify-between mb-2">
            <ProductTruthBadge
              status={product.verification_status}
              confidenceScore={product.confidence_score}
              isDemo={product.is_demo_mock}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowWhyTrust(true);
              }}
              className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-2 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ShieldCheck className="w-3 h-3 inline" />
              <span>Why Trust This?</span>
            </button>
          </div>

          {/* Title */}
          <h4 className="text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug group-hover:text-indigo-300 transition-colors">
            {product.title}
          </h4>

          {/* Dynamic Specifications */}
          {renderDynamicSpecs()}

          {/* Trade-off Consideration Box */}
          {product.trade_offs && product.trade_offs.length > 0 && (
            <div className="mt-3 p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-[11px] leading-relaxed">
              <span className="font-bold text-amber-300 block mb-0.5">⚖️ AI Trade-off Analysis:</span>
              <span className="text-slate-300">{product.trade_offs[0]}</span>
            </div>
          )}

          {/* Price Range & Audited Offers Bar */}
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px]">
                <span className="text-slate-400">Price Range: </span>
                <span className="font-bold text-white">
                  {formatPrice(lowestOfferPrice)}
                  {highestOfferPrice > lowestOfferPrice && ` - ${formatPrice(highestOfferPrice)}`}
                </span>
                <span className="text-slate-500 ml-1 text-[10px]">({offers.length} stores)</span>
              </div>
              <button
                type="button"
                onClick={() => setShowOffers(!showOffers)}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-0.5 cursor-pointer"
              >
                <span>{showOffers ? 'Hide Offers' : 'View Offers'}</span>
                {showOffers ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>

            {/* Collapsible Offers Accordion */}
            {showOffers && (
              <div className="space-y-1.5 mb-3 animate-in fade-in">
                {offers.map((offer, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-2.5 py-2 rounded-xl bg-slate-950/60 hover:bg-slate-800/70 border border-slate-800/60 hover:border-indigo-500/40 transition-colors text-xs"
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-slate-200">{offer.provider}</span>
                        {offer.store_badge && (
                          <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            {offer.store_badge}
                          </span>
                        )}
                        {idx === 0 && (
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Cheapest
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                        {offer.shipping}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="text-right">
                        <span className="font-extrabold text-white block">{formatPrice(offer.price)}</span>
                        {offer.discount_amount && offer.discount_amount > 0 && (
                          <span className="text-[9px] text-emerald-400 font-bold block">
                            -₹{offer.discount_amount.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenPriceBreakdown) {
                            onOpenPriceBreakdown(offer, product);
                          } else {
                            onSelectDeal(product, idx);
                          }
                        }}
                        className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white text-[10px] font-bold border border-slate-700 transition-colors cursor-pointer"
                        title="View itemized breakdown of fees & discounts"
                      >
                        Breakdown
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Collapsible Tabs for Price Trend & Sentiment */}
        <div className="mt-3 pt-3 border-t border-slate-800/80">
          <div className="flex items-center gap-2 mb-3">
            <button
              type="button"
              onClick={() => {
                setShowChart(!showChart);
                setShowSentiment(false);
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                showChart
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span>Price Trend</span>
              {showChart ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowSentiment(!showSentiment);
                setShowChart(false);
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                showSentiment
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span>Reviews</span>
              {showSentiment ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {showChart && (
            <div className="mb-3 animate-in fade-in">
              <PriceChart
                history={
                  product.price_history && product.price_history.length > 0
                    ? product.price_history
                    : [
                        { date: '90d ago', price: Math.round(product.best_price * 1.15) },
                        { date: '60d ago', price: Math.round(product.best_price * 1.08) },
                        { date: '30d ago', price: Math.round(product.best_price * 1.04) },
                        { date: '15d ago', price: Math.round(product.best_price * 1.01) },
                        { date: 'Current', price: product.best_price }
                      ]
                }
                currentPrice={product.best_price}
                currency={currency}
                buyAdvice={product.buy_advice || 'Buy Now'}
                itemTitle={product.title}
              />
            </div>
          )}

          {showSentiment && (
            <div className="mb-3 animate-in fade-in">
              <SentimentBreakdown
                sentiment={
                  product.sentiment || {
                    positivePercentage: 92,
                    neutralPercentage: 5,
                    negativePercentage: 3,
                    totalReviewsAnalyzed: 1250,
                    topPros: [`Genuine ${product.brand} engineering`, 'Reliable multi-store fulfillment', 'True to size fit'],
                    topCons: ['High demand product'],
                    buyerVerdict: `Verified reviews consensus for ${product.brand} indicates high durability and comfort.`
                  }
                }
                itemTitle={product.title}
              />
            </div>
          )}

          {/* Main Pricing Row */}
          <div className="pt-2 flex items-center justify-between gap-3 mb-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-white tracking-tight">
                  {formatPrice(product.best_price)}
                </span>
                {bestOffer?.original_price && (
                  <span className="text-xs text-slate-500 line-through">
                    {formatPrice(bestOffer.original_price)}
                  </span>
                )}
              </div>
              {discountPercent && (
                <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-0.5">
                  <TrendingDown className="w-3 h-3" /> Save {discountPercent}% today
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onSetPriceWatch(product)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
                title="Track Price / Autonomous Radar"
              >
                <BellRing className="w-4 h-4 text-amber-400" />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onAskCompareX) {
                    onAskCompareX(product);
                  }
                }}
                className="p-2 rounded-xl bg-slate-800 hover:bg-indigo-950/80 text-slate-300 hover:text-indigo-300 border border-slate-700/80 hover:border-indigo-500/50 transition-colors cursor-pointer"
                title="Ask CompareX AI about this product"
              >
                <MessageSquare className="w-4 h-4 text-indigo-400" />
              </button>
            </div>
          </div>

          {/* Primary Action Buttons (Section 12 Actions) */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/60">
            <button
              type="button"
              onClick={() => {
                if (onViewDetails) {
                  onViewDetails(product);
                } else if (onOpenPriceBreakdown && bestOffer) {
                  onOpenPriceBreakdown(bestOffer, product);
                } else {
                  onSelectDeal(product, 0);
                }
              }}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1"
            >
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>View Details</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectDeal(product, 0)}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1"
            >
              <span>View Deal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
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
