'use client';

import React, { useState, useTransition, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    startTransition(async () => {
      // Simulate secure token validation and password update
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => router.push('/login'), 2500);
    });
  };

  if (!token) {
    return (
      <div className="text-center p-8">
        <h1 className="text-xl font-extrabold text-rose-600 mb-2">Invalid or Expired Token</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Your password reset link is invalid or has expired.</p>
        <Link href="/forgot-password">
          <Button variant="outline" className="rounded-xl font-bold">Request New Link</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {!success ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <div className="h-12 w-12 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-900 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">Set New Password</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Enter your new secure password below.</p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-sm rounded-xl font-bold">
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">New Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium"
              />
            </div>

            <Button type="submit" disabled={isPending || !password || !confirmPassword} className="w-full py-6 rounded-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-rose-500 hover:from-indigo-700 hover:to-rose-600 text-white shadow-premium-lg transition-all duration-300">
              {isPending ? 'Updating Password...' : 'Update Password'}
            </Button>
          </form>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
          <div className="h-16 w-16 bg-emerald-50 dark:bg-emerald-950/50 rounded-full border-4 border-emerald-100 dark:border-emerald-900 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">Password Updated!</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed">Your password has been successfully changed. Redirecting you to login...</p>
          <div className="mt-8 flex justify-center">
            <div className="h-6 w-6 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50/50 via-white to-rose-50/50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-premium-2xl border border-zinc-200/60 dark:border-zinc-800 p-8">
        <Suspense fallback={<div className="p-12 flex justify-center"><div className="h-8 w-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>}>
          <ResetPasswordContent />
        </Suspense>
      </div>
    </div>
  );
}
