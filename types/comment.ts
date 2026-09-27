/* Base Comment Type */
export type CommentBaseType = {
  id:            string;
  name:          string;
  email:         string;
  viewerComment: string;
  blogPostId:    string;
  userId:        string;
  createdAt:     Date;
  updatedAt:     Date;
};

export type CreateCommentType = Omit<
  CommentBaseType,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateCommentType = Partial<
  Omit<CommentBaseType, "id" | "userId" | "createdAt" | "updatedAt">
>;

/* Query Response: Get All Comments */
export type GetAllCommentsResponse = {
  success: boolean;
  data:    CommentBaseType[];
  message: string;
  error:   string | null;
  status:  number;
};

/* Query Response: Get Single Comment */
export type GetSingleCommentResponse = {
  success: boolean;
  data:    CommentBaseType | null;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Create Comment */
export type CreateCommentResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Update Comment */
export type UpdateCommentResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Delete Comment */
export type DeleteCommentResponse = {
  success: boolean;
  message: string;
  error:   string | null;
  status:  number;
};