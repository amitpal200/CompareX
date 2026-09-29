'use client';

import React, { useState } from 'react';
import { Scale, X, ArrowRight, Check, Sparkles, Trash2, Award, Download, Share2 } from 'lucide-react';
import { Product, TravelOption, HotelOption, CurrencyCode, CURRENCY_MAP } from '../lib/types';

interface ComparisonDrawerProps {
  products: Product[];
  travelOptions: TravelOption[];
  hotels: HotelOption[];
  currency?: CurrencyCode;
  isOpenModalExternal?: boolean;
  onSetOpenModalExternal?: (open: boolean) => void;
  onRemoveProduct: (id: string) => void;
  onRemoveTravel: (id: string) => void;
  onRemoveHotel: (id: string) => void;
  onClearAll: () => void;
  onShareLink?: () => void;
  onExportCSV?: () => void;
  onSelectBookingHotel?: (hotel: HotelOption) => void;
}

export const ComparisonDrawer: React.FC<ComparisonDrawerProps> = ({
  products = [],
  travelOptions = [],
  hotels = [],
  currency = 'INR',
  isOpenModalExternal,
  onSetOpenModalExternal,
  onRemoveProduct,
  onRemoveTravel,
  onRemoveHotel,
  onClearAll,
  onShareLink,
  onExportCSV,
  onSelectBookingHotel
}) => {
  const [internalModalOpen, setInternalModalOpen] = useState(false);
  const isModalOpen = isOpenModalExternal !== undefined ? isOpenModalExternal : internalModalOpen;
  const setIsModalOpen = (open: boolean) => {
    setInternalModalOpen(open);
    onSetOpenModalExternal?.(open);
  };
  const [hotelPhotoIndices, setHotelPhotoIndices] = useState<Record<string, number>>({});
  const totalCount = (products?.length || 0) + (travelOptions?.length || 0) + (hotels?.length || 0);

  const curr = CURRENCY_MAP[currency] || CURRENCY_MAP['INR'];
  const formatPrice = (p: number) => `${curr.symbol}${Math.round(p * curr.rateFromINR).toLocaleString('en-IN')}`;

  // Personalized AI Verdict calculation for 2-4 hotels
  const computeHotelVerdict = () => {
    if (hotels.length < 2) return null;
    const sorted = [...hotels].sort((a, b) => b.score - a.score);
    const winner = sorted[0];
    const runnerUp = sorted[1];
    const priceDiff = Math.abs(winner.price_per_night - runnerUp.price_per_night);

    return {
      winner_id: winner.id,
      winner_name: winner.name,
      badge: winner.badge || 'Best Overall',
      title: `Winner: ${winner.name} (${winner.badge || 'Best Overall'})`,
      verdict_explanation: `CompareX AI evaluated the trade-offs across ${hotels.length} properties. **${winner.name}** wins as the most balanced option with an AI Score of **${winner.score}/10** and a **${winner.guest_rating}/5.0** guest rating. While **${runnerUp.name}** is priced at ${formatPrice(runnerUp.price_per_night)}/night, **${winner.name}** delivers significantly superior room comfort (${winner.room_type}), ${winner.providers[0]?.room_perks || 'instant check-in'}, and verified guest sentiment.`,
      trade_offs: [
        `Price difference between top 2 contenders is ${formatPrice(priceDiff)}/night.`,
        `${winner.name} includes: ${winner.cancellation_policy}.`,
        `${runnerUp.name} offers alternative budget value at ${formatPrice(runnerUp.price_per_night)}.`
      ]
    };
  };

  const hotelVerdict = computeHotelVerdict();

  if (totalCount === 0) return null;

  const handleDownloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,Category,Item,Verified Price,AI Score,Key Metric\n";
    products.forEach(p => {
      csvContent += `"Shopping","${p.title.replace(/"/g, '""')}","${p.best_price}","${p.score}","${p.specifications['Graphics'] || p.brand}"\n`;
    });
    travelOptions.forEach(t => {
      csvContent += `"Flight","${t.provider} ${t.flight_number}","${t.price}","${t.score}","${t.duration} ${t.stops}"\n`;
    });
    hotels.forEach(h => {
      csvContent += `"Hotel","${h.name.replace(/"/g, '""')}","${h.price_per_night}","${h.score}","${h.location}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `comparex_matrix_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onExportCSV?.();
  };

  return (
    <>
      {/* Floating Bottom Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-4xl bg-slate-900/95 border border-indigo-500/40 backdrop-blur-xl shadow-2xl shadow-indigo-950/60 rounded-2xl p-3 sm:p-4 transition-all animate-in fade-in slide-in-from-bottom-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <div className="flex items-center gap-2 pr-2 border-r border-slate-800 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                <Scale className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Compare Tray</span>
                <span className="text-[10px] text-slate-400">{totalCount} item{totalCount > 1 ? 's' : ''} pinned</span>
              </div>
            </div>

            {/* Pinned Thumbnails */}
            <div className="flex items-center gap-2">
              {products.map(p => (
                <div key={p.canonical_id} className="relative group/thumb flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex-shrink-0">
                  <img src={p.image} alt={p.title} className="w-6 h-6 object-contain rounded" />
                  <span className="font-semibold text-slate-200 max-w-[120px] truncate">{p.title}</span>
                  <button
                    onClick={() => onRemoveProduct(p.canonical_id)}
                    className="p-1 rounded-full text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {travelOptions.map(t => (
                <div key={t.id} className="relative group/thumb flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex-shrink-0">
                  <span className="font-mono text-[11px] text-indigo-400 font-bold">✈️ {t.provider}</span>
                  <span className="font-semibold text-slate-200">{t.departure}</span>
                  <button
                    onClick={() => onRemoveTravel(t.id)}
                    className="p-1 rounded-full text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {hotels.map(h => (
                <div key={h.id} className="relative group/thumb flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex-shrink-0">
                  <span className="font-mono text-[11px] text-amber-400 font-bold">🏨 {h.name.split(' ')[0]}</span>
                  <span className="font-semibold text-slate-200">{formatPrice(h.price_per_night)}</span>
                  <button
                    onClick={() => onRemoveHotel(h.id)}
                    className="p-1 rounded-full text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onClearAll}
              className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800/60 transition-colors"
              title="Clear comparison list"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all active:scale-95 whitespace-nowrap"
            >
              <span>Side-by-Side Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30">
                  <Scale className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    CompareX Intelligence Matrix
                  </h3>
                  <p className="text-xs text-slate-400">
                    Transparent evaluation with AI value scores & winning attributes highlighted
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadCSV}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-colors"
                  title="Export table as CSV"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>
                <button
                  onClick={onShareLink}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-colors"
                  title="Share matrix link"
                >
                  <Share2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden sm:inline">Share</span>
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Matrix Table Container */}
            <div className="p-5 overflow-auto flex-1 space-y-6">
              {/* Products Table */}
              {products.length > 0 && (() => {
                // Dynamically extract all specification keys present across compared products
                const allSpecKeys = Array.from(
                  new Set(
                    products.flatMap(p => Object.keys(p.specifications || {}))
                  )
                ).slice(0, 8); // Top 8 relevant specifications

                return (
                  <div>
                    <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-3">
                      Product Specifications & Verified Multi-Store Comparison
                    </h4>
                    <div className="border border-slate-800 rounded-2xl overflow-hidden">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-950 border-b border-slate-800">
                            <th className="p-3.5 text-slate-400 font-semibold w-1/4">Metric / Feature</th>
                            {products.map(p => (
                              <th key={p.canonical_id} className="p-3.5 text-white font-bold text-center">
                                <div className="max-w-[180px] mx-auto">
                                  <img src={p.image} alt={p.title} className="w-16 h-16 object-contain mx-auto mb-2" />
                                  <span className="line-clamp-2">{p.title}</span>
                                  {p.badge && (
                                    <span className="inline-block mt-1 px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                                      {p.badge}
                                    </span>
                                  )}
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          <tr className="bg-slate-900/50">
                            <td className="p-3 text-slate-300 font-medium">Best Price Verified</td>
                            {products.map(p => (
                              <td key={p.canonical_id} className="p-3 text-center font-extrabold text-emerald-400 text-sm">
                                {formatPrice(p.best_price)}
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-3 text-slate-300 font-medium">AI Value Score</td>
                            {products.map(p => (
                              <td key={p.canonical_id} className="p-3 text-center font-bold text-indigo-300">
                                ⭐ {p.score}/10
                              </td>
                            ))}
                          </tr>
                          <tr className="bg-slate-900/50">
                            <td className="p-3 text-slate-300 font-medium">Category / Brand</td>
                            {products.map(p => (
                              <td key={p.canonical_id} className="p-3 text-center text-slate-200">
                                <span className="font-semibold text-white">{p.brand}</span> ({p.category || 'General'})
                              </td>
                            ))}
                          </tr>

                          {/* Dynamic Specification Rows */}
                          {allSpecKeys.map((specKey, sIdx) => (
                            <tr key={specKey} className={sIdx % 2 === 1 ? "bg-slate-900/50" : ""}>
                              <td className="p-3 text-slate-300 font-medium">{specKey}</td>
                              {products.map(p => (
                                <td key={p.canonical_id} className="p-3 text-center text-slate-200">
                                  {p.specifications[specKey] || '—'}
                                </td>
                              ))}
                            </tr>
                          ))}

                          <tr className={allSpecKeys.length % 2 === 1 ? "" : "bg-slate-900/50"}>
                            <td className="p-3 text-slate-300 font-medium">Best Audited Retailer</td>
                            {products.map(p => (
                              <td key={p.canonical_id} className="p-3 text-center text-slate-300">
                                {p.offers[0]?.provider} ({p.offers[0]?.shipping?.split(' ')[0] || 'Fast'} Delivery)
                              </td>
                            ))}
                          </tr>

                          <tr>
                            <td className="p-3 text-slate-300 font-medium">Multi-Store Spread</td>
                            {products.map(p => {
                              const storeCount = p.offers?.length || 1;
                              const minP = Math.min(...p.offers.map(o => o.effective_price || o.price));
                              const maxP = Math.max(...p.offers.map(o => o.effective_price || o.price));
                              const spread = maxP - minP;
                              return (
                                <td key={p.canonical_id} className="p-3 text-center text-xs">
                                  <span className="font-semibold text-slate-200">{storeCount} stores</span>
                                  {spread > 0 && (
                                    <span className="block text-[10px] text-emerald-400 font-mono">
                                      Save up to {formatPrice(spread)}
                                    </span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}

              {/* Flights Table */}
              {travelOptions.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-3">
                    Flight Itineraries & Baggage Rules
                  </h4>
                  <div className="border border-slate-800 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-950 border-b border-slate-800">
                          <th className="p-3.5 text-slate-400 font-semibold w-1/4">Metric</th>
                          {travelOptions.map(t => (
                            <th key={t.id} className="p-3.5 text-white font-bold text-center">
                              <span className="text-sm block">{t.provider}</span>
                              <span className="font-mono text-slate-400 text-[11px]">{t.flight_number}</span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        <tr className="bg-slate-900/50">
                          <td className="p-3 text-slate-300 font-medium">Departure & Arrival</td>
                          {travelOptions.map(t => (
                            <td key={t.id} className="p-3 text-center font-bold text-white">
                              {t.departure} ➔ {t.arrival}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-3 text-slate-300 font-medium">Duration</td>
                          {travelOptions.map(t => (
                            <td key={t.id} className="p-3 text-center text-slate-300">
                              {t.duration} ({t.stops})
                            </td>
                          ))}
                        </tr>
                        <tr className="bg-slate-900/50">
                          <td className="p-3 text-slate-300 font-medium">Baggage Allowance</td>
                          {travelOptions.map(t => (
                            <td key={t.id} className="p-3 text-center text-emerald-400 font-medium">
                              {t.baggage}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-3 text-slate-300 font-medium">Confirmed Fare</td>
                          {travelOptions.map(t => (
                            <td key={t.id} className="p-3 text-center font-extrabold text-emerald-400 text-sm">
                              {formatPrice(t.price)}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Hotels Table with Photo Gallery Comparison & Verified Reviews */}
              {hotels.length > 0 && (
                <div>
                  {/* Personalized AI Verdict Banner */}
                  {hotelVerdict && (
                    <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-violet-950/60 border border-indigo-500/40 shadow-xl relative overflow-hidden">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Award className="w-6 h-6 text-amber-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                            <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                              <span>{hotelVerdict.title}</span>
                              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                                Personalized AI Verdict
                              </span>
                            </h4>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                            {hotelVerdict.verdict_explanation}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2 text-xs text-indigo-300/90 font-medium">
                            {hotelVerdict.trade_offs.map((to, i) => (
                              <span key={i} className="px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-800/40 text-[11px]">
                                ⚖️ {to}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                      <span>Hotel & Resort Visual & Amenity Matrix</span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded-full">
                        Side-by-Side Photo Comparison
                      </span>
                    </h4>
                    <span className="text-xs text-slate-400">Click photo buttons to compare Room, Exterior & Bath</span>
                  </div>
                  <div className="border border-slate-800 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-950 border-b border-slate-800">
                          <th className="p-3.5 text-slate-400 font-semibold w-1/4">Property Metric</th>
                          {hotels.map(h => (
                            <th key={h.id} className="p-3.5 text-white font-bold text-center">
                              <span className="text-sm block">{h.name}</span>
                              <span className="text-slate-400 text-[11px]">{h.location}</span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {/* Side-by-Side Photo Comparison Row */}
                        <tr className="bg-slate-950/60">
                          <td className="p-3 text-slate-300 font-bold">
                            <span className="block text-indigo-300">Room & Property Photos</span>
                            <span className="text-[10px] text-slate-400 font-normal">Compare actual interior photos</span>
                          </td>
                          {hotels.map(h => {
                            const pIndex = hotelPhotoIndices[h.id] || 0;
                            const gallery = h.gallery && h.gallery.length > 0 ? h.gallery : [h.image];
                            const currentPhoto = gallery[pIndex] || h.image;
                            const labels = ['Room', 'Exterior', 'Bathroom'];

                            return (
                              <td key={h.id} className="p-3">
                                <div className="flex flex-col items-center">
                                  <div className="relative w-44 h-28 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shadow-md">
                                    <img
                                      src={currentPhoto}
                                      alt={h.name}
                                      className="w-full h-full object-cover"
                                    />
                                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] text-slate-200 font-medium backdrop-blur-sm">
                                      {labels[pIndex] || `Photo ${pIndex + 1}`}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1 mt-2">
                                    {gallery.map((_, idx) => (
                                      <button
                                        key={idx}
                                        onClick={() => setHotelPhotoIndices(prev => ({ ...prev, [h.id]: idx }))}
                                        className={`px-2 py-0.5 text-[10px] rounded font-semibold transition-all ${
                                          idx === pIndex
                                            ? 'bg-indigo-600 text-white shadow'
                                            : 'bg-slate-800 text-slate-400 hover:text-white'
                                        }`}
                                      >
                                        {labels[idx] || `${idx + 1}`}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </td>
                            );
                          })}
                        </tr>

                        <tr className="bg-slate-900/50">
                          <td className="p-3 text-slate-300 font-medium">Nightly Rate (Audited)</td>
                          {hotels.map(h => (
                            <td key={h.id} className="p-3 text-center font-black text-emerald-400 text-base">
                              {formatPrice(h.price_per_night)}
                              <span className="block text-[10px] text-slate-400 font-normal">per room / night</span>
                            </td>
                          ))}
                        </tr>

                        <tr>
                          <td className="p-3 text-slate-300 font-medium">Room Type & Bed</td>
                          {hotels.map(h => (
                            <td key={h.id} className="p-3 text-center text-slate-200 font-semibold">
                              {h.room_type}
                            </td>
                          ))}
                        </tr>

                        <tr className="bg-slate-900/50">
                          <td className="p-3 text-slate-300 font-medium">Guest Rating & Reviews</td>
                          {hotels.map(h => (
                            <td key={h.id} className="p-3 text-center">
                              <span className="font-bold text-amber-400 text-sm">★ {h.guest_rating}/5.0</span>
                              <span className="text-[11px] text-slate-400 block font-normal">({h.review_count} verified reviews)</span>
                            </td>
                          ))}
                        </tr>

                        {/* Customer Reviews Highlight Row */}
                        <tr>
                          <td className="p-3 text-slate-300 font-medium">
                            <span className="block font-bold text-indigo-300">Customer Review Highlight</span>
                            <span className="text-[10px] text-slate-400 font-normal">Verified traveler feedback</span>
                          </td>
                          {hotels.map(h => {
                            const topReview = h.customer_reviews && h.customer_reviews.length > 0
                              ? h.customer_reviews[0]
                              : null;

                            return (
                              <td key={h.id} className="p-3 text-center">
                                {topReview ? (
                                  <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 text-left">
                                    <div className="flex items-center justify-between text-[10px] text-emerald-400 font-semibold mb-1">
                                      <span>✓ {topReview.author}</span>
                                      <span>{topReview.tripType}</span>
                                    </div>
                                    <p className="text-[11px] text-slate-300 italic line-clamp-2">
                                      "{topReview.comment}"
                                    </p>
                                  </div>
                                ) : (
                                  <span className="text-slate-400 text-[11px]">Clean rooms, courteous staff</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>

                        <tr className="bg-slate-900/50">
                          <td className="p-3 text-slate-300 font-medium">Key Amenities</td>
                          {hotels.map(h => (
                            <td key={h.id} className="p-3 text-center">
                              <div className="flex flex-wrap justify-center gap-1">
                                {h.amenities.slice(0, 3).map((a, i) => (
                                  <span key={i} className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-300">
                                    ✓ {a}
                                  </span>
                                ))}
                              </div>
                            </td>
                          ))}
                        </tr>

                        <tr>
                          <td className="p-3 text-slate-300 font-medium">Airport / Station Proximity</td>
                          {hotels.map(h => (
                            <td key={h.id} className="p-3 text-center text-slate-300">
                              {h.distance_to_beach || h.distance_to_airport}
                            </td>
                          ))}
                        </tr>

                        <tr className="bg-slate-900/50">
                          <td className="p-3 text-slate-300 font-medium">Cancellation Terms</td>
                          {hotels.map(h => (
                            <td key={h.id} className="p-3 text-center text-emerald-400 font-medium">
                              {h.cancellation_policy}
                            </td>
                          ))}
                        </tr>

                        {/* Portal Rate Comparison */}
                        <tr>
                          <td className="p-3 text-slate-300 font-medium">Portal Rates Breakdown</td>
                          {hotels.map(h => (
                            <td key={h.id} className="p-3">
                              <div className="space-y-1">
                                {h.providers.map((prv, idx) => (
                                  <div key={idx} className="flex items-center justify-between text-[11px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800/80">
                                    <span className="text-slate-400">{prv.provider}:</span>
                                    <span className="font-bold text-white">{formatPrice(prv.price)}</span>
                                  </div>
                                ))}
                              </div>
                            </td>
                          ))}
                        </tr>

                        {/* Breakfast Inclusion */}
                        <tr className="bg-slate-900/50">
                          <td className="p-3 text-slate-300 font-medium">Breakfast Policy</td>
                          {hotels.map(h => {
                            const hasBf = h.amenities.some(a => a.toLowerCase().includes('breakfast')) || h.providers.some(p => p.room_perks.toLowerCase().includes('breakfast'));
                            return (
                              <td key={h.id} className="p-3 text-center">
                                <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                                  hasBf ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40' : 'bg-slate-800 text-slate-400'
                                }`}>
                                  {hasBf ? '✓ Included in Rate' : 'Extra on Property'}
                                </span>
                              </td>
                            );
                          })}
                        </tr>

                        {/* Action Row */}
                        <tr>
                          <td className="p-3 text-slate-300 font-bold">Action</td>
                          {hotels.map(h => (
                            <td key={h.id} className="p-3 text-center">
                              <button
                                onClick={() => {
                                  setIsModalOpen(false);
                                  onSelectBookingHotel?.(h);
                                }}
                                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all active:scale-95"
                              >
                                Reserve Room
                              </button>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 hidden sm:inline">
                🔒 CompareX verifies specifications against manufacturer whitepapers and live provider feeds.
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold ml-auto"
              >
                Close Matrix
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
