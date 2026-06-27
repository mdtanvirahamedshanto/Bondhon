'use server';

import { connectToDatabase } from '@/core/database/connect';
import { ProfileModel } from '@/core/models/Profile.model';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/core/auth/auth.config';
import { revalidatePath } from 'next/cache';

export async function updateProfileGeneralInfo(prevState: any, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, message: 'Unauthorized. Please log in.' };
    }

    await connectToDatabase();

    const rawData = Object.fromEntries(formData.entries());
    const updateData = {
      city: rawData.city,
      state: rawData.state,
      country: rawData.country,
      education: rawData.education,
      profession: rawData.profession,
      annualIncome: rawData.annualIncome,
      aboutMe: rawData.aboutMe,
    };

    // Find profile by user email / simulate user object lookup
    await ProfileModel.findOneAndUpdate(
      {}, // For simulation demo, matches current user profile
      { $set: updateData },
      { new: true, upsert: true }
    );

    revalidatePath('/profile');
    return { success: true, message: 'Profile updated successfully!' };
  } catch (error: any) {
    console.error('❌ Update profile error:', error);
    return { success: false, message: error.message || 'Failed to update profile' };
  }
}

export async function updatePrivacySettings(prevState: any, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, message: 'Unauthorized. Please log in.' };
    }

    await connectToDatabase();

    const blurPhotos = formData.get('blurPhotos') === 'true';
    const showPhoneTo = formData.get('showPhoneTo') as string;

    await ProfileModel.findOneAndUpdate(
      {},
      { $set: { 'privacySettings.blurPhotos': blurPhotos, 'privacySettings.showPhoneTo': showPhoneTo } },
      { new: true, upsert: true }
    );

    revalidatePath('/profile');
    return { success: true, message: 'Privacy settings updated successfully!' };
  } catch (error: any) {
    console.error('❌ Update privacy error:', error);
    return { success: false, message: error.message || 'Failed to update privacy settings' };
  }
}
