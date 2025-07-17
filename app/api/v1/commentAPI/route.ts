import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/lib/db';

export async function POST(request: NextRequest) {
  // const CommentFormData = await request.json()
  // console.log(CommentFormData, 'Data Has Reached The API');
  try {
    const CommentFormData = await request.json();
    const createUserComment = await prismaClient.comment.create({
      data: {
        name: CommentFormData.name,
        email: CommentFormData.email,
        viewerComment: CommentFormData.viewerComment,
        blogPostId: CommentFormData.blogPostId,
        portfolioId: CommentFormData.portfolioId,
      },
    });
    return NextResponse.json(
      {
        data: createUserComment,
        error: null,
        message: 'User Comment Saved Successfully...!!!✅',
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
        message: 'Failed To Save User Comment...!!!🥺',
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
    const findUserComment = await prismaClient.comment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(
      {
        data: findUserComment,
        error: null,
        message: 'User Comment Fetched Successfully...!!!✅',
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
        message: 'Failed To Fetch User Comment...!!!🥺',
        status: 500,
      },
      {
        status: 500,
      },
    );
  }
}
