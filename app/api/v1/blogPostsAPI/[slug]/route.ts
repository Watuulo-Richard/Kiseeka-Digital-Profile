import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/lib/db';

// export async function GET(
//   request: NextRequest,
//   { params }: { params: Promise<{ slug: string }> },
// ) {
//   try {
//     const { slug } = await params;
//     const getUserBlogPost = await prismaClient.blogPost.findUnique({
//       where: {
//         slug: slug,
//       },
//       include: {
//         category: true,
//         comments: true,
//         portfolio: true,
//       },
//     });
//     return NextResponse.json(
//       {
//         data: getUserBlogPost,
//         error: null,
//         message: 'User Blog-Post Fetched Successfully...!!!✅',
//         status: 200,
//       },
//       {
//         status: 200,
//       },
//     );
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       {
//         data: null,
//         error:
//           '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
//         message: 'Failed To Fetch User Blog-Post...!!!🥺',
//         status: 500,
//       },
//       {
//         status: 500,
//       },
//     );
//   }
// }
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
        portfolio: true,
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
          blogPost: getUserBlogPost,
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const deleteUserBlogPost = await prismaClient.blogPost.delete({
      where: {
        slug: slug,
      },
    });
    return NextResponse.json(
      {
        data: deleteUserBlogPost,
        error: null,
        message: 'User Blog-Post Deleted Successfully...!!!✅',
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
        message: 'Failed To Delete User Blog-Post...!!!🥺',
        status: 500,
      },
      {
        status: 500,
      },
    );
  }
}
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const BlogPostsFormData = await request.json();
    const updateUserBlogPosts = await prismaClient.blogPost.update({
      where: {
        slug: slug,
      },
      data: BlogPostsFormData,
    });
    return NextResponse.json(
      {
        data: updateUserBlogPosts,
        error: null,
        message: 'User Blog-Posts Updated Successfully...!!!✅',
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
        message: 'Failed To Update User Blog-Posts...!!!🥺',
        status: 500,
      },
      {
        status: 500,
      },
    );
  }
}
