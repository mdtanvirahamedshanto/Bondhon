'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Bell, Sun, Moon, Menu, X, ChevronDown, 
  User, CreditCard, Shield, LogOut, 
  Heart, Users, Sparkles, ShieldCheck, Star, ArrowRight
} from 'lucide-react';

export function Navbar() {
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const megaMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Handle sticky header shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setMegaMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
    setNotificationsOpen(false);
    setProfileMenuOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Mock high-fidelity notification items
  const mockNotifications = [
    { id: '1', title: 'New Mutual Match!', desc: 'You and Ananya Verma liked each other.', time: '10m ago', unread: true, link: '/messages?userId=prof_1' },
    { id: '2', title: 'Profile Liked', desc: 'Rohan Mehta expressed interest in you.', time: '2h ago', unread: true, link: '/dashboard' },
    { id: '3', title: 'ID Verification Approved', desc: 'Your government ID was successfully verified.', time: '1d ago', unread: false, link: '/profile' },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/85 dark:bg-zinc-900/85 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800 shadow-premium-md' 
          : 'bg-white/60 dark:bg-zinc-950/60 backdrop-blur-lg border-b border-zinc-200/40 dark:border-zinc-800/40'
      }`}
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left Section: Logo & Mega Menu Toggle */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link 
            href="/" 
            className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 bg-clip-text text-transparent flex items-center gap-2 focus:ring-2 focus:ring-indigo-500 rounded-lg outline-none transition"
            aria-label="Bondhon Home"
          >
            Bondhon <span className="hidden sm:inline-block text-[10px] px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 font-extrabold tracking-wide">ELITE</span>
          </Link>

          {/* Desktop Navigation Links & Mega Menu */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Desktop Navigation">
            <div className="relative" ref={megaMenuRef}>
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                aria-expanded={megaMenuOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-bold text-sm transition focus:ring-2 focus:ring-indigo-500 outline-none ${
                  megaMenuOpen || pathname.startsWith('/dashboard') || pathname.startsWith('/matches')
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/80'
                    : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                <span>Explore</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${megaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {megaMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-3 w-[650px] bg-white dark:bg-zinc-900 rounded-3xl shadow-premium-2xl border border-zinc-200/80 dark:border-zinc-800 overflow-hidden grid grid-cols-2 p-6 gap-6 z-50"
                  >
                    <div className="space-y-4">
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 px-3">Discovery &amp; Matches</h3>
                      <Link href="/dashboard" className="flex items-start gap-4 p-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition group">
                        <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">Discovery Feed</h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Explore smart AI-weighted match recommendations</p>
                        </div>
                      </Link>

                      <Link href="/matches" className="flex items-start gap-4 p-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition group">
                        <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 group-hover:scale-105 transition">
                          <Heart className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition">Mutual Matches</h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">View profiles who expressed reciprocal interest</p>
                        </div>
                      </Link>
                    </div>

                    <div className="space-y-4 border-l border-zinc-100 dark:border-zinc-800/80 pl-6">
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 px-3">Elite Features &amp; Trust</h3>
                      <Link href="/subscription" className="flex items-start gap-4 p-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition group">
                        <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 group-hover:scale-105 transition">
                          <Sparkles className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">Premium Plans</h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Unlock zero-blur photos and direct messaging</p>
                        </div>
                      </Link>

                      <Link href="/profile" className="flex items-start gap-4 p-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition group">
                        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">Bank-Grade Privacy</h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Manage photo blurring and verification shields</p>
                        </div>
                      </Link>
                    </div>

                    <div className="col-span-2 p-4 bg-gradient-to-r from-indigo-900 via-indigo-800 to-rose-900 rounded-2xl text-white flex items-center justify-between shadow-lg">
                      <div className="space-y-0.5">
                        <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> Bondhon Success Guarantee</h4>
                        <p className="text-xs text-indigo-100/80">Connecting 10,000+ verified professionals worldwide.</p>
                      </div>
                      <Link href="/register">
                        <Button size="sm" className="bg-white text-indigo-950 hover:bg-zinc-100 rounded-xl font-bold text-xs px-4 py-2 shadow-md transition">
                          Start Free <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/messages">
              <span className={`px-4 py-2 rounded-2xl font-bold text-sm transition focus:ring-2 focus:ring-indigo-500 outline-none inline-block ${
                pathname.startsWith('/messages')
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/80'
                  : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
              }`}>
                Messages
              </span>
            </Link>

            <Link href="/subscription">
              <span className={`px-4 py-2 rounded-2xl font-bold text-sm transition focus:ring-2 focus:ring-indigo-500 outline-none inline-block ${
                pathname.startsWith('/subscription')
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/80'
                  : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
              }`}>
                Pricing
              </span>
            </Link>
          </nav>
        </div>

        {/* Center Section: Inline Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative" aria-label="Site Search">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400 pointer-events-none" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search verified profiles, cities, professions..."
              aria-label="Search input"
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80 text-sm outline-none text-zinc-900 dark:text-zinc-100 focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder:text-zinc-400 font-medium"
            />
          </form>
        </div>

        {/* Right Section: Utilities, Theme Toggle, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:ring-2 focus:ring-indigo-500 outline-none transition duration-200"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute top-2.5 left-2.5 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>

          {/* Notifications Bell Dropdown */}
          {session?.user && (
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="View Notifications"
                aria-expanded={notificationsOpen}
                className="relative p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:ring-2 focus:ring-indigo-500 outline-none transition duration-200"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-zinc-900 animate-pulse" />
              </button>

              {/* Notifications Popover */}
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-zinc-900 rounded-3xl shadow-premium-2xl border border-zinc-200/80 dark:border-zinc-800 overflow-hidden z-50 flex flex-col"
                  >
                    <div className="p-4 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-800/30">
                      <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">Notifications</h4>
                      <span className="text-xs font-bold bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 px-2.5 py-0.5 rounded-full">3 New</span>
                    </div>

                    <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80 max-h-80 overflow-y-auto">
                      {mockNotifications.map((n) => (
                        <Link key={n.id} href={n.link} className="flex items-start gap-4 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition text-left group">
                          <div className={`p-2 rounded-2xl border shrink-0 ${n.unread ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400' : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400'}`}>
                            <Bell className="h-4 w-4" />
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <div className="flex items-center justify-between">
                              <h5 className="font-extrabold text-xs text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition truncate">{n.title}</h5>
                              <span className="text-[10px] text-zinc-400 font-semibold">{n.time}</span>
                            </div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">{n.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="p-3 border-t border-zinc-100 dark:border-zinc-800/80 text-center bg-zinc-50/50 dark:bg-zinc-800/30">
                      <Link href="/notifications" className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline">
                        View All Activity
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* User Profile Menu / Auth CTAs */}
          {status === 'loading' ? (
            <div className="h-10 w-10 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          ) : session?.user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                aria-label="User Profile Menu"
                aria-expanded={profileMenuOpen}
                className="flex items-center gap-2 p-1.5 pl-3 pr-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:ring-2 focus:ring-indigo-500 outline-none transition duration-200"
              >
                <span className="text-xs font-extrabold text-zinc-700 dark:text-zinc-300 hidden sm:inline-block max-w-[100px] truncate">
                  {session.user.name || 'Member'}
                </span>
                <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-500 text-white flex items-center justify-center font-extrabold text-xs shadow-sm">
                  {session.user.name ? session.user.name[0].toUpperCase() : 'M'}
                </div>
              </button>

              {/* Profile Menu Dropdown */}
              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-64 bg-white dark:bg-zinc-900 rounded-3xl shadow-premium-2xl border border-zinc-200/80 dark:border-zinc-800 overflow-hidden z-50 flex flex-col p-2"
                  >
                    <div className="p-4 border-b border-zinc-100 dark:border-zinc-800/80 mb-2">
                      <div className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 truncate">{session.user.name}</div>
                      <div className="text-xs text-zinc-400 truncate">{session.user.email}</div>
                      <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-extrabold bg-gradient-to-r from-indigo-50 to-rose-50 dark:from-indigo-950/50 dark:to-rose-950/50 border border-indigo-200 dark:border-rose-800 text-indigo-600 dark:text-rose-400 px-3 py-1 rounded-full w-fit shadow-sm">
                        <Sparkles className="h-3 w-3" /> {(session.user as any)?.subscriptionTier?.toUpperCase() || 'PREMIUM'} TIER
                      </div>
                    </div>

                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-extrabold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                      <Users className="h-4 w-4 text-zinc-400" /> Discovery Feed
                    </Link>

                    <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-extrabold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                      <User className="h-4 w-4 text-zinc-400" /> Profile &amp; Privacy
                    </Link>

                    <Link href="/subscription" className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-extrabold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                      <CreditCard className="h-4 w-4 text-zinc-400" /> Subscription Plans
                    </Link>

                    {(session.user as any)?.role === 'admin' && (
                      <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition my-1">
                        <Shield className="h-4 w-4" /> Admin Portal
                      </Link>
                    )}

                    <div className="border-t border-zinc-100 dark:border-zinc-800/80 mt-2 pt-2">
                      <button 
                        onClick={() => signOut({ callbackUrl: '/login' })}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-extrabold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" className="px-4 py-2 rounded-2xl font-bold text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="px-5 py-2 rounded-2xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-rose-500 hover:from-indigo-700 hover:to-rose-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition duration-300">
                  Get Started
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:ring-2 focus:ring-indigo-500 outline-none transition duration-200"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Side-Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end"
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-sm bg-white dark:bg-zinc-900 h-full p-6 flex flex-col justify-between shadow-premium-2xl border-l border-zinc-200/80 dark:border-zinc-800 overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                  <Link href="/" className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-rose-500 bg-clip-text text-transparent">
                    Bondhon <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200 dark:border-rose-800">ELITE</span>
                  </Link>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close Mobile Menu"
                    className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile Search Bar */}
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search verified profiles..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-sm outline-none text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 transition font-medium"
                  />
                </form>

                {/* Mobile Menu Links */}
                <div className="space-y-2">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 px-2 mb-2">Navigation</h3>
                  <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 font-extrabold text-sm text-zinc-800 dark:text-zinc-200 transition">
                    <Users className="h-5 w-5 text-indigo-500" /> Discovery Feed
                  </Link>
                  <Link href="/matches" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 font-extrabold text-sm text-zinc-800 dark:text-zinc-200 transition">
                    <Heart className="h-5 w-5 text-rose-500" /> Mutual Matches
                  </Link>
                  <Link href="/messages" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 font-extrabold text-sm text-zinc-800 dark:text-zinc-200 transition">
                    <span className="p-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">💬</span> Messages
                  </Link>
                  <Link href="/subscription" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 font-extrabold text-sm text-zinc-800 dark:text-zinc-200 transition">
                    <Sparkles className="h-5 w-5 text-amber-500" /> Premium Plans
                  </Link>
                  <Link href="/profile" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 font-extrabold text-sm text-zinc-800 dark:text-zinc-200 transition">
                    <ShieldCheck className="h-5 w-5 text-emerald-500" /> Bank-Grade Privacy
                  </Link>
                </div>
              </div>

              {/* Mobile Footer CTAs / Auth Status */}
              <div className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-6">
                {session?.user ? (
                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-500 text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
                        {session.user.name ? session.user.name[0].toUpperCase() : 'M'}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 truncate">{session.user.name}</div>
                        <div className="text-xs text-zinc-400 truncate">{session.user.email}</div>
                      </div>
                    </div>

                    {(session.user as any)?.role === 'admin' && (
                      <Link href="/admin" className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 shadow-sm transition">
                        <Shield className="h-4 w-4" /> Open Admin Portal
                      </Link>
                    )}

                    <Button 
                      onClick={() => signOut({ callbackUrl: '/login' })}
                      variant="outline" 
                      className="w-full py-6 rounded-2xl font-extrabold text-sm border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition flex items-center justify-center gap-2"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link href="/login" className="w-full block">
                      <Button variant="outline" className="w-full py-6 rounded-2xl font-extrabold text-sm border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/register" className="w-full block">
                      <Button className="w-full py-6 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-indigo-600 to-rose-500 hover:from-indigo-700 hover:to-rose-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition duration-300">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
