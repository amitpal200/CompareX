'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Eye, EyeOff, Check, ArrowRight, BookmarkCheck, BellRing, Brain, RefreshCw } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row">
      
      {/* Left Column: Create Account Form (Matching Reference Screenshot) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-14 max-w-xl mx-auto lg:max-w-none">
        
        {/* Brand Logo Header */}
        <div>
          <Link href="/" className="inline-flex items-center gap-3 group select-none mb-8">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-[1px] shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg tracking-tight text-white">
                  COMPAREX
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 rounded bg-indigo-500/25 border border-indigo-500/40 text-indigo-300">
                  AI
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-400 -mt-0.5 tracking-wide">
                Shop Smarter. Everywhere.
              </p>
            </div>
          </Link>

          {/* Form Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              Create Your Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-normal">
              Join CompareX and start shopping smarter.
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 mb-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-indigo-500 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-indigo-500 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-indigo-500 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Create Account CTA Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-5">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-950 px-3 text-[11px] font-bold uppercase text-slate-400 absolute">
              OR
            </span>
          </div>

          {/* Social OAuth Buttons */}
          <div className="space-y-2 mb-5">
            {/* Google */}
            <button
              type="button"
              onClick={() => router.push('/')}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Apple */}
            <button
              type="button"
              onClick={() => router.push('/')}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.88c.64-.78 1.08-1.86.96-2.95-1 .04-2.13.67-2.79 1.45-.58.68-1.1 1.77-.96 2.84 1.11.09 2.16-.57 2.79-1.34z" />
              </svg>
              <span>Continue with Apple</span>
            </button>

            {/* Microsoft */}
            <button
              type="button"
              onClick={() => router.push('/')}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#F25022" d="M1 1h10v10H1z" />
                <path fill="#7FBA00" d="M13 1h10v10H13z" />
                <path fill="#00A4EF" d="M1 13h10v10H1z" />
                <path fill="#FFB900" d="M13 13h10v10H13z" />
              </svg>
              <span>Continue with Microsoft</span>
            </button>
          </div>

          {/* Already have account link */}
          <div className="text-center">
            <span className="text-xs text-slate-400">Already have an account? </span>
            <Link href="/login" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 hover:underline">
              Sign In
            </Link>
          </div>
        </div>

        {/* Footer Terms */}
        <div className="pt-6 text-center lg:text-left">
          <p className="text-[11px] text-slate-400">
            By signing up, you agree to our Terms of Service & Privacy Policy.
          </p>
        </div>

      </div>

      {/* Right Column: "One Account. Endless Smarter Shopping." Panel */}
      <div className="w-full lg:w-1/2 relative min-h-[480px] lg:min-h-screen bg-slate-900 border-l border-slate-800 flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Back link */}
        <div className="relative z-10 flex justify-end">
          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-slate-700/80 text-xs font-semibold text-slate-200 backdrop-blur-md transition"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Main Content */}
        <div className="relative z-10 my-auto py-8 max-w-md">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-[1.15] mb-6">
            One Account.<br />
            Endless Smarter<br />
            Shopping.
          </h2>

          {/* 4 Benefit Items matching screenshot */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3.5 text-sm text-slate-200">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <BookmarkCheck className="w-4 h-4" />
              </div>
              <span className="font-semibold">Save your searches</span>
            </div>

            <div className="flex items-center gap-3.5 text-sm text-slate-200">
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                <BellRing className="w-4 h-4" />
              </div>
              <span className="font-semibold">Track prices & get alerts</span>
            </div>

            <div className="flex items-center gap-3.5 text-sm text-slate-200">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0">
                <Brain className="w-4 h-4" />
              </div>
              <span className="font-semibold">Get personalized recommendations</span>
            </div>

            <div className="flex items-center gap-3.5 text-sm text-slate-200">
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                <RefreshCw className="w-4 h-4" />
              </div>
              <span className="font-semibold">Sync across all your devices</span>
            </div>
          </div>

          {/* Handwritten Signature Script */}
          <div className="pt-2">
            <span className="font-serif italic text-2xl text-indigo-300 drop-shadow-md">
              Shop Smart. Live Better.
            </span>
          </div>
        </div>

        {/* Bottom Tag */}
        <div className="relative z-10 text-xs text-slate-400">
          CompareX AI Inc. © 2026
        </div>

      </div>

    </div>
  );
}
