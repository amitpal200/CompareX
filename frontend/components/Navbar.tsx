'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Scale, BellRing, History, Search, ChevronDown, User, ShoppingBag, Plane, Hotel, Menu, X } from 'lucide-react';
import { CurrencyCode, CURRENCY_MAP } from '../lib/types';

interface NavbarProps {
  comparisonCount?: number;
  onOpenComparison?: () => void;
  onOpenPriceWatch?: () => void;
  onOpenHistory?: () => void;
  onOpenProfile?: () => void;
  priceAlertsCount?: number;
  activeTab?: string;
  setActiveTab?: (tab: 'workspace' | 'shopping' | 'travel' | 'hotels' | 'pricewatch') => void;
  currency?: CurrencyCode;
  onSearchClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  comparisonCount = 0,
  onOpenComparison,
  onOpenPriceWatch,
  onOpenHistory,
  onOpenProfile,
  priceAlertsCount = 0,
  activeTab = 'shopping',
  setActiveTab,
  currency = 'INR',
  onSearchClick
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const curr = CURRENCY_MAP[currency] || CURRENCY_MAP['INR'];

  const handleNavClick = (tab: 'workspace' | 'shopping' | 'travel' | 'hotels' | 'pricewatch') => {
    setActiveTab?.(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/90 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo - Same as screenshot */}
        <Link href="/" className="flex items-center gap-3 group select-none flex-shrink-0">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg sm:text-xl tracking-tight text-white">
                COMPAREX
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 rounded bg-indigo-500/25 border border-indigo-500/40 text-indigo-300">
                AI
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 -mt-0.5 tracking-wide">
              Shop Smarter. Everywhere.
            </p>
          </div>
        </Link>

        {/* Center Navigation Links - Matching Screenshot */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <button
            type="button"
            onClick={() => handleNavClick('shopping')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === 'shopping' || activeTab === 'workspace'
                ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('shopping')}
            className="px-3.5 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-900/60 transition-all cursor-pointer"
          >
            Shopping
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('travel')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === 'travel'
                ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            Flights
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('hotels')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === 'hotels'
                ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            Hotels
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('pricewatch')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === 'pricewatch'
                ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            Price Radar
          </button>
          
          {/* More dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-900/60 transition-all cursor-pointer"
            >
              <span>More</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {moreDropdownOpen && (
              <div className="absolute top-full mt-2 right-0 w-44 bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl z-50">
                {onOpenComparison && (
                  <button
                    onClick={() => { onOpenComparison(); setMoreDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition flex items-center justify-between"
                  >
                    <span>Comparison Tray</span>
                    {comparisonCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded bg-indigo-500 text-white text-[10px] font-bold">
                        {comparisonCount}
                      </span>
                    )}
                  </button>
                )}
                {onOpenHistory && (
                  <button
                    onClick={() => { onOpenHistory(); setMoreDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition flex items-center gap-2"
                  >
                    <History className="w-3.5 h-3.5 text-slate-400" />
                    <span>Search History</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Right Tools: Search, Currency, Sign In, Get Started */}
        <div className="flex items-center gap-2.5">
          {/* Search trigger icon */}
          <button
            type="button"
            onClick={onSearchClick}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Currency Dropdown Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreDropdownOpen(false)}
              onDoubleClick={() => onOpenProfile?.()}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
              title="Currency"
            >
              <span>{curr.symbol}</span>
              <span className="font-mono text-[11px] text-slate-400">{currency}</span>
            </button>
          </div>

          {/* Sign In Button */}
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-900 transition cursor-pointer"
          >
            Sign In
          </Link>

          {/* Get Started Button */}
          <Link
            href="/signup"
            className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-md shadow-indigo-600/30 transition transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Get Started
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 py-4 space-y-2 animate-fade-in">
          <button
            type="button"
            onClick={() => handleNavClick('shopping')}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-900 rounded-xl"
          >
            Shopping
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('travel')}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-900 rounded-xl"
          >
            Flights
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('hotels')}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-900 rounded-xl"
          >
            Hotels
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('pricewatch')}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-900 rounded-xl"
          >
            Price Radar
          </button>
          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <Link
              href="/login"
              className="flex-1 text-center py-2 text-xs font-bold text-slate-200 bg-slate-900 rounded-xl"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="flex-1 text-center py-2 text-xs font-bold text-white bg-indigo-600 rounded-xl"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
