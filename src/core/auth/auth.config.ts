import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '@/core/database/connect';
import { UserModel } from '@/core/models/User.model';
import { CONFIG } from '@/constants/config';

export const authOptions: NextAuthOptions = {
  secret: CONFIG.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    newUser: '/onboarding',
    error: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        await connectToDatabase();

        const user = await UserModel.findOne({ email: credentials.email.toLowerCase() }).select('+passwordHash');
        if (!user) {
          throw new Error('Invalid email or password');
        }

        // Custom verification / password comparison
        if (user.passwordHash !== credentials.password) {
          throw new Error('Invalid email or password');
        }

        if (!user.isVerified) {
          throw new Error('Please verify your email address before logging in');
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
          subscriptionTier: user.subscriptionTier,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.isVerified = (user as any).isVerified;
        token.subscriptionTier = (user as any).subscriptionTier;
      }
      if (trigger === 'update' && session) {
        token.subscriptionTier = session.subscriptionTier ?? token.subscriptionTier;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).isVerified = token.isVerified;
        (session.user as any).subscriptionTier = token.subscriptionTier;
      }
      return session;
    },
  },
};
