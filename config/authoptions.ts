import { compare } from 'bcrypt-ts';
import { NextAuthOptions } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { prismaClient } from '@/lib/db';
// Remove this line - you don't need the Prisma type here
// import { Prisma } from '@/lib/generated/prisma';

export const authOptions: NextAuthOptions = {
  // Fix: Pass prismaClient instead of Prisma
  adapter: PrismaAdapter(prismaClient as any) as Adapter,
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in-page',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
      httpOptions: {
        timeout: 10000,
      },
      profile(profile) {
        return {
          id: profile.sub,
          fullName: profile.name || `${profile.given_name}, ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
          role: 'USER',
          token: Math.floor(Math.random() * 1000000),
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'watuulorichard@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          console.log('Authorize function called with credentials:', credentials);
          
          if (!credentials?.email || !credentials?.password) {
            throw { error: 'No Inputs Found', status: 401 };
          }
          
          console.log('Pass 1 checked');
          
          const existingUser = await prismaClient.user.findUnique({
            where: { email: credentials.email },
          });

          if (!existingUser) {
            console.log('No user found');
            throw { error: 'No user found', status: 401 };
          }

          console.log('Pass 2 Checked');
          console.log(existingUser);
          
          let passwordMatch: boolean = false;
          
          if (existingUser && existingUser.password) {
            passwordMatch = await compare(credentials.password, existingUser.password);
          }
          
          if (!passwordMatch) {
            console.log('Password incorrect');
            throw { error: 'Password Incorrect', status: 401 };
          }
          
          console.log('Pass 3 Checked');
          
          const user = {
            id: existingUser.id,
            fullName: existingUser.fullName,
            email: existingUser.email ?? '',
            role: existingUser.role,
          };
          
          console.log('User Compiled');
          console.log(user);
          return user;
        } catch (error) {
          console.log('All Failed');
          console.log(error);
          throw { error: 'Something went wrong', status: 401 };
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          const existingUser = await prismaClient.user.findUnique({
            where: { email: user.email! },
          });

          if (existingUser) {
            // Link Google account to existing user
            await prismaClient.account.upsert({
              where: {
                provider_providerAccountId: {
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                },
              },
              update: {
                access_token: account.access_token,
                expires_at: account.expires_at,
                refresh_token: account.refresh_token,
              },
              create: {
                userId: existingUser.id,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                expires_at: account.expires_at,
                refresh_token: account.refresh_token,
                type: account.type,
              },
            });
            return true;
          } else {
            // Create new user
            await prismaClient.user.create({
              data: {
                email: user.email!,
                fullName: user.fullName || profile?.given_name || '',
                image: user.image,
                role: 'USER',
                password: '',
                token: Math.floor(Math.random() * 1000000),
              },
            });
            return true;
          }
        } catch (error) {
          console.error('Error in signIn callback:', error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      const dbUser = await prismaClient.user.findFirst({
        where: { email: token?.email ?? '' },
      });
      
      if (!dbUser) {
        token.id = user!.id;
        return token;
      }
      
      return {
        id: dbUser.id,
        fullName: dbUser.fullName,
        email: dbUser.email,
        role: dbUser.role,
        picture: dbUser.image,
      } as JWT;
    },
    
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.fullName;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role;
      }
      return session;
    },
  },
};