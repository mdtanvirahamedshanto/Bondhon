'use client';

import React, { useState, useEffect } from 'react';
import { getNotifications } from '@/core/actions/message.actions';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Bell, Sparkles, Heart, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNotifications().then((res) => {
      if (res.success) setNotifications(res.data);
      setIsLoading(false);
    });
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'mutual_match': return <Sparkles className="h-6 w-6 text-rose-500" />;
      case 'match_liked': return <Heart className="h-6 w-6 text-indigo-500" />;
      case 'profile_verified': return <CheckCircle className="h-6 w-6 text-emerald-500" />;
      default: return <Bell className="h-6 w-6 text-zinc-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-10">
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">Notifications</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Stay updated with your latest profile interactions and mutual matches</p>
        </div>
        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl text-zinc-600 dark:text-zinc-400 shadow-inner">
          <Bell className="h-6 w-6" />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-28 bg-white dark:bg-zinc-900 rounded-3xl animate-pulse border border-zinc-200 dark:border-zinc-800"></div>
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/60 dark:border-zinc-800 p-16 text-center shadow-xl">
          <Bell className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">No notifications yet</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">When someone interacts with your profile, you will see it here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border transition flex items-center justify-between gap-6 hover:shadow-2xl ${item.isRead ? 'border-zinc-200/60 dark:border-zinc-800' : 'border-indigo-500/50 bg-indigo-50/20 dark:bg-indigo-950/20'}`}
            >
              <div className="flex items-center gap-5">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl shrink-0 border border-zinc-100 dark:border-zinc-700 shadow-sm">
                  {getIcon(item.type)}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-zinc-900 dark:text-zinc-100">{item.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">{item.message}</p>
                  <span className="text-xs text-zinc-400 font-bold mt-2 block">{item.time}</span>
                </div>
              </div>

              {item.link && (
                <Link href={item.link} className="shrink-0">
                  <Button variant="ghost" className="p-4 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition">
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
