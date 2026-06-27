'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { 
  Activity, Users, Heart, Eye, ArrowUpRight, 
  ShieldCheck, CheckCircle2, ChevronRight, Settings, 
  Bell, UserCheck, AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function OverviewDashboardPage() {
  const { data: session } = useSession();

  // Mock Analytics Data
  const analytics = [
    { label: 'Profile Visitors', value: '1,248', trend: '+14%', icon: Eye, color: 'indigo' },
    { label: 'Mutual Favorites', value: '32', trend: '+5%', icon: Heart, color: 'rose' },
    { label: 'New Interests', value: '89', trend: '+22%', icon: UserCheck, color: 'emerald' },
    { label: 'Search Appearances', value: '4,512', trend: '+8%', icon: Activity, color: 'amber' },
  ];

  // Mock Recent Activity
  const activities = [
    { type: 'match', message: 'You matched with Priya Patel', time: '2 hours ago', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/50' },
    { type: 'view', message: 'Rahul Verma viewed your profile', time: '5 hours ago', icon: Eye, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/50' },
    { type: 'system', message: 'Government ID verification approved', time: '1 day ago', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/50' },
    { type: 'interest', message: 'Ananya sent an interest request', time: '2 days ago', icon: UserCheck, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/50' },
  ];

  const profileCompletion = 85;

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-10">
      
      {/* Header Greeting */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Welcome back, {session?.user?.name?.split(' ')[0] || 'Member'}
          </h1>
          <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 mt-2">Here is what's happening with your profile today.</p>
        </div>
        <Link href="/dashboard">
          <Button className="rounded-2xl font-extrabold shadow-premium-md bg-gradient-to-r from-indigo-600 to-rose-500 hover:from-indigo-700 hover:to-rose-600 transition-all duration-300">
            Explore Matches <ArrowUpRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Analytics & Activity */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Analytics KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {analytics.map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-premium-sm hover:shadow-premium-lg transition duration-300 flex items-center justify-between group"
              >
                <div>
                  <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400 mb-1">{stat.label}</p>
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">{stat.value}</h3>
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-0.5" /> {stat.trend}
                    </span>
                  </div>
                </div>
                <div className={`h-12 w-12 rounded-2xl bg-${stat.color}-50 dark:bg-${stat.color}-950/50 flex items-center justify-center border border-${stat.color}-100 dark:border-${stat.color}-900 group-hover:scale-110 transition duration-300`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity Stream */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-premium-md overflow-hidden">
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
              <h3 className="font-extrabold text-lg text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Activity className="h-5 w-5 text-indigo-500" /> Recent Activity
              </h3>
              <Link href="/notifications" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline">View All</Link>
            </div>
            <div className="p-6">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-200 dark:before:via-zinc-800 before:to-transparent">
                {activities.map((act, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700">
                      <div className={`h-8 w-8 rounded-full ${act.bg} flex items-center justify-center`}>
                        <act.icon className={`h-4 w-4 ${act.color}`} />
                      </div>
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">{act.message}</span>
                      </div>
                      <time className="text-xs font-semibold text-zinc-400">{act.time}</time>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Completion & Quick Actions */}
        <div className="space-y-8">
          
          {/* Profile Completion Widget */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-premium-md p-6 text-center">
            <h3 className="font-extrabold text-lg text-zinc-900 dark:text-zinc-100 mb-6">Profile Strength</h3>
            
            <div className="relative inline-flex items-center justify-center mb-6">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="56" className="stroke-zinc-100 dark:stroke-zinc-800" strokeWidth="12" fill="none" />
                <circle cx="64" cy="64" r="56" className="stroke-indigo-500" strokeWidth="12" fill="none" strokeDasharray="351.85" strokeDashoffset={351.85 - (351.85 * profileCompletion) / 100} strokeLinecap="round" />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">{profileCompletion}%</span>
              </div>
            </div>

            <div className="text-left bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 rounded-2xl p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-extrabold text-indigo-900 dark:text-indigo-100">Almost there!</p>
                <p className="text-xs font-medium text-indigo-700 dark:text-indigo-300 mt-1 leading-relaxed">Add your government ID to achieve 100% completion and earn the Verified Shield.</p>
                <Link href="/profile">
                  <Button size="sm" className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold px-4">Complete Profile</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Settings & Security */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-premium-md overflow-hidden">
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800/80">
              <h3 className="font-extrabold text-lg text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Settings className="h-5 w-5 text-zinc-400" /> Quick Settings
              </h3>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
              <div className="p-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition">
                <div>
                  <p className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Profile Visibility</p>
                  <p className="text-xs text-zinc-500">Currently visible to all verified members</p>
                </div>
                <div className="w-10 h-6 bg-indigo-500 rounded-full relative cursor-pointer shadow-inner">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              <div className="p-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition">
                <div>
                  <p className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Email Notifications</p>
                  <p className="text-xs text-zinc-500">Matches and critical alerts enabled</p>
                </div>
                <div className="w-10 h-6 bg-indigo-500 rounded-full relative cursor-pointer shadow-inner">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              <Link href="/profile" className="block p-4 bg-zinc-50 dark:bg-zinc-800/30 text-center text-sm font-extrabold text-indigo-600 dark:text-indigo-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition">
                Manage All Settings <ChevronRight className="h-4 w-4 inline-block mb-0.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
