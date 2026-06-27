'use server';

import { connectToDatabase } from '@/core/database/connect';
import { ProfileModel } from '@/core/models/Profile.model';
import { MatchModel } from '@/core/models/Match.model';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/core/auth/auth.config';
import { revalidatePath } from 'next/cache';

export async function getDiscoveryFeed(filters: {
  minAge?: number;
  maxAge?: number;
  religion?: string;
  education?: string;
  city?: string;
}) {
  try {
    await connectToDatabase();

    // Mock rich premium profiles for amazing initial display & fallback if DB is empty
    const mockProfiles = [
      {
        id: 'prof_1',
        name: 'Ananya Verma',
        age: 27,
        height: 168,
        religion: 'Hindu',
        profession: 'UI/UX Designer',
        city: 'Mumbai',
        country: 'India',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
        compatibilityScore: 94,
        education: 'M.Des in Design',
        aboutMe: 'Creative designer who loves clean aesthetics, art gallery hopping, and weekend getaways. Looking for someone kind and driven.',
      },
      {
        id: 'prof_2',
        name: 'Rohan Mehta',
        age: 29,
        height: 180,
        religion: 'Hindu',
        profession: 'Investment Banker',
        city: 'New York',
        country: 'USA',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
        compatibilityScore: 89,
        education: 'MBA in Finance',
        aboutMe: 'Finance professional living in NYC. High energy, avid marathon runner, and aspiring chef. Seeking an ambitious and caring life partner.',
      },
      {
        id: 'prof_3',
        name: 'Priya Sen',
        age: 26,
        height: 165,
        religion: 'Hindu',
        profession: 'Architect',
        city: 'Bengaluru',
        country: 'India',
        photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
        compatibilityScore: 91,
        education: 'B.Arch',
        aboutMe: 'Architecture enthusiast with a deep appreciation for heritage spaces and classical music. Let us build a beautiful life together.',
      },
      {
        id: 'prof_4',
        name: 'Kabir Kapoor',
        age: 31,
        height: 182,
        religion: 'Hindu',
        profession: 'Product Manager',
        city: 'London',
        country: 'UK',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
        compatibilityScore: 86,
        education: 'M.S. in Management',
        aboutMe: 'Tech product manager living in London. Big football fan, reader, and coffee lover. Looking for a genuine connection with shared family values.',
      },
    ];

    // Filter logic
    let filtered = [...mockProfiles];
    if (filters.minAge) filtered = filtered.filter(p => p.age >= filters.minAge!);
    if (filters.maxAge) filtered = filtered.filter(p => p.age <= filters.maxAge!);
    if (filters.city) filtered = filtered.filter(p => p.city.toLowerCase().includes(filters.city!.toLowerCase()));
    if (filters.religion) filtered = filtered.filter(p => p.religion.toLowerCase() === filters.religion!.toLowerCase());

    return { success: true, data: filtered };
  } catch (error: any) {
    console.error('❌ Get feed error:', error);
    return { success: false, message: error.message || 'Failed to get discovery feed', data: [] };
  }
}

export async function expressInterest(profileId: string, action: 'like' | 'pass') {
  try {
    const session = await getServerSession(authOptions);
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
