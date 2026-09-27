/* Base Education Type */
export type EducationBaseType = {
  id:             string;
  institution:    string;
  educationLevel: string;
  startDate:      Date;
  endDate:        Date | null;
  description:    string;
  userId:         string;
  createdAt:      Date;
  updatedAt:      Date;
};

export type CreateEducationType = Omit<
  EducationBaseType,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateEducationType = Partial<
  Omit<EducationBaseType, "id" | "userId" | "createdAt" | "updatedAt">
>;

/* Query Response: Get All Education */
export type GetAllEducationResponse = {
  success: boolean;
  data:    EducationBaseType[];
  message: string;
  error:   string | null;
  status:  number;
};

/* Query Response: Get Single Education */
export type GetSingleEducationResponse = {
  success: boolean;
  data:    EducationBaseType | null;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Create Education */
export type CreateEducationResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Update Education */
export type UpdateEducationResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Delete Education */
export type DeleteEducationResponse = {
  success: boolean;
  message: string;
  error:   string | null;
  status:  number;
};