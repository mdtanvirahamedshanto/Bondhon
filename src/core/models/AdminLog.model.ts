import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdminLog extends Document {
  adminId: mongoose.Types.ObjectId;
  action: 'approve_profile' | 'reject_profile' | 'suspend_user' | 'update_settings' | 'manual_subscription';
  targetUserId?: mongoose.Types.ObjectId;
  details: string;
  ipAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminLogSchema = new Schema<IAdminLog>({
  adminId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  action: { type: String, enum: ['approve_profile', 'reject_profile', 'suspend_user', 'update_settings', 'manual_subscription'], required: true },
  targetUserId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  details: { type: String, required: true },
  ipAddress: { type: String },
}, { timestamps: true });

AdminLogSchema.index({ createdAt: -1 });

export const AdminLogModel: Model<IAdminLog> = mongoose.models.AdminLog || mongoose.model<IAdminLog>('AdminLog', AdminLogSchema);
