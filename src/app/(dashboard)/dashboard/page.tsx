'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDiscoveryFeed, expressInterest } from '@/core/actions/match.actions';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Sparkles, Heart, X, MapPin, Briefcase, GraduationCap, Star } from 'lucide-react';

export default function DashboardPage() {
  const queryClient = useQueryClient();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<{ minAge?: number; maxAge?: number; city?: string; religion?: string }>({});

  const { data: feedData, isLoading } = useQuery({
    queryKey: ['discovery', filters],
    queryFn: () => getDiscoveryFeed(filters),
  });

  const interestMutation = useMutation({
    mutationFn: ({ profileId, action }: { profileId: string; action: 'like' | 'pass' }) => expressInterest(profileId, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discovery'] });
    },
  });

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-10">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-900 via-indigo-800 to-rose-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-white/20">
            <Sparkles className="h-3.5 w-3.5 text-rose-300" /> AI Compatibility Engine
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Discover Your Perfect Match</h1>
          <p className="text-indigo-100 text-sm md:text-base mt-2 max-w-xl">Our smart matching algorithm pairs you with highly compatible profiles based on your career, background, and lifestyle values.</p>
        </div>
        <div className="z-10 shrink-0">
          <Button onClick={() => setShowFilters(!showFilters)} variant="secondary" className="px-6 py-6 rounded-2xl font-bold bg-white text-indigo-950 hover:bg-zinc-100 transition shadow-xl flex items-center gap-2">
            <Filter className="h-4 w-4" /> {showFilters ? 'Hide Filters' : 'Advanced Search'}
          </Button>
        </div>
      </div>

      {/* Advanced Filters Bar */}
      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200/60 dark:border-zinc-800 p-8 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Min Age</label>
                <input type="number" placeholder="21" onChange={(e) => setFilters({ ...filters, minAge: e.target.value ? parseInt(e.target.value) : undefined })} className="w-full px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Max Age</label>
                <input type="number" placeholder="40" onChange={(e) => setFilters({ ...filters, maxAge: e.target.value ? parseInt(e.target.value) : undefined })} className="w-full px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">City</label>
                <input type="text" placeholder="Mumbai, New York..." onChange={(e) => setFilters({ ...filters, city: e.target.value || undefined })} className="w-full px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Religion</label>
                <input type="text" placeholder="Hindu, Muslim, etc." onChange={(e) => setFilters({ ...filters, religion: e.target.value || undefined })} className="w-full px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Discovery Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-white dark:bg-zinc-900 rounded-3xl h-96 animate-pulse border border-zinc-200 dark:border-zinc-800"></div>
          ))}
        </div>
      ) : feedData?.data?.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/60 dark:border-zinc-800 p-16 text-center shadow-xl">
          <Sparkles className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">No profiles match your filters</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Try broadening your search criteria or resetting filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {feedData?.data?.map((profile: any) => (
            <motion.div 
              key={profile.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200/60 dark:border-zinc-800 overflow-hidden group flex flex-col hover:shadow-2xl transition duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white border border-white/30 px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 shadow-lg">
                  <Star className="h-3.5 w-3.5 fill-rose-500 text-rose-500" /> {profile.compatibilityScore}% Compatibility
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-extrabold tracking-tight">{profile.name}, {profile.age}</h3>
                  <p className="text-sm text-zinc-300 font-medium mt-1">{profile.height} cm • {profile.religion}</p>
                </div>
              </div>

              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl">
                      <MapPin className="h-3.5 w-3.5 text-indigo-500" /> {profile.city}, {profile.country}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl">
                      <Briefcase className="h-3.5 w-3.5 text-indigo-500" /> {profile.profession}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl">
                      <GraduationCap className="h-3.5 w-3.5 text-indigo-500" /> {profile.education}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">{profile.aboutMe}</p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                  <Button 
                    onClick={() => interestMutation.mutate({ profileId: profile.id, action: 'pass' })}
                    variant="outline" 
                    className="flex-1 py-6 rounded-2xl font-bold border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                  >
                    <X className="h-5 w-5 mr-2 text-zinc-400" /> Pass
                  </Button>
                  <Button 
                    onClick={() => interestMutation.mutate({ profileId: profile.id, action: 'like' })}
                    className="flex-1 py-6 rounded-2xl font-bold bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40 transition duration-300"
                  >
                    <Heart className="h-5 w-5 mr-2 fill-white" /> Like
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
