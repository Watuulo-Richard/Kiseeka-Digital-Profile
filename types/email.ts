/* Base Email Type */
export type EmailBaseType = {
  id:        string;
  name:      string;
  email:     string;
  subject:   string;
  message:   string;
  userId:    string;
  createdAt: Date;
  updatedAt: Date | null;
};

export type CreateEmailType = Omit<
  EmailBaseType,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateEmailType = Partial<
  Omit<EmailBaseType, "id" | "userId" | "createdAt" | "updatedAt">
>;

/* Query Response: Get All Emails */
export type GetAllEmailsResponse = {
  success: boolean;
  data:    EmailBaseType[];
  message: string;
  error:   string | null;
  status:  number;
};

/* Query Response: Get Single Email */
export type GetSingleEmailResponse = {
  success: boolean;
  data:    EmailBaseType | null;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Create Email */
export type CreateEmailResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Update Email */
export type UpdateEmailResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Delete Email */
export type DeleteEmailResponse = {
  success: boolean;
  message: string;
  error:   string | null;
  status:  number;
};