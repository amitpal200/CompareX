'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Plane, MapPin, Loader2 } from 'lucide-react';
import { AirportItem } from '@/lib/types';

interface AirportAutocompleteProps {
  label: string;
  value: AirportItem | null;
  onChange: (airport: AirportItem) => void;
  placeholder?: string;
  className?: string;
  iconColor?: string;
}

export default function AirportAutocomplete({
  label,
  value,
  onChange,
  placeholder = 'City or airport code',
  className = '',
  iconColor = 'text-purple-400',
}: AirportAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<AirportItem[]>([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync query string with external value when set
  useEffect(() => {
    if (value) {
      setQuery(`${value.city} (${value.code})`);
    } else {
      setQuery('');
    }
  }, [value]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        // Reset query text to current value if not submitted
        if (value) {
          setQuery(`${value.city} (${value.code})`);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value]);

  // Debounced search
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://127.0.0.1:8000/api/flights/airports?q=${encodeURIComponent(query.replace(/\(.*\)/, '').trim())}`
        );
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error('Airport fetch error:', err);
      } finally {
        setLoading(false);
      }
    }, 180);

    return () => clearTimeout(timer);
  }, [query, isOpen]);

  const handleSelect = (airport: AirportItem) => {
    onChange(airport);
    setQuery(`${airport.city} (${airport.code})`);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Plane className={`w-4 h-4 ${iconColor} transition-transform group-focus-within:rotate-45 duration-300`} />
        </div>
        <input
          type="text"
          value={query}
          onFocus={() => {
            setIsOpen(true);
            if (!results.length) {
              // trigger initial list
              fetch(`http://127.0.0.1:8000/api/flights/airports?q=`)
                .then((r) => r.json())
                .then((d) => setResults(d))
                .catch(() => {});
            }
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder={placeholder}
          className="w-full pl-10 pr-9 py-3 bg-[#0B1224]/90 border border-slate-700/60 rounded-xl text-slate-100 text-sm font-medium focus:outline-none focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-slate-500 shadow-inner"
        />
        {loading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
          </div>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-[#0B1224] border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl max-h-72 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-2 border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Select Airport or City</span>
            <span className="text-[10px] text-purple-400/80">50+ Hubs</span>
          </div>

          {results.length === 0 && !loading ? (
            <div className="p-4 text-center text-xs text-slate-400">
              No matching airports found. Try typing &ldquo;DEL&rdquo;, &ldquo;BOM&rdquo;, or &ldquo;Bengaluru&rdquo;.
            </div>
          ) : (
            results.map((airport) => (
              <button
                key={airport.code}
                type="button"
                onClick={() => handleSelect(airport)}
                className="w-full px-3.5 py-2.5 flex items-center justify-between hover:bg-purple-950/40 text-left transition-colors border-b border-slate-800/40 last:border-b-0 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-300 group-hover:border-purple-500/40 group-hover:text-purple-300 transition-colors flex-shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <div className="text-sm font-semibold text-slate-100 group-hover:text-purple-200 truncate">
                      {airport.city}, <span className="text-xs text-slate-400">{airport.country}</span>
                    </div>
                    <div className="text-xs text-slate-400 truncate group-hover:text-slate-300">
                      {airport.name}
                    </div>
                  </div>
                </div>
                <div className="ml-2 flex-shrink-0">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30 group-hover:bg-purple-500/25 group-hover:text-purple-200 transition-colors">
                    {airport.code}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
