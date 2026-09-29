'use client';

import React from 'react';
import { ShoppingCart, Brain, Zap, Heart } from 'lucide-react';

export const WhyChooseSection: React.FC = () => {
  const features = [
    {
      title: "Multi-Store Comparison",
      description: "Compare across 6+ verified retailers",
      icon: ShoppingCart,
      iconColor: "text-cyan-400",
      bgColor: "bg-cyan-500/10 border-cyan-500/30"
    },
    {
      title: "AI-Powered Insights",
      description: "Get personalized recommendations",
      icon: Brain,
      iconColor: "text-purple-400",
      bgColor: "bg-purple-500/10 border-purple-500/30"
    },
    {
      title: "Real-Time Updates",
      description: "Live prices, offers and availability",
      icon: Zap,
      iconColor: "text-emerald-400",
      bgColor: "bg-emerald-500/10 border-emerald-500/30"
    },
    {
      title: "Save Time & Money",
      description: "Smarter choices, better deals",
      icon: Heart,
      iconColor: "text-pink-400",
      bgColor: "bg-pink-500/10 border-pink-500/30"
    }
  ];

  return (
    <div className="mb-14">
      {/* Title & Subtitle */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
          Why Choose CompareX AI?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          More than just a price comparison — it's your AI shopping companion.
        </p>
      </div>

      {/* 4 Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl p-5 transition-all duration-200 flex items-start gap-3.5 group shadow-sm hover:shadow-lg hover:shadow-indigo-500/5"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${item.bgColor} ${item.iconColor} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
