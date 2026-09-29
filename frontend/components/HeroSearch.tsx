'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, Sparkles, ShoppingBag, ArrowRight, Loader2, 
  Layers, Gift, Scale, TrendingDown, BellRing, ShoppingCart, 
  Cpu, Headphones, Shirt, Armchair, Camera, Tv, Smartphone, Link2
} from 'lucide-react';

interface HeroSearchProps {
  query: string;
  setQuery: (q: string) => void;
  onSearch: (query: string) => void;
  onSelectCategory?: (category: 'shopping' | 'travel' | 'hotel' | 'all') => void;
  isSearching: boolean;
  activeCategory?: string;
  onTriggerMission?: () => void;
  onOpenComparison?: () => void;
  onOpenPriceWatch?: () => void;
  onOpenGiftFinder?: () => void;
  onOpenBasketOptimizer?: () => void;
  onOpenMultimodal?: () => void;
}

const ROTATING_PLACEHOLDERS = [
  "Search any product...",
  "Tell CompareX what you need...",
  "Best laptop under ₹70,000 for AI/ML",
  "Wireless headphones with ANC under ₹5,000",
  "Running shoes for daily running",
  "Best office chair for long working hours",
  "Build a gaming setup under ₹1 lakh",
  "Find a gift under ₹5,000",
  "I need a work-from-home setup"
];

const PRESET_CHIPS = [
  { label: "Best laptop under ₹70,000 for AI/ML", icon: "💻", category: "Laptop" },
  { label: "Wireless headphones with ANC under ₹5,000", icon: "🎧", category: "Headphones" },
  { label: "Running shoes under ₹4,000", icon: "👟", category: "Shoes" },
  { label: "Best office chair for long working hours", icon: "💺", category: "Office Chair" },
  { label: "Best camera for beginners", icon: "📷", category: "Camera" },
  { label: "Build a gaming setup under ₹1 lakh", icon: "🎮", category: "Mission" },
  { label: "Birthday gift for my brother under ₹5,000", icon: "🎁", category: "Gift" }
];

