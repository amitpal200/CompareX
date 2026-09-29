'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plane, Sparkles, ShieldCheck, TrendingDown, Clock, ArrowRight, 
  Globe2, CheckCircle2, Zap, Tag, Calendar, MapPin, ExternalLink, 
  Compass, Award, ChevronRight, BarChart3, BellRing, Users
} from 'lucide-react';
import FlightSearchBox from './FlightSearchBox';
import { AirportItem } from '@/lib/types';

interface TrendingRoute {
  id: string;
  originCode: string;
  originCity: string;
  destCode: string;
  destCity: string;
  price: number;
  duration: string;
  stops: string;
  carriers: string[];
  departureDate: string;
  savingsNote: string;
  tag?: string;
}

export default function FlightPortalView() {
  const router = useRouter();

  // Popular Quick Routes
  const popularRoutes: { label: string; origin: string; dest: string; price: number }[] = [
    { label: 'Delhi ➔ Mumbai', origin: 'DEL', dest: 'BOM', price: 4420 },
    { label: 'Bengaluru ➔ Delhi', origin: 'BLR', dest: 'DEL', price: 4890 },
    { label: 'Mumbai ➔ Goa', origin: 'BOM', dest: 'GOI', price: 2650 },
    { label: 'Delhi ➔ Dubai', origin: 'DEL', dest: 'DXB', price: 9850 },
    { label: 'Mumbai ➔ Bengaluru', origin: 'BOM', dest: 'BLR', price: 3150 },
    { label: 'Delhi ➔ Srinagar', origin: 'DEL', dest: 'SXR', price: 3890 },
  ];

  const defaultDate = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];

  const trendingRoutes: TrendingRoute[] = [
    {
      id: 'route-1',
      originCode: 'DEL',
      originCity: 'Delhi',
      destCode: 'BOM',
      destCity: 'Mumbai',
      price: 4420,
      duration: '2h 15m',
      stops: 'Non-stop',
      carriers: ['SpiceJet', 'IndiGo', 'Akasa Air'],
      departureDate: defaultDate,
      savingsNote: '₹140 cheaper on EaseMyTrip',
      tag: '🔥 Most Popular',
    },
    {
      id: 'route-2',
      originCode: 'BLR',
      originCity: 'Bengaluru',
      destCode: 'DEL',
      destCity: 'Delhi',
      price: 4890,
      duration: '2h 45m',
      stops: 'Non-stop',
      carriers: ['Akasa Air', 'Air India', 'IndiGo'],
      departureDate: defaultDate,
      savingsNote: '₹180 cheaper on MakeMyTrip',
      tag: '⚡ Fast Selling',
    },
    {
      id: 'route-3',
      originCode: 'BOM',
      originCity: 'Mumbai',
      destCode: 'GOI',
      destCity: 'Goa',
      price: 2650,
      duration: '1h 10m',
      stops: 'Non-stop',
      carriers: ['IndiGo', 'SpiceJet'],
      departureDate: defaultDate,
      savingsNote: 'Zero Convenience Fee',
      tag: '🏖️ Weekend Escape',
    },
    {
      id: 'route-4',
      originCode: 'DEL',
      originCity: 'Delhi',
      destCode: 'DXB',
      destCity: 'Dubai',
      price: 9850,
      duration: '3h 55m',
      stops: 'Non-stop',
      carriers: ['Air India', 'IndiGo', 'Emirates'],
      departureDate: defaultDate,
      savingsNote: 'Direct GDS Net Fare',
      tag: '✈️ International',
    },
    {
      id: 'route-5',
      originCode: 'BOM',
      originCity: 'Mumbai',
      destCode: 'BLR',
      destCity: 'Bengaluru',
      price: 3150,
      duration: '1h 35m',
      stops: 'Non-stop',
      carriers: ['Akasa Air', 'IndiGo'],
      departureDate: defaultDate,
      savingsNote: '₹120 cheaper on Cleartrip',
    },
    {
      id: 'route-6',
      originCode: 'DEL',
      originCity: 'Delhi',
      destCode: 'SXR',
      destCity: 'Srinagar',
      price: 3890,
      duration: '1h 25m',
      stops: 'Non-stop',
      carriers: ['SpiceJet', 'Air India'],
      departureDate: defaultDate,
      savingsNote: 'Mountain Saver Fare',
      tag: '🏔️ Holiday Special',
    },
  ];

  const handleQuickRouteClick = (orig: string, dst: string) => {
    const query = new URLSearchParams({
      origin: orig,
      destination: dst,
      departure_date: defaultDate,
      passengers: '1',
      cabin: 'Economy',
    });
    router.push(`/flights?${query.toString()}`);
  };

  return (
    <div className="space-y-16 py-6 animate-in fade-in duration-300">
      {/* 1. HERO SECTION & COMMAND DECK */}
      <section className="relative text-center space-y-6 pt-4 sm:pt-8">
        {/* Glow backdrop effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-gradient-to-r from-purple-600/15 via-indigo-600/20 to-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Live Aviation Radar Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0C1226]/90 border border-purple-500/40 text-purple-300 text-xs font-semibold shadow-lg shadow-purple-950/40">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-emerald-400">LIVE AVIATION NETWORK</span>
          <span className="text-slate-500">•</span>
          <span>8,450+ Flights Synchronized Across OTAs & Direct Carriers</span>
        </div>

        {/* Headline */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Compare Flights. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Every Airline & Platform.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Real-time metasearch comparing <strong className="text-slate-200">MakeMyTrip, EaseMyTrip, Cleartrip, Yatra, IndiGo, Air India & Akasa</strong>. Zero hidden markups, pre-applied coupons, and guaranteed live seats.
          </p>
        </div>

        {/* Quick Route Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto pt-1">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Popular:
          </span>
          {popularRoutes.map((r) => (
            <button
              key={r.label}
              type="button"
              onClick={() => handleQuickRouteClick(r.origin, r.dest)}
              className="px-3 py-1 rounded-xl bg-slate-900/80 hover:bg-purple-950/40 border border-slate-800 hover:border-purple-500/50 text-slate-300 hover:text-purple-200 text-xs font-medium transition-all flex items-center gap-1.5 group cursor-pointer"
            >
              <span>{r.label}</span>
              <span className="font-mono text-emerald-400 font-bold">from ₹{r.price.toLocaleString('en-IN')}</span>
              <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-purple-300 transition-colors" />
            </button>
          ))}
        </div>

        {/* Main Search Command Deck */}
        <div className="max-w-5xl mx-auto pt-3 text-left">
          <FlightSearchBox />
        </div>
      </section>

      {/* 2. LIVE PRICE ARBITRAGE TICKER */}
      <section className="max-w-5xl mx-auto p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900/80 to-indigo-950/40 border border-purple-500/30 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-purple-300 font-bold">
            <TrendingDown className="w-4 h-4 text-emerald-400" />
            <span>CompareX Real-Time Price Arbitrage Example (Delhi ➔ Mumbai):</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-300 font-mono text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>EaseMyTrip: <strong className="text-emerald-300">₹4,846</strong> (Lowest)</span>
            </div>
            <span>vs</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-500" />
              <span>MakeMyTrip: <strong>₹4,886</strong></span>
            </div>
            <span>vs</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-500" />
              <span>IndiGo Official: <strong>₹4,986</strong></span>
            </div>
            <span className="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
              Save ₹140 Instantly
            </span>
          </div>
        </div>
      </section>

      {/* 3. TRENDING FLIGHT DEALS CAROUSEL */}
      <section className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
              <Compass className="w-4 h-4" />
              <span>Live Fare Drops & Weekend Escapes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Top Trending Flights Across India
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            Live prices gathered from over 6 online travel platforms. Click any route to inspect schedules.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingRoutes.map((route) => (
            <div
              key={route.id}
              className="glass-panel border border-slate-800 hover:border-purple-500/50 rounded-2xl p-5 hover:bg-[#0E162E] transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/30 flex flex-col justify-between gap-4 group"
            >
              {/* Card Header: Tag & Carriers */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-600/20 text-purple-300 border border-purple-500/40">
                  {route.tag || 'Popular Route'}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {route.duration} • {route.stops}
                </span>
              </div>

              {/* Route Visual */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-2xl font-black text-white font-mono">{route.originCode}</div>
                  <div className="text-xs font-medium text-slate-400">{route.originCity}</div>
                </div>

                <div className="flex-1 px-4 flex flex-col items-center">
                  <div className="w-full flex items-center relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-purple-500/40 via-cyan-400 to-purple-500/40" />
                    <Plane className="w-3.5 h-3.5 text-cyan-300 absolute left-1/2 -top-1.5 -translate-x-1/2 rotate-90" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-1 font-semibold">{route.savingsNote}</div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-white font-mono">{route.destCode}</div>
                  <div className="text-xs font-medium text-slate-400">{route.destCity}</div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] text-slate-400">Lowest Verified Fare</div>
                  <div className="text-xl font-black text-white font-mono tracking-tight">
                    ₹{route.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleQuickRouteClick(route.originCode, route.destCode)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-600/30 transition-all flex items-center gap-1.5 group-hover:scale-105 active:scale-95"
                >
                  <span>Compare</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ONLINE PLATFORMS SUPPORTED SHOWCASE */}
      <section className="max-w-5xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#090E1D] border border-slate-800 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 uppercase tracking-wider">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Connected Travel Ecosystem</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Compare & Book Direct on All Major Online Platforms
          </h3>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            CompareX aggregates quotes and allows 1-click booking directly on the platform of your choice with automatic coupon application.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { name: 'MakeMyTrip', desc: 'Instant HDFC/ICICI Off', badge: 'MMTSUPER', color: 'border-rose-500/40 text-rose-300' },
            { name: 'EaseMyTrip', desc: 'Zero Convenience Fee', badge: 'EMTFREE', color: 'border-sky-500/40 text-sky-300' },
            { name: 'Cleartrip', desc: 'Flipkart SuperCoins', badge: 'CTFLY', color: 'border-amber-500/40 text-amber-300' },
            { name: 'Yatra', desc: 'eCash Reward Points', badge: 'YTRSPECIAL', color: 'border-red-500/40 text-red-300' },
            { name: 'Goibibo', desc: 'Student Extra Baggage', badge: 'GOKABHI', color: 'border-orange-500/40 text-orange-300' },
            { name: 'IndiGo / AI', desc: 'Direct Carrier Miles', badge: 'DIRECT0', color: 'border-purple-500/40 text-purple-300' },
          ].map((item) => (
            <div
              key={item.name}
              className="p-3 bg-slate-900/70 border border-slate-800 rounded-xl text-center space-y-1.5 hover:border-slate-700 transition-colors"
            >
              <div className="text-xs font-bold text-slate-200">{item.name}</div>
              <div className="text-[10px] text-slate-400 leading-tight">{item.desc}</div>
              <div className={`text-[9px] font-mono px-1.5 py-0.2 rounded border inline-block ${item.color}`}>
                {item.badge}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHY COMPAREX FLIGHTS BEATS TRADITIONAL ENGINES */}
      <section className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-black text-white">Why Book Flights with CompareX AI?</h3>
          <p className="text-xs text-slate-400">Engineered for travelers who demand transparency, speed, and real savings.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel border border-slate-800 p-5 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Pre-Booking Reprice Lock</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We verify real-time seat inventory and lock your fare before you click through, preventing post-click checkout price jumps.
            </p>
          </div>

          <div className="glass-panel border border-slate-800 p-5 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Flexible ±3 Days Discovery</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our autonomous date scanner audits adjacent days to highlight when flying 24 hours earlier or later saves up to ₹2,500.
            </p>
          </div>

          <div className="glass-panel border border-slate-800 p-5 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Globe2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Multi-Platform Arbitrage</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              See the exact net difference across MakeMyTrip, EaseMyTrip, Cleartrip & direct airline portals on one unified screen.
            </p>
          </div>

          <div className="glass-panel border border-slate-800 p-5 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Autonomous Price Radar</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Set your target budget and our autonomous radar agent continuously tracks airline yield fluctuations to alert you the second fares drop.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
