'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Bell, Sparkles, CheckCircle2, ShieldAlert, ArrowRight, Loader2, Plane, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AirportAutocomplete from '@/components/AirportAutocomplete';
import { AirportItem } from '@/lib/types';

function PriceRadarContent() {
  const searchParams = useSearchParams();
  const initialOriginCode = searchParams.get('origin') || 'DEL';
  const initialDestCode = searchParams.get('destination') || 'BOM';
  const initialTarget = searchParams.get('target_price') || '4500';

  const [origin, setOrigin] = useState<AirportItem | null>({
    code: initialOriginCode,
    city: initialOriginCode,
    name: `${initialOriginCode} Airport`,
    country: 'India',
  });
  const [destination, setDestination] = useState<AirportItem | null>({
    code: initialDestCode,
    city: initialDestCode,
    name: `${initialDestCode} Airport`,
    country: 'India',
  });
  const [targetPrice, setTargetPrice] = useState<string>(initialTarget);
  const [email, setEmail] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<string>(
    new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0]
  );
  const [submitting, setSubmitting] = useState(false);
  const [createdRadar, setCreatedRadar] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination) {
      alert('Please specify origin and destination airports.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/flights/price-radar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: origin.code,
          destination: destination.code,
          departure_date: departureDate,
          target_price: Number(targetPrice),
          email: email.trim(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setCreatedRadar(data);
      } else {
        alert('Failed to initialize price radar. Please try again.');
      }
    } catch (err) {
      console.error('Price radar error:', err);
      alert('Could not connect to CompareX server.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-semibold">
            <Bell className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>Autonomous Airfare Radar</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-100">
            Never Overpay for a Flight Again.
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            CompareX AI monitors airline yield management systems 24/7. When prices drop below your threshold, you get instant email notification.
          </p>
        </div>

        {/* Confirmation Banner */}
        {createdRadar && (
          <div className="glass-panel border border-emerald-500/50 bg-emerald-950/20 rounded-2xl p-6 shadow-xl animate-in fade-in slide-in-from-top-3">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 flex-shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-emerald-200">
                  Radar Activated: {createdRadar.watch?.origin} ➔ {createdRadar.watch?.destination}
                </h3>
                <p className="text-xs text-slate-300">
                  We are now continuously monitoring {createdRadar.watch?.origin} to {createdRadar.watch?.destination} on {createdRadar.watch?.departure_date}.
                </p>
                <div className="text-xs text-slate-400 pt-2 flex items-center gap-2">
                  <span>Target: <strong className="text-emerald-300 font-mono">₹{createdRadar.watch?.target_price}</strong></span>
                  <span>•</span>
                  <span>Alert dispatched to: <strong className="text-slate-200">{createdRadar.watch?.email}</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Setup Form */}
        <div className="glass-panel border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AirportAutocomplete
                label="Origin"
                value={origin}
                onChange={setOrigin}
                placeholder="Origin Airport"
              />
              <AirportAutocomplete
                label="Destination"
                value={destination}
                onChange={setDestination}
                placeholder="Destination Airport"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Departure Date
                </label>
                <input
                  type="date"
                  value={departureDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full px-3.5 py-3 bg-[#0B1224]/90 border border-slate-700/60 rounded-xl text-slate-100 text-xs font-medium focus:outline-none focus:border-purple-500/80 [color-scheme:dark]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Target Price Threshold (₹)
                </label>
                <input
                  type="number"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  placeholder="e.g. 4200"
                  className="w-full px-3.5 py-3 bg-[#0B1224]/90 border border-slate-700/60 rounded-xl text-slate-100 text-xs font-medium focus:outline-none focus:border-purple-500/80"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Notification Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#0B1224]/90 border border-slate-700/60 rounded-xl text-slate-100 text-xs font-medium focus:outline-none focus:border-purple-500/80"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Configuring Airfare Radar...</span>
                </>
              ) : (
                <>
                  <Bell className="w-4 h-4" />
                  <span>Activate Free Price Alert</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Transparency / How it works */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 glass-panel border border-slate-800/80 rounded-xl space-y-1.5">
            <div className="text-purple-400 font-bold text-xs">1. Live GDS Polling</div>
            <p className="text-[11px] text-slate-400">
              We track authentic airline fare buckets across all major domestic & international carriers.
            </p>
          </div>
          <div className="p-4 glass-panel border border-slate-800/80 rounded-xl space-y-1.5">
            <div className="text-purple-400 font-bold text-xs">2. Zero Fake Discounts</div>
            <p className="text-[11px] text-slate-400">
              Alerts only trigger when verified published airline fares genuinely drop below your target.
            </p>
          </div>
          <div className="p-4 glass-panel border border-slate-800/80 rounded-xl space-y-1.5">
            <div className="text-purple-400 font-bold text-xs">3. Direct Booking</div>
            <p className="text-[11px] text-slate-400">
              Every alert includes a direct booking link to the airline with zero markup or hidden platform fees.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function PriceRadarPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050816] flex items-center justify-center text-slate-100">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
        </div>
      }
    >
      <PriceRadarContent />
    </Suspense>
  );
}