export const HeroSearch: React.FC<HeroSearchProps> = ({
  query,
  setQuery,
  onSearch,
  isSearching,
  onTriggerMission,
  onOpenComparison,
  onOpenPriceWatch,
  onOpenGiftFinder,
  onOpenBasketOptimizer,
  onOpenMultimodal
}) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % ROTATING_PLACEHOLDERS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetQuery = query.trim() || ROTATING_PLACEHOLDERS[placeholderIndex];
    onSearch(targetQuery);
  };

  const handleChipClick = (text: string) => {
    setQuery(text);
    onSearch(text);
  };

  return (
    <section className="relative pt-6 pb-8 sm:pt-10 sm:pb-12 px-4 max-w-5xl mx-auto text-center">
      {/* Ambient Gradient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-gradient-to-tr from-indigo-600/20 via-violet-600/20 to-cyan-500/15 blur-[130px] pointer-events-none rounded-full" />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4 shadow-sm shadow-indigo-900/40">
        <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
        <span className="font-mono tracking-wide">CompareX AI • Autonomous Decision Agent</span>
      </div>

      {/* Hero Headline */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] mb-3">
        Tell CompareX what you need.{' '}
        <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
          We'll figure out what to buy.
        </span>
      </h1>

      <p className="text-xs sm:text-base text-slate-400 max-w-2xl mx-auto mb-6 leading-relaxed">
        Autonomous product discovery, multi-store price auditing across 6 verified retailers, compatibility verification, and personalized trade-off reasoning.
      </p>

      {/* Main Universal Search Form */}
      <form onSubmit={handleFormSubmit} className="relative max-w-3xl mx-auto mb-4">
        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center rounded-2xl bg-slate-900/95 border-2 border-slate-700/80 focus-within:border-indigo-500 shadow-2xl shadow-indigo-950/50 backdrop-blur-xl transition-all p-2 group">
          <div className="flex items-center flex-1 px-3 py-1">
            <Search className="w-5 h-5 text-indigo-400 mr-2.5 flex-shrink-0 group-focus-within:scale-110 transition-transform" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={ROTATING_PLACEHOLDERS[placeholderIndex]}
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none py-2"
            />
          </div>

          {/* Multimodal Photo/Link Button */}
          {onOpenMultimodal && (
            <div className="flex items-center px-1 sm:px-2 py-1 flex-shrink-0">
              <button
                type="button"
                onClick={onOpenMultimodal}
                title="Visual Search with Photo or Store Link"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-indigo-500/40 hover:border-indigo-400 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <Camera className="w-4 h-4 text-indigo-400" />
                <span>Photo / Link</span>
                <Link2 className="w-3.5 h-3.5 text-violet-400 hidden sm:inline" />
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isSearching}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all active:scale-95 disabled:opacity-50 whitespace-nowrap cursor-pointer flex-shrink-0 mt-2 sm:mt-0"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Auditing Stores...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Ask CompareX</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-2">
          <span>✨ <strong className="text-slate-300">AI-powered universal shopping search</strong></span>
          <span className="hidden sm:inline text-slate-500">Zero phone-only assumptions • Category agnostic</span>
        </div>
      </form>

      {/* Primary Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => {
            const q = "Best laptop under ₹70,000 for AI/ML";
            setQuery(q);
            onSearch(q);
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/60 text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Ask CompareX</span>
        </button>

        <button
          type="button"
          onClick={() => {
            const q = "Build me a gaming setup under ₹1 lakh";
            setQuery(q);
            if (onTriggerMission) onTriggerMission();
            else onSearch(q);
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-violet-500/60 text-xs font-bold text-violet-300 hover:text-white transition-all cursor-pointer shadow-sm"
        >
          <Layers className="w-3.5 h-3.5 text-violet-400" />
          <span>Build a Shopping Mission</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (onOpenComparison) onOpenComparison();
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/60 text-xs font-bold text-cyan-300 hover:text-white transition-all cursor-pointer shadow-sm"
        >
          <Scale className="w-3.5 h-3.5 text-cyan-400" />
          <span>Compare Products</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (onOpenPriceWatch) onOpenPriceWatch();
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/60 text-xs font-bold text-amber-300 hover:text-white transition-all cursor-pointer shadow-sm"
        >
          <BellRing className="w-3.5 h-3.5 text-amber-400" />
          <span>Track a Price</span>
        </button>
      </div>

      {/* Discovery Cards Grid (Master Prompt Section 42) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-6 text-left">
        {/* 1. Shop Anything */}
        <button
          type="button"
          onClick={() => {
            const q = "Wireless headphones with ANC under ₹5,000";
            setQuery(q);
            onSearch(q);
          }}
          className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20">
              <ShoppingBag className="w-4 h-4" />
            </span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-white block leading-tight">Shop Anything</span>
            <span className="text-[9px] text-slate-400 block mt-0.5">Universal Search</span>
          </div>
        </button>

        {/* 2. Build a Setup */}
        <button
          type="button"
          onClick={() => {
            const q = "Build me a gaming setup under ₹1 lakh";
            setQuery(q);
            onSearch(q);
          }}
          className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-violet-500/50 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20">
              <Layers className="w-4 h-4" />
            </span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-white block leading-tight">Build a Setup</span>
            <span className="text-[9px] text-slate-400 block mt-0.5">Multi-Item Mission</span>
          </div>
        </button>

        {/* 3. Find a Gift */}
        <button
          type="button"
          onClick={() => {
            const q = "Birthday gift for my brother under ₹5,000";
            setQuery(q);
            onSearch(q);
          }}
          className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-pink-500/50 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20">
              <Gift className="w-4 h-4" />
            </span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-white block leading-tight">Find a Gift</span>
            <span className="text-[9px] text-slate-400 block mt-0.5">AI Gift Finder</span>
          </div>
        </button>

        {/* 4. Compare Products */}
        <button
          type="button"
          onClick={() => {
            if (onOpenComparison) onOpenComparison();
          }}
          className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20">
              <Scale className="w-4 h-4" />
            </span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-white block leading-tight">Compare</span>
            <span className="text-[9px] text-slate-400 block mt-0.5">Universal Matrix</span>
          </div>
        </button>

        {/* 5. Find Better Alternative */}
        <button
          type="button"
          onClick={() => {
            const q = "Find a cheaper alternative to Acer Nitro V";
            setQuery(q);
            onSearch(q);
          }}
          className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20">
              <TrendingDown className="w-4 h-4" />
            </span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-white block leading-tight">Better Alternative</span>
            <span className="text-[9px] text-slate-400 block mt-0.5">Value Optimization</span>
          </div>
        </button>

        {/* 6. Track a Price */}
        <button
          type="button"
          onClick={() => {
            if (onOpenPriceWatch) onOpenPriceWatch();
          }}
          className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20">
              <BellRing className="w-4 h-4" />
            </span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-white block leading-tight">Track Price</span>
            <span className="text-[9px] text-slate-400 block mt-0.5">Autonomous Radar</span>
          </div>
        </button>

        {/* 7. Optimize My Basket */}
        <button
          type="button"
          onClick={() => {
            if (onOpenBasketOptimizer) onOpenBasketOptimizer();
            else {
              const q = "Optimize basket: Laptop, Mouse, Keyboard, Headphones";
              setQuery(q);
              onSearch(q);
            }
          }}
          className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-rose-500/50 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20">
              <ShoppingCart className="w-4 h-4" />
            </span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-white block leading-tight">Optimize Basket</span>
            <span className="text-[9px] text-slate-400 block mt-0.5">Bundle Savings</span>
          </div>
        </button>
      </div>

      {/* Preset Chip Queries */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
        <span className="text-slate-500 font-semibold mr-1 text-[11px] uppercase tracking-wider">Try asking:</span>
        {PRESET_CHIPS.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleChipClick(chip.label)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/70 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-white transition-all cursor-pointer text-[11px]"
          >
            <span>{chip.icon}</span>
            <span>"{chip.label}"</span>
          </button>
        ))}
      </div>
    </section>
  );
};
