import { User } from "@prisma/client";

/* Base Profile Type (Prisma User) */
export type ProfileBaseType = User;

export type UpdateProfileType = Partial<
  Omit<ProfileBaseType, "id" | "createdAt" | "updatedAt">
>;

/* Query Response: Get All Profiles */
export type GetAllProfilesResponse = {
  success: boolean;
  data:    ProfileBaseType[];
  message: string;
  error:   string | null;
  status:  number;
};

/* Query Response: Get Single Profile */
export type GetSingleProfileResponse = {
  success: boolean;
  data:    ProfileBaseType | null;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Create Profile */
export type CreateProfileResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Update Profile */
export type UpdateProfileResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Delete Profile */
export type DeleteProfileResponse = {
  success: boolean;
  message: string;
  error:   string | null;
  status:  number;
};