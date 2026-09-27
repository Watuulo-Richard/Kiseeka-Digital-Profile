import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  GetAllBlogPostsResponse,
  CreateBlogPostResponse,
} from "@/types/blog-post";

export async function GET(): Promise<NextResponse<GetAllBlogPostsResponse>> {
  try {
    const findUserBlogPosts = await prismaClient.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        comments: true,
      },
    });

    const userBlogPosts = findUserBlogPosts.map((post) => ({
      ...post,
      category: post.category ? [post.category] : [],
    }));

    return NextResponse.json(
      {
        success: true,
        data:    userBlogPosts,
        message: "User Blog-Posts Fetched Successfully...✅",
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
        message: `Failed To Fetch User Blog-Posts: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateBlogPostResponse>> {
  try {
    const BlogPostFormData = await request.json();

    if (!BlogPostFormData.userId) {
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
      where: { id: BlogPostFormData.userId },
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

    const createUserBlogPost = await prismaClient.blogPost.create({
      data: {
        title:               BlogPostFormData.title,
        excerpt:             BlogPostFormData.excerpt,
        publishDate:         BlogPostFormData.publishDate,
        image:               BlogPostFormData.image,
        slug:                BlogPostFormData.slug,
        blogPostsCategoryId: BlogPostFormData.blogPostsCategoryId,
        userId:              BlogPostFormData.userId,
        content:             BlogPostFormData.content,
        featured:            BlogPostFormData.featured,
      },
    });

    return NextResponse.json(
      {
        success: true,
        id:      createUserBlogPost.id,
        message: "User Blog-Post Saved Successfully...✅",
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
        message: `Failed To Save User Blog-Post: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}