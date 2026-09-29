'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, X, ChevronRight, Tag, ArrowRight } from 'lucide-react';
import { Product } from '../lib/types';

interface RefinementChatProps {
  isOpen: boolean;
  onClose: () => void;
  detectedType: 'shopping' | 'travel' | 'hotel';
  targetProduct?: Product | null;
  onApplyRefinement: (instruction: string) => void;
}

export const RefinementChat: React.FC<RefinementChatProps> = ({
  isOpen,
  onClose,
  detectedType,
  targetProduct,
  onApplyRefinement
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'agent' | 'user'; text: string }>>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    if (targetProduct) {
      setMessages([
        {
          sender: 'agent',
          text: `Namaste! I am CompareX AI Copilot. You are viewing **${targetProduct.title.split('(')[0].trim()}** by **${targetProduct.brand}** (Best Price: ₹${targetProduct.best_price.toLocaleString('en-IN')}). How would you like me to refine or compare?`
        }
      ]);
    } else {
      setMessages([
        {
          sender: 'agent',
          text: detectedType === 'shopping'
            ? "Hello! I am your Shopping Orchestrator. Ask me to find any brand (Nike, Puma, Campus, Sparx, Adidas, etc.), tighten price constraints ('under ₹2,500'), or find cheaper alternatives."
            : detectedType === 'hotel'
            ? "Hello! I am your Hotel Master Agent. Ask me to refine constraints, e.g. 'Breakfast must be included', 'Hotels with swimming pool', or 'Filter under ₹3,000'."
            : "Hello! I am your Travel Specialist. Ask me to refine by 'Only direct flights', 'Morning departures', or 'Include minimum 25kg baggage'."
        }
      ]);
    }
  }, [isOpen, targetProduct, detectedType]);

  if (!isOpen) return null;

  // Dynamic quick suggestions based on product and context
  let quickRefinements: string[] = [];
  if (targetProduct) {
    const pPrice = targetProduct.best_price;
    const cheaperPrice = Math.max(999, Math.round((pPrice * 0.8) / 100) * 100);
    quickRefinements = [
      `Show cheaper alternatives under ₹${cheaperPrice.toLocaleString('en-IN')}`,
      `Show more options from ${targetProduct.brand}`,
      `Compare with Nike and Puma models`,
      `Show lightweight road running models under ₹3,000`
    ];
  } else if (detectedType === 'shopping') {
    quickRefinements = [
      "Show all Nike shoes options",
      "Show all Puma shoes options",
      "Filter shoes strictly under ₹2,500",
      "Show high-durability Campus & Sparx shoes",
      "Show premium marathon shoes"
    ];
  } else if (detectedType === 'hotel') {
    quickRefinements = [
      "Breakfast must be included",
      "Hotels with Swimming Pool",
      "Free cancellation policy only",
      "Budget under ₹3,000 per night"
    ];
  } else {
    quickRefinements = [
      "Direct Non-Stop Only",
      "Departure between 6 PM & 8 PM",
      "Include 25kg check-in baggage"
    ];
  }

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInput('');

    setTimeout(() => {
      let agentResponse = `Understood! Applying refinement: "${text}". Comparing verified multi-store offers and re-ranking matching products.`;
      
      const lower = text.toLowerCase();
      if (lower.includes('nike')) {
        agentResponse = `Filtering directly to verified Nike models across all stores with price comparison and score analysis.`;
      } else if (lower.includes('puma')) {
        agentResponse = `Filtered to official Puma running models, highlighting NITRO cushioning and PUMAGRIP traction.`;
      } else if (lower.includes('campus') || lower.includes('sparx') || lower.includes('asian')) {
        agentResponse = `Filtered to top value high-durability Indian road runners with verified offers under ₹1,800.`;
      } else if (lower.includes('under') || lower.includes('below') || lower.includes('cheaper')) {
        agentResponse = `Budget ceiling updated. Displaying only items meeting your price constraint with guaranteed stock.`;
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'agent',
          text: agentResponse
        }
      ]);
      onApplyRefinement(text);
    }, 450);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-slate-950/95 border-l border-slate-800 backdrop-blur-xl shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">CompareX AI Copilot</h4>
            <span className="text-[11px] text-emerald-400 font-medium">● Autonomous Shopping Assistant</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Target Product Badge (if opened from product card) */}
      {targetProduct && (
        <div className="p-3 bg-indigo-950/40 border-b border-indigo-500/20 flex items-center gap-3">
          <img
            src={targetProduct.image}
            alt={targetProduct.title}
            className="w-12 h-12 rounded-lg object-cover border border-indigo-500/30 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block">Context Product</span>
            <p className="text-xs font-semibold text-white truncate">{targetProduct.title}</p>
            <p className="text-[11px] text-emerald-400 font-bold">₹{targetProduct.best_price.toLocaleString('en-IN')}</p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl p-3 text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/20 font-medium'
                  : 'bg-slate-900 border border-slate-800 text-slate-200'
              }`}
            >
              {m.text}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 px-1">
              {m.sender === 'user' ? 'You' : 'CompareX AI'}
            </span>
          </div>
        ))}
      </div>

      {/* Quick Prompts */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/40">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Suggested Actions
        </span>
        <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto">
          {quickRefinements.map((qr, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qr)}
              className="text-left px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-850 border border-slate-800/80 text-[11px] text-slate-300 hover:text-indigo-300 flex items-center justify-between transition-colors group cursor-pointer"
            >
              <span className="truncate">{qr}</span>
              <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 shrink-0 ml-1" />
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-slate-800 bg-slate-950">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type any brand or budget (e.g. 'Puma shoes under 3000')..."
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
