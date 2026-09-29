'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plane, AlertCircle, Loader2, ArrowLeft, SlidersHorizontal, Sparkles, MapPin, ArrowRight, ExternalLink, Compass } from 'lucide-react';
import FlightSearchBox from '@/components/FlightSearchBox';
import FlightCard from '@/components/FlightCard';
import FlightFilters from '@/components/FlightFilters';
import FlightSortBar, { FlightSortOption } from '@/components/FlightSortBar';
import FlightComparisonTray from '@/components/FlightComparisonTray';
import FlightCopilotDrawer from '@/components/FlightCopilotDrawer';
import PriceAnalyticsCard from '@/components/PriceAnalyticsCard';
import FlexibleDatesBar from '@/components/FlexibleDatesBar';
import FlightPortalView from '@/components/FlightPortalView';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FlightOffer, FlightSearchResponse, FlightFilterState, AirportItem, MultiCitySearchResponse, MultiCityItinerary } from '@/lib/types';

function FlightsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Query params with robust defaults
  const originParam = searchParams.get('origin') || 'DEL';
  const destParam = searchParams.get('destination') || 'BOM';
  const departDateParam = searchParams.get('departure_date') || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];
  const returnDateParam = searchParams.get('return_date') || undefined;
  const tripTypeParam = searchParams.get('trip_type') || (returnDateParam ? 'round_trip' : 'one_way');
  const passengersParam = Number(searchParams.get('passengers')) || 1;
  const cabinParam = searchParams.get('cabin') || 'Economy';
  const multicityLegsParam = searchParams.get('multicity_legs');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchResponse, setSearchResponse] = useState<FlightSearchResponse | null>(null);
  const [multiCityResponse, setMultiCityResponse] = useState<MultiCitySearchResponse | null>(null);

  // Filter & Sort State
  const [sortOption, setSortOption] = useState<FlightSortOption>('best');
  const [filterState, setFilterState] = useState<FlightFilterState>({
    maxPrice: 35000,
    stops: [],
    airlines: [],
    cabinClasses: [],
    timeOfDay: [],
    refundableOnly: false,
    maxDurationMinutes: 1440,
  });

  // Pinned for compare
  const [pinnedFlights, setPinnedFlights] = useState<FlightOffer[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showModifySearch, setShowModifySearch] = useState(false);

  // Fetch live flights
  const fetchFlights = async () => {
    try {
      setLoading(true);
      setError(null);
      setMultiCityResponse(null);

      // Check if Multi-City Search
      if (tripTypeParam === 'multi_city' && multicityLegsParam) {
        let legs = [];
        try {
          legs = JSON.parse(multicityLegsParam);
        } catch {
          legs = [
            { origin: originParam, destination: destParam, departure_date: departDateParam },
          ];
        }

        const mcRes = await fetch('http://127.0.0.1:8000/api/flights/search-multicity', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            segments: legs,
            passengers: passengersParam,
            cabin_class: cabinParam.toLowerCase(),
          }),
        });

        if (!mcRes.ok) {
          throw new Error(`Multi-City Router returned HTTP ${mcRes.status}`);
        }

        const mcData: MultiCitySearchResponse = await mcRes.json();
        setMultiCityResponse(mcData);
        setSearchResponse(null);
        return;
      }

      // Standard One-Way or Round-Trip
      const res = await fetch('http://127.0.0.1:8000/api/flights/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: originParam,
          destination: destParam,
          departure_date: departDateParam,
          return_date: returnDateParam,
          passengers: passengersParam,
          cabin_class: cabinParam.toLowerCase(),
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data: FlightSearchResponse = await res.json();
      setSearchResponse(data);

      // Auto-set maxPrice in filter based on highest fare
      if (data.price_analytics?.highest) {
        setFilterState((prev) => ({
          ...prev,
          maxPrice: data.price_analytics.highest,
        }));
      }
    } catch (err: any) {
      console.error('Error fetching live flights:', err);
      setError(err.message || 'Failed to load flight schedule. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, [originParam, destParam, departDateParam, returnDateParam, passengersParam, cabinParam, tripTypeParam, multicityLegsParam]);

  // Toggle pin to compare (max 3)
  const toggleCompare = (flight: FlightOffer) => {
    setPinnedFlights((prev) => {
      const exists = prev.some((f) => f.id === flight.id);
      if (exists) {
        return prev.filter((f) => f.id !== flight.id);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 flights at once.');
        return prev;
      }
      return [...prev, flight];
    });
  };

  // Helper to determine time of day category
  const getTimeCategory = (timeStr: string): 'morning' | 'afternoon' | 'evening' | 'night' => {
    const hour = parseInt(timeStr.split(':')[0], 10);
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 24) return 'evening';
    return 'night';
  };

  // Filtered & Sorted flights
  const displayedFlights = useMemo(() => {
    if (!searchResponse?.flights) return [];

    let list = searchResponse.flights.filter((f) => {
      // Price filter
      const fPrice = f.total_fare || f.price || 0;
      if (fPrice > filterState.maxPrice) return false;

      // Stops filter
      if (filterState.stops.length > 0) {
        const matchesStops = filterState.stops.some((s) => {
          if (s === 2) return f.stops >= 2;
          return f.stops === s;
        });
        if (!matchesStops) return false;
      }

      // Airlines filter
      if (filterState.airlines.length > 0) {
        if (!filterState.airlines.includes(f.airline)) return false;
      }

      // Time of day filter
      if (filterState.timeOfDay.length > 0) {
        const tod = getTimeCategory(f.departure_time);
        if (!filterState.timeOfDay.includes(tod)) return false;
      }

      // Refundable only
      if (filterState.refundableOnly && !f.refundable) {
        return false;
      }

      return true;
    });

    // Sort
    list.sort((a, b) => {
      const aFare = a.total_fare || a.price || 0;
      const bFare = b.total_fare || b.price || 0;
      if (sortOption === 'cheapest') {
        return aFare - bFare;
      }
      if (sortOption === 'fastest') {
        return a.duration_minutes - b.duration_minutes;
      }
      if (sortOption === 'earliest') {
        return a.departure_time.localeCompare(b.departure_time);
      }
      // 'best' - composite score
      return (b.score || 0) - (a.score || 0);
    });

    return list;
  }, [searchResponse, filterState, sortOption]);

  const handleSelectDate = (newDate: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('departure_date', newDate);
    router.push(`/flights?${params.toString()}`);
  };

  const originAirport: AirportItem = {
    code: originParam,
    city: originParam,
    name: `${originParam} Airport`,
    country: 'India',
  };

  const destAirport: AirportItem = {
    code: destParam,
    city: destParam,
    name: `${destParam} Airport`,
    country: 'India',
  };

  const isExploringPortal = !searchParams.has('origin') && !searchParams.has('destination');

  if (isExploringPortal) {
    return (
      <div className="min-h-screen bg-[#050816] text-slate-100 flex flex-col">
        <Navbar activeTab="travel" />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
          <FlightPortalView />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 flex flex-col">
      <Navbar activeTab="travel" />

      {/* Breadcrumb & Modify Search Bar */}
      <div className="border-b border-slate-800/80 bg-[#0B1224]/80 backdrop-blur-md sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>{originParam}</span>
                <span className="text-purple-400">➔</span>
                <span>{destParam}</span>
                <span className="text-xs font-normal text-slate-400">
                  • {departDateParam}
                  {returnDateParam ? ` to ${returnDateParam}` : tripTypeParam === 'multi_city' ? ' (Multi-City Journey)' : ' (One Way)'}
                  {` • ${passengersParam} Passenger(s) • ${cabinParam}`}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/flights"
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-purple-400" />
              <span>Explore Routes</span>
            </Link>

            <button
              type="button"
              onClick={() => setShowModifySearch(!showModifySearch)}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-xs font-semibold text-purple-300 hover:text-purple-200 transition-colors"
            >
              {showModifySearch ? 'Close Search' : 'Modify Search'}
            </button>
          </div>
        </div>

        {/* Expandable Search Drawer */}
        {showModifySearch && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 border-t border-slate-800/80 animate-in slide-in-from-top-3 duration-200">
            <FlightSearchBox
              initialOrigin={originAirport}
              initialDestination={destAirport}
              initialDepartureDate={departDateParam}
              initialReturnDate={returnDateParam}
              initialPassengers={passengersParam}
              initialCabin={cabinParam}
            />
          </div>
        )}
      </div>

      {/* Main Page Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full space-y-6">
        {/* Loading State */}
        {loading && (
          <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                <Plane className="w-7 h-7 text-purple-400 animate-bounce" />
              </div>
              <Loader2 className="w-14 h-14 text-purple-500 animate-spin absolute inset-0" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-slate-100">
                Aggregating Multi-Source Live Fares & Timetables...
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Comparing Direct Airline, GDS Net Fares & OTA quotes for {originParam} ➔ {destParam}
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-6 glass-panel border border-rose-900/50 rounded-2xl text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
            <h3 className="text-base font-bold text-rose-300">Unable to Fetch Flight Data</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">{error}</p>
            <button
              type="button"
              onClick={fetchFlights}
              className="px-4 py-2 bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800 text-rose-200 rounded-xl text-xs font-semibold"
            >
              Retry Live Search
            </button>
          </div>
        )}

        {/* Multi-City Itineraries View */}
        {!loading && !error && multiCityResponse && (
          <div className="space-y-6">
            <div className="p-4 bg-[#0B1224] border border-slate-800 rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span>Multi-City Route Planner</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/60">
                    {multiCityResponse.segments_count} Flight Legs Combined
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Optimized multi-sector ticket combinations with unified baggage transfer & seat guarantee
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {multiCityResponse.itineraries.map((itinerary) => (
                <div
                  key={itinerary.itinerary_id}
                  className="glass-panel border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-600/20 text-purple-300 border border-purple-500/40">
                        {itinerary.source}
                      </span>
                      <span className="text-xs text-slate-400">
                        Carriers: <strong className="text-slate-200">{itinerary.carrier_summary}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-black text-slate-100 font-mono">
                          ₹{Math.round(itinerary.total_fare).toLocaleString('en-IN')}
                        </div>
                        <div className="text-[11px] text-slate-400">Total Route Fare</div>
                      </div>

                      <a
                        href={itinerary.booking_url || `https://www.google.com/search?q=${encodeURIComponent('Multi city flights ' + itinerary.carrier_summary)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/30 flex items-center gap-1.5"
                      >
                        <span>Book Itinerary</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Segments Stream */}
                  <div className="space-y-3">
                    {itinerary.segments.map((seg, idx) => (
                      <div
                        key={seg.id}
                        className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl flex flex-wrap items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-purple-600/30 text-purple-300 text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <div>
                            <div className="text-xs font-bold text-slate-200">
                              {seg.airline} • {seg.flight_number}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono">
                              {seg.origin_code || seg.origin} ({seg.departure_time}) ➔ {seg.destination_code || seg.destination} ({seg.arrival_time})
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span>{seg.duration}</span>
                          <span>•</span>
                          <span className="text-emerald-400">{seg.stops === 0 || (seg.stops as any) === 'Non-stop' ? 'Non-stop' : `${seg.stops} Stop`}</span>
                          <span>•</span>
                          <span className="font-mono text-slate-200">₹{Math.round(seg.total_fare || seg.price || 0).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Flight Results View (One-Way / Round-Trip) */}
        {!loading && !error && searchResponse && (
          <>
            {/* Flexible Dates ±3 Days Scanner Strip */}
            <FlexibleDatesBar
              origin={originParam}
              destination={destParam}
              currentDate={departDateParam}
              onSelectDate={handleSelectDate}
            />

            {/* Price Analytics Summary Card */}
            {searchResponse.price_analytics && (
              <PriceAnalyticsCard
                analytics={searchResponse.price_analytics}
                origin={searchResponse.origin}
                destination={searchResponse.destination}
              />
            )}

            {/* Mobile Filter Button */}
            <div className="lg:hidden flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-purple-300 flex items-center gap-2"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{showMobileFilters ? 'Hide Filters' : 'Filter Flights'}</span>
              </button>
              <span className="text-xs text-slate-400 font-mono">
                {displayedFlights.length} of {searchResponse.total_results || searchResponse.total_offers_found || searchResponse.flights?.length} flights
              </span>
            </div>

            {/* Results Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Filters Sidebar */}
              <div
                className={`lg:col-span-3 ${
                  showMobileFilters ? 'block' : 'hidden lg:block'
                } sticky top-32`}
              >
                <FlightFilters
                  flights={searchResponse.flights}
                  filterState={filterState}
                  onChange={setFilterState}
                />
              </div>

              {/* Right Flight Cards Stream */}
              <div className="lg:col-span-9 space-y-4">
                {/* Sort Bar */}
                <FlightSortBar
                  currentSort={sortOption}
                  onSortChange={setSortOption}
                  totalCount={displayedFlights.length}
                  isLive={searchResponse.is_live_data}
                  dataTimestamp={searchResponse.data_timestamp}
                />

                {/* Empty List when filters match nothing */}
                {displayedFlights.length === 0 ? (
                  <div className="p-12 glass-panel border border-slate-800/80 rounded-2xl text-center space-y-3">
                    <Plane className="w-8 h-8 text-slate-500 mx-auto" />
                    <h3 className="text-base font-bold text-slate-200">
                      No flights match your active filters
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Try broadening your budget slider, selecting additional departure times, or resetting stops.
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setFilterState({
                          maxPrice: searchResponse.price_analytics?.highest || 30000,
                          stops: [],
                          airlines: [],
                          cabinClasses: [],
                          timeOfDay: [],
                          refundableOnly: false,
                          maxDurationMinutes: 1440,
                        })
                      }
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-xl transition-all"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  displayedFlights.map((flight) => (
                    <FlightCard
                      key={flight.id}
                      flight={flight}
                      isPinnedForCompare={pinnedFlights.some((f) => f.id === flight.id)}
                      onToggleCompare={toggleCompare}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Bottom Comparison Tray */}
            <FlightComparisonTray
              pinnedFlights={pinnedFlights}
              onRemove={(id) => setPinnedFlights((prev) => prev.filter((f) => f.id !== id))}
              onClear={() => setPinnedFlights([])}
            />

            {/* AI Copilot Drawer */}
            <FlightCopilotDrawer flights={searchResponse.flights} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function FlightsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050816] flex items-center justify-center text-slate-100">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
        </div>
      }
    >
      <FlightsPageContent />
    </Suspense>
  );
}
