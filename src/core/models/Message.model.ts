import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMessage extends Document {
  matchId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  content: string;
  mediaUrl?: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  matchId: { type: Schema.Types.ObjectId, ref: 'Match', required: true, index: true },
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  content: { type: String, required: true },
  mediaUrl: { type: String },
  isRead: { type: Boolean, default: false, index: true },
}, { timestamps: true });

MessageSchema.index({ matchId: 1, createdAt: -1 });

export const MessageModel: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
