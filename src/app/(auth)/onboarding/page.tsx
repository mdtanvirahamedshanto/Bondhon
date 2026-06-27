'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();

  // Form states
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('never_married');
  const [religion, setReligion] = useState('Hindu');
  const [motherTongue, setMotherTongue] = useState('Hindi');
  const [height, setHeight] = useState('170');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('India');
  const [education, setEducation] = useState('Bachelors');
  const [profession, setProfession] = useState('Software Engineer');
  const [aboutMe, setAboutMe] = useState('');

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      // Simulate saving profile data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push('/dashboard');
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50/50 via-white to-rose-50/50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200/60 dark:border-zinc-800 p-8 md:p-12 overflow-hidden">
        {/* Progress bar */}
        <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full mb-10 overflow-hidden">
          <motion.div 
            className="bg-gradient-to-r from-indigo-600 to-rose-500 h-full"
            initial={{ width: '33%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">Tell us about yourself</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Let&apos;s build your perfect matrimony profile</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">I am a</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button type="button" onClick={() => setGender('male')} className={`py-4 rounded-2xl font-bold border transition ${gender === 'male' ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-600 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400'}`}>Male</button>
                    <button type="button" onClick={() => setGender('female')} className={`py-4 rounded-2xl font-bold border transition ${gender === 'female' ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-600 text-rose-600 dark:text-rose-400 shadow-sm' : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400'}`}>Female</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Date of Birth</label>
                    <input type="date" required value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Marital Status</label>
                    <select value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition">
                      <option value="never_married">Never Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Religion</label>
                    <input type="text" value={religion} onChange={(e) => setReligion(e.target.value)} placeholder="Hindu, Muslim, Christian, etc." className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Mother Tongue</label>
                    <input type="text" value={motherTongue} onChange={(e) => setMotherTongue(e.target.value)} placeholder="Hindi, Bengali, Tamil, etc." className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                  </div>
                </div>
              </div>

              <Button onClick={() => setStep(2)} className="w-full py-6 rounded-xl font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 bg-gradient-to-r from-indigo-600 to-rose-500 text-white transition-all duration-300">
                Continue
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">Career & Location</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Help matches understand your lifestyle</p>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Height (in cm)</label>
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Highest Education</label>
                    <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} placeholder="Bachelors, Masters, Ph.D, etc." className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">City</label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Mumbai, New York, London" className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Country</label>
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Profession</label>
                  <input type="text" value={profession} onChange={(e) => setProfession(e.target.value)} placeholder="Software Engineer, Doctor, Entrepreneur" className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="w-1/3 py-6 rounded-xl font-bold">Back</Button>
                <Button onClick={() => setStep(3)} className="w-2/3 py-6 rounded-xl font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 bg-gradient-to-r from-indigo-600 to-rose-500 text-white transition-all duration-300">Continue</Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">In your own words</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Write a beautiful bio to attract the right matches</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">About Me</label>
                <textarea rows={6} value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} placeholder="Share your values, passions, lifestyle, and what you are looking for in a partner..." className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"></textarea>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(2)} disabled={isPending} className="w-1/3 py-6 rounded-xl font-bold">Back</Button>
                <Button onClick={handleComplete} disabled={isPending} className="w-2/3 py-6 rounded-xl font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 bg-gradient-to-r from-indigo-600 to-rose-500 text-white transition-all duration-300">
                  {isPending ? 'Saving Profile...' : 'Complete Onboarding'}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
