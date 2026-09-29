'use client';

import React from 'react';
import { ShieldCheck, AlertTriangle, Database } from 'lucide-react';

interface ProductTruthBadgeProps {
  status?: string;
  confidenceScore?: number;
  isDemo?: boolean;
  className?: string;
}

export const ProductTruthBadge: React.FC<ProductTruthBadgeProps> = ({
  status = 'SOURCE_VERIFIED',
  confidenceScore = 96,
  isDemo = false,
  className = ''
}) => {
  if (isDemo || status === 'DEMO_DATA') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700 shadow-sm ${className}`}>
        <Database className="w-3 h-3 text-cyan-400" />
        <span>SIMULATED PROVIDER DATA</span>
      </span>
    );
  }

  if (status === 'SOURCE_VERIFIED') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-sm ${className}`}>
        <ShieldCheck className="w-3 h-3 text-emerald-400" />
        <span>SOURCE VERIFIED {confidenceScore ? `(${confidenceScore}%)` : ''}</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-sm ${className}`}>
      <AlertTriangle className="w-3 h-3 text-amber-400" />
      <span>PARTIALLY VERIFIED ({confidenceScore}%)</span>
    </span>
  );
};
