import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  GetSingleProjectResponse,
  UpdateProjectResponse,
  DeleteProjectResponse,
} from "@/types/project";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<GetSingleProjectResponse>> {
  try {
    const { id } = await params;

    const getUserProject = await prismaClient.project.findUnique({
      where: { id },
    });

    if (!getUserProject) {
      return NextResponse.json(
        {
          success: false,
          data:    null,
          message: "User Project Not Found...!!!🥺😔",
          error:   "User project not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data:    getUserProject,
        message: "User Project Fetched Successfully...✅",
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
        message: `Failed To Fetch User Project: ${errorMessage}`,
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
): Promise<NextResponse<UpdateProjectResponse>> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "User Project ID Is Required...!!!🥺😔",
          error:   "Missing user project ID",
          status:  400,
        },
        { status: 400 },
      );
    }

    const ProjectFormData = await request.json();

    const existingProject = await prismaClient.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "User Project Not Found...!!!🥺😔",
          error:   "User project not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    const updateUserProject = await prismaClient.project.update({
      where: { id },
      data:  ProjectFormData,
    });

    return NextResponse.json(
      {
        success: true,
        id:      updateUserProject.id,
        message: "User Project Updated Successfully...✅",
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
        message: `Failed To Update User Project: ${errorMessage}`,
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
): Promise<NextResponse<DeleteProjectResponse>> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "User Project ID Is Required...!!!🥺😔",
          error:   "Missing user project ID",
          status:  400,
        },
        { status: 400 },
      );
    }

    const existingProject = await prismaClient.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json(
        {
          success: false,
          message: "User Project Not Found...!!!🥺😔",
          error:   "User project not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    await prismaClient.project.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        message: "User Project Deleted Successfully...✅",
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
        message: `Failed To Delete User Project: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}