import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/lib/db';
import {
  UpdateBlogPostResponse,
  DeleteBlogPostResponse,
} from '@/types/blog-post';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    /* Here I'm Fetching the current blog post */
    const getUserBlogPost = await prismaClient.blogPost.findUnique({
      where: {
        slug: slug,
      },
      include: {
        category: true,
        comments: true,
        user: true,
      },
    });

    if (!getUserBlogPost) {
      return NextResponse.json(
        {
          data: null,
          error: 'Blog post not found',
          message: 'Blog post not found',
          status: 404,
        },
        { status: 404 }
      );
    }

    // Fetch related blogs (same category, exclude current post)
    const relatedBlogs = await prismaClient.blogPost.findMany({
      where: {
        blogPostsCategoryId: getUserBlogPost.blogPostsCategoryId,
        slug: {
          /* Make sure you Exclude current post */
          not: slug,
        },
      },
      take: 3, // Limit to 3 related posts
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        image: true,
        excerpt: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        data: {
          blogPost: {
            ...getUserBlogPost,
            category: getUserBlogPost.category ? [getUserBlogPost.category] : [],
          },
          relatedBlogs: relatedBlogs,
        },
        error: null,
        message: 'User Blog-Post Fetched Successfully...!!!✅',
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
        message: 'Failed To Fetch User Blog-Post...!!!🥺',
        status: 500,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse<UpdateBlogPostResponse>> {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "User Blog-Post Slug Is Required...!!!🥺😔",
          error:   "Missing user blog-post slug",
          status:  400,
        },
        { status: 400 },
      );
    }

    const BlogPostsFormData = await request.json();

    const existingBlogPost = await prismaClient.blogPost.findUnique({
      where: { slug },
    });

    if (!existingBlogPost) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "User Blog-Post Not Found...!!!🥺😔",
          error:   "User blog-post not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    const updateUserBlogPosts = await prismaClient.blogPost.update({
      where: { slug },
      data:  BlogPostsFormData,
    });

    return NextResponse.json(
      {
        success: true,
        id:      updateUserBlogPosts.id,
        message: "User Blog-Post Updated Successfully...✅",
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
        message: `Failed To Update User Blog-Post: ${errorMessage}`,
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
): Promise<NextResponse<DeleteBlogPostResponse>> {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          message: "User Blog-Post Slug Is Required...!!!🥺😔",
          error:   "Missing user blog-post slug",
          status:  400,
        },
        { status: 400 },
      );
    }

    const existingBlogPost = await prismaClient.blogPost.findUnique({
      where: { slug },
    });

    if (!existingBlogPost) {
      return NextResponse.json(
        {
          success: false,
          message: "User Blog-Post Not Found...!!!🥺😔",
          error:   "User blog-post not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    await prismaClient.blogPost.delete({ where: { slug } });

    return NextResponse.json(
      {
        success: true,
        message: "User Blog-Post Deleted Successfully...✅",
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
        message: `Failed To Delete User Blog-Post: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}