/* Base Work Experience Type */
export type WorkExperienceBaseType = {
  id:          string;
  position:    string;
  company:     string;
  startDate:   Date;
  endDate:     Date;
  description: string;
  userId: string;
  createdAt:   Date;
  updatedAt:   Date;
};

export type CreateWorkExperienceType = Omit<
  WorkExperienceBaseType,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateWorkExperienceType = Partial<
  Omit<WorkExperienceBaseType, "id" | "userId" | "createdAt" | "updatedAt">
>;

/* Query Response: Get All Work Experience */
export type GetAllWorkExperienceResponse = {
  success: boolean;
  data:    WorkExperienceBaseType[];
  message: string;
  error:   string | null;
  status:  number;
};

/* Query Response: Get Single Work Experience */
export type GetSingleWorkExperienceResponse = {
  success: boolean;
  data:    WorkExperienceBaseType | null;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Create Work Experience */
export type CreateWorkExperienceResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Update Work Experience */
export type UpdateWorkExperienceResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Delete Work Experience */
export type DeleteWorkExperienceResponse = {
  success: boolean;
  message: string;
  error:   string | null;
  status:  number;
};