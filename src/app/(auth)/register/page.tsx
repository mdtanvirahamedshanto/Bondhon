'use client';

import React, { useActionState } from 'react';
import { registerUser } from '@/core/actions/auth.actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(registerUser, null);

  if (state?.success && state?.email) {
    router.push(`/verify?email=${encodeURIComponent(state.email)}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50/50 via-white to-indigo-50/50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200/60 dark:border-zinc-800 p-8"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block font-bold text-3xl tracking-tight bg-gradient-to-r from-rose-500 to-indigo-600 bg-clip-text text-transparent mb-2">
            Bondhon
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Create an account</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Begin your journey to finding your life partner</p>
        </div>

        {state?.message && !state?.success && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-sm rounded-xl font-medium">
            {state.message}
          </motion.div>
        )}

        <form action={formAction} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Arjun Sharma"
              className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
            />
            {state?.errors?.name && <p className="text-rose-500 text-xs mt-1">{state.errors.name[0]}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Email Address</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
            />
            {state?.errors?.email && <p className="text-rose-500 text-xs mt-1">{state.errors.email[0]}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
            />
            {state?.errors?.password && <p className="text-rose-500 text-xs mt-1">{state.errors.password[0]}</p>}
          </div>

          <Button type="submit" disabled={isPending} className="w-full py-6 rounded-xl font-semibold shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 bg-gradient-to-r from-rose-500 to-indigo-600 text-white transition-all duration-300">
            {isPending ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 pt-6">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-rose-600 dark:text-rose-400 hover:underline">
            Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
