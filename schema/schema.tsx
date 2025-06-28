import { z } from 'zod';

// model Portfolio {
//   id            String      @id @default(cuid())
//   title         String
//   bio           String
//   profileImage  String?
//   user          User        @relation(fields: [userId], references: [id])
//   userId        String      @unique
//   workExperience WorkExperience[]
//   education     Education[]
//   project       Project[]
//   skill         Skill[]
//   award         Award[]
//   createdAt     DateTime    @default(now())
//   updatedAt     DateTime    @updatedAt
// }

// Zod schema for profile validation
export const profileSchema = z.object({
  title: z
    .string()
    .min(1, 'Profile name is required')
    .max(10, 'Profile Name must be less than 100 characters'),
  bio: z
    .string()
    .min(10, 'Your biography must be at least 10 characters')
    .max(500, 'Your biography must be less than 500 characters'),
  profileImage: z.string().url('Please enter a valid image URL'),
});

export type ProfileFormTypes = z.infer<typeof profileSchema>;

// Zod schema for user validation
export const userDetailsSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Profile name is required')
    .max(100, 'Profile Name must be less than 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .transform((email) => email.toLowerCase().trim()),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(128, 'Password must be less than 128 characters')
    .refine(
      (password) => /[a-z]/.test(password),
      'Password must contain at least one lowercase letter',
    )
    .refine(
      (password) => /[A-Z]/.test(password),
      'Password must contain at least one uppercase letter',
    )
    .refine(
      (password) => /\d/.test(password),
      'Password must contain at least one number',
    )
    .refine(
      (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      'Password must contain at least one special character',
    )
    .refine(
      (password) => !/\s/.test(password),
      'Password cannot contain spaces',
    ),
  role: z.enum(['USER', 'ADMIN'])
});

export type UserDetailTypes = z.infer<typeof userDetailsSchema>;

// Zod schema for verification validation
export const verifyUserSchema = z.object({
  token: z
    .string()
    .min(6, 'Your one-time token must be 6 characters...!!!')
});

export type UserVerificationTypes = z.infer<typeof verifyUserSchema>;

// Zod schema for login validation
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .transform((email) => email.toLowerCase().trim()),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(128, 'Password must be less than 128 characters')
    .refine(
      (password) => /[a-z]/.test(password),
      'Password must contain at least one lowercase letter',
    )
    .refine(
      (password) => /[A-Z]/.test(password),
      'Password must contain at least one uppercase letter',
    )
    .refine(
      (password) => /\d/.test(password),
      'Password must contain at least one number',
    )
    .refine(
      (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      'Password must contain at least one special character',
    )
    .refine(
      (password) => !/\s/.test(password),
      'Password cannot contain spaces',
    ),
});

export type UserLoginTypes = z.infer<typeof loginSchema>;
