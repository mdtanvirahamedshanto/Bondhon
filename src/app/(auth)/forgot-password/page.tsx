'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { KeyRound, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      // Simulate API call for password reset link generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50/50 via-white to-rose-50/50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-premium-2xl border border-zinc-200/60 dark:border-zinc-800 p-8"
      >
        {!success ? (
          <>
            <div className="text-center mb-8">
              <div className="h-12 w-12 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-900 flex items-center justify-center mx-auto mb-4">
                <KeyRound className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">Forgot Password?</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">No worries, we'll send you reset instructions. Enter the email associated with your account.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3.5 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition font-medium"
                />
              </div>

              <Button type="submit" disabled={isPending || !email} className="w-full py-6 rounded-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-rose-500 hover:from-indigo-700 hover:to-rose-600 text-white shadow-premium-lg transition-all duration-300">
                {isPending ? 'Sending Link...' : 'Send Reset Link'}
              </Button>
            </form>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
            <div className="h-16 w-16 bg-emerald-50 dark:bg-emerald-950/50 rounded-full border-4 border-emerald-100 dark:border-emerald-900 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">Check Your Email</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed">We have sent a secure password reset link to <span className="font-bold text-zinc-900 dark:text-zinc-100">{email}</span>. The link will expire in 15 minutes.</p>
            <Button onClick={() => setSuccess(false)} variant="outline" className="mt-8 w-full py-6 rounded-2xl font-extrabold border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
              Didn't receive it? Try again
            </Button>
          </motion.div>
        )}

        <div className="mt-8 text-center pt-6">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-sm font-extrabold text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
