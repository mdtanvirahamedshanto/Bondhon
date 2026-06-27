'use client';

import React, { useActionState, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { confirmPaymentTransaction } from '@/core/actions/subscription.actions';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CheckCircle, CreditCard, Lock, Sparkles } from 'lucide-react';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams?.get('plan') || 'premium';
  const cycle = searchParams?.get('cycle') || 'annual';

  const [state, action, isPending] = useActionState(confirmPaymentTransaction, null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const price = plan === 'elite' ? (cycle === 'annual' ? 240 : 25) : (cycle === 'annual' ? 120 : 15);
  const planTitle = plan === 'elite' ? 'Bondhon Elite' : 'Bondhon Premium';

  useEffect(() => {
    if (state?.success) {
      setShowSuccessModal(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 3500);
    }
  }, [state, router]);

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-12">
      <div className="text-center max-w-lg mx-auto space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">Secure Payment Checkout</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Complete your premium subscription investment securely with our Stripe-powered checkout simulation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200/60 dark:border-zinc-800 overflow-hidden">
        {/* Order Summary Pane */}
        <div className="p-8 md:p-10 bg-zinc-50 dark:bg-zinc-950 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-tr from-indigo-600 to-rose-500 rounded-2xl text-white shadow-md">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-zinc-900 dark:text-zinc-100">{planTitle}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{cycle === 'annual' ? 'Annual Billing Cycle' : 'Monthly Billing Cycle'}</p>
              </div>
            </div>

            <div className="space-y-3 py-6 border-y border-zinc-200 dark:border-zinc-800 text-sm font-semibold">
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Subtotal</span>
                <span>${price}.00</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Tax (0% for Matrimonial Services)</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-zinc-900 dark:text-zinc-100 text-lg font-bold pt-2">
                <span>Total Due Today</span>
                <span>${price}.00</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-3 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="h-5 w-5 shrink-0" />
            Your payment details are protected with bank-grade security protocols.
          </div>
        </div>

        {/* Payment Input Form */}
        <div className="p-8 md:p-10 flex flex-col justify-between space-y-8">
          {state?.message && !state.success && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-sm font-semibold rounded-2xl">
              {state.message}
            </div>
          )}

          <form action={action} className="space-y-6 flex-1 flex flex-col justify-between">
            <input type="hidden" name="plan" value={plan} />
            <input type="hidden" name="cycle" value={cycle} />

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Cardholder Name</label>
                <input type="text" required defaultValue="Arjun Sharma" className="w-full px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 font-semibold text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition" />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Card Number</label>
                <div className="relative">
                  <input type="text" required defaultValue="4242 •••• •••• 4242" className="w-full pl-11 pr-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 font-semibold text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                  <CreditCard className="absolute left-3.5 top-3.5 h-5 w-5 text-zinc-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Expiration Date</label>
                  <input type="text" required defaultValue="12 / 28" className="w-full px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 font-semibold text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition text-center" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">CVC</label>
                  <input type="text" required defaultValue="987" className="w-full px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 font-semibold text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition text-center" />
                </div>
              </div>
            </div>

            <Button type="submit" disabled={isPending} className="w-full py-7 rounded-2xl font-bold text-base bg-gradient-to-r from-indigo-600 to-rose-500 hover:from-indigo-700 hover:to-rose-600 text-white shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition duration-300 flex items-center justify-center gap-2">
              <Lock className="h-5 w-5" /> {isPending ? 'Processing Payment...' : `Pay $${price}.00 Securely`}
            </Button>
          </form>
        </div>
      </div>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9, y: 15 }} animate={{ scale: 1, y: 0 }} className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-3xl p-8 text-center shadow-2xl border border-zinc-200 dark:border-zinc-800 space-y-6">
              <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto animate-bounce" />
              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">Payment Successful!</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Welcome to {planTitle}. Your premium features have been unlocked. Redirecting to your discovery dashboard...</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
