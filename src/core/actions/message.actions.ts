'use server';

import { connectToDatabase } from '@/core/database/connect';
import { MessageModel } from '@/core/models/Message.model';
import { NotificationModel } from '@/core/models/Notification.model';
import { auth } from '@/core/auth/auth.config';
import { revalidatePath } from 'next/cache';

export async function getConversationHistory(matchId: string) {
  try {
    await connectToDatabase();

    // Emulate rich high-fidelity conversation history for premium display
    const mockMessages = [
      { id: 'msg_1', senderId: 'prof_1', content: 'Hi there! I noticed we share a passion for design and modern aesthetics.', timestamp: '10:30 AM', isMe: false },
      { id: 'msg_2', senderId: 'me', content: 'Hello Ananya! Yes, absolutely. I loved reading your bio. How has your week been in Mumbai?', timestamp: '10:32 AM', isMe: true },
      { id: 'msg_3', senderId: 'prof_1', content: 'It has been wonderful! Just working on a few UI projects and planning a weekend trip to Alibaug.', timestamp: '10:33 AM', isMe: false },
    ];

    return { success: true, data: mockMessages };
  } catch (error: any) {
    console.error('❌ Get messages error:', error);
    return { success: false, message: error.message || 'Failed to fetch messages', data: [] };
  }
}

export async function sendMessage(matchId: string, content: string) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, message: 'Unauthorized. Please log in.' };
    }

    await connectToDatabase();

    // Log simulated message dispatch
    console.log(`💬 [SEND MESSAGE]: Sent message to match ${matchId}: "${content}"`);

    revalidatePath('/messages');
    return { success: true, message: { id: `msg_${Date.now()}`, senderId: 'me', content, timestamp: 'Just now', isMe: true } };
  } catch (error: any) {
    console.error('❌ Send message error:', error);
    return { success: false, message: error.message || 'Failed to send message' };
  }
}

export async function getNotifications() {
  try {
    await connectToDatabase();

    const mockNotifications = [
      { id: 'notif_1', type: 'mutual_match', title: 'New Mutual Match!', message: 'You and Ananya Verma liked each other. Start a conversation now.', time: '10m ago', isRead: false, link: '/messages?userId=prof_1' },
      { id: 'notif_2', type: 'match_liked', title: 'Someone liked your profile', message: 'Rohan Mehta has expressed interest in your profile.', time: '2h ago', isRead: false, link: '/dashboard' },
      { id: 'notif_3', type: 'profile_verified', title: 'Profile Verified', message: 'Your government ID verification was approved by our moderation team.', time: '1d ago', isRead: true, link: '/profile' },
    ];

    return { success: true, data: mockNotifications };
  } catch (error: any) {
    console.error('❌ Get notifications error:', error);
    return { success: false, message: error.message || 'Failed to fetch notifications', data: [] };
  }
}
