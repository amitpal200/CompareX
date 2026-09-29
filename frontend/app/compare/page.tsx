'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Scale, CheckCircle2, XCircle, ExternalLink, Luggage, Clock, Plane, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FlightOffer } from '@/lib/types';

function FlightCompareContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read from sessionStorage or API
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('compare_flights');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setFlights(parsed);
          }
        } catch (e) {
          console.error('Failed to parse compare_flights:', e);
        }
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-100 flex items-center gap-2">
                <Scale className="w-6 h-6 text-purple-400" />
                <span>Side-by-Side Flight Comparison</span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Analyze trade-offs between pricing, layovers, check-in baggage, and refundability
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/flights"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold rounded-xl text-purple-300"
            >
              Back to Flight Results
            </Link>
          </div>
        </div>

        {/* Empty State */}
        {flights.length === 0 ? (
          <div className="p-12 glass-panel border border-slate-800 rounded-2xl text-center space-y-4">
            <Scale className="w-10 h-10 text-purple-400/60 mx-auto" />
            <h2 className="text-lg font-bold text-slate-200">No Flights Selected for Comparison</h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Select 2 or 3 flights from the flight search results by clicking the &ldquo;Compare&rdquo; button.
            </p>
            <Link
              href="/flights"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/30 transition-all"
            >
              <Plane className="w-4 h-4" />
              <span>Browse Flights</span>
            </Link>
          </div>
        ) : (
          /* Comparison Matrix Table */
          <div className="glass-panel border border-slate-800/80 rounded-2xl overflow-x-auto shadow-2xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60">
                  <th className="p-4 w-48 text-slate-400 font-semibold uppercase tracking-wider">
                    Feature
                  </th>
                  {flights.map((flight) => (
                    <th key={flight.id} className="p-4 min-w-[220px] max-w-[280px]">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <div className="font-bold text-slate-100 text-sm">{flight.airline}</div>
                          <div className="font-mono text-slate-400 text-[11px]">{flight.flight_number}</div>
                        </div>
                        <span className="text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
                          {flight.airline_code}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {/* Total Price */}
                <tr className="bg-purple-950/20">
                  <td className="p-4 font-bold text-purple-300">Total Fare (incl. Taxes)</td>
                  {flights.map((f) => {
                    const isLowest = f.total_fare === Math.min(...flights.map((x) => x.total_fare));
                    return (
                      <td key={f.id} className="p-4">
                        <div className="text-xl font-black text-slate-100 font-mono">
                          ₹{f.total_fare.toLocaleString('en-IN')}
                        </div>
                        {isLowest && (
                          <span className="inline-block mt-1 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                            ★ LOWEST FARE
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* Base Fare vs Taxes */}
                <tr>
                  <td className="p-4 font-medium text-slate-400">Base Fare & Taxes</td>
                  {flights.map((f) => (
                    <td key={f.id} className="p-4 font-mono text-slate-300">
                      <div>Base: ₹{f.base_fare.toLocaleString('en-IN')}</div>
                      <div className="text-slate-500 text-[11px]">Taxes: ₹{f.taxes_fees.toLocaleString('en-IN')}</div>
                    </td>
                  ))}
                </tr>

                {/* Schedule & Duration */}
                <tr>
                  <td className="p-4 font-medium text-slate-400">Departure & Arrival</td>
                  {flights.map((f) => (
                    <td key={f.id} className="p-4 space-y-1">
                      <div className="font-bold text-slate-100 font-mono">
                        {f.departure_time} ({f.origin}) ➔ {f.arrival_time} ({f.destination})
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-purple-400" />
                        <span>Duration: <strong>{f.duration}</strong></span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Stops */}
                <tr>
                  <td className="p-4 font-medium text-slate-400">Stops & Route</td>
                  {flights.map((f) => (
                    <td key={f.id} className="p-4">
                      {f.stops === 0 ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Non-stop
                        </span>
                      ) : (
                        <span className="text-amber-400 font-semibold">
                          {f.stops} stop {f.stop_cities?.length ? `via ${f.stop_cities.join(', ')}` : ''}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Cabin Class */}
                <tr>
                  <td className="p-4 font-medium text-slate-400">Cabin Class</td>
                  {flights.map((f) => (
                    <td key={f.id} className="p-4 font-semibold text-slate-200">
                      {f.cabin_class}
                    </td>
                  ))}
                </tr>

                {/* Baggage */}
                <tr>
                  <td className="p-4 font-medium text-slate-400">Baggage Allowance</td>
                  {flights.map((f) => {
                    const cabin = f.baggage?.cabin || f.cabin_baggage || '7 kg Hand Baggage';
                    const checkin = f.baggage?.checkin || f.checked_baggage || '15 kg Check-in';
                    return (
                      <td key={f.id} className="p-4 space-y-1">
                        <div className="flex items-center gap-1 text-slate-300">
                          <Luggage className="w-3.5 h-3.5 text-purple-400" />
                          <span>Cabin: <strong>{cabin}</strong></span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-300">
                          <Luggage className="w-3.5 h-3.5 text-blue-400" />
                          <span>Check-in: <strong>{checkin}</strong></span>
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* Refundability */}
                <tr>
                  <td className="p-4 font-medium text-slate-400">Cancellation Policy</td>
                  {flights.map((f) => (
                    <td key={f.id} className="p-4">
                      {f.refundable ? (
                        <div className="text-emerald-400 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Refundable (fee applies)</span>
                        </div>
                      ) : (
                        <div className="text-slate-500 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Non-refundable</span>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Seats Remaining */}
                <tr>
                  <td className="p-4 font-medium text-slate-400">Seat Availability</td>
                  {flights.map((f) => (
                    <td key={f.id} className="p-4 font-medium text-slate-300">
                      {f.seats_remaining <= 5 ? (
                        <span className="text-amber-400 font-bold">
                          🔥 Only {f.seats_remaining} seats left
                        </span>
                      ) : (
                        <span>Available ({f.seats_remaining}+ seats)</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Action CTA */}
                <tr>
                  <td className="p-4 font-medium text-slate-400">Direct Booking</td>
                  {flights.map((f) => (
                    <td key={f.id} className="p-4">
                      <a
                        href={f.booking_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-600/30 flex items-center justify-center gap-1.5 transition-all"
                      >
                        <span>Book on {f.airline}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050816] flex items-center justify-center text-slate-100">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
        </div>
      }
    >
      <FlightCompareContent />
    </Suspense>
  );
}
