import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  GetSingleCommentResponse,
  UpdateCommentResponse,
  DeleteCommentResponse,
} from "@/types/comment";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<GetSingleCommentResponse>> {
  try {
    const { id } = await params;

    const getUserComment = await prismaClient.comment.findUnique({
      where: { id },
    });

    if (!getUserComment) {
      return NextResponse.json(
        {
          success: false,
          data:    null,
          message: "User Comment Not Found...!!!🥺😔",
          error:   "User comment not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data:    getUserComment,
        message: "User Comment Fetched Successfully...✅",
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
        message: `Failed To Fetch User Comment: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<UpdateCommentResponse>> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "User Comment ID Is Required...!!!🥺😔",
          error:   "Missing user comment ID",
          status:  400,
        },
        { status: 400 },
      );
    }

    const CommentFormData = await request.json();

    const existingComment = await prismaClient.comment.findUnique({
      where: { id },
    });

    if (!existingComment) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "User Comment Not Found...!!!🥺😔",
          error:   "User comment not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    const updateUserComment = await prismaClient.comment.update({
      where: { id },
      data:  CommentFormData,
    });

    return NextResponse.json(
      {
        success: true,
        id:      updateUserComment.id,
        message: "User Comment Updated Successfully...✅",
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
        message: `Failed To Update User Comment: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<DeleteCommentResponse>> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "User Comment ID Is Required...!!!🥺😔",
          error:   "Missing user comment ID",
          status:  400,
        },
        { status: 400 },
      );
    }

    const existingComment = await prismaClient.comment.findUnique({
      where: { id },
    });

    if (!existingComment) {
      return NextResponse.json(
        {
          success: false,
          message: "User Comment Not Found...!!!🥺😔",
          error:   "User comment not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    await prismaClient.comment.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        message: "User Comment Deleted Successfully...✅",
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
        message: `Failed To Delete User Comment: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}