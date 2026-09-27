/* Base Skill Type */
export type SkillBaseType = {
  id:          string;
  name:        string;
  level:       number | null;
  description: string;
  userId:      string;
  createdAt:   Date;
  updatedAt:   Date;
};

export type CreateSkillType = Omit<
  SkillBaseType,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateSkillType = Partial<
  Omit<SkillBaseType, "id" | "userId" | "createdAt" | "updatedAt">
>;

/* Query Response: Get All Skills */
export type GetAllSkillsResponse = {
  success: boolean;
  data:    SkillBaseType[];
  message: string;
  error:   string | null;
  status:  number;
};

/* Query Response: Get Single Skill */
export type GetSingleSkillResponse = {
  success: boolean;
  data:    SkillBaseType | null;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Create Skill */
export type CreateSkillResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Update Skill */
export type UpdateSkillResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Delete Skill */
export type DeleteSkillResponse = {
  success: boolean;
  message: string;
  error:   string | null;
  status:  number;
};