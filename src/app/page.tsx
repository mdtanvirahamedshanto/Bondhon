'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/shared/Navbar';
import { 
  Sparkles, Heart, ShieldCheck, Star, Users, ArrowRight, 
  Lock, Zap, CheckCircle2, Search, MapPin, Briefcase, ChevronDown,
  Globe, Clock, Award
} from 'lucide-react';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 rounded-full border-4 border-zinc-200 border-t-indigo-600 animate-spin" />
        <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse" />
      </div>
    );
  }

  const featuredProfiles = [
    { name: 'Dr. Aisha Rahman', age: 28, prof: 'Neurologist', loc: 'New York, USA', match: '98%', img: 'https://images.unsplash.com/photo-1594824406282-327c8441f71a?w=500&auto=format&fit=crop&q=80', premium: true },
    { name: 'Rahul Verma', age: 31, prof: 'Software Architect', loc: 'San Francisco, USA', match: '95%', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80', premium: true },
    { name: 'Priya Patel', age: 26, prof: 'Data Scientist', loc: 'London, UK', match: '92%', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80', premium: false },
    { name: 'Tariq Khan', age: 33, prof: 'Investment Banker', loc: 'Dubai, UAE', match: '90%', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80', premium: true },
  ];

  const faqs = [
    { q: "How does the AI Compatibility Match work?", a: "Our proprietary algorithm evaluates over 50 data points, including career aspirations, lifestyle choices, and family values, to curate highly compatible matches that transcend superficial swiping." },
    { q: "Is my personal information secure?", a: "Absolutely. We enforce bank-grade security protocols, including AES-256 encryption. You have complete control over who views your photos, contact details, and full profile." },
    { q: "How do you verify profiles?", a: "Every profile undergoes strict moderation. Government ID verification is required to earn the 'Verified' badge, ensuring a community built entirely on trust and authenticity." },
    { q: "Can I cancel my premium subscription?", a: "Yes, you can manage, pause, or cancel your subscription at any time from your Account Settings. No hidden fees or lock-in periods." }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* Hero Section with Animated Background */}
      <section className="relative pt-12 pb-32 overflow-hidden px-4 sm:px-6">
        {/* Abstract Animated Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-rose-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 px-4 py-2 rounded-full text-xs font-extrabold text-zinc-700 dark:text-zinc-300 tracking-wide uppercase shadow-premium-sm"
          >
            <Sparkles className="h-4 w-4 text-indigo-500" /> The Intelligent Matrimonial Network
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] text-zinc-900 dark:text-zinc-100 max-w-5xl"
          >
            Where Real Compatibility Meets <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 bg-clip-text text-transparent">Lifelong Commitment.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-3xl leading-relaxed"
          >
            Bondhon combines bank-grade background verifications with smart AI compatibility scoring to curate matches based on genuine shared values, lifestyles, and career aspirations.
          </motion.p>

          {/* Advanced Search Widget */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-4xl bg-white dark:bg-zinc-900 p-3 md:p-4 rounded-3xl shadow-premium-xl border border-zinc-200/80 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-4 gap-3 mt-8"
          >
            <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3.5 rounded-2xl border border-transparent focus-within:border-indigo-500 focus-within:bg-white dark:focus-within:bg-zinc-950 transition">
              <Users className="h-5 w-5 text-zinc-400" />
              <select className="w-full bg-transparent outline-none text-sm font-bold text-zinc-700 dark:text-zinc-300 appearance-none">
                <option value="">I'm looking for a...</option>
                <option value="bride">Bride</option>
                <option value="groom">Groom</option>
              </select>
            </div>
            
            <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3.5 rounded-2xl border border-transparent focus-within:border-indigo-500 focus-within:bg-white dark:focus-within:bg-zinc-950 transition">
              <MapPin className="h-5 w-5 text-zinc-400" />
              <input type="text" placeholder="Location or City" className="w-full bg-transparent outline-none text-sm font-bold text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400" />
            </div>

            <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3.5 rounded-2xl border border-transparent focus-within:border-indigo-500 focus-within:bg-white dark:focus-within:bg-zinc-950 transition">
              <Briefcase className="h-5 w-5 text-zinc-400" />
              <input type="text" placeholder="Profession" className="w-full bg-transparent outline-none text-sm font-bold text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400" />
            </div>

            <Button className="w-full py-6 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-indigo-600 to-rose-500 hover:from-indigo-700 hover:to-rose-600 text-white shadow-premium-lg transition duration-300 flex items-center justify-center gap-2 h-full">
              <Search className="h-5 w-5" /> Search Matches
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
            className="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs font-bold text-zinc-400 uppercase tracking-wider"
          >
            <span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-emerald-500" /> Govt. ID Verified</span>
            <span className="flex items-center gap-2"><Lock className="h-5 w-5 text-indigo-500" /> 100% Privacy Control</span>
            <span className="flex items-center gap-2"><Zap className="h-5 w-5 text-rose-500" /> AI Compatibility</span>
          </motion.div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-24 bg-white dark:bg-zinc-900 border-y border-zinc-200/60 dark:border-zinc-800 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">Designed for Genuine Seekers</h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">Experience an elegant matrimonial journey built with elite security, intuitive UX, and zero superficial swiping.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, color: 'indigo', title: 'High-Quality Profiles', desc: 'Detailed education, family backgrounds, and lifestyle perspectives ensure you fully understand your match before meeting.' },
              { icon: Heart, color: 'rose', title: 'AI Compatibility Score', desc: 'Our multi-faceted algorithm matches you based on deep career priorities, religious values, and long-term marital goals.' },
              { icon: Lock, color: 'emerald', title: 'Flawless Privacy Controls', desc: 'Blur your media for unverified accounts, restrict mobile number visibility, and communicate securely through encrypted chat.' }
            ].map((f, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800 space-y-6 hover:shadow-premium-xl transition duration-300 hover:-translate-y-1 cursor-default">
                <div className={`h-14 w-14 rounded-2xl bg-${f.color}-50 dark:bg-${f.color}-950/60 border border-${f.color}-200 dark:border-${f.color}-800 flex items-center justify-center text-${f.color}-600 dark:text-${f.color}-400 group-hover:scale-110 transition duration-500`}>
                  <f.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">{f.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Profiles */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">Featured Elite Members</h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">Connect with highly educated, verified professionals actively seeking a serious commitment.</p>
          </div>
          <Link href="/register">
            <Button variant="outline" className="rounded-2xl font-extrabold">View All Matches <ArrowRight className="h-4 w-4 ml-2" /></Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProfiles.map((p, i) => (
            <div key={i} className="group relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-premium-md hover:shadow-premium-xl transition duration-500 hover:-translate-y-1">
              <div className="aspect-[4/5] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[10px] font-extrabold text-white flex items-center gap-1.5 shadow-sm">
                    <Heart className="h-3 w-3 fill-rose-500 text-rose-500" /> {p.match} Match
                  </div>
                  {p.premium && (
                    <div className="px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full text-[10px] font-extrabold text-amber-950 flex items-center gap-1.5 shadow-sm">
                      <Sparkles className="h-3 w-3" /> ELITE
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 w-full p-5 z-20">
                  <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                    {p.name}, {p.age} <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  </h3>
                  <div className="flex flex-col gap-1 mt-2 text-xs font-semibold text-zinc-300">
                    <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> {p.prof}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {p.loc}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories & Testimonials */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-200/60 dark:border-zinc-800 px-6 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">Loved by Thousands of Couples</h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">Real stories from real professionals who found their forever partner on Bondhon.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { names: 'Sunita & Rahul', date: 'Married December 2025 • Mumbai', quote: 'Bondhon completely changed my view on matrimonial platforms. The career filters allowed me to connect with someone who understands my work hours, and the privacy controls made me feel incredibly secure.', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80' },
              { names: 'Vikram & Priya', date: 'Engaged February 2026 • Bengaluru', quote: 'The UI is stunning and feels like an elite app rather than a legacy site. Within two weeks of subscribing to Premium, I met Priya. We clicked instantly over our shared love for architecture.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80' }
            ].map((t, i) => (
              <div key={i} className="p-8 bg-white dark:bg-zinc-900 rounded-3xl shadow-premium-lg border border-zinc-200/60 dark:border-zinc-800 space-y-6 flex flex-col justify-between hover:shadow-premium-xl transition">
                <div className="flex items-center gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-5 w-5 fill-amber-500" />)}
                </div>
                <p className="text-base text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                  <div className="h-12 w-12 rounded-full overflow-hidden shrink-0 border-2 border-indigo-100 dark:border-indigo-900">
                    <img src={t.img} alt="Reviewer" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">{t.names}</h4>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">{t.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Plans Overview */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">Simple, Transparent Pricing</h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">Unlock premium features to accelerate your journey to finding the perfect match.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Basic Plan */}
          <div className="p-8 bg-white dark:bg-zinc-900 rounded-3xl shadow-premium-md border border-zinc-200/80 dark:border-zinc-800 flex flex-col">
            <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">Basic Member</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">Free</span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Perfect to explore the community.</p>
            
            <ul className="mt-8 space-y-4 flex-1">
              {['Create detailed profile', 'Upload up to 3 photos', 'Basic search filters', 'Receive interest requests', 'Customer support'].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className="h-5 w-5 text-zinc-300 dark:text-zinc-700 shrink-0" /> {feat}
                </li>
              ))}
            </ul>
            <Link href="/register" className="mt-8">
              <Button variant="outline" className="w-full py-6 rounded-2xl font-extrabold text-sm border-zinc-300 dark:border-zinc-700">Join for Free</Button>
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="p-8 bg-gradient-to-b from-indigo-950 to-zinc-900 rounded-3xl shadow-premium-xl border border-indigo-500/30 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-rose-500 animate-shimmer" />
            <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Most Popular
            </div>
            
            <h3 className="text-xl font-extrabold text-white">Elite Premium</h3>
            <div className="mt-4 flex items-baseline gap-1 text-white">
              <span className="text-xl font-bold opacity-80">$</span>
              <span className="text-4xl font-extrabold">29</span>
              <span className="text-sm font-medium opacity-70">/month</span>
            </div>
            <p className="text-sm text-indigo-200 mt-2">Maximum visibility and instant connections.</p>
            
            <ul className="mt-8 space-y-4 flex-1">
              {['Everything in Basic', 'View unblurred photos instantly', 'Direct encrypted messaging', 'Advanced AI Compatibility filters', 'Priority profile placement', 'Read receipts for messages'].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-indigo-100">
                  <CheckCircle2 className="h-5 w-5 text-rose-500 shrink-0" /> {feat}
                </li>
              ))}
            </ul>
            <Link href="/register" className="mt-8">
              <Button className="w-full py-6 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 text-white shadow-premium-glow transition border-none">
                Get Elite Premium
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white dark:bg-zinc-900 border-t border-zinc-200/60 dark:border-zinc-800 px-6">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden bg-zinc-50 dark:bg-zinc-800/30 transition-all duration-300">
                <button 
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-extrabold text-zinc-900 dark:text-zinc-100 outline-none"
                >
                  {faq.q}
                  <ChevronDown className={`h-5 w-5 text-zinc-400 transition-transform duration-300 ${faqOpen === i ? 'rotate-180 text-indigo-500' : ''}`} />
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="px-6 pb-6 text-sm font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-900 via-indigo-800 to-rose-900 text-white relative overflow-hidden px-6">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">Your Forever Starts Here.</h2>
          <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Join the most trusted matrimonial platform today. Take the first step towards a verified, highly compatible relationship.</p>
          <div>
            <Link href="/register">
              <Button size="lg" className="px-10 py-7 rounded-2xl font-extrabold text-base bg-white text-indigo-950 hover:bg-zinc-100 transition shadow-2xl hover:scale-105 duration-300">
                Create Your Profile Now <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Expanded Footer */}
      <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200/80 dark:border-zinc-800 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-indigo-600 to-rose-500 bg-clip-text text-transparent flex items-center gap-2">
              Bondhon <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200 dark:border-rose-800 font-extrabold">ELITE</span>
            </Link>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
              The premier matrimonial platform for verified professionals worldwide. Built with trust, security, and AI compatibility.
            </p>
          </div>
          
          <div>
            <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <li><Link href="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Discovery Feed</Link></li>
              <li><Link href="/matches" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Mutual Matches</Link></li>
              <li><Link href="/subscription" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Premium Plans</Link></li>
              <li><Link href="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Sign In</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4">Legal & Trust</h4>
            <ul className="space-y-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Trust & Safety Guidelines</Link></li>
              <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Verification Process</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <li className="flex items-center gap-2"><Globe className="h-4 w-4" /> support@bondhon.com</li>
              <li className="flex items-center gap-2"><Clock className="h-4 w-4" /> 24/7 Global Support</li>
              <li className="flex items-center gap-2"><Award className="h-4 w-4" /> ISO 27001 Certified</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-200/80 dark:border-zinc-800 text-xs font-semibold text-zinc-400">
          <p>© {new Date().getFullYear()} Bondhon Matrimony. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-emerald-500" /> Secure Encryption</span>
            <span>Designed with ♥️ in Dhaka</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
