import { prismaClient } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // const WorkExperienceFormData = await request.json()
  // console.log(WorkExperienceFormData, 'Data Has Reached The API');
  try {
    const WorkExperienceFormData = await request.json();
    const createUserWorkExperience = await prismaClient.workExperience.create({
      data: {
        position: WorkExperienceFormData.position,
        company: WorkExperienceFormData.company,
        startDate: WorkExperienceFormData.startDate,
        description: WorkExperienceFormData.description,
        endDate: WorkExperienceFormData.endDate,
        portfolioId: WorkExperienceFormData.portfolioId,
      },
    });
    return NextResponse.json(
      {
        data: createUserWorkExperience,
        error: null,
        message: 'User Work Experience Saved Successfully...!!!✅',
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
        message: 'Failed To Save User Work Experience...!!!🥺',
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
    const findUserWorkExperience = await prismaClient.workExperience.findMany({
      orderBy: {
        position: 'desc',
      },
    });
    return NextResponse.json(
      {
        data: findUserWorkExperience,
        error: null,
        message: 'User Work Experiences Fetched Successfully...!!!✅',
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
        message: 'Failed To Fetch User Work Experiences...!!!🥺',
        status: 500,
      },
      {
        status: 500,
      },
    );
  }
}
