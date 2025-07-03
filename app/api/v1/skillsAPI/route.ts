import { prismaClient } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // const SkillFormData = await request.json()
  // console.log(SkillFormData, 'Data Has Reached The API');
  try {
    const SkillFormData = await request.json();
    const createUserSkill = await prismaClient.skill.create({
      data: {
        name:           SkillFormData.name,
        description:    SkillFormData.description,
        level:          SkillFormData.level,
        portfolioId:    SkillFormData.portfolioId,
      },
    });
    return NextResponse.json(
      {
        data: createUserSkill,
        error: null,
        message: 'User Skill Saved Successfully...!!!✅',
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
        message: 'Failed To Save User Skills...!!!🥺',
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
    const findUserSkills = await prismaClient.skill.findMany({
      orderBy: {
        name: 'desc',
      },
    });
    return NextResponse.json(
      {
        data: findUserSkills,
        error: null,
        message: 'User Skills Fetched Successfully...!!!✅',
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
        message: 'Failed To Fetch User Skills...!!!🥺',
        status: 500,
      },
      {
        status: 500,
      },
    );
  }
}
