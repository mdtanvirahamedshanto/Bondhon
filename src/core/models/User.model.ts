import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash?: string;
  role: 'user' | 'admin' | 'moderator';
  isVerified: boolean;
  verificationOtp?: string;
  otpExpiry?: Date;
  profileId?: mongoose.Types.ObjectId;
  subscriptionTier: 'free' | 'premium' | 'vip';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  passwordHash: { type: String, select: false },
  role: { type: String, enum: ['user', 'admin', 'moderator'], default: 'user' },
  isVerified: { type: Boolean, default: false },
  verificationOtp: { type: String, select: false },
  otpExpiry: { type: Date, select: false },
  profileId: { type: Schema.Types.ObjectId, ref: 'Profile', index: true },
  subscriptionTier: { type: String, enum: ['free', 'premium', 'vip'], default: 'free' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

export const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
