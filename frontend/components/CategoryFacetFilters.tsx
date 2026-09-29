'use client';

import React, { useState } from 'react';
import { Filter, RotateCcw, Tag, DollarSign, Layers, Search, Check } from 'lucide-react';
import { Product, CurrencyCode, CURRENCY_MAP } from '../lib/types';

interface PriceBand {
  label: string;
  min: number | null;
  max: number | null;
}

interface CategoryFacetFiltersProps {
  products: Product[];
  selectedBrand: string | null;
  onSelectBrand: (brand: string | null) => void;
  minPrice: number | null;
  maxPrice: number | null;
  onSetPriceRange: (min: number | null, max: number | null) => void;
  selectedCushioning: string | null;
  onSelectCushioning: (cushioning: string | null) => void;
  currency: CurrencyCode;
}

export const CategoryFacetFilters: React.FC<CategoryFacetFiltersProps> = ({
  products,
  selectedBrand,
  onSelectBrand,
  minPrice,
  maxPrice,
  onSetPriceRange,
  selectedCushioning,
  onSelectCushioning,
  currency
}) => {
  const curr = CURRENCY_MAP[currency] || CURRENCY_MAP.INR;
  const [customMinInput, setCustomMinInput] = useState<string>(minPrice ? String(minPrice) : '');
  const [customMaxInput, setCustomMaxInput] = useState<string>(maxPrice ? String(maxPrice) : '');

  // Extract available brands
  const brands = Array.from(new Set(products.map(p => p.brand))).filter(Boolean).sort();

  // Detect dominant subcategory
  const isShoes = products.some(p => p.subcategory?.toLowerCase().includes('shoe') || p.category?.toLowerCase().includes('shoe'));
  const isLaptops = products.some(p => p.subcategory?.toLowerCase().includes('laptop'));
  const isPhones = products.some(p => p.subcategory?.toLowerCase().includes('phone'));
  const isHeadphones = products.some(p => p.subcategory?.toLowerCase().includes('headphone'));

  // Define Flipkart-style Price Bands based on category
  let priceBands: PriceBand[] = [];
  if (isShoes) {
    priceBands = [
      { label: 'All Shoes', min: null, max: null },
      { label: 'Under ₹1,500', min: null, max: 1500 },
      { label: '₹1,500 - ₹3,000', min: 1500, max: 3000 },
      { label: '₹3,000 - ₹5,000', min: 3000, max: 5000 },
      { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
      { label: '₹10,000+', min: 10000, max: null }
    ];
  } else if (isHeadphones) {
    priceBands = [
      { label: 'All Audio', min: null, max: null },
      { label: 'Under ₹2,000', min: null, max: 2000 },
      { label: '₹2,000 - ₹5,000', min: 2000, max: 5000 },
      { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
      { label: '₹10,000+', min: 10000, max: null }
    ];
  } else if (isPhones) {
    priceBands = [
      { label: 'All Phones', min: null, max: null },
      { label: 'Under ₹15,000', min: null, max: 15000 },
      { label: '₹15,000 - ₹30,000', min: 15000, max: 30000 },
      { label: '₹30,000 - ₹60,000', min: 30000, max: 60000 },
      { label: '₹60,000+', min: 60000, max: null }
    ];
  } else if (isLaptops) {
    priceBands = [
      { label: 'All Laptops', min: null, max: null },
      { label: 'Under ₹55,000', min: null, max: 55000 },
      { label: '₹55,000 - ₹75,000', min: 55000, max: 75000 },
      { label: '₹75,000 - ₹1,00,000', min: 75000, max: 100000 },
      { label: '₹1,00,000+', min: 100000, max: null }
    ];
  } else {
    priceBands = [
      { label: 'All Deals', min: null, max: null },
      { label: 'Under ₹3,000', min: null, max: 3000 },
      { label: '₹3,000 - ₹8,000', min: 3000, max: 8000 },
      { label: '₹8,000 - ₹20,000', min: 8000, max: 20000 },
      { label: '₹20,000+', min: 20000, max: null }
    ];
  }

  // Shoe cushioning technology chips
  const cushioningChips = [
    { label: 'All Technologies', val: null },
    { label: 'NITRO (Nitrogen Bouncy)', val: 'nitro' },
    { label: 'GEL (Shock Protection)', val: 'gel' },
    { label: 'React / Boost', val: 'react|boost' },
    { label: 'Cloudfoam / Softride', val: 'cloudfoam|softride|softfoam' },
    { label: 'EVA / Phylon (Budget)', val: 'eva|phylon' }
  ];

  const hasActiveFilters = Boolean(selectedBrand || minPrice !== null || maxPrice !== null || selectedCushioning);

  const handleApplyCustomPrice = (e: React.FormEvent) => {
    e.preventDefault();
    const min = customMinInput ? parseInt(customMinInput, 10) : null;
    const max = customMaxInput ? parseInt(customMaxInput, 10) : null;
    onSetPriceRange(min, max);
  };

  return (
    <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-xl backdrop-blur-md">
      {/* Header & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-400" />
          <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
            Price & Brand Discovery (Flipkart Style)
          </span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-semibold">
            {products.length} models found
          </span>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              onSelectBrand(null);
              onSetPriceRange(null, null);
              setCustomMinInput('');
              setCustomMaxInput('');
              onSelectCushioning(null);
            }}
            className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

      {/* Row 1: Flipkart-style Quick Price Bands */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mr-1">
            <DollarSign className="w-3 h-3 text-emerald-400" />
            Price Range:
          </span>
          {priceBands.map((band, idx) => {
            const isSelected = minPrice === band.min && maxPrice === band.max;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onSetPriceRange(band.min, band.max);
                  setCustomMinInput(band.min ? String(band.min) : '');
                  setCustomMaxInput(band.max ? String(band.max) : '');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-bold'
                    : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {band.label}
              </button>
            );
          })}
        </div>

        {/* Custom Min - Max Price Inputs */}
        <form onSubmit={handleApplyCustomPrice} className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1">
            <span className="text-[11px] text-slate-500 font-semibold">{curr.symbol}</span>
            <input
              type="number"
              placeholder="Min"
              value={customMinInput}
              onChange={(e) => setCustomMinInput(e.target.value)}
              className="w-16 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>
          <span className="text-slate-500 text-xs font-semibold">to</span>
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1">
            <span className="text-[11px] text-slate-500 font-semibold">{curr.symbol}</span>
            <input
              type="number"
              placeholder="Max"
              value={customMaxInput}
              onChange={(e) => setCustomMaxInput(e.target.value)}
              className="w-16 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Apply
          </button>
        </form>
      </div>

      {/* Row 2: Brand Filter Chips (Click any brand to see only that company's models) */}
      {brands.length > 1 && (
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mr-1">
            <Tag className="w-3 h-3 text-indigo-400" />
            Brand:
          </span>
          <button
            type="button"
            onClick={() => onSelectBrand(null)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedBrand === null
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            All Brands ({brands.length})
          </button>
          {brands.map((b, idx) => {
            const isSelected = selectedBrand?.toLowerCase() === b.toLowerCase();
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectBrand(isSelected ? null : b)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                    : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                {b}
              </button>
            );
          })}
        </div>
      )}

      {/* Row 3: Category-Specific Facets (Shoe Cushioning / Sole Foam) */}
      {isShoes && (
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2 border-t border-slate-800/60">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mr-1">
            <Layers className="w-3 h-3 text-pink-400" />
            Midsole Sole Foam:
          </span>
          {cushioningChips.map((chip, idx) => {
            const isSelected = selectedCushioning === chip.val;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectCushioning(chip.val)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-pink-600 text-white shadow-md shadow-pink-600/30 font-bold'
                    : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
