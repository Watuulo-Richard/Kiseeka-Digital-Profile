import {
  blogPostCategoryAction,
  createBlogPostCategoryAction,
  deleteBlogPostCategoryAction,
  getBlogPostCategoriesAction,
  updateBlogPostCategoryAction,
} from "@/actions/blog-post-category";
import { BlogPostsCategoryFormTypes } from "@/schema/schema";
import {
  CreateBlogPostCategoryResponse,
  DeleteBlogPostCategoryResponse,
  GetAllBlogPostCategoriesResponse,
  GetSingleBlogPostCategoryResponse,
  UpdateBlogPostCategoryResponse,
  UpdateBlogPostCategoryType,
} from "@/types/blog-post-category";

type UseBlogPostCategoriesState = {
  handleCreateBlogPostCategoryService: (blogPostCategoryDetails: BlogPostsCategoryFormTypes) => Promise<CreateBlogPostCategoryResponse>;
  handleListBlogPostCategoriesService: () => Promise<GetAllBlogPostCategoriesResponse>;
  handleGetBlogPostCategoryService: (slug: string) => Promise<GetSingleBlogPostCategoryResponse>;
  handleDeleteBlogPostCategoryService: (slug: string) => Promise<DeleteBlogPostCategoryResponse>;
  handleUpdateBlogPostCategoryService: (
    slug: string,
    blogPostCategoryDetails: UpdateBlogPostCategoryType,
  ) => Promise<UpdateBlogPostCategoryResponse>;
};

export const handleBlogPostCategories: UseBlogPostCategoriesState = {
  async handleCreateBlogPostCategoryService(blogPostCategoryDetails: BlogPostsCategoryFormTypes) {
    try {
      const blogPostCategory = await createBlogPostCategoryAction(blogPostCategoryDetails);
      return {
        success: blogPostCategory.success,
        id:      blogPostCategory.id,
        message: blogPostCategory.message,
        error:   blogPostCategory.error,
        status:  blogPostCategory.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        id:      "",
        message: `Failed To Add Blog Post Category: ${errorMessage}`,
        error:   `Failed To Add Blog Post Category: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleListBlogPostCategoriesService() {
    try {
      const blogPostCategories = await getBlogPostCategoriesAction();
      return {
        success: blogPostCategories.success,
        data:    blogPostCategories.data,
        message: blogPostCategories.message,
        error:   blogPostCategories.error,
        status:  blogPostCategories.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        data:    [],
        message: `Failed To Fetch Blog Post Categories: ${errorMessage}`,
        error:   `Failed To Fetch Blog Post Categories: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleGetBlogPostCategoryService(slug: string) {
    try {
      const blogPostCategory = await blogPostCategoryAction(slug);
      return {
        success: blogPostCategory.success,
        data:    blogPostCategory.data,
        message: blogPostCategory.message,
        error:   blogPostCategory.error,
        status:  blogPostCategory.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        data:    null,
        message: `Failed To Fetch Blog Post Category: ${errorMessage}`,
        error:   `Failed To Fetch Blog Post Category: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleDeleteBlogPostCategoryService(slug: string) {
    try {
      const blogPostCategory = await deleteBlogPostCategoryAction(slug);
      return {
        success: blogPostCategory.success,
        message: blogPostCategory.message,
        error:   blogPostCategory.error,
        status:  blogPostCategory.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        message: `Failed To Delete Blog Post Category: ${errorMessage}`,
        error:   `Failed To Delete Blog Post Category: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleUpdateBlogPostCategoryService(slug: string, blogPostCategoryDetails: UpdateBlogPostCategoryType) {
    try {
      const blogPostCategory = await updateBlogPostCategoryAction(slug, blogPostCategoryDetails);
      return {
        success: blogPostCategory.success,
        id:      blogPostCategory.id,
        message: blogPostCategory.message,
        error:   blogPostCategory.error,
        status:  blogPostCategory.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        id:      "",
        message: `Failed To Update Blog Post Category: ${errorMessage}`,
        error:   `Failed To Update Blog Post Category: ${errorMessage}`,
        status:  500,
      };
    }
  },
};