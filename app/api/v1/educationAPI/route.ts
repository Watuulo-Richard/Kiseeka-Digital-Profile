import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  GetAllEducationResponse,
  CreateEducationResponse,
} from "@/types/education";

export async function GET(): Promise<NextResponse<GetAllEducationResponse>> {
  try {
    const findUserEducationBackground = await prismaClient.education.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      {
        success: true,
        data:    findUserEducationBackground,
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
        data:    [],
        message: `Failed To Fetch User Education Background: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateEducationResponse>> {
  try {
    const EducationFormData = await request.json();

    if (!EducationFormData.userId) {
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
      where: { id: EducationFormData.userId },
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

    const createUserEducationBackground = await prismaClient.education.create({
      data: {
        institution:    EducationFormData.institution,
        educationLevel: EducationFormData.educationLevel,
        startDate:      EducationFormData.startDate,
        endDate:        EducationFormData.endDate,
        description:    EducationFormData.description,
        userId:         EducationFormData.userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        id:      createUserEducationBackground.id,
        message: "User Education Background Saved Successfully...✅",
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
        message: `Failed To Save User Education Background: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}