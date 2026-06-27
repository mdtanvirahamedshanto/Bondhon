'use client';

import React, { useState, useActionState } from 'react';
import { updateProfileGeneralInfo, updatePrivacySettings } from '@/core/actions/profile.actions';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Lock, User, CheckCircle, Shield } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'general' | 'photos' | 'privacy'>('general');
  const [generalState, generalAction, isGeneralPending] = useActionState(updateProfileGeneralInfo, null);
  const [privacyState, privacyAction, isPrivacyPending] = useActionState(updatePrivacySettings, null);

  // Mock photos
  const [photos, setPhotos] = useState([
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
  ]);

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">Profile Management</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Update your personal information, media gallery, and privacy settings</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-4 py-2 rounded-2xl text-emerald-600 dark:text-emerald-400 text-sm font-semibold shadow-sm">
          <CheckCircle className="h-4 w-4" /> Profile Verified
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex p-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-2xl w-full max-w-md border border-zinc-200/60 dark:border-zinc-800 shadow-sm">
        <button onClick={() => setActiveTab('general')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition ${activeTab === 'general' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-md' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}`}>
          <User className="h-4 w-4" /> General
        </button>
        <button onClick={() => setActiveTab('photos')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition ${activeTab === 'photos' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-md' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}`}>
          <Camera className="h-4 w-4" /> Photos
        </button>
        <button onClick={() => setActiveTab('privacy')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition ${activeTab === 'privacy' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-md' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}`}>
          <Lock className="h-4 w-4" /> Privacy
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'general' && (
          <motion.div key="general" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200/60 dark:border-zinc-800 p-8 md:p-10">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">General Information</h2>
            
            {generalState?.message && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`mb-6 p-4 border text-sm rounded-2xl font-medium ${generalState.success ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400' : 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800 text-rose-600 text-rose-400'}`}>
                {generalState.message}
              </motion.div>
            )}

            <form action={generalAction} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">City</label>
                  <input type="text" name="city" defaultValue="Mumbai" className="w-full px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">State</label>
                  <input type="text" name="state" defaultValue="Maharashtra" className="w-full px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Country</label>
                  <input type="text" name="country" defaultValue="India" className="w-full px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Education</label>
                  <input type="text" name="education" defaultValue="M.S. in Computer Science" className="w-full px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Profession</label>
                  <input type="text" name="profession" defaultValue="Senior Staff Software Engineer" className="w-full px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">About Me</label>
                <textarea rows={5} name="aboutMe" defaultValue="Passionate software engineer living in Mumbai. I enjoy traveling, reading history books, and exploring new cuisines. Looking for a partner who values family, shares similar intellectual curiosities, and appreciates a balanced, modern lifestyle." className="w-full px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"></textarea>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isGeneralPending} className="px-8 py-6 rounded-2xl font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 bg-gradient-to-r from-indigo-600 to-rose-500 text-white transition-all duration-300">
                  {isGeneralPending ? 'Saving Changes...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {activeTab === 'photos' && (
          <motion.div key="photos" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200/60 dark:border-zinc-800 p-8 md:p-10 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Media Gallery</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Upload premium high-resolution photos to enhance your match compatibility score</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {photos.map((url, i) => (
                <div key={i} className="relative group rounded-3xl overflow-hidden aspect-square border border-zinc-200 dark:border-zinc-800 shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="Profile Media" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-between p-4">
                    <span className="text-white text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">Primary</span>
                    <button onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))} className="text-rose-400 text-xs font-bold bg-rose-500/20 backdrop-blur-md px-3 py-1.5 rounded-full hover:bg-rose-500 hover:text-white transition">Delete</button>
                  </div>
                </div>
              ))}

              <label className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-3xl aspect-square cursor-pointer bg-zinc-50 dark:bg-zinc-800/30 transition group">
                <Camera className="h-10 w-10 text-zinc-400 group-hover:text-indigo-500 transition mb-2" />
                <span className="font-semibold text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition">Upload New Photo</span>
                <span className="text-xs text-zinc-400 mt-1">PNG, JPG up to 10MB</span>
                <input type="file" onChange={(e) => { if(e.target.files?.[0]) setPhotos([...photos, 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80']) }} className="hidden" accept="image/*" />
              </label>
            </div>
          </motion.div>
        )}

        {activeTab === 'privacy' && (
          <motion.div key="privacy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200/60 dark:border-zinc-800 p-8 md:p-10">
            <div className="mb-6 flex items-center gap-3">
              <Shield className="h-6 w-6 text-indigo-500" />
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Privacy & Safety</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Control who sees your sensitive information and media</p>
              </div>
            </div>

            {privacyState?.message && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`mb-6 p-4 border text-sm rounded-2xl font-medium ${privacyState.success ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400' : 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800 text-rose-600 text-rose-400'}`}>
                {privacyState.message}
              </motion.div>
            )}

            <form action={privacyAction} className="space-y-6">
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <label className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Blur Photos for Unverified Users</label>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Protect your photos from being seen by guest or unverified accounts</p>
                </div>
                <select name="blurPhotos" defaultValue="false" className="px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition">
                  <option value="true">Enabled</option>
                  <option value="false">Disabled</option>
                </select>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <label className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Show Mobile Number To</label>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Define who can view your direct contact information</p>
                </div>
                <select name="showPhoneTo" defaultValue="matches" className="px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition">
                  <option value="premium">Premium Members Only</option>
                  <option value="matches">Mutual Matches Only</option>
                  <option value="nobody">Nobody</option>
                </select>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isPrivacyPending} className="px-8 py-6 rounded-2xl font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 bg-gradient-to-r from-indigo-600 to-rose-500 text-white transition-all duration-300">
                  {isPrivacyPending ? 'Saving Settings...' : 'Save Privacy Settings'}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
