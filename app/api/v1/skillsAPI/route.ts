import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  GetAllSkillsResponse,
  CreateSkillResponse,
} from "@/types/skill";

export async function GET(): Promise<NextResponse<GetAllSkillsResponse>> {
  try {
    const findUserSkills = await prismaClient.skill.findMany({
      orderBy: { name: "desc" },
    });

    return NextResponse.json(
      {
        success: true,
        data:    findUserSkills,
        message: "User Skills Fetched Successfully...✅",
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
        message: `Failed To Fetch User Skills: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateSkillResponse>> {
  try {
    const SkillFormData = await request.json();

    if (!SkillFormData.userId) {
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
      where: { id: SkillFormData.userId },
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

    const createUserSkill = await prismaClient.skill.create({
      data: {
        name:        SkillFormData.name,
        description: SkillFormData.description,
        level:       SkillFormData.level,
        userId:      SkillFormData.userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        id:      createUserSkill.id,
        message: "User Skill Saved Successfully...✅",
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
        message: `Failed To Save User Skill: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}