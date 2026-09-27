/* Base Blog Post Category Type */
export type BlogPostCategoryBaseType = {
  id:          string;
  title:       string;
  slug:        string;
  description: string;
  userId:      string;
  createdAt:   Date;
  updatedAt:   Date;
};

export type CreateBlogPostCategoryType = Omit<
  BlogPostCategoryBaseType,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateBlogPostCategoryType = Partial<
  Omit<BlogPostCategoryBaseType, "id" | "userId" | "createdAt" | "updatedAt">
>;

/* Query Response: Get All Blog Post Categories */
export type GetAllBlogPostCategoriesResponse = {
  success: boolean;
  data:    BlogPostCategoryBaseType[];
  message: string;
  error:   string | null;
  status:  number;
};

/* Query Response: Get Single Blog Post Category */
export type GetSingleBlogPostCategoryResponse = {
  success: boolean;
  data:    BlogPostCategoryBaseType | null;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Create Blog Post Category */
export type CreateBlogPostCategoryResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Update Blog Post Category */
export type UpdateBlogPostCategoryResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Delete Blog Post Category */
export type DeleteBlogPostCategoryResponse = {
  success: boolean;
  message: string;
  error:   string | null;
  status:  number;
};