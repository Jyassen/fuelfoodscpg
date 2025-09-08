import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db/prisma';
import { getStripe } from '@/lib/stripe/server';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email.toLowerCase() },
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              emailVerified: true,
              hashedPassword: true,
              stripeCustomerId: true,
            },
          });

          if (!user || !user.hashedPassword) {
            return null;
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          if (!isValidPassword) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`.trim(),
            firstName: user.firstName,
            lastName: user.lastName,
            emailVerified: user.emailVerified,
            stripeCustomerId: user.stripeCustomerId,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // For OAuth providers, create Stripe customer if needed
      if (account?.provider === 'google' && user.email) {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
            select: { stripeCustomerId: true },
          });

          if (!existingUser?.stripeCustomerId) {
            const stripe = getStripe();
            const customer = await stripe.customers.create({
              email: user.email,
              name: user.name || undefined,
              metadata: {
                authProvider: account.provider,
                userId: user.id || '',
              },
            });

            await prisma.user.update({
              where: { email: user.email },
              data: {
                stripeCustomerId: customer.id,
                firstName: user.name?.split(' ')[0] || null,
                lastName: user.name?.split(' ').slice(1).join(' ') || null,
              },
            });
          }
        } catch (error) {
          console.error('Error creating Stripe customer:', error);
          // Don't fail sign-in if Stripe customer creation fails
        }
      }

      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.emailVerified = user.emailVerified;
        token.stripeCustomerId = user.stripeCustomerId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.emailVerified = token.emailVerified as Date | null;
        session.user.stripeCustomerId = token.stripeCustomerId as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signUp: '/register',
    error: '/auth/error',
  },
  cookies: {
    sessionToken: {
      name: 'fuelfood.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' ? '.fuelfoodscpg.com' : undefined,
      },
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log(`User signed in: ${user.email} via ${account?.provider}`);
      
      if (isNewUser) {
        // Track new user registration
        console.log(`New user registered: ${user.email}`);
      }
    },
    async signOut({ session, token }) {
      console.log(`User signed out: ${session?.user?.email}`);
    },
  },
  debug: process.env.NODE_ENV === 'development',
};