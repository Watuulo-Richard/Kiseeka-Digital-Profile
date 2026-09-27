/* Base Blog Post Type */
export type BlogPostBaseType = {
  id:                  string;
  title:               string;
  slug:                string;
  excerpt:             string;
  blogPostsCategoryId: string;
  publishDate:         Date;
  content:             string;
  image:               string;
  featured:            boolean;
  userId:              string;
  createdAt:           Date;
  updatedAt:           Date;
};

export type CreateBlogPostType = Omit<
  BlogPostBaseType,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateBlogPostType = Partial<
  Omit<BlogPostBaseType, "id" | "userId" | "createdAt" | "updatedAt">
>;

/* Blog-post list item includes its categories (the list API includes them) */
export type BlogPostListItem = BlogPostBaseType & {
  category?: { id: string; title: string; slug: string }[] | null;
};

/* Query Response: Get All Blog Posts */
export type GetAllBlogPostsResponse = {
  success: boolean;
  data:    BlogPostListItem[];
  message: string;
  error:   string | null;
  status:  number;
};

/* Query Response: Get Single Blog Post */
export type GetSingleBlogPostResponse = {
  success: boolean;
  data:    BlogPostBaseType | null;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Create Blog Post */
export type CreateBlogPostResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Update Blog Post */
export type UpdateBlogPostResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Delete Blog Post */
export type DeleteBlogPostResponse = {
  success: boolean;
  message: string;
  error:   string | null;
  status:  number;
};