import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMatch extends Document {
  userA: mongoose.Types.ObjectId;
  userB: mongoose.Types.ObjectId;
  status: 'pending' | 'liked' | 'passed' | 'matched' | 'blocked';
  actionUserId: mongoose.Types.ObjectId; // User who took the last action
  compatibilityScore: number; // 0-100 percentage match
  createdAt: Date;
  updatedAt: Date;
}

const MatchSchema = new Schema<IMatch>({
  userA: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  userB: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  status: { type: String, enum: ['pending', 'liked', 'passed', 'matched', 'blocked'], default: 'pending', index: true },
  actionUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  compatibilityScore: { type: Number, default: 0 },
}, { timestamps: true });

// Compound index to ensure uniqueness of pair regardless of order
MatchSchema.index({ userA: 1, userB: 1 }, { unique: true });
MatchSchema.index({ userB: 1, status: 1 });

export const MatchModel: Model<IMatch> = mongoose.models.Match || mongoose.model<IMatch>('Match', MatchSchema);
