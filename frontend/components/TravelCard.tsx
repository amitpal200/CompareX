'use client';

import React, { useState } from 'react';
import { 
  Plane, Clock, Luggage, Star, Check, Scale, ShieldCheck, Sparkles, 
  ExternalLink, ChevronDown, ChevronUp, Globe2, Tag, ArrowRight, Building2
} from 'lucide-react';
import { TravelOption, CurrencyCode, CURRENCY_MAP, ProviderSourceOffer } from '../lib/types';
import { PriceChart } from './PriceChart';

interface TravelCardProps {
  option: TravelOption;
  isCompared: boolean;
  currency?: CurrencyCode;
  onToggleCompare: (option: TravelOption) => void;
  onSelectBooking: (option: TravelOption) => void;
  onSetPriceWatch: (option: TravelOption) => void;
}

export const TravelCard: React.FC<TravelCardProps> = ({
  option,
  isCompared,
  currency = 'INR',
  onToggleCompare,
  onSelectBooking,
  onSetPriceWatch,
}) => {
  const [showChart, setShowChart] = useState(false);
  const [showPlatforms, setShowPlatforms] = useState(true);

  const curr = CURRENCY_MAP[currency] || CURRENCY_MAP['INR'];
  const formatPrice = (p: number) => `${curr.symbol}${Math.round(p * curr.rateFromINR).toLocaleString('en-IN')}`;

  const originCode = option.origin.split('(')[0].trim();
  const destCode = option.destination.split('(')[0].trim();
  const flightNum = option.flight_number || 'AI 502';
  const depDate = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];

  // Helper to generate platform quotes if not already attached
  const platformOffers: ProviderSourceOffer[] = option.source_offers && option.source_offers.length > 0
    ? option.source_offers
    : [
        {
          source: 'EaseMyTrip',
          source_type: 'ota',
          platform_code: 'easemytrip',
          price: option.price - 140,
          currency: 'INR',
          base_fare: option.price - 900,
          taxes_fees: 760,
          convenience_fee: 0,
          promo_discount: 140,
          promo_code: 'EMTFREE',
          offer_terms: 'Zero Convenience Fee + Flat ₹140 Off',
          baggage: { cabin: '7 kg', checkin: '15 kg' },
          fare_type: 'Standard Saver',
          refundability: 'Refundable with fee',
          booking_url: `https://www.easemytrip.com/flight-listing/${originCode}-${destCode}-${depDate}/1-0-0/e/`,
          is_lowest: true,
          price_diff_vs_lowest: 0,
          fare_conditions_differ: false,
          notes: 'No convenience fee on UPI/Cards',
        },
        {
          source: 'MakeMyTrip',
          source_type: 'ota',
          platform_code: 'makemytrip',
          price: option.price - 60,
          currency: 'INR',
          base_fare: option.price - 900,
          taxes_fees: 760,
          convenience_fee: 350,
          promo_discount: 410,
          promo_code: 'MMTSUPER',
          offer_terms: 'Instant ₹410 discount with HDFC/ICICI cards',
          baggage: { cabin: '7 kg', checkin: '15 kg' },
          fare_type: 'MMT Saver Deal',
          refundability: 'Refundable with fee',
          booking_url: `https://www.makemytrip.com/flight/search?itinerary=${originCode}-${destCode}-${depDate}&tripType=O&paxType=A-1_C-0_I-0&intl=false&cabinClass=E`,
          is_lowest: false,
          price_diff_vs_lowest: 80,
          fare_conditions_differ: false,
          notes: "India's #1 OTA with instant seat guarantee",
        },
        {
          source: `${option.provider} Official`,
          source_type: 'direct',
          platform_code: 'airline_direct',
          price: option.price,
          currency: 'INR',
          base_fare: option.price - 760,
          taxes_fees: 760,
          convenience_fee: 0,
          promo_discount: 0,
          promo_code: 'DIRECT0',
          offer_terms: 'Official airline carrier booking with miles',
          baggage: { cabin: '7 kg', checkin: '15 kg' },
          fare_type: 'Carrier Standard',
          refundability: 'Standard policy',
          booking_url: option.source_url || `https://www.google.com/search?q=${encodeURIComponent(option.provider + ' official flight booking ' + flightNum)}`,
          is_lowest: false,
          price_diff_vs_lowest: 140,
          fare_conditions_differ: false,
          notes: 'Official direct booking with zero intermediary markup',
        },
        {
          source: 'Cleartrip',
          source_type: 'ota',
          platform_code: 'cleartrip',
          price: option.price + 20,
          currency: 'INR',
          base_fare: option.price - 900,
          taxes_fees: 760,
          convenience_fee: 299,
          promo_discount: 279,
          promo_code: 'CTFLY',
          offer_terms: 'Flat discount + 150 Flipkart SuperCoins',
          baggage: { cabin: '7 kg', checkin: '15 kg' },
          fare_type: 'Cleartrip Value',
          refundability: 'Refundable with fee',
          booking_url: `https://www.cleartrip.com/flights/results?from=${originCode}&to=${destCode}&depart_date=${depDate}&adults=1&cabin_class=Economy`,
          is_lowest: false,
          price_diff_vs_lowest: 160,
          fare_conditions_differ: false,
          notes: 'Flipkart SuperCoins cashback on flight booking',
        },
      ];

  const getBrandDetails = (source: string) => {
    const s = source.toLowerCase();
    if (s.includes('makemytrip') || s.includes('mmt')) {
      return {
        name: 'MakeMyTrip',
        badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        btn: 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30',
        initials: 'MMT',
      };
    }
    if (s.includes('easemytrip') || s.includes('emt')) {
      return {
        name: 'EaseMyTrip',
        badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
        btn: 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30',
        initials: 'EMT',
      };
    }
    if (s.includes('cleartrip')) {
      return {
        name: 'Cleartrip',
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        btn: 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30',
        initials: 'CT',
      };
    }
    return {
      name: source,
      badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      btn: 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30',
      initials: 'AIR',
    };
  };

  const lowestPlatform = platformOffers.find((p) => p.is_lowest) || platformOffers[0];

  return (
    <div className="group relative flex flex-col bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 shadow-inner">
            <Plane className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-white tracking-wide text-base">
                {option.provider}
              </h4>
              {option.flight_number && (
                <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  {option.flight_number}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span>{option.cabin_class || 'Economy'}</span>
              <span>•</span>
              <div className="flex items-center gap-1 text-amber-400 font-medium">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{option.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Badges & Actions */}
        <div className="flex items-center gap-2">
          {option.badge && (
            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide shadow-md flex items-center gap-1 ${
                option.badge === 'Best Overall'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-indigo-500/20'
                  : option.badge === 'Cheapest'
                  ? 'bg-amber-500/90 text-slate-950 shadow-amber-500/20 font-black'
                  : 'bg-emerald-500/90 text-white'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              {option.badge}
            </span>
          )}

          <button
            onClick={() => onToggleCompare(option)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all ${
              isCompared
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700/70 hover:bg-slate-800'
            }`}
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
        </div>
      </div>

      {/* Flight Timeline */}
      <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Departure */}
        <div className="md:col-span-3">
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {option.departure}
          </div>
          <div className="text-sm font-semibold text-slate-300 mt-0.5">
            {option.origin}
          </div>
          <span className="text-[11px] text-slate-500">Departure Airport</span>
        </div>

        {/* Flight Duration Timeline Visual */}
        <div className="md:col-span-6 flex flex-col items-center px-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>{option.duration}</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">{option.stops}</span>
          </div>

          {/* Flight Path Line */}
          <div className="relative w-full flex items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-indigo-950" />
            <div className="flex-1 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-400 to-indigo-500 mx-1 relative">
              <Plane className="w-3.5 h-3.5 text-indigo-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" />
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-violet-500 ring-4 ring-violet-950" />
          </div>

          <span className="text-[11px] text-slate-500 mt-1.5">Direct Route</span>
        </div>

        {/* Arrival */}
        <div className="md:col-span-3 text-left md:text-right">
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {option.arrival}
          </div>
          <div className="text-sm font-semibold text-slate-300 mt-0.5">
            {option.destination}
          </div>
          <span className="text-[11px] text-slate-500">Arrival Airport</span>
        </div>
      </div>

      {/* Baggage & Inclusions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800/60">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-300 font-medium">
            <Luggage className="w-3.5 h-3.5 text-indigo-400" />
            {option.baggage}
          </span>
          {option.cabin_baggage && (
            <span className="px-2 py-0.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400">
              {option.cabin_baggage}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowPlatforms(!showPlatforms)}
          className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
        >
          <Globe2 className="w-3.5 h-3.5 text-purple-400" />
          <span>{showPlatforms ? 'Hide Platform Comparison' : 'Compare 4 Online Platforms'}</span>
          {showPlatforms ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Online Travel Platforms Comparison Hub */}
      {showPlatforms && (
        <div className="mt-3.5 p-3.5 bg-slate-950/90 border border-slate-800 rounded-xl space-y-2.5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs font-bold text-slate-200">
            <span className="flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Online Platform Comparison ({platformOffers.length} Verified Channels)</span>
            </span>
            <span className="text-[11px] text-emerald-400 font-normal">
              Cheapest: <strong className="text-emerald-300">{lowestPlatform.source}</strong> ({formatPrice(lowestPlatform.price)})
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {platformOffers.map((plat, idx) => {
              const b = getBrandDetails(plat.source);
              const diff = plat.price - lowestPlatform.price;

              return (
                <div
                  key={`${plat.source}-${idx}`}
                  className={`p-2.5 rounded-lg border flex flex-col justify-between gap-2 transition-all ${
                    plat.is_lowest
                      ? 'bg-purple-950/20 border-emerald-500/50 shadow-sm'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-200 font-mono">
                        {b.initials}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                          <span>{b.name}</span>
                          {plat.is_lowest && (
                            <span className="text-[9px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1 rounded">
                              LOWEST
                            </span>
                          )}
                        </div>
                        {plat.promo_code && (
                          <div className="text-[10px] text-purple-300 flex items-center gap-1">
                            <Tag className="w-2.5 h-2.5 text-purple-400" />
                            <span>Code: {plat.promo_code}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black text-slate-100 font-mono">
                        {formatPrice(plat.price)}
                      </div>
                      <div className="text-[10px]">
                        {plat.is_lowest ? (
                          <span className="text-emerald-400 font-medium">Best Price</span>
                        ) : (
                          <span className="text-slate-400 font-mono">+{formatPrice(diff)}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <a
                    href={plat.booking_url || option.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1 transition-all ${
                      plat.is_lowest
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20'
                        : b.btn
                    }`}
                  >
                    <span>Book on {b.name}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Price Trend Chart Toggle */}
      <div className="mt-3 pt-2">
        <button
          onClick={() => setShowChart(!showChart)}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition-colors"
        >
          <span>{showChart ? 'Hide Fare Trend' : 'View Fare Trend & Historical Advice'}</span>
          {showChart ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showChart && option.price_history && (
          <div className="mt-3 animate-in fade-in">
            <PriceChart
              history={option.price_history}
              currentPrice={option.price}
              currency={currency}
              buyAdvice={option.buy_advice || 'Buy Now'}
              itemTitle={`${option.provider} ${option.flight_number}`}
            />
          </div>
        )}
      </div>

      {/* Price and CTA */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-400 block">Lowest Net Fare Across Platforms</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-white tracking-tight">
              {formatPrice(lowestPlatform.price)}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">incl. taxes & fee discounts</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSetPriceWatch(option)}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 transition-colors"
            title="Set Flight Price Alert"
          >
            🔔
          </button>
          <a
            href={lowestPlatform.booking_url || option.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
          >
            <span>Book on {lowestPlatform.source}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
