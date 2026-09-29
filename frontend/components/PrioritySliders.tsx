import React from 'react';
import { 
  SlidersHorizontal, Sparkles, Zap, Shield, Battery, Scale, 
  Volume2, Radio, HeartPulse, Feather, Compass, Eye, Cpu, Award
} from 'lucide-react';
import { PriorityWeights } from '../lib/types';

interface PrioritySlidersProps {
  weights: PriorityWeights;
  onChangeWeights: (weights: PriorityWeights) => void;
  onWhatWouldYouBuy: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  category?: string;
}

interface SliderConfig {
  key: keyof PriorityWeights;
  label: string;
  icon: React.ReactNode;
  colorClass: string;
  accentClass: string;
  description: string;
  lowLabel: string;
  midLabel: string;
  highLabel: string;
}

export const PrioritySliders: React.FC<PrioritySlidersProps> = ({
  weights,
  onChangeWeights,
  onWhatWouldYouBuy,
  isOpen,
  onToggleOpen,
  category = 'laptop'
}) => {
  const cat = category.toLowerCase();

  const handleSliderChange = (key: keyof PriorityWeights, val: number) => {
    onChangeWeights({
      ...weights,
      [key]: val
    });
  };

  // Determine category-specific sliders (Master Prompt Section 21)
  const getSliders = (): SliderConfig[] => {
    if (cat.includes('headphone') || cat.includes('audio') || cat.includes('earbud')) {
      return [
        {
          key: 'price',
          label: 'Price / Budget',
          icon: <Shield className="w-3.5 h-3.5 text-emerald-400" />,
          colorClass: 'text-emerald-400',
          accentClass: 'accent-emerald-500',
          description: 'Favors maximum discounts & lowest effective price',
          lowLabel: 'Flexible',
          midLabel: 'Balanced',
          highLabel: 'Max Value'
        },
        {
          key: 'sound',
          label: 'Sound Quality & Drivers',
          icon: <Volume2 className="w-3.5 h-3.5 text-indigo-400" />,
          colorClass: 'text-indigo-400',
          accentClass: 'accent-indigo-500',
          description: 'Prioritizes Hi-Res Audio, LDAC/aptX codecs & driver quality',
          lowLabel: 'Casual',
          midLabel: 'Balanced',
          highLabel: 'Audiophile'
        },
        {
          key: 'anc',
          label: 'Active Noise Cancellation',
          icon: <Radio className="w-3.5 h-3.5 text-purple-400" />,
          colorClass: 'text-purple-400',
          accentClass: 'accent-purple-500',
          description: 'Prioritizes hybrid ANC & decibel noise isolation',
          lowLabel: 'Standard',
          midLabel: 'Moderate',
          highLabel: 'Silent Bubble'
        },
        {
          key: 'battery',
          label: 'Battery Life & Playtime',
          icon: <Battery className="w-3.5 h-3.5 text-amber-400" />,
          colorClass: 'text-amber-400',
          accentClass: 'accent-amber-500',
          description: 'Favors 40hr+ playtime with quick charging',
          lowLabel: 'Standard',
          midLabel: 'Solid',
          highLabel: 'Marathon'
        }
      ];
    }

    if (cat.includes('shoe') || cat.includes('running') || cat.includes('sneaker')) {
      return [
        {
          key: 'price',
          label: 'Price / Budget',
          icon: <Shield className="w-3.5 h-3.5 text-emerald-400" />,
          colorClass: 'text-emerald-400',
          accentClass: 'accent-emerald-500',
          description: 'Prefers best multi-store footwear discount',
          lowLabel: 'Flexible',
          midLabel: 'Balanced',
          highLabel: 'Max Value'
        },
        {
          key: 'comfort',
          label: 'Cushioning & Comfort',
          icon: <HeartPulse className="w-3.5 h-3.5 text-pink-400" />,
          colorClass: 'text-pink-400',
          accentClass: 'accent-pink-500',
          description: 'Prioritizes plush foam, nitrogen-infused midsoles & joint safety',
          lowLabel: 'Firm/Road',
          midLabel: 'Balanced',
          highLabel: 'Max Cushion'
        },
        {
          key: 'durability',
          label: 'Outsole Durability',
          icon: <Award className="w-3.5 h-3.5 text-amber-400" />,
          colorClass: 'text-amber-400',
          accentClass: 'accent-amber-500',
          description: 'Prefers durable rubber compounds (PumaGrip / Continental)',
          lowLabel: 'Standard',
          midLabel: 'High',
          highLabel: '800km+ Longevity'
        },
        {
          key: 'weight',
          label: 'Shoe Weight (Lightness)',
          icon: <Feather className="w-3.5 h-3.5 text-cyan-400" />,
          colorClass: 'text-cyan-400',
          accentClass: 'accent-cyan-500',
          description: 'Favors lightweight race & tempo shoes (< 260g)',
          lowLabel: 'Any Weight',
          midLabel: 'Moderate',
          highLabel: 'Ultra-Light'
        }
      ];
    }

    if (cat.includes('chair') || cat.includes('furniture') || cat.includes('desk')) {
      return [
        {
          key: 'price',
          label: 'Price / Budget',
          icon: <Shield className="w-3.5 h-3.5 text-emerald-400" />,
          colorClass: 'text-emerald-400',
          accentClass: 'accent-emerald-500',
          description: 'Prioritizes highest value ergonomic office seating',
          lowLabel: 'Flexible',
          midLabel: 'Balanced',
          highLabel: 'Max Value'
        },
        {
          key: 'comfort',
          label: 'Ergonomic Lumbar Support',
          icon: <Compass className="w-3.5 h-3.5 text-indigo-400" />,
          colorClass: 'text-indigo-400',
          accentClass: 'accent-indigo-500',
          description: 'Prioritizes dynamic lumbar adjustment & spine alignment',
          lowLabel: 'Basic',
          midLabel: 'Good',
          highLabel: 'Orthopedic'
        },
        {
          key: 'durability',
          label: 'Mechanism & Build Warranty',
          icon: <Award className="w-3.5 h-3.5 text-amber-400" />,
          colorClass: 'text-amber-400',
          accentClass: 'accent-amber-500',
          description: 'Prefers aluminum base, Class-4 gas lift & 3-year+ warranty',
          lowLabel: 'Standard',
          midLabel: 'Sturdy',
          highLabel: 'Commercial Grade'
        },
        {
          key: 'performance',
          label: 'Breathability (Mesh vs Leather)',
          icon: <Zap className="w-3.5 h-3.5 text-cyan-400" />,
          colorClass: 'text-cyan-400',
          accentClass: 'accent-cyan-500',
          description: 'Favors high-tensile breathable Korean mesh seating',
          lowLabel: 'Standard',
          midLabel: 'Breathable',
          highLabel: 'Full Mesh'
        }
      ];
    }

    if (cat.includes('phone') || cat.includes('mobile') || cat.includes('smartphone')) {
      return [
        {
          key: 'price',
          label: 'Price / Budget',
          icon: <Shield className="w-3.5 h-3.5 text-emerald-400" />,
          colorClass: 'text-emerald-400',
          accentClass: 'accent-emerald-500',
          description: 'Prefers lowest effective price after card discounts & offers',
          lowLabel: 'Flexible',
          midLabel: 'Balanced',
          highLabel: 'Max Value'
        },
        {
          key: 'performance',
          label: 'Processor & RAM',
          icon: <Zap className="w-3.5 h-3.5 text-indigo-400" />,
          colorClass: 'text-indigo-400',
          accentClass: 'accent-indigo-500',
          description: 'Prioritizes Snapdragon/Dimensity chipsets with high AnTuTu score',
          lowLabel: 'Daily Task',
          midLabel: 'Smooth',
          highLabel: 'Flagship Speed'
        },
        {
          key: 'display',
          label: 'Camera & OIS Sensor',
          icon: <Eye className="w-3.5 h-3.5 text-violet-400" />,
          colorClass: 'text-violet-400',
          accentClass: 'accent-violet-500',
          description: 'Favors Sony sensors with Optical Image Stabilization (OIS)',
          lowLabel: 'Basic',
          midLabel: 'Good HDR',
          highLabel: 'Pro Camera'
        },
        {
          key: 'battery',
          label: 'Battery & Fast Charge',
          icon: <Battery className="w-3.5 h-3.5 text-amber-400" />,
          colorClass: 'text-amber-400',
          accentClass: 'accent-amber-500',
          description: 'Prioritizes 5000mAh+ capacity and 67W+ fast charging',
          lowLabel: 'Standard',
          midLabel: 'All Day',
          highLabel: 'Turbo Fast'
        }
      ];
    }

    // Default: Laptop & Computing
    return [
      {
        key: 'performance',
        label: 'Performance (CPU & RAM)',
        icon: <Zap className="w-3.5 h-3.5 text-indigo-400" />,
        colorClass: 'text-indigo-400',
        accentClass: 'accent-indigo-500',
        description: 'Prioritizes faster multicore CPU benchmarks & RAM speed',
        lowLabel: 'Low',
        midLabel: 'Balanced',
        highLabel: 'High Power'
      },
      {
        key: 'price',
        label: 'Price / Budget',
        icon: <Shield className="w-3.5 h-3.5 text-emerald-400" />,
        colorClass: 'text-emerald-400',
        accentClass: 'accent-emerald-500',
        description: 'Favors maximum discount & lowest effective price',
        lowLabel: 'Flexible',
        midLabel: 'Balanced',
        highLabel: 'Max Value'
      },
      {
        key: 'battery',
        label: 'Battery Life',
        icon: <Battery className="w-3.5 h-3.5 text-amber-400" />,
        colorClass: 'text-amber-400',
        accentClass: 'accent-amber-500',
        description: 'Prefers high Wh battery capacity and all-day endurance',
        lowLabel: 'Moderate',
        midLabel: 'Standard',
        highLabel: 'Crucial'
      },
      {
        key: 'weight',
        label: 'Portability / Weight',
        icon: <Scale className="w-3.5 h-3.5 text-cyan-400" />,
        colorClass: 'text-cyan-400',
        accentClass: 'accent-cyan-500',
        description: 'Penalizes heavy devices (> 2.1 kg) for easy carrying',
        lowLabel: 'Any Weight',
        midLabel: 'Standard',
        highLabel: 'Ultra-Light'
      }
    ];
  };

  const sliders = getSliders();

  return (
    <div className="mb-6 bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl transition-all">
      {/* Bar Header */}
      <div className="p-4 flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleOpen}
            className="flex items-center gap-2 text-xs font-bold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 px-3 py-1.5 rounded-xl border border-slate-700/60 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
            <span>{isOpen ? 'Hide Priority Controls' : 'Change My Priority'}</span>
          </button>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Tweak dynamic priority weights to immediately re-score & re-rank products for {category.toUpperCase()}.
          </span>
        </div>

        {/* "What would you buy" direct recommendation button */}
        <button
          onClick={onWhatWouldYouBuy}
          className="flex items-center gap-2 text-xs font-bold text-indigo-200 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 px-3.5 py-1.5 rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>What Would You Buy?</span>
        </button>
      </div>

      {/* Expandable Sliders Body */}
      {isOpen && (
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-slate-950/40">
          {sliders.map((s) => {
            const currentVal = (weights as any)[s.key] ?? 1.0;
            const levelLabel = currentVal > 1.5 ? s.highLabel : currentVal < 0.8 ? s.lowLabel : s.midLabel;

            return (
              <div key={String(s.key)} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    {s.icon}
                    <span>{s.label}</span>
                  </span>
                  <span className={`font-mono font-bold ${s.colorClass}`}>
                    {levelLabel} ({currentVal}x)
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.25"
                  value={currentVal}
                  onChange={(e) => handleSliderChange(s.key, parseFloat(e.target.value))}
                  className={`w-full ${s.accentClass} cursor-pointer`}
                />
                <span className="text-[10px] text-slate-500 block">{s.description}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
