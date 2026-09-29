'use client';

import React, { useState } from 'react';
import { 
  Plane, Luggage, Clock, CheckCircle2, AlertCircle, ArrowRight, 
  ExternalLink, ChevronDown, ChevronUp, Scale, Info, ShieldCheck, Globe2
} from 'lucide-react';
import { FlightOffer, ProviderSourceOffer } from '@/lib/types';
import MultiSourcePricePanel from '@/components/MultiSourcePricePanel';
import FlightDetailsDrawer from '@/components/FlightDetailsDrawer';
import PreBookingRepriceModal from '@/components/PreBookingRepriceModal';

interface FlightCardProps {
  flight: FlightOffer;
  isPinnedForCompare?: boolean;
  onToggleCompare?: (flight: FlightOffer) => void;
  currencySymbol?: string;
  currencyRate?: number;
}

export default function FlightCard({
  flight,
  isPinnedForCompare = false,
  onToggleCompare,
  currencySymbol = '₹',
  currencyRate = 1,
}: FlightCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showMultiSources, setShowMultiSources] = useState(true);
  const [repriceModalOpen, setRepriceModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<ProviderSourceOffer | null>(null);

  const rawFare = flight.total_fare ?? flight.price ?? 0;
  const rawBaseFare = flight.base_fare ?? 0;
  const rawTaxes = flight.taxes_fees ?? flight.taxes_and_fees ?? 0;

  const displayFare = Math.round(rawFare * currencyRate);
  const displayBaseFare = Math.round(rawBaseFare * currencyRate);
  const displayTaxes = Math.round(rawTaxes * currencyRate);

  const cabinBaggage = flight.baggage?.cabin || flight.cabin_baggage || '7 kg';
  const checkinBaggage = flight.baggage?.checkin || flight.checked_baggage || '15 kg';
  const originCode = flight.origin || flight.origin_code || 'DEL';
  const destCode = flight.destination || flight.destination_code || 'BOM';
  const originCity = flight.origin_city || flight.origin_name || originCode;
  const destCity = flight.destination_city || flight.destination_name || destCode;
  const seatsRemaining = flight.seats_remaining ?? 5;
  const sourceOffers = flight.source_offers || [];

  // Airline color coding for badges
  const getAirlineColor = (code: string) => {
    switch (code) {
      case '6E':
        return 'from-blue-600 to-indigo-700 text-white';
      case 'AI':
        return 'from-red-600 to-rose-700 text-white';
      case 'QP':
        return 'from-orange-500 to-amber-600 text-white';
      case 'SG':
        return 'from-amber-600 to-red-600 text-white';
      case 'UK':
        return 'from-purple-900 to-indigo-950 text-purple-200 border border-purple-500/30';
      case 'IX':
        return 'from-orange-600 to-red-700 text-white';
      default:
        return 'from-slate-700 to-slate-900 text-white';
    }
  };

  const handleSelectOffer = (offer: ProviderSourceOffer) => {
    setSelectedOffer(offer);
    setRepriceModalOpen(true);
  };

  const handleDirectBook = () => {
    setSelectedOffer(null);
    setRepriceModalOpen(true);
  };

  return (
    <div
      className={`glass-panel border rounded-2xl p-4 md:p-5 transition-all duration-300 relative ${
        isPinnedForCompare
          ? 'border-purple-500/70 shadow-lg shadow-purple-500/20 bg-[#0E1730]/90'
          : 'border-slate-800/80 hover:border-slate-700 hover:shadow-xl hover:bg-[#0B132B]/90'
      }`}
    >
      {/* Top Badges Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          {flight.badges?.map((badge) => {
            let badgeStyle = 'bg-slate-800 text-slate-300 border-slate-700';
            if (badge.includes('BEST')) {
              badgeStyle = 'bg-purple-600/20 text-purple-300 border-purple-500/50 shadow-sm shadow-purple-500/30';
            } else if (badge.includes('CHEAPEST')) {
              badgeStyle = 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/30';
            } else if (badge.includes('FASTEST')) {
              badgeStyle = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm shadow-emerald-500/30';
            }
            return (
              <span
                key={badge}
                className={`text-[11px] font-bold tracking-wider px-2.5 py-0.5 rounded-full border uppercase ${badgeStyle}`}
              >
                ★ {badge}
              </span>
            );
          })}

          {flight.is_live && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-800/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live GDS Quote
            </span>
          )}

          {sourceOffers.length > 1 && (
            <span className="text-[11px] font-medium text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded-full border border-cyan-800/50">
              {sourceOffers.length} Channel Quotes
            </span>
          )}
        </div>

        {/* Action Controls: Details & Pin to Compare */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowDrawer(true)}
            className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-700/80 bg-slate-900/80 text-slate-300 hover:text-white hover:border-slate-600 transition-all flex items-center gap-1"
          >
            <Info className="w-3.5 h-3.5 text-purple-400" />
            <span>Flight Details</span>
          </button>

          {onToggleCompare && (
            <button
              type="button"
              onClick={() => onToggleCompare(flight)}
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
                isPinnedForCompare
                  ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/30'
                  : 'bg-slate-900/80 text-slate-400 border-slate-700/80 hover:text-purple-300 hover:border-purple-500/50'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isPinnedForCompare ? 'Pinned' : 'Compare'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Airline, Timeline, Duration, Price & Action */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Airline Info (3 cols) */}
        <div className="lg:col-span-3 flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getAirlineColor(
              flight.airline_code
            )} flex items-center justify-center font-black text-sm shadow-md flex-shrink-0`}
          >
            {flight.airline_code}
          </div>
          <div>
            <div className="font-bold text-slate-100 text-sm">{flight.airline}</div>
            <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <span>{flight.flight_number}</span>
              <span>•</span>
              <span className="text-slate-300">{flight.cabin_class}</span>
            </div>
          </div>
        </div>

        {/* Timeline & Duration (5 cols) */}
        <div className="lg:col-span-5 flex items-center justify-between px-1 sm:px-4">
          {/* Origin */}
          <div className="text-left">
            <div className="text-xl sm:text-2xl font-black text-slate-100 font-mono tracking-tight">
              {flight.departure_time}
            </div>
            <div className="text-xs font-bold text-purple-300">{originCode}</div>
            <div className="text-[11px] text-slate-400 truncate max-w-[90px] sm:max-w-[110px]">
              {originCity}
            </div>
          </div>

          {/* Timeline graphic */}
          <div className="flex-1 px-3 sm:px-6 flex flex-col items-center">
            <div className="text-[11px] font-medium text-slate-400 flex items-center gap-1 mb-1">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{flight.duration}</span>
            </div>
            <div className="w-full flex items-center relative">
              <div className="w-2 h-2 rounded-full bg-slate-600" />
              <div className="flex-1 h-[2px] bg-gradient-to-r from-slate-700 via-purple-500/50 to-slate-700 relative">
                <Plane className="w-3.5 h-3.5 text-purple-400 absolute left-1/2 -top-1.5 -translate-x-1/2 rotate-90" />
              </div>
              <div className="w-2 h-2 rounded-full bg-slate-600" />
            </div>
            <div className="text-[10px] font-semibold text-slate-400 mt-1">
              {(flight.stops as any) === 0 || (flight.stops as any) === 'Non-stop' ? (
                <span className="text-emerald-400">Non-stop</span>
              ) : (
                <span className="text-amber-400">
                  {flight.stops} stop {flight.stop_cities?.length ? `via ${flight.stop_cities.join(', ')}` : ''}
                </span>
              )}
            </div>
          </div>

          {/* Destination */}
          <div className="text-right">
            <div className="text-xl sm:text-2xl font-black text-slate-100 font-mono tracking-tight">
              {flight.arrival_time}
            </div>
            <div className="text-xs font-bold text-purple-300">{destCode}</div>
            <div className="text-[11px] text-slate-400 truncate max-w-[90px] sm:max-w-[110px]">
              {destCity}
            </div>
          </div>
        </div>

        {/* Price & Action (4 cols) */}
        <div className="lg:col-span-4 flex items-center justify-between lg:justify-end gap-4 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800/80">
          <div className="text-left lg:text-right">
            <div className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight font-mono">
              {currencySymbol}{displayFare.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-400">
              Total fare (incl. taxes)
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDirectBook}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all flex items-center gap-1.5 flex-shrink-0"
            >
              <span>Book</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Middle Inclusions Bar */}
      <div className="mt-3.5 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-3 text-slate-400">
          <span className="flex items-center gap-1">
            <Luggage className="w-3.5 h-3.5 text-slate-400" />
            <span>Cabin: <strong className="text-slate-200">{cabinBaggage}</strong></span>
          </span>
          <span className="flex items-center gap-1">
            <Luggage className="w-3.5 h-3.5 text-slate-400" />
            <span>Check-in: <strong className="text-slate-200">{checkinBaggage}</strong></span>
          </span>
          <span className="flex items-center gap-1">
            {flight.refundable ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Refundable
              </span>
            ) : (
              <span className="text-slate-500">Non-refundable</span>
            )}
          </span>
          {seatsRemaining <= 5 && (
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              🔥 Only {seatsRemaining} seats left
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {sourceOffers.length > 1 && (
            <button
              type="button"
              onClick={() => setShowMultiSources(!showMultiSources)}
              className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>{showMultiSources ? 'Hide Other Sources' : `Compare ${sourceOffers.length} Sources`}</span>
              {showMultiSources ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="text-[11px] font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
          >
            <span>{showDetails ? 'Hide Breakdown' : 'Fare Breakdown'}</span>
            {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expandable Multi-Source Channels Panel */}
      {showMultiSources && sourceOffers.length > 0 && (
        <MultiSourcePricePanel
          flight={flight}
          onSelectOffer={handleSelectOffer}
          currencySymbol={currencySymbol}
          currencyRate={currencyRate}
        />
      )}

      {/* Expandable Fare Breakdown */}
      {showDetails && (
        <div className="mt-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-slate-300">
            <span>Base Airline Fare:</span>
            <span className="font-mono">{currencySymbol}{displayBaseFare.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>Aviation Security & Airport Taxes:</span>
            <span className="font-mono">{currencySymbol}{displayTaxes.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex items-center justify-between font-bold text-slate-100 border-t border-slate-800 pt-1.5">
            <span>Total Payable Amount:</span>
            <span className="font-mono text-purple-300 text-sm">
              {currencySymbol}{displayFare.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800/80 flex items-center justify-between">
            <span>Verified Quote via {flight.lowest_source || flight.booking_provider || flight.airline}</span>
            <span>Policy: {flight.refundable ? 'Partial refund available per airline slab' : 'Standard cancellation charges apply'}</span>
          </div>
        </div>
      )}

      {/* Flight Details Full Drawer */}
      <FlightDetailsDrawer
        isOpen={showDrawer}
        onClose={() => setShowDrawer(false)}
        flight={flight}
        onBookFlight={() => {
          setShowDrawer(false);
          handleDirectBook();
        }}
        currencySymbol={currencySymbol}
        currencyRate={currencyRate}
      />

      {/* Pre-Booking Live Fare & Seat Re-check Modal */}
      <PreBookingRepriceModal
        isOpen={repriceModalOpen}
        onClose={() => setRepriceModalOpen(false)}
        flight={flight}
        selectedOffer={selectedOffer}
        currencySymbol={currencySymbol}
        currencyRate={currencyRate}
      />
    </div>
  );
}
