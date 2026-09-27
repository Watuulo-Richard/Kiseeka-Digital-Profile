import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  GetAllWorkExperienceResponse,
  CreateWorkExperienceResponse,
} from "@/types/work-experience";

export async function GET(): Promise<NextResponse<GetAllWorkExperienceResponse>> {
  try {
    const findUserWorkExperience = await prismaClient.workExperience.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      {
        success: true,
        data:    findUserWorkExperience,
        message: "User Work Experiences Fetched Successfully...✅",
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
        message: `Failed To Fetch User Work Experiences: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateWorkExperienceResponse>> {
  try {
    const WorkExperienceFormData = await request.json();

    if (!WorkExperienceFormData.userId) {
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
      where: { id: WorkExperienceFormData.userId },
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

    const createUserWorkExperience = await prismaClient.workExperience.create({
      data: {
        position:    WorkExperienceFormData.position,
        company:     WorkExperienceFormData.company,
        startDate:   WorkExperienceFormData.startDate,
        description: WorkExperienceFormData.description,
        endDate:     WorkExperienceFormData.endDate,
        userId:      WorkExperienceFormData.userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        id:      createUserWorkExperience.id,
        message: "User Work Experience Saved Successfully...✅",
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
        message: `Failed To Save User Work Experience: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}