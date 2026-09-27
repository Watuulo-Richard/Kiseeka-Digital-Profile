"use server";

import { baseAPI } from "@/config/axios";
import { BlogPostsCategoryFormTypes } from "@/schema/schema";
import { UpdateBlogPostCategoryType } from "@/types/blog-post-category";
import {
  GetAllBlogPostCategoriesResponse,
  GetSingleBlogPostCategoryResponse,
  CreateBlogPostCategoryResponse,
  UpdateBlogPostCategoryResponse,
  DeleteBlogPostCategoryResponse,
} from "@/types/blog-post-category";

export async function getBlogPostCategoriesAction(): Promise<GetAllBlogPostCategoriesResponse> {
  try {
    const response = await baseAPI.get("/blogPostsCategoryAPI");
    return {
      success: response.data.success,
      data:    response.data.data,
      message: response.data.message,
      error:   response.data.error,
      status:  response.data.status,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data:    [],
      message: "Failed To Fetch Blog Post Categories...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function createBlogPostCategoryAction(
  blogPostCategoryDetails: BlogPostsCategoryFormTypes,
): Promise<CreateBlogPostCategoryResponse> {
  try {
    const response = await baseAPI.post("/blogPostsCategoryAPI", blogPostCategoryDetails);
    return {
      success: response.data.success,
      id:      response.data.id,
      message: response.data.message,
      error:   response.data.error,
      status:  response.data.status,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      id:      "",
      message: "Failed To Add Blog Post Category...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function blogPostCategoryAction(slug: string): Promise<GetSingleBlogPostCategoryResponse> {
  try {
    const response = await baseAPI.get(`/blogPostsCategoryAPI/${slug}`);
    return {
      success: response.data.success,
      data:    response.data.data,
      message: response.data.message,
      error:   response.data.error,
      status:  response.data.status,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data:    null,
      message: "Failed To Fetch Blog Post Category...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function deleteBlogPostCategoryAction(slug: string): Promise<DeleteBlogPostCategoryResponse> {
  try {
    const response = await baseAPI.delete(`/blogPostsCategoryAPI/${slug}`);
    return {
      success: response.data.success,
      message: response.data.message,
      error:   response.data.error,
      status:  response.data.status,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed To Delete Blog Post Category...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function updateBlogPostCategoryAction(
  slug: string,
  blogPostCategoryDetails: UpdateBlogPostCategoryType,
): Promise<UpdateBlogPostCategoryResponse> {
  try {
    const response = await baseAPI.patch(`/blogPostsCategoryAPI/${slug}`, blogPostCategoryDetails);
    return {
      success: response.data.success,
      id:      response.data.id,
      message: response.data.message,
      error:   response.data.error,
      status:  response.data.status,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      id:      "",
      message: "Failed To Update Blog Post Category...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}