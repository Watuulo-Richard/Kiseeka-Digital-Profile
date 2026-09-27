import {
  blogPostAction,
  createBlogPostAction,
  deleteBlogPostAction,
  getBlogPostsAction,
  updateBlogPostAction,
  GetSingleBlogPostPageResponse,
} from "@/actions/blog-post";
import { BlogPostsFormTypes } from "@/schema/schema";
import {
  CreateBlogPostResponse,
  DeleteBlogPostResponse,
  GetAllBlogPostsResponse,
  UpdateBlogPostResponse,
  UpdateBlogPostType,
} from "@/types/blog-post";

type UseBlogPostsState = {
  handleCreateBlogPostService: (blogPostDetails: BlogPostsFormTypes) => Promise<CreateBlogPostResponse>;
  handleListBlogPostsService: () => Promise<GetAllBlogPostsResponse>;
  handleGetBlogPostService: (slug: string) => Promise<GetSingleBlogPostPageResponse>;
  handleDeleteBlogPostService: (slug: string) => Promise<DeleteBlogPostResponse>;
  handleUpdateBlogPostService: (
    slug: string,
    blogPostDetails: UpdateBlogPostType,
  ) => Promise<UpdateBlogPostResponse>;
};

export const handleBlogPosts: UseBlogPostsState = {
  async handleCreateBlogPostService(blogPostDetails: BlogPostsFormTypes) {
    try {
      const blogPost = await createBlogPostAction(blogPostDetails);
      return {
        success: blogPost.success,
        id:      blogPost.id,
        message: blogPost.message,
        error:   blogPost.error,
        status:  blogPost.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        id:      "",
        message: `Failed To Add Blog Post: ${errorMessage}`,
        error:   `Failed To Add Blog Post: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleListBlogPostsService() {
    try {
      const blogPosts = await getBlogPostsAction();
      return {
        success: blogPosts.success,
        data:    blogPosts.data,
        message: blogPosts.message,
        error:   blogPosts.error,
        status:  blogPosts.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        data:    [],
        message: `Failed To Fetch Blog Posts: ${errorMessage}`,
        error:   `Failed To Fetch Blog Posts: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleGetBlogPostService(slug: string) {
    try {
      const blogPost = await blogPostAction(slug);
      return {
        success: blogPost.success,
        data:    blogPost.data,
        message: blogPost.message,
        error:   blogPost.error,
        status:  blogPost.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        data:    null,
        message: `Failed To Fetch Blog Post: ${errorMessage}`,
        error:   `Failed To Fetch Blog Post: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleDeleteBlogPostService(slug: string) {
    try {
      const blogPost = await deleteBlogPostAction(slug);
      return {
        success: blogPost.success,
        message: blogPost.message,
        error:   blogPost.error,
        status:  blogPost.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        message: `Failed To Delete Blog Post: ${errorMessage}`,
        error:   `Failed To Delete Blog Post: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleUpdateBlogPostService(slug: string, blogPostDetails: UpdateBlogPostType) {
    try {
      const blogPost = await updateBlogPostAction(slug, blogPostDetails);
      return {
        success: blogPost.success,
        id:      blogPost.id,
        message: blogPost.message,
        error:   blogPost.error,
        status:  blogPost.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        id:      "",
        message: `Failed To Update Blog Post: ${errorMessage}`,
        error:   `Failed To Update Blog Post: ${errorMessage}`,
        status:  500,
      };
    }
  },
};