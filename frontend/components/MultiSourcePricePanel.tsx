'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, Luggage, Check, ArrowRight, ExternalLink, Sparkles, 
  Building2, Globe2, Tag, Percent, ArrowUpRight, Zap
} from 'lucide-react';
import { FlightOffer, ProviderSourceOffer } from '@/lib/types';

interface MultiSourcePricePanelProps {
  flight: FlightOffer;
  onSelectOffer: (offer: ProviderSourceOffer) => void;
  currencySymbol?: string;
  currencyRate?: number;
}

export default function MultiSourcePricePanel({
  flight,
  onSelectOffer,
  currencySymbol = '₹',
  currencyRate = 1,
}: MultiSourcePricePanelProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ota' | 'direct'>('all');

  const offers = flight.source_offers || [];

  if (offers.length === 0) {
    return null;
  }

  const getPlatformBrand = (source: string) => {
    const s = source.toLowerCase();
    if (s.includes('makemytrip') || s.includes('mmt')) {
      return {
        name: 'MakeMyTrip',
        tagline: "India's #1 Travel Portal",
        badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        btnColor: 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30',
        iconBg: 'bg-gradient-to-br from-rose-600 to-red-700 text-white',
        initials: 'MMT'
      };
    }
    if (s.includes('easemytrip') || s.includes('emt')) {
      return {
        name: 'EaseMyTrip',
        tagline: 'Zero Convenience Fee Leader',
        badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
        btnColor: 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30',
        iconBg: 'bg-gradient-to-br from-sky-500 to-blue-600 text-white',
        initials: 'EMT'
      };
    }
    if (s.includes('cleartrip')) {
      return {
        name: 'Cleartrip',
        tagline: 'Flipkart SuperCoins Cashback',
        badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        btnColor: 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white',
        initials: 'CT'
      };
    }
    if (s.includes('yatra')) {
      return {
        name: 'Yatra',
        tagline: 'eCash Rewards & Priority Desk',
        badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40',
        btnColor: 'bg-red-700 hover:bg-red-600 text-white shadow-red-700/30',
        iconBg: 'bg-gradient-to-br from-red-600 to-rose-800 text-white',
        initials: 'YTR'
      };
    }
    if (s.includes('goibibo')) {
      return {
        name: 'Goibibo',
        tagline: 'goCash & Student Baggage Deals',
        badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
        btnColor: 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-600/30',
        iconBg: 'bg-gradient-to-br from-orange-500 to-amber-600 text-white',
        initials: 'GIB'
      };
    }
    return {
      name: source,
      tagline: 'Official Direct Carrier',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      btnColor: 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30',
      iconBg: 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white',
      initials: 'AIR'
    };
  };

  const filteredOffers = offers.filter((o) => {
    if (activeFilter === 'direct') return o.source_type === 'direct';
    if (activeFilter === 'ota') return o.source_type === 'ota' || o.source_type === 'gds';
    return true;
  });

  const lowestOffer = offers.find((o) => o.is_lowest) || offers[0];

  return (
    <div className="mt-3.5 p-4 bg-[#070B16] border border-slate-800/90 rounded-2xl space-y-3.5 shadow-xl">
      {/* Header bar: Platform Count & Lowest Price Leader */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
            <Globe2 className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-100 flex items-center gap-2">
              <span>Compare All Online Booking Platforms</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-purple-300 border border-slate-700 font-mono">
                {offers.length} Platforms Live
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Cheapest on <strong className="text-emerald-400">{lowestOffer.source}</strong> at {currencySymbol}{Math.round(lowestOffer.price * currencyRate).toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              activeFilter === 'all' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Platforms
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('ota')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              activeFilter === 'ota' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            OTAs (MakeMyTrip, EaseMyTrip...)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('direct')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              activeFilter === 'direct' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Airline Direct
          </button>
        </div>
      </div>

      {/* Online Platforms Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredOffers.map((offer, idx) => {
          const brand = getPlatformBrand(offer.source);
          const displayPrice = Math.round(offer.price * currencyRate);
          const diffDisplay = Math.round(offer.price_diff_vs_lowest * currencyRate);
          const bookingUrl = offer.booking_url || `https://www.google.com/search?q=${encodeURIComponent(offer.source + ' flight ' + flight.flight_number)}`;

          return (
            <div
              key={`${offer.source}-${idx}`}
              className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between gap-3 relative ${
                offer.is_lowest
                  ? 'bg-[#0E162E] border-emerald-500/60 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/30'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
            >
              {/* Lowest Price Tag */}
              {offer.is_lowest && (
                <div className="absolute -top-2.5 right-4 text-[10px] font-black bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                  ★ Lowest Platform Price
                </div>
              )}

              {/* Platform Info Row */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-xl ${brand.iconBg} flex items-center justify-center font-black text-xs shadow-md flex-shrink-0`}>
                    {brand.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-100">{brand.name}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border uppercase ${brand.badgeColor}`}>
                        {offer.source_type}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">{brand.tagline}</div>
                  </div>
                </div>

                {/* Price Column */}
                <div className="text-right">
                  <div className="text-base font-black text-slate-100 font-mono tracking-tight">
                    {currencySymbol}{displayPrice.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px]">
                    {offer.is_lowest ? (
                      <span className="text-emerald-400 font-bold">Cheapest Deal</span>
                    ) : (
                      <span className="text-slate-400 font-mono">
                        +{currencySymbol}{diffDisplay.toLocaleString('en-IN')} vs lowest
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Promo & Inclusions Strip */}
              <div className="p-2 bg-slate-950/70 border border-slate-800/80 rounded-lg space-y-1 text-[11px]">
                {offer.promo_code && (
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1 text-purple-300 font-medium">
                      <Tag className="w-3 h-3 text-purple-400" />
                      <span>Code: <strong className="font-mono text-purple-200">{offer.promo_code}</strong></span>
                    </span>
                    {offer.promo_discount ? (
                      <span className="text-emerald-400 font-semibold font-mono">
                        Save {currencySymbol}{Math.round(offer.promo_discount * currencyRate)}
                      </span>
                    ) : null}
                  </div>
                )}

                <div className="flex items-center justify-between text-slate-400 text-[10px]">
                  <span>Fee: {offer.convenience_fee === 0 ? <strong className="text-emerald-400">₹0 Convenience Fee</strong> : `₹${offer.convenience_fee} Booking Fee`}</span>
                  <span>Baggage: <strong className="text-slate-200">{offer.baggage?.cabin || '7kg'} + {offer.baggage?.checkin || '15kg'}</strong></span>
                </div>
              </div>

              {/* Action Buttons: Instant Book on Platform + Live Verify */}
              <div className="flex items-center gap-2 pt-1">
                {/* 1. Direct Book on Platform */}
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md ${
                    offer.is_lowest
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                      : brand.btnColor
                  }`}
                >
                  <span>Book on {brand.name}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* 2. Reprice & Lock CTA */}
                <button
                  type="button"
                  onClick={() => onSelectOffer(offer)}
                  title="Verify seat lock & fare before redirect"
                  className="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-[11px] font-semibold border border-slate-700 transition-colors flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span className="hidden sm:inline">Verify</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Assurance */}
      <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Real-time platform pricing fetched via official GDS & partner channels. Zero CompareX markup.</span>
        </span>
        <span className="text-slate-500">
          Coupons pre-applied automatically at checkout
        </span>
      </div>
    </div>
  );
}
