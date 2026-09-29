'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftRight, Calendar, Users, Sparkles, ChevronDown, Check, Plus, Trash2, Plane } from 'lucide-react';
import AirportAutocomplete from './AirportAutocomplete';
import { AirportItem, MultiCitySegmentRequest } from '@/lib/types';

interface FlightSearchBoxProps {
  initialOrigin?: AirportItem | null;
  initialDestination?: AirportItem | null;
  initialDepartureDate?: string;
  initialReturnDate?: string;
  initialPassengers?: number;
  initialCabin?: string;
  onSearch?: (params: {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    passengers: number;
    cabin: string;
  }) => void;
  className?: string;
}

interface MultiCityRow {
  id: string;
  origin: AirportItem | null;
  destination: AirportItem | null;
  departureDate: string;
}

export default function FlightSearchBox({
  initialOrigin = { code: 'DEL', city: 'New Delhi', name: 'Indira Gandhi International Airport', country: 'India' },
  initialDestination = { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj International Airport', country: 'India' },
  initialDepartureDate,
  initialReturnDate,
  initialPassengers = 1,
  initialCabin = 'Economy',
  onSearch,
  className = '',
}: FlightSearchBoxProps) {
  const router = useRouter();

  // Helper default dates
  const today = new Date();
  const defaultDepart = new Date(today);
  defaultDepart.setDate(today.getDate() + 3);
  const defaultDepartStr = defaultDepart.toISOString().split('T')[0];

  const defaultReturn = new Date(defaultDepart);
  defaultReturn.setDate(defaultDepart.getDate() + 4);
  const defaultReturnStr = defaultReturn.toISOString().split('T')[0];

  const defaultNextDate = new Date(defaultDepart);
  defaultNextDate.setDate(defaultDepart.getDate() + 2);
  const defaultNextDateStr = defaultNextDate.toISOString().split('T')[0];

  const [tripType, setTripType] = useState<'round-trip' | 'one-way' | 'multi-city'>('one-way');
  const [origin, setOrigin] = useState<AirportItem | null>(initialOrigin);
  const [destination, setDestination] = useState<AirportItem | null>(initialDestination);
  const [departureDate, setDepartureDate] = useState<string>(initialDepartureDate || defaultDepartStr);
  const [returnDate, setReturnDate] = useState<string>(initialReturnDate || defaultReturnStr);
  const [passengers, setPassengers] = useState<number>(initialPassengers);
  const [cabin, setCabin] = useState<string>(initialCabin);
  const [isSwapping, setIsSwapping] = useState(false);
  const [showCabinMenu, setShowCabinMenu] = useState(false);

  // Multi-city segments state
  const [multiCitySegments, setMultiCitySegments] = useState<MultiCityRow[]>([
    {
      id: 'seg-1',
      origin: initialOrigin,
      destination: initialDestination,
      departureDate: initialDepartureDate || defaultDepartStr,
    },
    {
      id: 'seg-2',
      origin: initialDestination,
      destination: { code: 'BLR', city: 'Bengaluru', name: 'Kempegowda International Airport', country: 'India' },
      departureDate: defaultNextDateStr,
    },
  ]);

  const cabinOptions = ['Economy', 'Premium Economy', 'Business', 'First'];

  const handleSwap = () => {
    setIsSwapping(true);
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
    setTimeout(() => setIsSwapping(false), 300);
  };

  const addMultiCitySegment = () => {
    if (multiCitySegments.length >= 5) {
      alert('You can plan up to 5 multi-city segments per journey.');
      return;
    }
    const lastSeg = multiCitySegments[multiCitySegments.length - 1];
    const prevDate = new Date(lastSeg.departureDate || defaultDepartStr);
    prevDate.setDate(prevDate.getDate() + 2);
    const nextDateStr = prevDate.toISOString().split('T')[0];

    setMultiCitySegments([
      ...multiCitySegments,
      {
        id: `seg-${Date.now()}`,
        origin: lastSeg.destination,
        destination: null,
        departureDate: nextDateStr,
      },
    ]);
  };

  const removeMultiCitySegment = (id: string) => {
    if (multiCitySegments.length <= 2) {
      alert('A multi-city route requires at least 2 legs.');
      return;
    }
    setMultiCitySegments(multiCitySegments.filter((s) => s.id !== id));
  };

  const updateMultiCitySegment = (id: string, updates: Partial<MultiCityRow>) => {
    setMultiCitySegments((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (tripType === 'multi-city') {
      for (let i = 0; i < multiCitySegments.length; i++) {
        const seg = multiCitySegments[i];
        if (!seg.origin || !seg.destination) {
          alert(`Please complete origin and destination for Leg ${i + 1}.`);
          return;
        }
        if (seg.origin.code === seg.destination.code) {
          alert(`Leg ${i + 1} cannot have matching origin and destination airports.`);
          return;
        }
      }

      // Encode first leg into primary query params so flights page displays correctly with multi-city flag
      const first = multiCitySegments[0];
      const query = new URLSearchParams({
        origin: first.origin!.code,
        destination: first.destination!.code,
        departure_date: first.departureDate,
        trip_type: 'multi_city',
        passengers: passengers.toString(),
        cabin,
        multicity_legs: JSON.stringify(
          multiCitySegments.map((s) => ({
            origin: s.origin!.code,
            destination: s.destination!.code,
            departure_date: s.departureDate,
          }))
        ),
      });
      router.push(`/flights?${query.toString()}`);
      return;
    }

    if (!origin || !destination) {
      alert('Please select origin and destination airports.');
      return;
    }

    if (origin.code === destination.code) {
      alert('Origin and destination cannot be the same airport.');
      return;
    }

    const searchParams = {
      origin: origin.code,
      destination: destination.code,
      departureDate,
      returnDate: tripType === 'round-trip' ? returnDate : undefined,
      passengers,
      cabin,
    };

    if (onSearch) {
      onSearch(searchParams);
    } else {
      const query = new URLSearchParams({
        origin: origin.code,
        destination: destination.code,
        departure_date: departureDate,
        ...(tripType === 'round-trip' && returnDate ? { return_date: returnDate } : {}),
        trip_type: tripType === 'round-trip' ? 'round_trip' : 'one_way',
        passengers: passengers.toString(),
        cabin,
      });
      router.push(`/flights?${query.toString()}`);
    }
  };

  return (
    <div
      className={`glass-panel border border-slate-700/60 rounded-2xl p-4 md:p-6 shadow-2xl relative overflow-hidden ${className}`}
    >
      {/* Decorative gradient blur */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Controls: Trip Type & Cabin & Passengers */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-slate-800/80 pb-4">
        {/* Trip Type Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setTripType('one-way')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              tripType === 'one-way'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            One Way
          </button>
          <button
            type="button"
            onClick={() => setTripType('round-trip')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              tripType === 'round-trip'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Round Trip
          </button>
          <button
            type="button"
            onClick={() => setTripType('multi-city')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              tripType === 'multi-city'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Multi-City
          </button>
        </div>

        {/* Passenger & Cabin Dropdown */}
        <div className="flex items-center gap-3">
          {/* Passenger Counter */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>{passengers} {passengers > 1 ? 'Travelers' : 'Traveler'}</span>
            <div className="flex items-center ml-2 border-l border-slate-700/80 pl-2 gap-1">
              <button
                type="button"
                onClick={() => setPassengers(Math.max(1, passengers - 1))}
                className="w-5 h-5 rounded flex items-center justify-center hover:bg-slate-800 text-slate-400 hover:text-white"
                disabled={passengers <= 1}
              >
                -
              </button>
              <button
                type="button"
                onClick={() => setPassengers(Math.min(9, passengers + 1))}
                className="w-5 h-5 rounded flex items-center justify-center hover:bg-slate-800 text-slate-400 hover:text-white"
                disabled={passengers >= 9}
              >
                +
              </button>
            </div>
          </div>

          {/* Cabin Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCabinMenu(!showCabinMenu)}
              className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 hover:border-slate-700"
            >
              <span>{cabin}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {showCabinMenu && (
              <div className="absolute right-0 mt-1.5 w-44 bg-[#0B1224] border border-slate-700/80 rounded-xl shadow-2xl p-1 z-50">
                {cabinOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setCabin(opt);
                      setShowCabinMenu(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-slate-300 hover:bg-purple-950/40 hover:text-purple-200 transition-colors"
                  >
                    <span>{opt}</span>
                    {cabin === opt && <Check className="w-3.5 h-3.5 text-purple-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Search Inputs Grid */}
      <form onSubmit={handleSearchSubmit}>
        {tripType === 'multi-city' ? (
          /* Multi-City Form */
          <div className="space-y-3">
            {multiCitySegments.map((segment, idx) => (
              <div
                key={segment.id}
                className="p-3.5 bg-slate-900/50 border border-slate-800 rounded-xl grid grid-cols-1 md:grid-cols-12 gap-3 items-center relative"
              >
                <div className="md:col-span-1 flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-xs font-bold text-purple-300">
                    {idx + 1}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 md:hidden">Leg {idx + 1}</span>
                </div>

                <div className="md:col-span-4">
                  <AirportAutocomplete
                    label="From"
                    value={segment.origin}
                    onChange={(val) => updateMultiCitySegment(segment.id, { origin: val })}
                    placeholder="Origin"
                    iconColor="text-blue-400"
                  />
                </div>

                <div className="md:col-span-4">
                  <AirportAutocomplete
                    label="To"
                    value={segment.destination}
                    onChange={(val) => updateMultiCitySegment(segment.id, { destination: val })}
                    placeholder="Destination"
                    iconColor="text-purple-400"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Date
                  </label>
                  <input
                    type="date"
                    value={segment.departureDate}
                    min={today.toISOString().split('T')[0]}
                    onChange={(e) => updateMultiCitySegment(segment.id, { departureDate: e.target.value })}
                    className="w-full px-2.5 py-3 bg-[#0B1224]/90 border border-slate-700/60 rounded-xl text-slate-100 text-xs font-medium focus:outline-none focus:border-purple-500/80 [color-scheme:dark]"
                  />
                </div>

                <div className="md:col-span-1 flex items-center justify-end md:justify-center md:pt-4">
                  {multiCitySegments.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeMultiCitySegment(segment.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                      title="Remove flight leg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="flex items-center justify-start pt-1">
              <button
                type="button"
                onClick={addMultiCitySegment}
                className="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-xl text-xs font-semibold text-purple-300 hover:text-purple-200 flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Another Flight Leg</span>
              </button>
            </div>
          </div>
        ) : (
          /* Standard One-Way / Round-Trip Grid */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Origin */}
            <div className="md:col-span-4 relative">
              <AirportAutocomplete
                label="From"
                value={origin}
                onChange={setOrigin}
                placeholder="Departure city or airport"
                iconColor="text-blue-400"
              />
            </div>

            {/* Swap Button */}
            <div className="flex items-center justify-center md:col-span-1 -my-2 md:my-0 md:pt-5 z-10">
              <button
                type="button"
                onClick={handleSwap}
                title="Swap Airports"
                className={`w-10 h-10 rounded-full bg-slate-800/90 border border-slate-700 hover:border-purple-500/60 hover:bg-purple-900/30 text-slate-300 hover:text-purple-300 flex items-center justify-center shadow-lg transition-transform duration-300 ${
                  isSwapping ? 'rotate-180 scale-110' : ''
                }`}
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* Destination */}
            <div className="md:col-span-4 relative">
              <AirportAutocomplete
                label="To"
                value={destination}
                onChange={setDestination}
                placeholder="Arrival city or airport"
                iconColor="text-purple-400"
              />
            </div>

            {/* Dates */}
            <div className={`md:col-span-3 grid ${tripType === 'round-trip' ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
              {/* Depart Date */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Depart
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={departureDate}
                    min={today.toISOString().split('T')[0]}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full px-3 py-3 bg-[#0B1224]/90 border border-slate-700/60 rounded-xl text-slate-100 text-xs font-medium focus:outline-none focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Return Date (only if Round Trip) */}
              {tripType === 'round-trip' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Return
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={returnDate}
                      min={departureDate || today.toISOString().split('T')[0]}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full px-3 py-3 bg-[#0B1224]/90 border border-slate-700/60 rounded-xl text-slate-100 text-xs font-medium focus:outline-none focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 [color-scheme:dark]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom Bar: Action & Value Proposition */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>
              Real-time multi-source comparison across Airline Direct, GDS Express & verified partner pipelines
            </span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>{tripType === 'multi-city' ? 'Compare Multi-City Route' : 'Compare Flights'}</span>
            <span className="text-purple-200">➔</span>
          </button>
        </div>
      </form>
    </div>
  );
}
