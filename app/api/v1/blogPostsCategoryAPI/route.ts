import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/lib/db';

export async function POST(request: NextRequest) {
  // const BlogPostsCategoryFormData = await request.json()
  // console.log(BlogPostsCategoryFormData, 'Data Has Reached The API');
  try {
    const BlogPostsCategoryFormData = await request.json();
    const createUserBlogPostsCategory = await prismaClient.blogPostCategory.create({
      data: {
        title: BlogPostsCategoryFormData.title,
        description: BlogPostsCategoryFormData.description,
        slug: BlogPostsCategoryFormData.slug,
        portfolioId: BlogPostsCategoryFormData.portfolioId,
      },
    });
    return NextResponse.json(
      {
        data: createUserBlogPostsCategory,
        error: null,
        message: 'User Blog-Posts Category Saved Successfully...!!!✅',
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
        message: 'Failed To Save User Blog-Posts Category...!!!🥺',
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
    const findUserBlogPostsCategory = await prismaClient.blogPostCategory.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(
      {
        data: findUserBlogPostsCategory,
        error: null,
        message: 'User Blog-Posts Categories Fetched Successfully...!!!✅',
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
        message: 'Failed To Fetch User Blog-Posts Categories...!!!🥺',
        status: 500,
      },
      {
        status: 500,
      },
    );
  }
}
