import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  GetAllProjectsResponse,
  CreateProjectResponse,
} from "@/types/project";

export async function GET(): Promise<NextResponse<GetAllProjectsResponse>> {
  try {
    const findUserProjects = await prismaClient.project.findMany({
      orderBy: { title: "desc" },
    });

    return NextResponse.json(
      {
        success: true,
        data:    findUserProjects,
        message: "User Projects Fetched Successfully...✅",
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
        message: `Failed To Fetch User Projects: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateProjectResponse>> {
  try {
    const ProjectFormData = await request.json();

    if (!ProjectFormData.userId) {
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
      where: { id: ProjectFormData.userId },
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

    const createUserProject = await prismaClient.project.create({
      data: {
        title:       ProjectFormData.title,
        url:         ProjectFormData.url,
        description: ProjectFormData.description,
        userId:      ProjectFormData.userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        id:      createUserProject.id,
        message: "User Project Saved Successfully...✅",
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
        message: `Failed To Save User Project: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}