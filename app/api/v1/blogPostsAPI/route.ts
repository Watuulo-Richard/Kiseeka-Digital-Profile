import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/lib/db';

export async function POST(request: NextRequest) {
  // const BlogPostFormData = await request.json()
  // console.log(BlogPostFormData, 'Data Has Reached The API');
  try {
    const BlogPostFormData = await request.json();
    const createUserBlogPost = await prismaClient.blogPost.create({
      data: {
        title: BlogPostFormData.title,
        excerpt: BlogPostFormData.excerpt,
        publishDate: BlogPostFormData.publishDate,
        image: BlogPostFormData.image,
        slug: BlogPostFormData.slug,
        blogPostsCategoryId: BlogPostFormData.blogPostsCategoryId,
        portfolioId: BlogPostFormData.portfolioId,
      },
    });
    return NextResponse.json(
      {
        data: createUserBlogPost,
        error: null,
        message: 'User Blog-Post Saved Successfully...!!!✅',
        status: 201,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        error:
          '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
        message: 'Failed To Save User Blog-Post...!!!🥺',
        status: 500,
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const findUserBlogPosts = await prismaClient.blogPost.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(
      {
        data: findUserBlogPosts,
        error: null,
        message: 'User Blog-Posts Fetched Successfully...!!!✅',
        status: 200,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        error:
          '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
        message: 'Failed To Fetch User Blog-Posts...!!!🥺',
        status: 500,
      },
      {
        status: 500,
      },
    );
  }
}
