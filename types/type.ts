export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export type BlogPostTypes = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  userId: string;
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
    userId: string;
    slug: string;
  };
  user: {
    id: string;
    title: string;
    bio: string;
    profileImage?: string;
    userId: string;
    comments: {
      id: string;
      name: string;
      email: string;
      viewerComment: string;
      blogPostId: string;
      userId: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
  };
};

export type BlogPostCommentTypes = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  userId: string;
  user: {
    id: string;
    title: string;
    bio: string;
    profileImage?: string;
    userId: string;
    comments: {
      id: string;
      name: string;
      email: string;
      viewerComment: string;
      blogPostId: string;
      userId: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
  };
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
    userId: string;
    slug: string;
  }[];
  comments: {
    name: string;
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    viewerComment: string;
    blogPostId: string;
  }[];
};

export type BlogPostAndRelatedBlogPostType = {
  blogPost: {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    image: string;
    userId: string;
    slug: string;
    publishDate: Date;
    excerpt: string;
    featured: boolean;
    blogPostsCategoryId: string;
    content: string;
    category: {
      id: string;
      title: string;
      createdAt: Date;
      updatedAt: Date;
      description: string;
      userId: string;
      slug: string;
    }[];
    user: {
      id: string;
      title: string;
      bio: string;
      profileImage?: string;
      userId: string;
      comments: {
        id: string;
        name: string;
        email: string;
        viewerComment: string;
        blogPostId: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
      }[];
      createdAt: Date;
      updatedAt: Date;
    };
  };
  relatedBlogs: {
    id: string;
    title: string;
    slug: string;
    createdAt: Date;
    excerpt: string;
    image: string;
  }[];
};
