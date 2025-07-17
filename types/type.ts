export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export type BlogPostTypes = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  portfolioId: string;
  slug: string;
  publishDate: Date;
  excerpt: string;
  featured: boolean;
  blogPostsCategoryId: string;
  category: {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    portfolioId: string;
    slug: string;
  };
};

export type BlogPostCommentTypes = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  portfolioId: string;
  slug: string;
  publishDate: Date;
  excerpt: string;
  featured: boolean;
  blogPostsCategoryId: string;
  category: {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    portfolioId: string;
    slug: string;
  };
  comments: {
    name: string;
    id: string;
    portfolioId: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    viewerComment: string;
    blogPostId: string;
  }[]
};
