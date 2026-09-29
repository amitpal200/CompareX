'use client';

import React, { useState } from 'react';
import { User, X, Check, Globe, Plane, ShoppingBag, Bell, Shield, Sparkles } from 'lucide-react';
import { UserProfile, CurrencyCode } from '../lib/types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile
}) => {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCurrencyChange = (currency: CurrencyCode) => {
    setFormData(prev => ({ ...prev, currency }));
  };

  const handleToggleStore = (store: string) => {
    setFormData(prev => {
      const exists = prev.preferredStores.includes(store);
      return {
        ...prev,
        preferredStores: exists
          ? prev.preferredStores.filter(s => s !== store)
          : [...prev.preferredStores, store]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const storesList = ["Amazon", "Flipkart", "Croma", "Reliance Digital", "Lenovo Store", "Apple Store", "MakeMyTrip", "Booking.com", "Agoda"];
  const airportsList = [
    "DEL (Delhi - Indira Gandhi Intl)",
    "BOM (Mumbai - Chhatrapati Shivaji Intl)",
    "BLR (Bangalore - Kempegowda Intl)",
    "HYD (Hyderabad - Rajiv Gandhi Intl)",
    "MAA (Chennai Intl)"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center">
            <User className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">CompareX AI Profile</h3>
            <p className="text-xs text-slate-400">Tailor agent search parameters and currency preferences</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          {/* Personal Info */}
          <div className="space-y-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email (for Price Drop Alerts)</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          {/* Currency Switcher */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-400" /> Preferred Currency
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['INR', 'USD', 'EUR'] as CurrencyCode[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleCurrencyChange(c)}
                  className={`py-2 px-3 rounded-xl font-bold border transition-all text-center ${
                    formData.currency === c
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {c === 'INR' ? '₹ INR (Rupees)' : c === 'USD' ? '$ USD (Dollars)' : '€ EUR (Euros)'}
                </button>
              ))}
            </div>
          </div>

          {/* Home Airport */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-indigo-400" /> Default Departure Hub
            </label>
            <select
              value={formData.homeAirport}
              onChange={(e) => setFormData({ ...formData, homeAirport: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
            >
              {airportsList.map((a, idx) => (
                <option key={idx} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Preferred Stores */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-indigo-400" /> Prioritized Merchant Portals
            </label>
            <div className="flex flex-wrap gap-1.5">
              {storesList.map((store) => {
                const isSelected = formData.preferredStores.includes(store);
                return (
                  <button
                    key={store}
                    type="button"
                    onClick={() => handleToggleStore(store)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                      isSelected
                        ? 'bg-indigo-600/30 border border-indigo-500/50 text-indigo-200'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}{store}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notifications Toggles */}
          <div className="pt-3 border-t border-slate-800 space-y-2.5">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.emailAlerts}
                onChange={(e) => setFormData({ ...formData, emailAlerts: e.target.checked })}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-700"
              />
              <span className="text-slate-300">Receive autonomous instant email alert upon price drops</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold shadow-lg shadow-indigo-600/30 active:scale-95"
            >
              {savedSuccess ? 'Preferences Saved!' : 'Save Preferences'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
