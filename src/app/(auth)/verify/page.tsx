'use client';

import React, { useActionState, useEffect, Suspense } from 'react';
import { verifyOtp } from '@/core/actions/auth.actions';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams?.get('email') || '';
  const [state, formAction, isPending] = useActionState(verifyOtp, null);

  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        router.push('/onboarding');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state?.success, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50/50 via-white to-rose-50/50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200/60 dark:border-zinc-800 p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Verify your email</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            We sent a one-time code to <span className="font-medium text-zinc-900 dark:text-zinc-200">{emailParam}</span>
          </p>
        </div>

        {state?.message && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`mb-6 p-4 border text-sm rounded-xl font-medium ${state.success ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400' : 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400'}`}>
            {state.message}
          </motion.div>
        )}

        <form action={formAction} className="space-y-5">
          <input type="hidden" name="email" value={emailParam} />
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Verification Code (OTP)</label>
            <input
              type="text"
              name="otp"
              required
              maxLength={6}
              placeholder="123456"
              className="w-full px-4 py-3 text-center tracking-[0.5em] font-bold text-xl rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            />
          </div>

          <Button type="submit" disabled={isPending || state?.success} className="w-full py-6 rounded-xl font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 bg-gradient-to-r from-indigo-600 to-rose-500 text-white transition-all duration-300">
            {isPending ? 'Verifying...' : state?.success ? 'Verified! Redirecting...' : 'Verify Email'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <VerifyForm />
    </Suspense>
  );
}
