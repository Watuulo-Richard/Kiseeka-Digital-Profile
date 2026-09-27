import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  GetAllBlogPostCategoriesResponse,
  CreateBlogPostCategoryResponse,
} from "@/types/blog-post-category";

export async function GET(): Promise<NextResponse<GetAllBlogPostCategoriesResponse>> {
  try {
    const findUserBlogPostsCategory = await prismaClient.blogPostCategory.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      {
        success: true,
        data:    findUserBlogPostsCategory,
        message: "User Blog-Posts Categories Fetched Successfully...✅",
        error:   null,
        status:  200,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Database error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        data:    [],
        message: `Failed To Fetch User Blog-Posts Categories: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateBlogPostCategoryResponse>> {
  try {
    const BlogPostsCategoryFormData = await request.json();

    if (!BlogPostsCategoryFormData.userId) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "User ID Is Required...!!!🥺😔",
          error:   "Missing user ID",
          status:  400,
        },
        { status: 400 },
      );
    }

    const existingUser = await prismaClient.user.findUnique({
      where: { id: BlogPostsCategoryFormData.userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "User Not Found...!!!🥺😔",
          error:   "User not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    const createUserBlogPostsCategory = await prismaClient.blogPostCategory.create({
      data: {
        title:       BlogPostsCategoryFormData.title,
        description: BlogPostsCategoryFormData.description,
        slug:        BlogPostsCategoryFormData.slug,
        userId:      BlogPostsCategoryFormData.userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        id:      createUserBlogPostsCategory.id,
        message: "User Blog-Posts Category Saved Successfully...✅",
        error:   null,
        status:  201,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Database error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        id:      "",
        message: `Failed To Save User Blog-Posts Category: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}