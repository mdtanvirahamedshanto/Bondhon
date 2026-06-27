'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { signOut, useSession } from 'next-auth/react';
import { 
  Users, User, MessageSquare, Shield, CreditCard, 
  LogOut, Sun, Moon, Sparkles, Bell, Heart
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  const navItems = [
    { name: 'Overview', href: '/overview', icon: Users },
    { name: 'Discovery', href: '/dashboard', icon: Sparkles },
    { name: 'My Matches', href: '/matches', icon: Heart },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'My Profile', href: '/profile', icon: User },
    { name: 'Subscription', href: '/subscription', icon: CreditCard },
  ];

  if ((session?.user as any)?.role === 'admin') {
    navItems.push({ name: 'Admin Portal', href: '/admin', icon: Shield });
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white dark:bg-zinc-900 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
          <Link href="/dashboard" className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-indigo-600 to-rose-500 bg-clip-text text-transparent">
            Bondhon
          </Link>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
            >
              <Sun className="h-4 w-4 hidden dark:block" />
              <Moon className="h-4 w-4 block dark:hidden" />
            </button>
            <Link href="/notifications" className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
            </Link>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-indigo-600 to-rose-500 text-white shadow-md shadow-indigo-500/20' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/80'}`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-zinc-500 dark:text-zinc-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Card */}
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800/80">
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-600 to-rose-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                {session?.user?.name?.[0] || 'B'}
              </div>
              <div className="overflow-hidden">
                <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate">{session?.user?.name || 'Arjun Sharma'}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{session?.user?.email || 'arjun@example.com'}</p>
              </div>
            </div>
            <button onClick={() => signOut({ callbackUrl: '/login' })} className="p-2 text-zinc-400 hover:text-rose-500 transition">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-950">
        {children}
      </main>
    </div>
  );
}
