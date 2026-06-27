'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, Heart, Star, MapPin, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function MatchesPage() {
  const matches = [
    {
      id: 'match_1',
      name: 'Ananya Verma',
      age: 27,
      city: 'Mumbai',
      profession: 'UI/UX Designer',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      matchDate: 'Today',
      compatibilityScore: 94,
      status: 'mutual',
    },
    {
      id: 'match_2',
      name: 'Priya Sen',
      age: 26,
      city: 'Bengaluru',
      profession: 'Architect',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
      matchDate: 'Yesterday',
      compatibilityScore: 91,
      status: 'mutual',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">My Matches</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Review your mutual matches and begin meaningful conversations</p>
        </div>
        <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 px-4 py-2 rounded-2xl text-rose-600 dark:text-rose-400 text-sm font-semibold shadow-sm">
          <Heart className="h-4 w-4 fill-rose-500 text-rose-500" /> 2 New Mutual Matches
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {matches.map((match) => (
          <motion.div 
            key={match.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200/60 dark:border-zinc-800 overflow-hidden flex flex-col md:flex-row p-6 gap-6 items-center hover:shadow-2xl transition duration-300"
          >
            <div className="relative w-36 h-36 rounded-2xl overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-800 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={match.photo} alt={match.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1">
                <Star className="h-3 w-3 fill-rose-500 text-rose-500" /> {match.compatibilityScore}%
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between space-y-4 text-center md:text-left w-full">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full mb-2">
                  <Sparkles className="h-3 w-3" /> Mutual Match
                </div>
                <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">{match.name}, {match.age}</h3>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-indigo-500" /> {match.city}</span>
                  <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5 text-indigo-500" /> {match.profession}</span>
                </div>
              </div>

              <Link href={`/messages?userId=${match.id}`} className="block w-full">
                <Button className="w-full py-6 rounded-2xl font-bold bg-gradient-to-r from-indigo-600 to-rose-500 hover:from-indigo-700 hover:to-rose-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition duration-300 flex items-center justify-center gap-2">
                  <MessageCircle className="h-5 w-5" /> Start Conversation
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
