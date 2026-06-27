import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProfile extends Document {
  userId: mongoose.Types.ObjectId;
  gender: 'male' | 'female';
  dateOfBirth: Date;
  age: number;
  height: number; // in cm
  maritalStatus: 'never_married' | 'divorced' | 'widowed' | 'awaiting_divorce';
  motherTongue: string;
  religion: string;
  caste?: string;
  subCaste?: string;
  city: string;
  state: string;
  country: string;
  education: string;
  profession: string;
  annualIncome?: string;
  aboutMe: string;
  hobbies: string[];
  photos: {
    url: string;
    isPrimary: boolean;
    isApproved: boolean;
  }[];
  partnerPreferences: {
    minAge?: number;
    maxAge?: number;
    minHeight?: number;
    maritalStatus?: string[];
    education?: string[];
    profession?: string[];
    religions?: string[];
  };
  privacySettings: {
    blurPhotos: boolean;
    showPhoneTo: 'premium' | 'matches' | 'nobody';
  };
  phoneNumber?: string;
  isVerifiedByAdmin: boolean;
  verificationDocumentUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  gender: { type: String, enum: ['male', 'female'], required: true, index: true },
  dateOfBirth: { type: Date, required: true },
  age: { type: Number, required: true, index: true },
  height: { type: Number, required: true },
  maritalStatus: { type: String, enum: ['never_married', 'divorced', 'widowed', 'awaiting_divorce'], required: true },
  motherTongue: { type: String, required: true },
  religion: { type: String, required: true, index: true },
  caste: { type: String },
  subCaste: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true, index: true },
  education: { type: String, required: true },
  profession: { type: String, required: true },
  annualIncome: { type: String },
  aboutMe: { type: String, required: true, maxlength: 1000 },
  hobbies: [{ type: String }],
  photos: [{
    url: { type: String, required: true },
    isPrimary: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: true }
  }],
  partnerPreferences: {
    minAge: { type: Number },
    maxAge: { type: Number },
    minHeight: { type: Number },
    maritalStatus: [{ type: String }],
    education: [{ type: String }],
    profession: [{ type: String }],
    religions: [{ type: String }],
  },
  privacySettings: {
    blurPhotos: { type: Boolean, default: false },
    showPhoneTo: { type: String, enum: ['premium', 'matches', 'nobody'], default: 'matches' },
  },
  phoneNumber: { type: String },
  isVerifiedByAdmin: { type: Boolean, default: false, index: true },
  verificationDocumentUrl: { type: String },
}, { timestamps: true });

ProfileSchema.index({ gender: 1, age: 1, religion: 1, country: 1 });
ProfileSchema.index({ userId: 1 });

export const ProfileModel: Model<IProfile> = mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);
