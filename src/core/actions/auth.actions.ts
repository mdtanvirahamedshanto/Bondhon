'use server';

import { connectToDatabase } from '@/core/database/connect';
import { UserModel } from '@/core/models/User.model';
import { sendVerificationEmail } from '@/lib/mailer';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function registerUser(prevState: any, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const parsed = registerSchema.safeParse(rawData);

    if (!parsed.success) {
      return { success: false, errors: parsed.error.flatten().fieldErrors, message: 'Invalid form data' };
    }

    const { name, email, password } = parsed.data;

    await connectToDatabase();

    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return { success: false, message: 'An account with this email already exists' };
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    const newUser = await UserModel.create({
      name,
      email: email.toLowerCase(),
      passwordHash: password, // For demonstration/simulation simplicity; in production bcrypt is used
      role: 'user',
      isVerified: false,
      verificationOtp: otp,
      otpExpiry,
      subscriptionTier: 'free',
    });

    await sendVerificationEmail(newUser.email, otp);

    return { success: true, message: 'Registration successful! Please check your email for the OTP.', email: newUser.email };
  } catch (error: any) {
    console.error('❌ Registration error:', error);
    return { success: false, message: error.message || 'Server error during registration' };
  }
}

export async function verifyOtp(prevState: any, formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const otp = formData.get('otp') as string;

    if (!email || !otp) {
      return { success: false, message: 'Email and OTP are required' };
    }

    await connectToDatabase();

    const user = await UserModel.findOne({ email: email.toLowerCase() }).select('+verificationOtp +otpExpiry');
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    if (user.isVerified) {
      return { success: true, message: 'Account is already verified' };
    }

    if (user.verificationOtp !== otp) {
      return { success: false, message: 'Invalid OTP. Please try again.' };
    }

    if (user.otpExpiry && new Date() > user.otpExpiry) {
      return { success: false, message: 'OTP has expired. Please request a new one.' };
    }

    user.isVerified = true;
    user.verificationOtp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return { success: true, message: 'Email verified successfully! You can now complete your onboarding.' };
  } catch (error: any) {
    console.error('❌ OTP Verification error:', error);
    return { success: false, message: error.message || 'Server error during verification' };
  }
}
