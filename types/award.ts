/* Base Award Type */
export type AwardBaseType = {
  id:           string;
  title:        string;
  organization: string | null;
  year:         number | null;
  userId:       string;
  createdAt:    Date;
  updatedAt:    Date;
};

export type CreateAwardType = Omit<
  AwardBaseType,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateAwardType = Partial<
  Omit<AwardBaseType, "id" | "userId" | "createdAt" | "updatedAt">
>;

/* Query Response: Get All Awards */
export type GetAllAwardsResponse = {
  success: boolean;
  data:    AwardBaseType[];
  message: string;
  error:   string | null;
  status:  number;
};

/* Query Response: Get Single Award */
export type GetSingleAwardResponse = {
  success: boolean;
  data:    AwardBaseType | null;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Create Award */
export type CreateAwardResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Update Award */
export type UpdateAwardResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Delete Award */
export type DeleteAwardResponse = {
  success: boolean;
  message: string;
  error:   string | null;
  status:  number;
};