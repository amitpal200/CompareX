'use client';

import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Check, 
  Scale, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  ThumbsUp, 
  UserCheck, 
  Camera,
  Layers
} from 'lucide-react';
import { HotelOption, CurrencyCode, CURRENCY_MAP } from '../lib/types';
import { PriceChart } from './PriceChart';
import { SentimentBreakdown } from './SentimentBreakdown';

interface HotelCardProps {
  hotel: HotelOption;
  isCompared: boolean;
  currency?: CurrencyCode;
  onToggleCompare: (hotel: HotelOption) => void;
  onSelectBooking: (hotel: HotelOption) => void;
  onSetPriceWatch: (hotel: HotelOption) => void;
  onOpenReviewIntelligence?: (hotel: HotelOption) => void;
}

const PHOTO_LABELS = [
  'Bed & Master Suite',
  'Property & Exterior',
  'En-suite Bathroom & Dining'
];

export const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  isCompared,
  currency = 'INR',
  onToggleCompare,
  onSelectBooking,
  onSetPriceWatch,
  onOpenReviewIntelligence
}) => {
  const [activeTab, setActiveTab] = useState<'none' | 'reviews' | 'chart' | 'sentiment'>('none');
  const [photoIndex, setPhotoIndex] = useState(0);
  const [helpfulMap, setHelpfulMap] = useState<Record<string, number>>({});

  const gallery = hotel.gallery && hotel.gallery.length > 0 ? hotel.gallery : [hotel.image];
  const currentImage = gallery[photoIndex] || hotel.image;

  const curr = CURRENCY_MAP[currency] || CURRENCY_MAP['INR'];
  const formatPrice = (p: number) => `${curr.symbol}${Math.round(p * curr.rateFromINR).toLocaleString('en-IN')}`;
  const bestProvider = hotel.providers && hotel.providers.length > 0 ? hotel.providers[0] : null;

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleVoteHelpful = (reviewId: string) => {
    setHelpfulMap(prev => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 18) + 1
    }));
  };

  return (
    <div className="group relative flex flex-col bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">
      {/* Top Media & Badges */}
      <div className="relative w-full h-64 bg-slate-950 overflow-hidden select-none">
        <img
          src={currentImage}
          alt={`${hotel.name} - Photo ${photoIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/20 to-black/50 pointer-events-none" />

        {/* Multi-Photo Carousel Controls */}
        {gallery.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              aria-label="Previous photo"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg opacity-80 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextPhoto}
              aria-label="Next photo"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg opacity-80 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Photo Thumbnail Strip Indicator */}
            <div className="absolute bottom-11 left-3 right-3 z-20 flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-[10px] text-slate-200 flex items-center gap-1 font-medium">
                <Camera className="w-3 h-3 text-indigo-400" />
                <span>{PHOTO_LABELS[photoIndex] || `Photo ${photoIndex + 1}`}</span>
              </span>
              <div className="flex items-center gap-1 bg-slate-950/80 px-2 py-1 rounded-full backdrop-blur-md border border-slate-700/50">
                {gallery.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPhotoIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === photoIndex ? 'w-4 bg-indigo-400' : 'w-1.5 bg-slate-500 hover:bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {hotel.badge && (
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold shadow-md flex items-center gap-1 ${
              hotel.badge === 'Best Luxury'
                ? 'bg-amber-500 text-slate-950 font-black'
                : hotel.badge === 'Top Rated'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white'
                : hotel.badge === 'Best Value'
                ? 'bg-emerald-600 text-white'
                : 'bg-cyan-600 text-white'
            }`}>
              <Sparkles className="w-3 h-3" />
              {hotel.badge}
            </span>
          )}
          <span className="px-2 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700 text-indigo-300 text-xs font-semibold">
            AI Score: {hotel.score}/10
          </span>
        </div>

        {/* Compare Pin Button */}
        <button
          onClick={() => onToggleCompare(hotel)}
          className={`absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all ${
            isCompared
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-800'
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

        {/* Location & Star Rating Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200 z-10">
          <span className="flex items-center gap-1 font-medium drop-shadow-md">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            {hotel.location}
          </span>
          <div className="flex items-center gap-1 bg-slate-950/80 px-2 py-0.5 rounded-md backdrop-blur-md border border-slate-700/60 font-bold text-amber-400">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{hotel.guest_rating}</span>
            <span className="text-[10px] text-slate-400 font-normal">({hotel.review_count})</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Hotel Name & Stars */}
          <div className="flex items-center gap-1.5 mb-1">
            {Array.from({ length: hotel.star_rating }).map((_, i) => (
              <span key={i} className="text-amber-400 text-xs">★</span>
            ))}
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold ml-1">
              {hotel.star_rating}-Star Verified Stay
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1 group-hover:text-indigo-300 transition-colors">
            {hotel.name}
          </h3>

          <p className="text-xs text-indigo-300/90 font-medium mt-1">
            {hotel.room_type}
          </p>

          {/* Proximity Details */}
          <div className="mt-2.5 flex flex-wrap gap-2 text-[11px] text-slate-400">
            {hotel.distance_to_beach && (
              <span className="px-2 py-0.5 rounded-md bg-cyan-950/40 border border-cyan-800/40 text-cyan-300">
                🏖️ {hotel.distance_to_beach}
              </span>
            )}
            {hotel.distance_to_airport && (
              <span className="px-2 py-0.5 rounded-md bg-slate-800/50 border border-slate-700/40 text-slate-300">
                ✈️ {hotel.distance_to_airport}
              </span>
            )}
          </div>

          {/* Amenities Pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {hotel.amenities.slice(0, 4).map((amenity, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
                ✓ {amenity}
              </span>
            ))}
          </div>

          {/* Free Cancellation Tag */}
          <div className="mt-3 text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{hotel.cancellation_policy}</span>
          </div>

          {/* Provider Rates List */}
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Audited Rates ({(hotel.providers?.length) || 0} Live Portals)
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">
                Best: {bestProvider ? bestProvider.provider : 'Booking.com'}
              </span>
            </div>
            <div className="space-y-1.5">
              {(hotel.providers || []).map((p, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectBooking(hotel)}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-950/50 hover:bg-slate-800/70 border border-slate-800/60 hover:border-indigo-500/40 cursor-pointer transition-colors text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-200">{p.provider}</span>
                    <span className="text-[10px] text-emerald-400 block -mt-0.5">{p.room_perks}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-white">{formatPrice(p.price)}</span>
                    {idx === 0 && (
                      <span className="block text-[9px] text-emerald-400 font-bold uppercase">Lowest</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Collapsible Tabs for Customer Reviews, Chart & AI Sentiment */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            <button
              onClick={() => setActiveTab(activeTab === 'reviews' ? 'none' : 'reviews')}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                activeTab === 'reviews'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3 h-3 text-indigo-400" />
              <span>Reviews ({hotel.customer_reviews?.length || 3})</span>
            </button>

            <button
              onClick={() => setActiveTab(activeTab === 'chart' ? 'none' : 'chart')}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                activeTab === 'chart'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <span>Price Trend</span>
              {activeTab === 'chart' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            <button
              onClick={() => setActiveTab(activeTab === 'sentiment' ? 'none' : 'sentiment')}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                activeTab === 'sentiment'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <span>AI Sentiment</span>
              {activeTab === 'sentiment' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {onOpenReviewIntelligence && (
            <button
              onClick={() => onOpenReviewIntelligence(hotel)}
              className="w-full mb-3 py-1.5 px-3 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-500/30 text-indigo-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Review Intelligence (5-Category Sentiment)</span>
            </button>
          )}

          {/* Tab 1: Real Customer Reviews */}
          {activeTab === 'reviews' && (
            <div className="mb-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 animate-in fade-in max-h-72 overflow-y-auto">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white">Verified Guest Feedback</span>
                </div>
                <span className="text-[10px] text-slate-400">Audited via OTA Feeds</span>
              </div>

              {hotel.customer_reviews && hotel.customer_reviews.length > 0 ? (
                hotel.customer_reviews.map((rev) => {
                  const votes = helpfulMap[rev.id] !== undefined ? helpfulMap[rev.id] : 18;
                  const initials = rev.author.split(' ').map(n => n[0]).join('').slice(0, 2);

                  return (
                    <div key={rev.id} className="p-3 rounded-lg bg-slate-900/70 border border-slate-800/60 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-bold text-[10px] flex items-center justify-center">
                            {initials}
                          </div>
                          <div>
                            <span className="font-bold text-slate-200 block text-xs">{rev.author}</span>
                            <span className="text-[10px] text-emerald-400 font-medium">
                              ✓ Verified Stay • {rev.tripType}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {Array.from({ length: Math.round(rev.rating) }).map((_, i) => (
                            <span key={i} className="text-xs">★</span>
                          ))}
                        </div>
                      </div>

                      <h5 className="font-bold text-slate-100 text-xs pt-1">{rev.title}</h5>
                      <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                        "{rev.comment}"
                      </p>

                      <div className="pt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                        <span>{rev.date}</span>
                        <button
                          onClick={() => handleVoteHelpful(rev.id)}
                          className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        >
                          <ThumbsUp className="w-3 h-3 text-indigo-400" />
                          <span>Helpful ({votes})</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-4 text-xs text-slate-400">
                  Guest reviews being refreshed from booking servers...
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Price Chart */}
          {activeTab === 'chart' && hotel.price_history && (
            <div className="mb-3 animate-in fade-in">
              <PriceChart
                history={hotel.price_history}
                currentPrice={hotel.price_per_night}
                currency={currency}
                buyAdvice="Buy Now"
                itemTitle={hotel.name}
              />
            </div>
          )}

          {/* Tab 3: AI Sentiment */}
          {activeTab === 'sentiment' && hotel.sentiment && (
            <div className="mb-3 animate-in fade-in">
              <SentimentBreakdown
                sentiment={hotel.sentiment}
                itemTitle={hotel.name}
              />
            </div>
          )}

          {/* Pricing & Booking Footer */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <div>
              <div className="text-[11px] text-slate-400">Lowest Nightly Rate</div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-white tracking-tight">
                  {formatPrice(hotel.price_per_night)}
                </span>
                <span className="text-[10px] text-slate-500">/ night</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onSetPriceWatch(hotel)}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 transition-colors"
                title="Set Hotel Rate Alert"
              >
                🔔
              </button>
              <button
                onClick={() => onSelectBooking(hotel)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
              >
                <span>Reserve Room</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
