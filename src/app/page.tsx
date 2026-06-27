'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Sparkles, Heart, ShieldCheck, Star, Users, ArrowRight, 
  Lock, Zap 
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-rose-500 selection:text-white">
      {/* Premium Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200/60 dark:border-zinc-800 transition">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-indigo-600 to-rose-500 bg-clip-text text-transparent flex items-center gap-2">
            Bondhon <span className="text-xs px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 font-extrabold">PLATFORM</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="px-5 py-5 rounded-2xl font-bold text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="px-6 py-5 rounded-2xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-rose-500 hover:from-indigo-700 hover:to-rose-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition duration-300">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:py-32 overflow-hidden px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500/10 to-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 px-4 py-2 rounded-full text-xs font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase shadow-sm"
          >
            <Sparkles className="h-4 w-4" /> The Intelligent Matrimonial Network
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none text-zinc-900 dark:text-zinc-100"
          >
            Where Real Compatibility Meets <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 bg-clip-text text-transparent">Lifelong Commitment.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed"
          >
            Bondhon combines bank-grade background verifications with smart AI compatibility scoring to curate matches based on genuine shared values, lifestyles, and career aspirations.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/register" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto px-10 py-7 rounded-2xl font-extrabold text-base bg-gradient-to-r from-indigo-600 to-rose-500 hover:from-indigo-700 hover:to-rose-600 text-white shadow-2xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition duration-300 flex items-center justify-center gap-2">
                Create Your Profile <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto px-10 py-7 rounded-2xl font-extrabold text-base border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition shadow-sm">
                Explore Discovery Feed
              </Button>
            </Link>
          </motion.div>

          <div className="pt-12 flex flex-wrap items-center justify-center gap-8 text-xs font-bold text-zinc-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-500" /> Government ID Verified</span>
            <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-indigo-500" /> Complete Photo Privacy</span>
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-rose-500" /> Smart Weighted Matching</span>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-24 bg-white dark:bg-zinc-900 border-y border-zinc-200/60 dark:border-zinc-800 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">Designed for Genuine Seekers</h2>
            <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">Experience an elegant matrimonial journey built with elite security, intuitive UX, and zero superficial swiping.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800 space-y-6 hover:shadow-xl transition duration-300">
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">High-Quality Profiles</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">Detailed education, family backgrounds, and lifestyle perspectives ensure you fully understand your match before meeting.</p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800 space-y-6 hover:shadow-xl transition duration-300">
              <div className="h-12 w-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-400 font-bold">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">AI Compatibility Score</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">Our multi-faceted algorithm matches you based on deep career priorities, religious values, and long-term marital goals.</p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800 space-y-6 hover:shadow-xl transition duration-300">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">Flawless Privacy Controls</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">Blur your media for unverified accounts, restrict mobile number visibility, and communicate securely through encrypted chat.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Success Stories */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">Loved by Thousands of Couples</h2>
          <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">Real stories from real professionals who found their forever partner on Bondhon.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="p-8 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200/60 dark:border-zinc-800 space-y-6 flex flex-col justify-between">
            <div className="flex items-center gap-1 text-amber-500">
              {[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-5 w-5 fill-amber-500" />)}
            </div>
            <p className="text-base text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">&ldquo;Bondhon completely changed my view on matrimonial platforms. The career filters allowed me to connect with someone who understands my work hours, and the privacy controls made me feel incredibly secure.&rdquo;</p>
            <div className="flex items-center gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
              <div className="h-12 w-12 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80" alt="Reviewer" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">Sunita &amp; Rahul</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Married December 2025 • Mumbai</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200/60 dark:border-zinc-800 space-y-6 flex flex-col justify-between">
            <div className="flex items-center gap-1 text-amber-500">
              {[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-5 w-5 fill-amber-500" />)}
            </div>
            <p className="text-base text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">&ldquo;The UI is stunning and feels like an elite app rather than a legacy matrimonial site. Within two weeks of subscribing to Premium, I met Priya. We clicked instantly over our shared love for architecture.&rdquo;</p>
            <div className="flex items-center gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
              <div className="h-12 w-12 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80" alt="Reviewer" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">Vikram &amp; Priya</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Engaged February 2026 • Bengaluru</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-900 via-indigo-800 to-rose-900 text-white relative overflow-hidden px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">Your Forever Starts Here.</h2>
          <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Join the most trusted matrimonial platform today. Take the first step towards a verified, highly compatible relationship.</p>
          <div>
            <Link href="/register">
              <Button size="lg" className="px-10 py-7 rounded-2xl font-extrabold text-base bg-white text-indigo-950 hover:bg-zinc-100 transition shadow-2xl">
                Begin Your Journey Now <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-200/60 dark:border-zinc-800 py-12 px-6 text-sm text-zinc-500 dark:text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-extrabold text-zinc-900 dark:text-zinc-100 text-lg">
            Bondhon <span className="text-xs text-zinc-400 font-normal">© 2026 All Rights Reserved.</span>
          </div>
          <div className="flex flex-wrap items-center gap-8 font-semibold text-xs text-zinc-600 dark:text-zinc-400">
            <Link href="/dashboard" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition">Discovery</Link>
            <Link href="/subscription" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition">Pricing</Link>
            <Link href="/admin" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition">Admin Portal</Link>
            <Link href="/login" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition">Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
