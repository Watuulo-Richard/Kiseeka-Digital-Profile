"use server";

import { baseAPI } from "@/config/axios";
import { BlogPostsFormTypes } from "@/schema/schema";
import { UpdateBlogPostType } from "@/types/blog-post";
import {
  GetAllBlogPostsResponse,
  GetSingleBlogPostResponse,
  CreateBlogPostResponse,
  UpdateBlogPostResponse,
  DeleteBlogPostResponse,
} from "@/types/blog-post";
import { BlogPostAndRelatedBlogPostType } from "@/types/type";

export type GetSingleBlogPostPageResponse = {
  success: boolean;
  data: BlogPostAndRelatedBlogPostType | null;
  message: string;
  error: string | null;
  status: number;
};

export async function getBlogPostsAction(): Promise<GetAllBlogPostsResponse> {
  try {
    const response = await baseAPI.get("/blogPostsAPI");
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
      message: "Failed To Fetch Blog Posts...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function createBlogPostAction(
  blogPostDetails: BlogPostsFormTypes,
): Promise<CreateBlogPostResponse> {
  try {
    const response = await baseAPI.post("/blogPostsAPI", blogPostDetails);
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
      message: "Failed To Add Blog Post...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function blogPostAction(
  slug: string,
): Promise<GetSingleBlogPostPageResponse> {
  try {
    const response = await baseAPI.get(`/blogPostsAPI/${slug}`);
    return {
      success: response.data.status === 200,
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
      message: "Failed To Fetch Blog Post...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function deleteBlogPostAction(slug: string): Promise<DeleteBlogPostResponse> {
  try {
    const response = await baseAPI.delete(`/blogPostsAPI/${slug}`);
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
      message: "Failed To Delete Blog Post...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function updateBlogPostAction(
  slug: string,
  blogPostDetails: UpdateBlogPostType,
): Promise<UpdateBlogPostResponse> {
  try {
    const response = await baseAPI.patch(`/blogPostsAPI/${slug}`, blogPostDetails);
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
      message: "Failed To Update Blog Post...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}