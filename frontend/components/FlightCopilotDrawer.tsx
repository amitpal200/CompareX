'use client';

import React, { useState } from 'react';
import { Bot, Sparkles, X, Send, Loader2, MessageSquare, CheckCircle2 } from 'lucide-react';
import { FlightOffer } from '@/lib/types';

interface FlightCopilotDrawerProps {
  flights: FlightOffer[];
  currencySymbol?: string;
  currencyRate?: number;
}

interface Message {
  sender: 'user' | 'copilot';
  text: string;
}

export default function FlightCopilotDrawer({
  flights,
  currencySymbol = '₹',
  currencyRate = 1,
}: FlightCopilotDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'copilot',
      text: 'Hello! I am CompareX Flight Copilot. Ask me anything about current live fares, baggage policies, best arrival times, or refundability.',
    },
  ]);

  const quickPrompts = [
    'Which flight is cheapest?',
    'Show me the fastest non-stop option',
    'Which flights offer free check-in baggage?',
    'Which flight is best overall?',
  ];

  const handleSend = async (userText: string) => {
    if (!userText.trim() || loading) return;

    const newMessages: Message[] = [...messages, { sender: 'user', text: userText }];
    setMessages(newMessages);
    setQuery('');
    setLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/flights/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userText,
          flights: flights.slice(0, 15),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, { sender: 'copilot', text: data.answer }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'copilot',
            text: 'I could not analyze the itinerary right now. Please try asking again.',
          },
        ]);
      }
    } catch (err) {
      console.error('Copilot error:', err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'copilot',
          text: 'Network connection issue with CompareX AI backend. Please verify your connection.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger floating button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-full shadow-2xl shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-purple-400/30"
        >
          <Sparkles className="w-4 h-4 text-purple-200 animate-pulse" />
          <span>Flight Copilot AI</span>
        </button>
      )}

      {/* Floating Drawer Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:max-w-md bg-[#0B1224]/95 border border-purple-500/50 rounded-2xl shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200 max-h-[85vh]">
          {/* Header */}
          <div className="p-4 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                  <span>Flight Copilot AI</span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.2 rounded-full border border-purple-500/30">
                    Live
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Synthesizing {flights.length} real-time flight offers
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="p-4 overflow-y-auto space-y-3.5 flex-1 min-h-[220px] max-h-[380px] text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'copilot' && (
                  <div className="w-6 h-6 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-purple-600 text-white rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-line'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-purple-300 p-2 bg-purple-950/30 rounded-xl border border-purple-900/40 w-fit">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Analyzing route schedules & fare tiers...</span>
              </div>
            )}
          </div>

          {/* Quick prompt buttons */}
          <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-900/40 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(qp)}
                className="text-[11px] bg-slate-800/80 hover:bg-purple-900/40 hover:text-purple-200 text-slate-300 border border-slate-700/80 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors flex-shrink-0"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(query);
            }}
            className="p-3 border-t border-slate-800/80 bg-slate-900/60 flex items-center gap-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask Copilot about baggage, timing, best airline..."
              className="flex-1 bg-[#050816] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={!query.trim() || loading}
              className="p-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 text-white rounded-xl transition-colors shadow-md disabled:cursor-not-allowed"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
