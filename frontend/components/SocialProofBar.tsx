'use client';

import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

export const SocialProofBar: React.FC = () => {
  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl backdrop-blur-md">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Left Side: Stats & Counters */}
        <div className="flex-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
            Trusted by smart shoppers
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
            {/* 1M+ Happy Users */}
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">1M+</div>
              <div className="text-xs text-slate-400 mt-0.5 font-medium">Happy Users</div>
            </div>

            {/* 6+ Verified Retailers */}
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">6+</div>
              <div className="text-xs text-slate-400 mt-0.5 font-medium">Verified Retailers</div>
            </div>

            {/* 50M+ Products Indexed */}
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">50M+</div>
              <div className="text-xs text-slate-400 mt-0.5 font-medium">Products Indexed</div>
            </div>

            {/* 4.8/5 User Satisfaction with avatar stack */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">4.8/5</span>
                {/* Micro Avatars */}
                <div className="flex -space-x-1.5 overflow-hidden">
                  <img className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="User 1" />
                  <img className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="User 2" />
                  <img className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="User 3" />
                </div>
              </div>
              <div className="text-xs text-slate-400 mt-0.5 font-medium">User Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Divider on desktop */}
        <div className="hidden lg:block w-px h-16 bg-slate-800" />

        {/* Right Side: Rohit Sharma Testimonial */}
        <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4 max-w-md w-full lg:w-auto">
          <p className="text-xs text-slate-300 font-medium italic mb-3">
            &ldquo;CompareX saved me ₹8,000 on my laptop! The recommendations are spot on.&rdquo;
          </p>

          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
              alt="Rohit Sharma"
              className="w-9 h-9 rounded-full object-cover border border-slate-700"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">Rohit Sharma</span>
                <div className="flex items-center text-amber-400">
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                </div>
              </div>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Verified User
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
