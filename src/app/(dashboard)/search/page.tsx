'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Search, SlidersHorizontal, MapPin, Briefcase, 
  GraduationCap, Star, BookmarkPlus, Clock, Zap, ChevronDown
} from 'lucide-react';
import Link from 'next/link';

export default function AdvancedSearchPage() {
  const [activeSort, setActiveSort] = useState('Compatibility');
  
  // Mock Results to demonstrate advanced search functionality
  const results = [
    { name: 'Priya Patel', age: 26, loc: 'London, UK', prof: 'Data Scientist', edu: 'M.Sc. Analytics', match: 96, img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80', premium: false },
    { name: 'Dr. Aisha Rahman', age: 28, loc: 'New York, USA', prof: 'Neurologist', edu: 'M.D.', match: 92, img: 'https://images.unsplash.com/photo-1594824406282-327c8441f71a?w=500&auto=format&fit=crop&q=80', premium: true },
    { name: 'Kavita Menon', age: 25, loc: 'Dubai, UAE', prof: 'Architect', edu: 'B.Arch', match: 89, img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80', premium: false },
  ];

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8">
      
      {/* Top Bar: Search Input & Saved/Recent */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex-1 w-full relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search by Keyword, Profession, or City (AI Enabled)" 
            className="w-full pl-12 pr-4 py-4 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-premium-sm text-sm font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
            <Button size="sm" className="rounded-2xl h-10 px-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700">
              <Zap className="h-4 w-4 mr-1 text-amber-500" /> AI Suggest
            </Button>
            <Button size="sm" className="rounded-2xl h-10 px-6 bg-gradient-to-r from-indigo-600 to-rose-500 text-white font-extrabold shadow-sm hover:opacity-90">
              Search
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button variant="outline" className="rounded-2xl py-6 font-bold bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
            <BookmarkPlus className="h-4 w-4 mr-2" /> Saved Searches
          </Button>
          <Button variant="outline" className="rounded-2xl py-6 font-bold bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm hidden sm:flex">
            <Clock className="h-4 w-4 mr-2" /> Recent
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Sidebar: 30+ Advanced Filters */}
        <aside className="w-full lg:w-80 shrink-0 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/60 dark:border-zinc-800 shadow-premium-md overflow-hidden sticky top-24">
          <div className="p-5 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-950/50">
            <h3 className="font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-indigo-500" /> Filters
            </h3>
            <button className="text-xs font-bold text-rose-500 hover:underline">Reset All</button>
          </div>
          
          <div className="h-[600px] overflow-y-auto p-5 space-y-6 scrollbar-hide">
            {/* Filter Section: Basic */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider">Basic Demographics</h4>
              <div>
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2 block">Age Range</label>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" className="w-full px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border-none outline-none text-sm font-medium" />
                  <span className="text-zinc-400 font-bold">-</span>
                  <input type="number" placeholder="Max" className="w-full px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border-none outline-none text-sm font-medium" />
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2 block">Marital Status</label>
                <select className="w-full px-3 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border-none outline-none text-sm font-medium">
                  <option>Any Status</option>
                  <option>Never Married</option>
                  <option>Divorced</option>
                </select>
              </div>
            </div>

            <div className="h-px bg-zinc-100 dark:bg-zinc-800/80 w-full" />

            {/* Filter Section: Location */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider flex justify-between items-center cursor-pointer">
                Location <ChevronDown className="h-3 w-3" />
              </h4>
              <input type="text" placeholder="Country (e.g. USA, UK)" className="w-full px-3 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border-none outline-none text-sm font-medium mb-2" />
              <input type="text" placeholder="City or State" className="w-full px-3 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border-none outline-none text-sm font-medium" />
            </div>

            <div className="h-px bg-zinc-100 dark:bg-zinc-800/80 w-full" />

            {/* Filter Section: Education & Career */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider flex justify-between items-center cursor-pointer">
                Education & Career <ChevronDown className="h-3 w-3" />
              </h4>
              <select className="w-full px-3 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border-none outline-none text-sm font-medium mb-2">
                <option>Minimum Education</option>
                <option>Bachelors</option>
                <option>Masters</option>
              </select>
              <input type="text" placeholder="Profession / Job Role" className="w-full px-3 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border-none outline-none text-sm font-medium mb-2" />
              <select className="w-full px-3 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border-none outline-none text-sm font-medium">
                <option>Annual Income</option>
                <option>$50k - $100k</option>
                <option>$100k+</option>
              </select>
            </div>

            {/* Additional 20+ hidden filters abstracted for UI clarity */}
            <div className="h-px bg-zinc-100 dark:bg-zinc-800/80 w-full" />
            <button className="w-full py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition">
              Show All 35 Filters
            </button>
          </div>
        </aside>

        {/* Right Content: Results Grid */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">1,492 Profiles Found</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-500">Sort by:</span>
              <select value={activeSort} onChange={(e) => setActiveSort(e.target.value)} className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-bold outline-none shadow-sm cursor-pointer">
                <option>AI Compatibility</option>
                <option>Newest Members</option>
                <option>Recently Active</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {results.map((profile, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-zinc-900 rounded-3xl shadow-premium-md border border-zinc-200/60 dark:border-zinc-800 overflow-hidden group hover:shadow-premium-xl transition duration-500 flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={profile.img} alt={profile.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1.5 rounded-full text-[10px] font-extrabold text-white flex items-center gap-1.5 shadow-lg">
                    <Star className="h-3 w-3 fill-rose-500 text-rose-500" /> {profile.match}% Match
                  </div>
                  {profile.premium && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-amber-600 px-3 py-1.5 rounded-full text-[10px] font-extrabold text-amber-950 shadow-lg tracking-wider">
                      ELITE
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 flex flex-col justify-end p-5 text-white">
                    <h3 className="text-xl font-extrabold tracking-tight">{profile.name}, {profile.age}</h3>
                    <p className="text-xs font-semibold text-zinc-300 mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> {profile.loc}</p>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg">
                      <Briefcase className="h-3 w-3 text-indigo-500" /> {profile.prof}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg">
                      <GraduationCap className="h-3 w-3 text-indigo-500" /> {profile.edu}
                    </span>
                  </div>
                  <Button className="w-full py-5 rounded-2xl font-bold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition shadow-sm">
                    View Full Profile
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Infinite Scroll Loader Simulation */}
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <div className="h-8 w-8 border-4 border-zinc-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-xs font-bold text-zinc-400">Loading more profiles...</p>
          </div>

        </div>
      </div>
    </div>
  );
}
