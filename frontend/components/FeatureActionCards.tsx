'use client';

import React from 'react';
import { Camera, Target, TrendingDown, ArrowRight } from 'lucide-react';

interface FeatureActionCardsProps {
  onOpenImageSearch: () => void;
  onOpenMission: () => void;
  onOpenPriceWatch: () => void;
}

export const FeatureActionCards: React.FC<FeatureActionCardsProps> = ({
  onOpenImageSearch,
  onOpenMission,
  onOpenPriceWatch
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
      {/* 1. Shop from Image */}
      <div 
        onClick={onOpenImageSearch}
        className="group relative bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-purple-950/20 border border-slate-800 hover:border-purple-500/50 rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer overflow-hidden flex flex-col justify-between"
      >
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all" />
        
        <div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
            <Camera className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-purple-300 transition-colors">
            Shop from Image
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Upload a photo and find the exact product or similar options across 6+ stores.
          </p>
        </div>

        <div className="flex items-center justify-between pt-5 mt-4 border-t border-slate-800/60">
          <span className="text-[11px] font-semibold text-purple-400 group-hover:underline">Upload Photo / URL</span>
          <div className="w-9 h-9 rounded-full bg-purple-600 group-hover:bg-purple-500 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 group-hover:translate-x-1 transition-all">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 2. Build a Shopping Mission */}
      <div 
        onClick={onOpenMission}
        className="group relative bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-blue-950/20 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer overflow-hidden flex flex-col justify-between"
      >
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />

        <div>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-blue-300 transition-colors">
            Build a Shopping Mission
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Set your goal, budget and let AI find the best options and allocate budget across components.
          </p>
        </div>

        <div className="flex items-center justify-between pt-5 mt-4 border-t border-slate-800/60">
          <span className="text-[11px] font-semibold text-blue-400 group-hover:underline">Start AI Mission</span>
          <div className="w-9 h-9 rounded-full bg-blue-600 group-hover:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:translate-x-1 transition-all">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 3. Track a Price */}
      <div 
        onClick={onOpenPriceWatch}
        className="group relative bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-teal-950/20 border border-slate-800 hover:border-teal-500/50 rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/10 cursor-pointer overflow-hidden flex flex-col justify-between"
      >
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all" />

        <div>
          <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-4 group-hover:scale-110 transition-transform">
            <TrendingDown className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-teal-300 transition-colors">
            Track a Price
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Get notified when the price drops on your favorite product with autonomous price drop radar.
          </p>
        </div>

        <div className="flex items-center justify-between pt-5 mt-4 border-t border-slate-800/60">
          <span className="text-[11px] font-semibold text-teal-400 group-hover:underline">Activate Radar</span>
          <div className="w-9 h-9 rounded-full bg-teal-600 group-hover:bg-teal-500 text-white flex items-center justify-center shadow-lg shadow-teal-600/30 group-hover:translate-x-1 transition-all">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
