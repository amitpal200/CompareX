'use client';

import React from 'react';
import { Search, Sparkles, ArrowRight, Store, ShieldCheck, Laptop, Smartphone, Headphones, CheckCircle2, Camera, Link2 } from 'lucide-react';

interface ShoppingDecisionHeroProps {
  query: string;
  setQuery: (q: string) => void;
  onSearch: (q: string) => void;
  isSearching: boolean;
  onOpenMultimodal?: () => void;
}

const SAMPLE_PROMPTS = [
  { text: "Best laptop under ₹70,000 for coding and AI/ML", icon: "💻", badge: "AI/ML Laptops" },
  { text: "Wireless headphones with ANC under ₹5,000", icon: "🎧", badge: "ANC Headphones" },
  { text: "Running shoes under ₹4,000 for daily running", icon: "👟", badge: "Running Shoes" },
  { text: "Best office chair for long working hours", icon: "💺", badge: "Office Chair" },
  { text: "Best 5G phone under ₹30,000 with Sony OIS camera", icon: "📱", badge: "Smartphones" },
  { text: "Best mirrorless camera for beginners under ₹60,000", icon: "📷", badge: "Cameras" }
];

export const ShoppingDecisionHero: React.FC<ShoppingDecisionHeroProps> = ({
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
    <div className="mb-8 pt-4">
      {/* Top Tag */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Agentic AI Universal Shopping Decision Engine
          </span>
        </div>

        {/* Multi-Store Connectors Badge */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800">
          <Store className="w-3.5 h-3.5 text-indigo-400" />
          <span>Stores Supported: Flipkart, Amazon, Croma, Reliance Digital, Tata CLiQ, Brand Stores</span>
        </div>
      </div>

      {/* Category Fast Switchers - Universal Shopping */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <button
          type="button"
          onClick={() => {
            const q = "Best laptop under ₹70,000 for coding and AI/ML";
            setQuery(q);
            onSearch(q);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/60 text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm"
        >
          <Laptop className="w-3.5 h-3.5 text-cyan-400" />
          <span>💻 AI/ML Laptops</span>
        </button>
        <button
          type="button"
          onClick={() => {
            const q = "Wireless headphones with ANC under ₹5,000";
            setQuery(q);
            onSearch(q);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-purple-500/60 text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm"
        >
          <Headphones className="w-3.5 h-3.5 text-purple-400" />
          <span>🎧 ANC Headphones</span>
        </button>
        <button
          type="button"
          onClick={() => {
            const q = "Running shoes under ₹4,000 for daily running";
            setQuery(q);
            onSearch(q);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-pink-500/60 text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>👟 Running Shoes</span>
        </button>
        <button
          type="button"
          onClick={() => {
            const q = "Best office chair for long working hours";
            setQuery(q);
            onSearch(q);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/60 text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
          <span>💺 Office Chairs</span>
        </button>
        <button
          type="button"
          onClick={() => {
            const q = "Phone under ₹30,000 with best camera and 5G";
            setQuery(q);
            onSearch(q);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/60 text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm"
        >
          <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
          <span>📱 5G Smartphones</span>
        </button>
      </div>

      {/* Main Search Input Form */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500" />
        
        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-slate-900/90 border border-slate-700/80 hover:border-indigo-500/60 rounded-2xl p-2 shadow-2xl backdrop-blur-xl transition-all">
          <div className="flex items-center flex-1 px-3 py-2">
            <Search className="w-5 h-5 text-indigo-400 flex-shrink-0 mr-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any product, shoe, phone, or laptop deal (e.g. 'Running shoes under ₹4,000 for daily running', 'RTX 4050 laptop', 'ANC headphones')..."
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-medium"
            />
          </div>

          {/* Multimodal Quick Actions */}
          <div className="flex items-center gap-1.5 px-1 sm:px-2 py-1 flex-shrink-0">
            {onOpenMultimodal && (
              <button
                type="button"
                onClick={onOpenMultimodal}
                title="Visual Search with Photo or Store Link"
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-indigo-500/40 hover:border-indigo-400 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <Camera className="w-4 h-4 text-indigo-400" />
                <span>Photo / Link</span>
                <Link2 className="w-3.5 h-3.5 text-violet-400 hidden sm:inline" />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 cursor-pointer flex-shrink-0 mt-2 sm:mt-0"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isSearching ? 'Auditing Providers...' : 'Ask CompareX AI'}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </form>

      {/* Suggested Prompt Chips */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
          Preset Audits:
        </span>
        {SAMPLE_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => {
              setQuery(prompt.text);
              onSearch(prompt.text);
            }}
            className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 hover:text-indigo-300 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/40 px-2.5 py-1 rounded-lg transition-all cursor-pointer truncate max-w-xs"
          >
            <span>{prompt.icon}</span>
            <span>"{prompt.text}"</span>
          </button>
        ))}
      </div>
    </div>
  );
};
