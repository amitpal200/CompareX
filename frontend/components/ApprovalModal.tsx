'use client';

import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, ExternalLink, X, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Product, TravelOption, HotelOption, ProductOffer, CurrencyCode, CURRENCY_MAP } from '../lib/types';

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency?: CurrencyCode;
  selectedItem: {
    type: 'product' | 'travel' | 'hotel';
    product?: Product;
    offerIndex?: number;
    travel?: TravelOption;
    hotel?: HotelOption;
  } | null;
}

export const ApprovalModal: React.FC<ApprovalModalProps> = ({
  isOpen,
  onClose,
  currency = 'INR',
  selectedItem
}) => {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const isProduct = selectedItem?.type === 'product' && selectedItem?.product;
  const product = selectedItem?.product;
  const offerIndex = selectedItem?.offerIndex || 0;
  const offer: ProductOffer | undefined = product?.offers[offerIndex];
  const travel = selectedItem?.travel;
  const hotel = selectedItem?.hotel;

  const providerName = isProduct
    ? offer?.provider
    : travel
    ? travel?.provider
    : hotel?.providers[0]?.provider;

  // Resolve authentic official retailer URL with search query fallback if needed
  const targetOfficialUrl = React.useMemo(() => {
    if (!selectedItem) return '#';
    let rawUrl = isProduct
      ? offer?.source_url
      : travel
      ? travel?.source_url
      : hotel?.providers[0]?.source_url;

    if (!rawUrl || rawUrl === '#' || rawUrl.startsWith('http://localhost') || rawUrl.startsWith('http://127.0.0.1')) {
      const q = encodeURIComponent(product?.title || 'running shoes');
      const prov = (providerName || '').toLowerCase();
      if (prov.includes('flipkart')) {
        return `https://www.flipkart.com/search?q=${q}`;
      } else if (prov.includes('amazon')) {
        return `https://www.amazon.in/s?k=${q}`;
      } else if (prov.includes('myntra')) {
        return `https://www.myntra.com/${q}`;
      } else if (prov.includes('tatacliq') || prov.includes('tata cliq')) {
        return `https://www.tatacliq.com/search/?searchCategory=all&text=${q}`;
      } else if (prov.includes('asics') || prov.includes('brand') || prov.includes('official')) {
        return `https://www.asics.co.in/catalogsearch/result/?q=${q}`;
      } else if (prov.includes('croma')) {
        return `https://www.croma.com/searchB?q=${q}`;
      }
      return `https://www.google.com/search?q=${q}`;
    }
    return rawUrl;
  }, [isProduct, offer, travel, hotel, product, providerName, selectedItem]);

  if (!isOpen || !selectedItem) return null;

  const curr = CURRENCY_MAP[currency] || CURRENCY_MAP['INR'];
  const formatPrice = (p: number) => `${curr.symbol}${Math.round(p * curr.rateFromINR).toLocaleString('en-IN')}`;

  const handleConfirm = () => {
    window.open(targetOfficialUrl, '_blank', 'noopener,noreferrer');
    setTimeout(onClose, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-indigo-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-950/70 p-6 sm:p-7">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Security Shield Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center">
            <Lock className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold text-white">
                Human-in-the-Loop Safety Approval
              </h3>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold">
                Zero Silent Orders
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              CompareX never books or charges automatically. Review terms before redirect.
            </p>
          </div>
        </div>

        {/* Product Card Summary */}
        {isProduct && product && offer && (
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 mb-5">
            <div className="flex gap-3 mb-3">
              <img src={product.image} alt={product.title} className="w-14 h-14 object-contain rounded-lg bg-slate-900 p-1" />
              <div>
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">{product.brand}</span>
                <h4 className="text-sm font-semibold text-white line-clamp-2">{product.title}</h4>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-800/80 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Verified Merchant:</span>
                <span className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {offer.provider} Official
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Delivery Window:</span>
                <span className="text-slate-200">{offer.shipping}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Return Policy:</span>
                <span className="text-slate-200">7-Day Replacement / Return Guarantee</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                <span className="text-sm font-semibold text-slate-300">Final Price (Taxes Incl.):</span>
                <span className="text-xl font-black text-emerald-400">{formatPrice(offer.price)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Travel / Flight Card Summary */}
        {travel && (
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 mb-5">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <span className="text-base font-bold text-white">✈️ {travel.provider}</span>
              <span className="text-xs font-mono text-indigo-300">{travel.flight_number}</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Itinerary:</span>
                <span className="font-bold text-white">{travel.origin} ➔ {travel.destination}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Flight Timing:</span>
                <span className="text-slate-200">{travel.departure} to {travel.arrival} ({travel.duration})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Included Baggage:</span>
                <span className="text-emerald-400 font-medium">{travel.baggage}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                <span className="text-sm font-semibold text-slate-300">Confirmed Fare:</span>
                <span className="text-xl font-black text-emerald-400">{formatPrice(travel.price)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Hotel Card Summary with Human-in-the-Loop Itemized Breakdown */}
        {hotel && (() => {
          const nights = 2;
          const subtotal = hotel.price_per_night * nights;
          const gstRate = hotel.price_per_night > 7500 ? 0.18 : 0.12;
          const gstAmount = Math.floor(subtotal * gstRate);
          const serviceFee = 149;
          const finalPayable = subtotal + gstAmount + serviceFee;

          return (
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 mb-5">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <div>
                  <span className="text-base font-bold text-white block">🏨 {hotel.name}</span>
                  <span className="text-xs text-slate-400">{hotel.location}</span>
                </div>
                <span className="text-xs font-semibold text-amber-400">★ {hotel.star_rating}-Star</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Selected Room & Bed:</span>
                  <span className="font-bold text-slate-200">{hotel.room_type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Stay Duration & Dates:</span>
                  <span className="text-indigo-300 font-medium">Upcoming Weekend (2 Nights)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Base Room Rate:</span>
                  <span className="text-slate-200">{formatPrice(hotel.price_per_night)} × {nights} nights = {formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">GST ({Math.round(gstRate * 100)}%):</span>
                  <span className="text-slate-200">+{formatPrice(gstAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Platform Audit Fee:</span>
                  <span className="text-slate-200">+{formatPrice(serviceFee)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                  <span className="text-xs text-emerald-400 font-semibold">
                    ✓ {hotel.cancellation_policy}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-800/80">
                  <span className="text-sm font-bold text-slate-200">Final Payable Price:</span>
                  <span className="text-xl font-black text-emerald-400">{formatPrice(finalPayable)}</span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Human-in-the-Loop Explicit Confirmation Notice */}
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-200 mb-6">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <p>
            <strong>CompareX AI Human-in-the-Loop Gate:</strong> Review room type, final taxes and cancellation deadline above. You will be transferred to <strong>{providerName || 'Provider'}</strong> official checkout to complete your reservation.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Review Again
          </button>
          <a
            href={targetOfficialUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setTimeout(onClose, 400)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all active:scale-95 cursor-pointer no-underline"
          >
            <span>Confirm & Proceed to {providerName || 'Official Store'}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
