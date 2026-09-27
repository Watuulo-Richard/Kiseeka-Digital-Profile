/* Base Project Type */
export type ProjectBaseType = {
  id:          string;
  title:       string;
  description: string | null;
  url:         string | null;
  userId:      string;
  createdAt:   Date;
  updatedAt:   Date;
};

export type CreateProjectType = Omit<
  ProjectBaseType,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateProjectType = Partial<
  Omit<ProjectBaseType, "id" | "userId" | "createdAt" | "updatedAt">
>;

/* Query Response: Get All Projects */
export type GetAllProjectsResponse = {
  success: boolean;
  data:    ProjectBaseType[];
  message: string;
  error:   string | null;
  status:  number;
};

/* Query Response: Get Single Project */
export type GetSingleProjectResponse = {
  success: boolean;
  data:    ProjectBaseType | null;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Create Project */
export type CreateProjectResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Update Project */
export type UpdateProjectResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Delete Project */
export type DeleteProjectResponse = {
  success: boolean;
  message: string;
  error:   string | null;
  status:  number;
};