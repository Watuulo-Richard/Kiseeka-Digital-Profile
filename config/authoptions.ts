import { compare } from 'bcrypt-ts';
// import { prismaClient } from '@/prisma/db';
import { NextAuthOptions } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { prismaClient } from '@/lib/db';
import { Prisma } from '@/lib/generated/prisma';

// more providers at https://next-auth.js.org/providers
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(Prisma) as Adapter,
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/logIn-page',
  },
  providers: [
    // EmailProvider({
    //   server: process.env.GMAIL_EMAIL_SERVER || "", // any SMTP server will work
    //   from: process.env.EMAIL_FROM || "",
    //   // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID || '',
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    //   httpOptions: {
    //     timeout: 10000,
    //   },
    //   profile(profile) {
    //     return {
    //       id: profile.sub,
    //       // name: profile.name || `${profile.given_name}, ${profile.family_name}`,
    //       // firstName: profile.family_name,
    //       firstName: profile.given_name,
    //       lastName: profile.family_name,
    //       email: profile.email,
    //       image: profile.picture,
    //       role: 'USER',
    //       token: Math.floor(Math.random() * 1000000),
    //       // isVerified: true, // Add this property as required by your User type
    //     };
    //   },
    // }),
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
          console.log(
            'Authorize function called with credentials:',
            credentials,
          );
          // Check if user credentials are Correct
          if (!credentials?.email || !credentials?.password) {
            throw { error: 'No Inputs Found', status: 401 };
          }
          console.log('Pass 1 checked ');
          //Check if user exists
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
          //Check if Password is correct
          if (existingUser && existingUser.password) {
            // if user exists and password exists
            passwordMatch = await compare(
              credentials.password,
              existingUser.password,
            );
          }
          if (!passwordMatch) {
            console.log('Password incorrect');
            throw { error: 'Password Incorrect', status: 401 };
          }
          console.log('Pass 3 Checked');
          const user = {
            id: existingUser.id,
            fullName: existingUser.fullName,
            email: existingUser.email ?? '', // Ensure email is always a string
            role: existingUser.role,
            // isVerified: existingUser.isVerified ?? false,
          };
          //
          console.log('User Compiled');
          console.log(user);
          return user;
        } catch (error) {
          console.log('aLL Failed');
          console.log(error);
          throw { error: 'Something went wrong', status: 401 };
        }
      },
    }),
  ],
  callbacks: {
    // async signIn({ user, account, profile }) {
    //   if (account?.provider === 'google') {
    //     try {
    //       // Check if user already exists
    //       const existingUser = await prismaClient.user.findUnique({
    //         where: { email: user.email! },
    //       });

    //       if (existingUser) {
    //         // Link Google account to existing user
    //         await prismaClient.account.upsert({
    //           where: {
    //             provider_providerAccountId: {
    //               provider: account.provider,
    //               providerAccountId: account.providerAccountId,
    //             },
    //           },
    //           update: {
    //             access_token: account.access_token,
    //             expires_at: account.expires_at,
    //             refresh_token: account.refresh_token,
    //             // Update other account fields as needed
    //           },
    //           create: {
    //             userId: existingUser.id,
    //             provider: account.provider,
    //             providerAccountId: account.providerAccountId,
    //             access_token: account.access_token,
    //             expires_at: account.expires_at,
    //             refresh_token: account.refresh_token,
    //             type: account.type,
    //           },
    //         });
    //         return true;
    //       } else {
    //         // Create new user
    //         await prismaClient.user.create({
    //           data: {
    //             email: user.email!,
    //             // fullName: user.fullName || profile?.given_name || '',
    //             fullName: user.fullName || profile?.family_name || '',
    //             image: user.image,
    //             role: 'USER', // Use "USER" instead of "ADMIN" for new Google users
    //           },
    //         });
    //         return true;
    //       }
    //     } catch (error) {
    //       console.error('Error in signIn callback:', error);
    //       return false;
    //     }
    //   }
    //   return true;
    // },
    async jwt({ token, user }) {
      // Here We Are Checking, Does The User Exist In The DataBase...?
      const dbUser = await prismaClient.user.findFirst({
        where: { email: token?.email ?? '' },
      });
      // So If He Is Not In The DataBase We Take The Newly SignedIn Or LoggedIn User
      if (!dbUser) {
        token.id = user!.id;
        return token;
      }
      
      // Here We Are Destructuring The User From The DataBase Who Is In The Token
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
      // console.log(token, '1111111111111')
      // console.log(session, '000000000000')
      return session;
    },
  },
};

