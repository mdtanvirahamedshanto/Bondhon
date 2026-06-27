'use server';

import { connectToDatabase } from '@/core/database/connect';
import { ProfileModel } from '@/core/models/Profile.model';
import { MatchModel } from '@/core/models/Match.model';
import { auth } from '@/core/auth/auth.config';
import { revalidatePath } from 'next/cache';
import { calculateCompatibilityScore, CandidateProfile, UserPreferences } from '@/core/services/matching.service';

export async function getDiscoveryFeed(filters: {
  minAge?: number;
  maxAge?: number;
  religion?: string;
  education?: string;
  city?: string;
}) {
  try {
    await connectToDatabase();

    // Mock rich premium profiles
    const rawProfiles: CandidateProfile[] = [
      {
        id: 'prof_1', name: 'Ananya Verma', age: 27, height: 168, religion: 'Hindu',
        profession: 'UI/UX Designer', city: 'Mumbai', country: 'India', education: 'M.Des in Design',
        incomeRange: 'mid', lifestyle: { diet: 'veg', drinking: 'no', smoking: 'no' }
      },
      {
        id: 'prof_2', name: 'Rohan Mehta', age: 29, height: 180, religion: 'Hindu',
        profession: 'Investment Banker', city: 'New York', country: 'USA', education: 'MBA in Finance',
        incomeRange: 'high', lifestyle: { diet: 'non-veg', drinking: 'occasionally', smoking: 'no' }
      },
      {
        id: 'prof_3', name: 'Priya Sen', age: 26, height: 165, religion: 'Hindu',
        profession: 'Architect', city: 'Bengaluru', country: 'India', education: 'B.Arch',
        incomeRange: 'mid', lifestyle: { diet: 'veg', drinking: 'no', smoking: 'no' }
      },
      {
        id: 'prof_4', name: 'Kabir Kapoor', age: 31, height: 182, religion: 'Hindu',
        profession: 'Product Manager', city: 'London', country: 'UK', education: 'M.S. in Management',
        incomeRange: 'high', lifestyle: { diet: 'non-veg', drinking: 'yes', smoking: 'occasionally' }
      },
    ];

    // Define mock current user preferences to drive the AI score
    const currentUserPreferences: UserPreferences = {
      targetMinAge: 25,
      targetMaxAge: 32,
      targetReligion: 'Hindu',
      targetEducationLevel: 'Masters',
      targetIncomeRange: 'any',
      targetLifestyle: { diet: 'any' }
    };

    // Filter logic
    let filtered = [...rawProfiles];
    if (filters.minAge) filtered = filtered.filter(p => p.age >= filters.minAge!);
    if (filters.maxAge) filtered = filtered.filter(p => p.age <= filters.maxAge!);
    if (filters.city) filtered = filtered.filter(p => p.city.toLowerCase().includes(filters.city!.toLowerCase()));
    if (filters.religion) filtered = filtered.filter(p => p.religion.toLowerCase() === filters.religion!.toLowerCase());

    // Apply AI Compatibility Scoring & Sort
    const scoredProfiles = filtered.map(profile => {
      const score = calculateCompatibilityScore(profile, currentUserPreferences);
      return {
        ...profile,
        photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80', // Fallback for UI
        compatibilityScore: score,
        aboutMe: 'Looking for a genuine connection.'
      };
    }).sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    return { success: true, data: scoredProfiles };
  } catch (error: any) {
    console.error('❌ Get feed error:', error);
    return { success: false, message: error.message || 'Failed to get discovery feed', data: [] };
  }
}

export async function expressInterest(profileId: string, action: 'like' | 'pass') {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, message: 'Unauthorized. Please log in.' };
    }

    await connectToDatabase();

    // Simulate match creation
    console.log(`✨ [EXPRESS INTEREST]: Current user expressed ${action} on profile ${profileId}`);

    revalidatePath('/dashboard');
    revalidatePath('/matches');

    return { success: true, message: action === 'like' ? 'Interest expressed successfully!' : 'Profile passed.' };
  } catch (error: any) {
    console.error('❌ Express interest error:', error);
    return { success: false, message: error.message || 'Failed to express interest' };
  }
}
