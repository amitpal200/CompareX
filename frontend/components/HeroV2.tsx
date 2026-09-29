'use client';

import React from 'react';
import { Search, Sparkles, ArrowRight, ShieldCheck, Zap, Brain, Lock, Camera, Store } from 'lucide-react';

interface HeroV2Props {
  query: string;
  setQuery: (q: string) => void;
  onSearch: (q: string) => void;
  isSearching: boolean;
  onOpenMultimodal?: () => void;
}

const SAMPLE_CHIPS = [
  "Running shoes under ₹4,000",
  "iPhone 15 best price",
  "Best laptop for students",
  "Noise cancelling headphones"
];

export const HeroV2: React.FC<HeroV2Props> = ({
  query,
  setQuery,
  onSearch,
  isSearching,
  onOpenMultimodal
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="relative pt-6 pb-12 overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Typography & Search (7 Cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col z-10">
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              AI-Powered Shopping Intelligence
            </span>
          </div>

          {/* Big Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] mb-4">
            Compare. Decide.<br />
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Buy Smarter.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed mb-6">
            Search, compare and get AI-powered recommendations across 6+ verified retailers — all in one place.
          </p>

          {/* 4 Feature Trust Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-7">
            {/* 1. 6+ Verified Stores */}
            <div className="flex items-center gap-2 bg-slate-900/70 border border-slate-800/90 rounded-xl px-3 py-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-white truncate">6+ Verified Stores</div>
                <div className="text-[10px] text-slate-400 truncate">Amazon, Flipkart & more</div>
              </div>
            </div>

            {/* 2. Real-Time Prices */}
            <div className="flex items-center gap-2 bg-slate-900/70 border border-slate-800/90 rounded-xl px-3 py-2">
              <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-white truncate">Real-Time Prices</div>
                <div className="text-[10px] text-slate-400 truncate">Always up to date</div>
              </div>
            </div>

            {/* 3. AI Recommendations */}
            <div className="flex items-center gap-2 bg-slate-900/70 border border-slate-800/90 rounded-xl px-3 py-2">
              <Brain className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-white truncate">AI Recommendations</div>
                <div className="text-[10px] text-slate-400 truncate">Personalized for you</div>
              </div>
            </div>

            {/* 4. Trusted & Secure */}
            <div className="flex items-center gap-2 bg-slate-900/70 border border-slate-800/90 rounded-xl px-3 py-2">
              <Lock className="w-4 h-4 text-violet-400 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-white truncate">Trusted & Secure</div>
                <div className="text-[10px] text-slate-400 truncate">Your data stays private</div>
              </div>
            </div>
          </div>

          {/* Universal Glowing Search Bar */}
          <form onSubmit={handleSubmit} className="relative group mb-3">
            {/* Glowing ambient halo border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/30 via-violet-500/30 to-sky-500/30 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-300" />
            
            <div className="relative flex items-center bg-slate-950 border border-slate-700/80 group-hover:border-indigo-500/60 rounded-full pl-4 pr-1.5 py-1.5 shadow-2xl backdrop-blur-xl transition-all">
              <Search className="w-5 h-5 text-slate-400 flex-shrink-0 mr-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search anything... (shoes, laptop, phone, watch, etc.)"
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-normal"
              />

              {/* Image Search Button */}
              {onOpenMultimodal && (
                <button
                  type="button"
                  onClick={onOpenMultimodal}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/80 text-xs font-semibold mr-1 transition-all cursor-pointer flex-shrink-0"
                  title="Search by image or URL"
                >
                  <Camera className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Image</span>
                </button>
              )}

              {/* Ask CompareX CTA Button */}
              <button
                type="submit"
                disabled={isSearching}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex-shrink-0"
              >
                <span>{isSearching ? 'Thinking...' : 'Ask CompareX'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* "Try these:" chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Try these:</span>
            {SAMPLE_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(chip);
                  onSearch(chip);
                }}
                className="px-3 py-1 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: 3D Product Showcase with Floating Price Pins (5 Cols) */}
        <div className="lg:col-span-5 relative flex items-center justify-center pt-6 lg:pt-0">
          {/* Circular glow background */}
          <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-600/20 via-violet-600/10 to-sky-500/20 blur-2xl" />

            {/* Handwritten "One search. Everywhere." note */}
            <div className="absolute -top-2 left-6 z-20 hidden sm:flex flex-col items-center">
              <span className="font-serif italic text-sm text-indigo-300 transform -rotate-6 tracking-wide drop-shadow-md">
                One search. Everywhere.
              </span>
              <svg className="w-10 h-6 text-indigo-400 transform -rotate-12 mt-0.5 opacity-80" viewBox="0 0 40 24" fill="none">
                <path d="M5 2C15 8 28 8 35 20M35 20L28 17M35 20L36 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Composite 3D Product Image Stack */}
            <div className="relative w-full h-full flex items-center justify-center p-4 select-none">
              
              {/* Central Laptop / Big Screen */}
              <div className="absolute top-10 right-8 w-60 sm:w-72 h-44 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80"
                  alt="MacBook Pro"
                  className="w-full h-full object-cover opacity-85"
                />
              </div>

              {/* Purple iPhone */}
              <div className="absolute top-6 left-12 sm:left-16 w-28 sm:w-36 h-56 sm:h-64 rounded-3xl bg-slate-950 border-2 border-slate-700/80 shadow-2xl overflow-hidden transform -rotate-6 hover:-rotate-3 transition-transform duration-500 z-10">
                <img
                  src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80"
                  alt="iPhone 15 Pro"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Sony Headphones */}
              <div className="absolute bottom-6 right-16 sm:right-24 w-36 sm:w-44 h-40 rounded-2xl overflow-hidden transform rotate-6 hover:rotate-3 transition-transform duration-500 z-20 drop-shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80"
                  alt="Sony WH-1000XM5"
                  className="w-full h-full object-cover rounded-2xl border border-slate-700/60"
                />
              </div>

              {/* Nike Running Shoes */}
              <div className="absolute bottom-2 left-6 sm:left-10 w-44 sm:w-56 h-32 rounded-2xl overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-500 z-30 drop-shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80"
                  alt="Nike Pegasus"
                  className="w-full h-full object-cover rounded-2xl border border-slate-700/60"
                />
              </div>

              {/* Apple Watch */}
              <div className="absolute bottom-16 right-4 w-20 sm:w-24 h-24 rounded-2xl overflow-hidden transform rotate-12 hover:rotate-6 transition-transform duration-500 z-20 drop-shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80"
                  alt="Apple Watch"
                  className="w-full h-full object-cover rounded-2xl border border-slate-700/60"
                />
              </div>

              {/* Floating Retail Price Pins matching screenshot */}
              
              {/* 1. Amazon Tag */}
              <div className="absolute top-10 right-2 z-40 animate-bounce shadow-xl duration-1000" style={{ animationDuration: '3.5s' }}>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/95 border border-amber-500/40 backdrop-blur-md shadow-lg shadow-black/60">
                  <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider">amazon</span>
                  <span className="text-xs font-black text-white">₹52,999</span>
                </div>
              </div>

              {/* 2. Flipkart Tag */}
              <div className="absolute top-28 left-2 sm:left-4 z-40 animate-bounce shadow-xl duration-1000" style={{ animationDuration: '4s' }}>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-950/95 border border-blue-500/40 backdrop-blur-md shadow-lg shadow-black/60">
                  <span className="text-[11px] font-black text-yellow-300">Flipkart</span>
                  <span className="text-xs font-black text-white">₹49,999</span>
                </div>
              </div>

              {/* 3. Croma Tag */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 animate-bounce shadow-xl duration-1000" style={{ animationDuration: '4.5s' }}>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/95 border border-teal-500/40 backdrop-blur-md shadow-lg shadow-black/60">
                  <span className="text-[11px] font-black text-teal-300">croma</span>
                  <span className="text-xs font-black text-white">₹51,499</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
