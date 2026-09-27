import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  GetSingleSkillResponse,
  UpdateSkillResponse,
  DeleteSkillResponse,
} from "@/types/skill";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<GetSingleSkillResponse>> {
  try {
    const { id } = await params;

    const getUserSkill = await prismaClient.skill.findUnique({
      where: { id },
    });

    if (!getUserSkill) {
      return NextResponse.json(
        {
          success: false,
          data:    null,
          message: "User Skill Not Found...!!!🥺😔",
          error:   "User skill not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data:    getUserSkill,
        message: "User Skill Fetched Successfully...✅",
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
        message: `Failed To Fetch User Skill: ${errorMessage}`,
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
): Promise<NextResponse<UpdateSkillResponse>> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "User Skill ID Is Required...!!!🥺😔",
          error:   "Missing user skill ID",
          status:  400,
        },
        { status: 400 },
      );
    }

    const SkillFormData = await request.json();

    const existingSkill = await prismaClient.skill.findUnique({
      where: { id },
    });

    if (!existingSkill) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "User Skill Not Found...!!!🥺😔",
          error:   "User skill not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    const updateUserSkill = await prismaClient.skill.update({
      where: { id },
      data:  SkillFormData,
    });

    return NextResponse.json(
      {
        success: true,
        id:      updateUserSkill.id,
        message: "User Skill Updated Successfully...✅",
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
        message: `Failed To Update User Skill: ${errorMessage}`,
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
): Promise<NextResponse<DeleteSkillResponse>> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "User Skill ID Is Required...!!!🥺😔",
          error:   "Missing user skill ID",
          status:  400,
        },
        { status: 400 },
      );
    }

    const existingSkill = await prismaClient.skill.findUnique({
      where: { id },
    });

    if (!existingSkill) {
      return NextResponse.json(
        {
          success: false,
          message: "User Skill Not Found...!!!🥺😔",
          error:   "User skill not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    await prismaClient.skill.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        message: "User Skill Deleted Successfully...✅",
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
        message: `Failed To Delete User Skill: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}