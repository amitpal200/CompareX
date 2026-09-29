'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Heart, Plane, ShoppingBag, Hotel, Bell, Scale } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#050816] text-slate-400 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-8 border-b border-slate-800/80">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 p-[1px]">
                <div className="w-full h-full bg-[#050816] rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
              </div>
              <span className="font-black text-base tracking-tight text-white">COMPAREX <span className="text-purple-400">AI</span></span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Universal Agentic Search Engine for Flights, Hotels, and Online Shopping. Real-time timetable intelligence, live fare comparison, and zero fake discounts.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Live API Aggregator • Direct Airline Bookings</span>
            </div>
          </div>

          {/* Col 2: Flight Intelligence */}
          <div className="space-y-3">
            <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-purple-400" />
              <span>Flights</span>
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/flights?origin=DEL&destination=BOM" className="hover:text-purple-300 transition-colors">
                  Delhi ➔ Mumbai Flights
                </Link>
              </li>
              <li>
                <Link href="/flights?origin=BLR&destination=DEL" className="hover:text-purple-300 transition-colors">
                  Bengaluru ➔ Delhi Flights
                </Link>
              </li>
              <li>
                <Link href="/flights?origin=BOM&destination=GOI" className="hover:text-purple-300 transition-colors">
                  Mumbai ➔ Goa Flights
                </Link>
              </li>
              <li>
                <Link href="/price-radar" className="hover:text-purple-300 transition-colors">
                  Flight Price Radar
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Comparison & Tools */}
          <div className="space-y-3">
            <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-purple-400" />
              <span>Features</span>
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/compare" className="hover:text-purple-300 transition-colors">
                  Side-by-Side Matrix
                </Link>
              </li>
              <li>
                <Link href="/price-radar" className="hover:text-purple-300 transition-colors">
                  Airfare Drop Alerts
                </Link>
              </li>
              <li>
                <span className="hover:text-purple-300 transition-colors cursor-pointer">
                  AI Flight Copilot
                </span>
              </li>
              <li>
                <span className="hover:text-purple-300 transition-colors cursor-pointer">
                  Baggage & Refund Rules
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform */}
          <div className="space-y-3">
            <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              Supported Carriers
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              IndiGo, Air India, Akasa Air, SpiceJet, Air India Express, Emirates, British Airways & global IATA member airlines.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} CompareX AI Inc. All rights reserved. &ldquo;Shop Smarter. Everywhere.&rdquo;
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-slate-400 transition-colors">Aviation API Status</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
