import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISubscription extends Document {
  userId: mongoose.Types.ObjectId;
  tier: 'free' | 'premium' | 'vip';
  status: 'active' | 'canceled' | 'expired';
  paymentGateway: 'stripe' | 'razorpay' | 'sslcommerz' | 'manual';
  transactionId?: string;
  amountPaid: number;
  currency: string;
  startDate: Date;
  endDate: Date;
  features: {
    dailyProfileLimit: number;
    canViewPhoneNumbers: boolean;
    directMessaging: boolean;
    priorityMatchListing: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  tier: { type: String, enum: ['free', 'premium', 'vip'], required: true },
  status: { type: String, enum: ['active', 'canceled', 'expired'], default: 'active', index: true },
  paymentGateway: { type: String, enum: ['stripe', 'razorpay', 'sslcommerz', 'manual'], required: true },
  transactionId: { type: String, unique: true, sparse: true },
  amountPaid: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true, index: true },
  features: {
    dailyProfileLimit: { type: Number, default: 10 },
    canViewPhoneNumbers: { type: Boolean, default: false },
    directMessaging: { type: Boolean, default: false },
    priorityMatchListing: { type: Boolean, default: false },
  }
}, { timestamps: true });

SubscriptionSchema.index({ userId: 1, status: 1 });

export const SubscriptionModel: Model<ISubscription> = mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
