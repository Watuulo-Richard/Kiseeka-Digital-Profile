import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  GetSingleEducationResponse,
  UpdateEducationResponse,
  DeleteEducationResponse,
} from "@/types/education";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<GetSingleEducationResponse>> {
  try {
    const { id } = await params;

    const getUserEducationBackground = await prismaClient.education.findUnique({
      where: { id },
    });

    if (!getUserEducationBackground) {
      return NextResponse.json(
        {
          success: false,
          data:    null,
          message: "User Education Background Not Found...!!!🥺😔",
          error:   "User education background not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data:    getUserEducationBackground,
        message: "User Education Background Fetched Successfully...✅",
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
        message: `Failed To Fetch User Education Background: ${errorMessage}`,
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
): Promise<NextResponse<UpdateEducationResponse>> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "User Education Background ID Is Required...!!!🥺😔",
          error:   "Missing user education background ID",
          status:  400,
        },
        { status: 400 },
      );
    }

    const EducationFormData = await request.json();

    const existingEducationBackground =
      await prismaClient.education.findUnique({ where: { id } });

    if (!existingEducationBackground) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "User Education Background Not Found...!!!🥺😔",
          error:   "User education background not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    const updateUserEducationBackground =
      await prismaClient.education.update({
        where: { id },
        data:  EducationFormData,
      });

    return NextResponse.json(
      {
        success: true,
        id:      updateUserEducationBackground.id,
        message: "User Education Background Updated Successfully...✅",
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
        message: `Failed To Update User Education Background: ${errorMessage}`,
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
): Promise<NextResponse<DeleteEducationResponse>> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "User Education Background ID Is Required...!!!🥺😔",
          error:   "Missing user education background ID",
          status:  400,
        },
        { status: 400 },
      );
    }

    const existingEducationBackground =
      await prismaClient.education.findUnique({ where: { id } });

    if (!existingEducationBackground) {
      return NextResponse.json(
        {
          success: false,
          message: "User Education Background Not Found...!!!🥺😔",
          error:   "User education background not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    await prismaClient.education.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        message: "User Education Background Deleted Successfully...✅",
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
        message: `Failed To Delete User Education Background: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}