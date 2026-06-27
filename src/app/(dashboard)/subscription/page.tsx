'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCheckoutSession } from '@/core/actions/subscription.actions';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Check, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export default function SubscriptionPage() {
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const plans = [
    {
      id: 'premium',
      name: 'Bondhon Premium',
      description: 'Perfect for genuine seekers ready to find their lifelong match with enhanced tools.',
      monthlyPrice: 15,
      annualPrice: 10, // billed $120/yr
      popular: true,
      features: [
        'Unlimited Direct Messaging',
        'Advanced Career & Lifestyle filters',
        'See exactly who liked your profile',
        'Priority Customer Support',
        'High-Resolution Media Unlocked',
      ],
    },
    {
      id: 'elite',
      name: 'Bondhon Elite',
      description: 'For busy professionals seeking top-tier exposure and exclusive VIP matchmaking services.',
      monthlyPrice: 25,
      annualPrice: 20, // billed $240/yr
      popular: false,
      features: [
        'Everything in Premium',
        'Profile highlighted with Elite Badge',
        'Dedicated Human Relationship Manager',
        'Monthly background check verification',
        'Zero ads & fully anonymous browsing mode',
      ],
    },
  ];

  const handleSubscribe = async (planId: string) => {
    setSelectedPlan(planId);
    setIsLoading(true);
    const res = await createCheckoutSession(planId, isAnnual ? 'annual' : 'monthly');
    if (res.success && res.url) {
      router.push(res.url);
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 px-4 py-1.5 rounded-full text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5" /> Transform Your Matrimony Experience
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          Invest in Your Forever.
        </h1>
        <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Upgrade to a premium membership to unlock unlimited communication, advanced discovery filters, and verified contact numbers.
        </p>

        {/* Toggle Switch */}
        <div className="pt-4 flex items-center justify-center gap-4">
          <span className={`text-sm font-bold ${!isAnnual ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'}`}>Monthly Billing</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)} 
            className="w-14 h-8 bg-zinc-200 dark:bg-zinc-800 rounded-full p-1 transition flex items-center shadow-inner"
          >
            <div className={`w-6 h-6 rounded-full bg-gradient-to-r from-indigo-600 to-rose-500 shadow-md transform transition duration-300 ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </button>
          <span className={`text-sm font-bold flex items-center gap-1.5 ${isAnnual ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'}`}>
            Annual Billing <span className="text-[11px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-extrabold px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">Save 33%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => {
          const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
          const isPending = isLoading && selectedPlan === plan.id;
          return (
            <motion.div 
              key={plan.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-10 shadow-xl border relative flex flex-col justify-between hover:shadow-2xl transition duration-300 ${plan.popular ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-zinc-200/60 dark:border-zinc-800'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-rose-500 text-white text-xs font-extrabold px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 fill-white" /> Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">{plan.name}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-2 py-4 border-y border-zinc-100 dark:border-zinc-800/80">
                  <span className="text-5xl font-extrabold text-zinc-900 dark:text-zinc-100">${price}</span>
                  <span className="text-sm font-semibold text-zinc-400">/ month {isAnnual ? '(billed annually)' : ''}</span>
                </div>

                <ul className="space-y-4">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      <div className="h-5 w-5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Button 
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isLoading}
                  className={`w-full py-7 rounded-2xl font-bold text-base shadow-lg transition duration-300 ${plan.popular ? 'bg-gradient-to-r from-indigo-600 to-rose-500 hover:from-indigo-700 hover:to-rose-600 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
                >
                  {isPending ? 'Initializing Secure Checkout...' : `Select ${plan.name}`}
                </Button>
                <p className="text-[11px] text-zinc-400 text-center mt-3 font-medium flex items-center justify-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-50-500 text-emerald-500" /> 256-Bit Encrypted Secure Checkout
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
