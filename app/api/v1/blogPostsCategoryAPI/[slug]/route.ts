import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  GetSingleBlogPostCategoryResponse,
  UpdateBlogPostCategoryResponse,
  DeleteBlogPostCategoryResponse,
} from "@/types/blog-post-category";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse<GetSingleBlogPostCategoryResponse>> {
  try {
    const { slug } = await params;

    const getUserBlogPostsCategory = await prismaClient.blogPostCategory.findUnique({
      where: { slug },
    });

    if (!getUserBlogPostsCategory) {
      return NextResponse.json(
        {
          success: false,
          data:    null,
          message: "User Blog-Posts Category Not Found...!!!🥺😔",
          error:   "User blog-posts category not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data:    getUserBlogPostsCategory,
        message: "User Blog-Posts Category Fetched Successfully...✅",
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
        data:    null,
        message: `Failed To Fetch User Blog-Posts Category: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse<UpdateBlogPostCategoryResponse>> {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "User Blog-Posts Category Slug Is Required...!!!🥺😔",
          error:   "Missing user blog-posts category slug",
          status:  400,
        },
        { status: 400 },
      );
    }

    const BlogPostsCategoryFormData = await request.json();

    const existingBlogPostsCategory = await prismaClient.blogPostCategory.findUnique({
      where: { slug },
    });

    if (!existingBlogPostsCategory) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "User Blog-Posts Category Not Found...!!!🥺😔",
          error:   "User blog-posts category not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    const updateUserBlogPostsCategory =
      await prismaClient.blogPostCategory.update({
        where: { slug },
        data:  BlogPostsCategoryFormData,
      });

    return NextResponse.json(
      {
        success: true,
        id:      updateUserBlogPostsCategory.id,
        message: "User Blog-Posts Category Updated Successfully...✅",
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
        id:      "",
        message: `Failed To Update User Blog-Posts Category: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse<DeleteBlogPostCategoryResponse>> {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          message: "User Blog-Posts Category Slug Is Required...!!!🥺😔",
          error:   "Missing user blog-posts category slug",
          status:  400,
        },
        { status: 400 },
      );
    }

    const existingBlogPostsCategory = await prismaClient.blogPostCategory.findUnique({
      where: { slug },
    });

    if (!existingBlogPostsCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "User Blog-Posts Category Not Found...!!!🥺😔",
          error:   "User blog-posts category not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    await prismaClient.blogPostCategory.delete({ where: { slug } });

    return NextResponse.json(
      {
        success: true,
        message: "User Blog-Posts Category Deleted Successfully...✅",
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
        message: `Failed To Delete User Blog-Posts Category: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}