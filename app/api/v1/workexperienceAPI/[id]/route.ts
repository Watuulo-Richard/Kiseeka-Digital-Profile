import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  GetSingleWorkExperienceResponse,
  UpdateWorkExperienceResponse,
  DeleteWorkExperienceResponse,
} from "@/types/work-experience";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<GetSingleWorkExperienceResponse>> {
  try {
    const { id } = await params;

    const getUserWorkExperience = await prismaClient.workExperience.findUnique({
      where: { id },
    });

    if (!getUserWorkExperience) {
      return NextResponse.json(
        {
          success: false,
          data:    null,
          message: "User Work Experience Not Found...!!!🥺😔",
          error:   "User work experience not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data:    getUserWorkExperience,
        message: "User Work Experience Fetched Successfully...✅",
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
        message: `Failed To Fetch User Work Experience: ${errorMessage}`,
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
): Promise<NextResponse<UpdateWorkExperienceResponse>> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "User Work Experience ID Is Required...!!!🥺😔",
          error:   "Missing user work experience ID",
          status:  400,
        },
        { status: 400 },
      );
    }

    const WorkExperienceFormData = await request.json();

    const existingWorkExperience =
      await prismaClient.workExperience.findUnique({ where: { id } });

    if (!existingWorkExperience) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "User Work Experience Not Found...!!!🥺😔",
          error:   "User work experience not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    // Convert date strings to Date objects if they exist
    const processedData = {
      ...WorkExperienceFormData,
      startDate: WorkExperienceFormData.startDate
        ? new Date(WorkExperienceFormData.startDate)
        : undefined,
      endDate: WorkExperienceFormData.endDate
        ? new Date(WorkExperienceFormData.endDate)
        : undefined,
    };

    const updateUserWorkExperience =
      await prismaClient.workExperience.update({
        where: { id },
        data:  processedData,
      });

    return NextResponse.json(
      {
        success: true,
        id:      updateUserWorkExperience.id,
        message: "User Work Experience Updated Successfully...✅",
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
        message: `Failed To Update User Work Experience: ${errorMessage}`,
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
): Promise<NextResponse<DeleteWorkExperienceResponse>> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "User Work Experience ID Is Required...!!!🥺😔",
          error:   "Missing user work experience ID",
          status:  400,
        },
        { status: 400 },
      );
    }

    const existingWorkExperience =
      await prismaClient.workExperience.findUnique({ where: { id } });

    if (!existingWorkExperience) {
      return NextResponse.json(
        {
          success: false,
          message: "User Work Experience Not Found...!!!🥺😔",
          error:   "User work experience not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    await prismaClient.workExperience.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        message: "User Work Experience Deleted Successfully...✅",
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
        message: `Failed To Delete User Work Experience: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}