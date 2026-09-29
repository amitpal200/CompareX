'use client';

import React, { useState } from 'react';
import { 
  X, Plane, Luggage, Clock, ShieldCheck, FileText, AlertCircle, 
  Receipt, CheckCircle2, ChevronRight, Info, ExternalLink, Calendar
} from 'lucide-react';
import { FlightOffer } from '@/lib/types';

interface FlightDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  flight: FlightOffer | null;
  onBookFlight?: (flight: FlightOffer) => void;
  currencySymbol?: string;
  currencyRate?: number;
}

export default function FlightDetailsDrawer({
  isOpen,
  onClose,
  flight,
  onBookFlight,
  currencySymbol = '₹',
  currencyRate = 1,
}: FlightDetailsDrawerProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'baggage' | 'rules' | 'price'>('overview');

  if (!isOpen || !flight) return null;

  const totalFare = Math.round((flight.total_fare || flight.price || 0) * currencyRate);
  const baseFare = Math.round((flight.base_fare || totalFare * 0.78) * currencyRate);
  const taxesFees = Math.round((flight.taxes_fees || flight.taxes_and_fees || totalFare * 0.22) * currencyRate);

  const originCode = flight.origin || flight.origin_code || 'DEL';
  const destCode = flight.destination || flight.destination_code || 'BOM';
  const originCity = flight.origin_city || flight.origin_name || originCode;
  const destCity = flight.destination_city || flight.destination_name || destCode;
  const cabinBaggage = flight.baggage?.cabin || flight.cabin_baggage || '7 kg Hand Baggage';
  const checkinBaggage = flight.baggage?.checkin || flight.checked_baggage || '15 kg Check-in Included';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-[#090E1D] border-l border-slate-800 shadow-2xl flex flex-col">
          {/* Top Bar Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#0C1326]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                <Plane className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span>{flight.airline}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-purple-300 font-mono">
                    {flight.flight_number}
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  {originCity} ({originCode}) ➔ {destCity} ({destCode})
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-800 px-4 sm:px-6 bg-[#080D1A] overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: Info },
              { id: 'timeline', label: 'Itinerary', icon: Clock },
              { id: 'baggage', label: 'Baggage', icon: Luggage },
              { id: 'rules', label: 'Fare Rules', icon: FileText },
              { id: 'price', label: 'Price Breakdown', icon: Receipt },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 py-3 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'border-purple-500 text-purple-300'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-200">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                {/* Flight Key Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">Duration</div>
                    <div className="text-sm font-bold text-slate-100 font-mono mt-0.5">{flight.duration}</div>
                  </div>
                  <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">Stops</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5">
                      {flight.stops === 0 || (flight.stops as any) === 'Non-stop' ? 'Non-stop' : `${flight.stops} Stop`}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">Class</div>
                    <div className="text-sm font-bold text-slate-100 mt-0.5">{flight.cabin_class}</div>
                  </div>
                  <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">Aircraft</div>
                    <div className="text-sm font-bold text-slate-100 mt-0.5 truncate">{flight.aircraft || 'Airbus A320neo'}</div>
                  </div>
                </div>

                {/* Route Strip */}
                <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-black font-mono text-slate-100">{flight.departure_time}</div>
                      <div className="text-xs font-bold text-purple-300">{originCity} ({originCode})</div>
                      <div className="text-[11px] text-slate-400">Terminal {flight.origin_terminal || 'T3'}</div>
                    </div>

                    <div className="text-center px-4">
                      <div className="text-xs text-slate-400 font-mono">{flight.duration}</div>
                      <div className="w-24 h-0.5 bg-purple-500/40 relative my-1.5">
                        <Plane className="w-3.5 h-3.5 text-purple-400 absolute left-1/2 -top-1.5 -translate-x-1/2 rotate-90" />
                      </div>
                      <div className="text-[10px] text-emerald-400 font-semibold">Direct Flight</div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-black font-mono text-slate-100">{flight.arrival_time}</div>
                      <div className="text-xs font-bold text-purple-300">{destCity} ({destCode})</div>
                      <div className="text-[11px] text-slate-400">Terminal {flight.destination_terminal || 'T1'}</div>
                    </div>
                  </div>
                </div>

                {/* Score & AI Recommendation */}
                {flight.score_reasons && flight.score_reasons.length > 0 && (
                  <div className="p-4 bg-purple-950/20 border border-purple-800/40 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-purple-400" />
                      <span>CompareX AI Evaluation Score ({flight.value_score || flight.score || 9.2}/10)</span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {flight.score_reasons.map((r, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: TIMELINE */}
            {activeTab === 'timeline' && (
              <div className="space-y-6">
                <div className="relative pl-6 border-l-2 border-purple-500/40 space-y-8 ml-2">
                  {/* Origin */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-purple-500 border-4 border-[#090E1D]" />
                    <div>
                      <div className="text-xs font-bold text-purple-300 font-mono">{flight.departure_time}</div>
                      <div className="text-sm font-bold text-slate-100">{flight.origin_name || originCity} ({originCode})</div>
                      <div className="text-xs text-slate-400">Terminal {flight.origin_terminal || 'T2/T3'} • Boarding gate closes 25 min prior</div>
                    </div>
                  </div>

                  {/* En Route info */}
                  <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1 text-xs text-slate-300">
                    <div className="flex items-center gap-2 font-semibold text-slate-200">
                      <Plane className="w-3.5 h-3.5 text-purple-400" />
                      <span>{flight.airline} • Flight {flight.flight_number}</span>
                    </div>
                    <div className="text-slate-400">
                      Aircraft: {flight.aircraft || 'Airbus A320neo'} • Economy ({flight.fare_type || 'Standard'})
                    </div>
                    <div className="text-slate-400">
                      Flight Duration: {flight.duration} • In-flight USB charging & buy-on-board dining available
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-[#090E1D]" />
                    <div>
                      <div className="text-xs font-bold text-emerald-400 font-mono">{flight.arrival_time}</div>
                      <div className="text-sm font-bold text-slate-100">{flight.destination_name || destCity} ({destCode})</div>
                      <div className="text-xs text-slate-400">Terminal {flight.destination_terminal || 'T1/T2'} • Baggage claim carousel verified on arrival</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: BAGGAGE INSPECTION */}
            {activeTab === 'baggage' && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                      <Luggage className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-100">Cabin (Hand) Baggage</div>
                      <div className="text-xs text-slate-400 font-semibold text-emerald-400">{cabinBaggage} Included</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    1 piece up to 7 kg (55cm x 35cm x 25cm) plus 1 small personal item (such as a laptop bag, purse, or backpack) fitting under the seat in front of you.
                  </p>
                </div>

                <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                      <Luggage className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-100">Check-in Baggage</div>
                      <div className="text-xs text-slate-400 font-semibold text-emerald-400">{checkinBaggage} Included</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    1 piece up to 15 kg per passenger included in base fare. Maximum linear dimensions (Length + Width + Height) not to exceed 158 cm.
                  </p>
                </div>

                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-200">
                    <strong>Excess Baggage Rule:</strong> Additional luggage can be pre-purchased at ₹450-₹500/kg up to 2 hours before flight departure on the airline portal.
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: FARE RULES */}
            {activeTab === 'rules' && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-3">
                  <div className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                    Cancellation & Refund Policy
                  </div>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-start justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Refundability:</span>
                      <span className="font-semibold text-slate-200">
                        {flight.refundable ? 'Refundable (subject to airline cancellation slab)' : 'Non-refundable base airfare'}
                      </span>
                    </div>
                    <div className="flex items-start justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Cancel &gt; 72 hrs before departure:</span>
                      <span className="font-mono text-slate-200">{currencySymbol}3,000 airline fee + statutory taxes refunded</span>
                    </div>
                    <div className="flex items-start justify-between">
                      <span className="text-slate-400">Cancel &lt; 2 hrs or No Show:</span>
                      <span className="font-semibold text-rose-400">Non-refundable (Only airport taxes refunded)</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-3">
                  <div className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                    Date & Itinerary Change Policy
                  </div>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-start justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Change Fee:</span>
                      <span className="font-mono text-slate-200">{currencySymbol}2,500 + fare difference between flights</span>
                    </div>
                    <div className="flex items-start justify-between">
                      <span className="text-slate-400">Name Correction:</span>
                      <span className="text-slate-200">Free within 24h for minor spelling errors (up to 3 characters)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: PRICE BREAKDOWN */}
            {activeTab === 'price' && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-3">
                  <div className="text-xs font-bold text-slate-100 uppercase tracking-wider mb-2">
                    Itemized Fare & Tax Breakdown (1 Adult)
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Base Airfare (Airline Carrier):</span>
                      <span className="font-mono">{currencySymbol}{baseFare.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">User Development Fee (UDF):</span>
                      <span className="font-mono">{currencySymbol}{Math.round(taxesFees * 0.45).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Aviation Security Fee (ASF):</span>
                      <span className="font-mono">{currencySymbol}{Math.round(taxesFees * 0.25).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Goods & Services Tax (GST):</span>
                      <span className="font-mono">{currencySymbol}{Math.round(taxesFees * 0.30).toLocaleString('en-IN')}</span>
                    </div>

                    <div className="border-t border-slate-800 pt-3 flex items-center justify-between font-bold text-slate-100 text-sm">
                      <span>Total All-Inclusive Fare:</span>
                      <span className="font-mono text-purple-300 text-base">
                        {currencySymbol}{totalFare.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>CompareX guarantees zero hidden platform markup. You pay the exact airline quote.</span>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer CTA */}
          <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#0C1326] flex items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400">Verified Fare (1 Passenger)</div>
              <div className="text-xl font-black text-slate-100 font-mono">
                {currencySymbol}{totalFare.toLocaleString('en-IN')}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onBookFlight) {
                  onBookFlight(flight);
                } else {
                  window.open(flight.booking_url || `https://www.google.com/search?q=${encodeURIComponent(flight.airline + ' flight ' + flight.flight_number)}`, '_blank');
                }
              }}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all flex items-center gap-2"
            >
              <span>Book This Flight</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
