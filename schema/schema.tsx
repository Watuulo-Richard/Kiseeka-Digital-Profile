import { z } from 'zod';

// Zod schema for profile validation
export const profileSchema = z.object({
  title: z.string()
  .min(1, 'Profile name is required')
  .max(100, 'Profile Name must be less than 100 characters'),
  bio: z.string()
  .min(1, 'Your biography must be at least 10 characters')
  .max(500, 'Your biography must be less than 500 characters'),
  profileImage: z.string().optional(),
  userId: z.string().optional(),
});

export type ProfileFormTypes = z.infer<typeof profileSchema>;

// Zod schema for experience validation
export const workExperienceSchema = z.object({
  position: z
    .string()
    .min(1, 'Position is required')
    .max(100, 'Position must be less than 100 characters'),
  company: z
    .string()
    .min(1, 'Company is required')
    .max(100, 'Company must be less than 100 characters'),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  portfolioId: z.string().optional()
});

export type WorkExperienceFormTypes = z.infer<typeof workExperienceSchema>;

// Zod schema for education validation
export const EducationSchema = z.object({
  institution: z
    .string()
    .min(1, 'Education is required')
    .max(100, 'Education must be less than 100 characters'),
  educationLevel: z
    .string()
    .min(1, 'Education level is required')
    .max(100, 'Education level must be less than 100 characters'),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  portfolioId: z.string().optional()
});

export type EducationFormTypes = z.infer<typeof EducationSchema>;

// Zod schema for projects validation

export const ProjectsSchema = z.object({
  title: z
    .string()
    .min(1, 'Project title is required')
    .max(100, 'Project title must be less than 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  url: z.string().optional(),
  portfolioId: z.string().optional(),
});

export type ProjectsFormTypes = z.infer<typeof ProjectsSchema>;

// Zod schema for skill validation
export const SkillSchema = z.object({
  name:z
  .string()
  .min(1, 'Project title is required')
  .max(100, 'Project title must be less than 100 characters'),
  level:   z.coerce.number(),
  description: z.string(),
  portfolioId:  z.string().optional()
})

export type SkillFormTypes = z.infer<typeof SkillSchema>;

// Zod schema for testimonials validation

export const TestimonialSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .max(100, 'Full name must be less than 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .transform((email) => email.toLowerCase().trim()),
  image: z.string().optional(),
  profession:z
  .string()
  .min(1, 'Profession is required')
  .max(100, 'Profession must be less than 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  portfolioId: z.string().optional(),
});

export type TestimonialFormTypes = z.infer<typeof TestimonialSchema>;
// Zod schema for email validation

export const EmailSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .transform((email) => email.toLowerCase().trim()),
  subject:z
  .string()
  .min(1, 'Profession is required')
  .max(100, 'Profession must be less than 100 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must be less than 500 characters'),
  portfolioId: z.string().optional(),
});

export type EmailFormTypes = z.infer<typeof EmailSchema>;

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
  role: z.enum(['USER', 'ADMIN']),
});

export type UserDetailTypes = z.infer<typeof userDetailsSchema>;

// Zod schema for verification validation
export const verifyUserSchema = z.object({
  token: z.string().min(6, 'Your one-time token must be 6 characters...!!!'),
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
