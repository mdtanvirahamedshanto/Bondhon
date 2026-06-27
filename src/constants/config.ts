import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET is required"),
  NEXTAUTH_URL: z.string().url().optional(),
  RESEND_API_KEY: z.string().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  UPLOADTHING_TOKEN: z.string().optional(),
});

// Process env validation
const getEnv = () => {
  if (typeof window !== 'undefined') return {} as z.infer<typeof envSchema>;
  
  const parsed = envSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://admin:adminpassword@localhost:27017/bondhon?authSource=admin',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'bondhon-super-secret-jwt-key-2026',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    RESEND_API_KEY: process.env.RESEND_API_KEY || 're_placeholder_key',
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || 'placeholder_cloud',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || 'placeholder_key',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || 'placeholder_secret',
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN || 'placeholder_token',
  });

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.format());
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
};

export const CONFIG = getEnv();

export const APP_INFO = {
  name: 'Bondhon',
  description: 'Premium Matrimony Platform for Modern Relationships',
  version: '0.1.0',
};
