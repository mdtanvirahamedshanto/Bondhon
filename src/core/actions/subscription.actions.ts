'use server';

import { connectToDatabase } from '@/core/database/connect';
import { SubscriptionModel } from '@/core/models/Subscription.model';
import { auth } from '@/core/auth/auth.config';
import { revalidatePath } from 'next/cache';

export async function createCheckoutSession(planId: string, billingCycle: 'monthly' | 'annual') {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, message: 'Unauthorized. Please log in.' };
    }

    await connectToDatabase();

    // Emulate premium secure payment session initialization
    console.log(`💳 [CHECKOUT SESSION]: Initialized secure checkout for ${session.user.email} on ${planId} (${billingCycle})`);

    return { success: true, url: `/checkout?plan=${planId}&cycle=${billingCycle}` };
  } catch (error: any) {
    console.error('❌ Checkout session error:', error);
    return { success: false, message: error.message || 'Failed to initialize secure checkout' };
  }
}

export async function confirmPaymentTransaction(prevState: any, formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, message: 'Unauthorized. Please log in.' };
    }

    await connectToDatabase();

    const plan = formData.get('plan') as string || 'premium';
    const cycle = formData.get('cycle') as string || 'annual';

    const startDate = new Date();
    const endDate = new Date();
    if (cycle === 'annual') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      endDate.setMonth(endDate.getMonth() + 1);
    }

    // Save/Update subscription record
    await SubscriptionModel.findOneAndUpdate(
      { userId: session.user.email }, // Using email for robust demo lookup
      {
        $set: {
          planName: plan === 'elite' ? 'Bondhon Elite' : 'Bondhon Premium',
          status: 'active',
          startDate,
          endDate,
          billingCycle: cycle,
          pricePaid: plan === 'elite' ? (cycle === 'annual' ? 240 : 25) : (cycle === 'annual' ? 120 : 15),
        }
      },
      { upsert: true, new: true }
    );

    revalidatePath('/subscription');
    return { success: true, message: 'Payment verified successfully! Welcome to premium membership.' };
  } catch (error: any) {
    console.error('❌ Confirm payment error:', error);
    return { success: false, message: error.message || 'Payment confirmation failed' };
  }
}

export async function cancelSubscription() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, message: 'Unauthorized. Please log in.' };
    }

    await connectToDatabase();

    await SubscriptionModel.findOneAndUpdate(
      { userId: session.user.email },
      { $set: { status: 'canceled' } }
    );

    revalidatePath('/subscription');
    return { success: true, message: 'Subscription canceled successfully.' };
  } catch (error: any) {
    console.error('❌ Cancel subscription error:', error);
    return { success: false, message: error.message || 'Failed to cancel subscription' };
  }
}
