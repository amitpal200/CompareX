'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'alert';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-5 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t, idx) => (
        <div
          key={`${t.id}-${idx}`}
          className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl backdrop-blur-xl text-xs text-white animate-in slide-in-from-top-3 fade-in duration-300 max-w-sm"
        >
          {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
          {t.type === 'alert' && <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />}
          {t.type === 'info' && <Info className="w-4 h-4 text-indigo-400 flex-shrink-0" />}
          <span className="flex-1 font-medium">{t.text}</span>
          <button
            onClick={() => onDismiss(t.id)}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
