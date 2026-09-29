'use client';

import React from 'react';
import { 
  Smartphone, Laptop, Headphones, Watch, Footprints, 
  Shirt, Refrigerator, Camera, Armchair, Sparkles, LayoutGrid 
} from 'lucide-react';

interface CategoryIconRowProps {
  onSelectCategory: (query: string) => void;
}

const CATEGORIES = [
  { id: 'mobiles', name: 'Mobiles', query: 'Best 5G smartphones', icon: Smartphone, color: 'text-sky-400 bg-sky-500/10 border-sky-500/30' },
  { id: 'laptops', name: 'Laptops', query: 'Best laptops for coding and gaming', icon: Laptop, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' },
  { id: 'headphones', name: 'Headphones', query: 'Wireless headphones with ANC', icon: Headphones, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
  { id: 'smartwatches', name: 'Smartwatches', query: 'Best smartwatches with AMOLED display', icon: Watch, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  { id: 'shoes', name: 'Shoes', query: 'Running shoes for daily training', icon: Footprints, color: 'text-pink-400 bg-pink-500/10 border-pink-500/30' },
  { id: 'clothing', name: 'Clothing', query: 'Men and women casual streetwear clothing', icon: Shirt, color: 'text-violet-400 bg-violet-500/10 border-violet-500/30' },
  { id: 'appliances', name: 'Home Appliances', query: 'Smart home kitchen and cleaning appliances', icon: Refrigerator, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  { id: 'cameras', name: 'Cameras', query: 'Best mirrorless cameras for beginners and vlogging', icon: Camera, color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
  { id: 'furniture', name: 'Furniture', query: 'Best ergonomic office chairs and desks', icon: Armchair, color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30' },
  { id: 'beauty', name: 'Beauty', query: 'Skincare and personal grooming beauty products', icon: Sparkles, color: 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/30' },
  { id: 'more', name: 'More', query: 'Trending electronics and lifestyle gadgets', icon: LayoutGrid, color: 'text-slate-400 bg-slate-500/10 border-slate-500/30' },
];

export const CategoryIconRow: React.FC<CategoryIconRowProps> = ({ onSelectCategory }) => {
  return (
    <div className="w-full mb-10">
      <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-none justify-start lg:justify-between">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.query)}
              className="flex flex-col items-center gap-2 px-3.5 py-3 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-indigo-500/50 transition-all duration-200 cursor-pointer flex-shrink-0 group hover:scale-[1.04] shadow-sm hover:shadow-indigo-500/10"
              style={{ minWidth: '78px' }}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${cat.color} group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-300 group-hover:text-white text-center leading-tight">
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
