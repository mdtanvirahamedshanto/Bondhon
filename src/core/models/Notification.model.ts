import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INotification extends Document {
  recipientId: mongoose.Types.ObjectId;
  senderId?: mongoose.Types.ObjectId;
  type: 'match_liked' | 'mutual_match' | 'new_message' | 'profile_verified' | 'subscription_expiring';
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  recipientId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  senderId: { type: Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['match_liked', 'mutual_match', 'new_message', 'profile_verified', 'subscription_expiring'], required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  link: { type: String },
  isRead: { type: Boolean, default: false, index: true },
}, { timestamps: true });

NotificationSchema.index({ recipientId: 1, isRead: 1, createdAt: -1 });

export const NotificationModel: Model<INotification> = mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);
