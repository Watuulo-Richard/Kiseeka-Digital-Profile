import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/lib/db';

export async function POST(request: NextRequest) {
  // const EducationFormData = await request.json()
  // console.log(EducationFormData, 'Data Has Reached The API');
  try {
    const EducationFormData = await request.json();
    const createUserEducationBackground = await prismaClient.education.create({
      data: {
        institution: EducationFormData.institution,
        educationLevel: EducationFormData.educationLevel,
        startDate: EducationFormData.startDate,
        endDate: EducationFormData.endDate,
        description: EducationFormData.description,
        portfolioId: EducationFormData.portfolioId,
      },
    });
    return NextResponse.json(
      {
        data: createUserEducationBackground,
        error: null,
        message: 'User Education Background Saved Successfully...!!!✅',
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
    const findUserEducationBackground = await prismaClient.education.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(
      {
        data: findUserEducationBackground,
        error: null,
        message: 'User Education Background Fetched Successfully...!!!✅',
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
        message: 'Failed To Fetch User Education Background...!!!🥺',
        status: 500,
      },
      {
        status: 500,
      },
    );
  }
}
