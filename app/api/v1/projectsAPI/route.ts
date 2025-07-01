import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/lib/db';

export async function POST(request: NextRequest) {
  // const ProjectFormData = await request.json()
  // console.log(ProjectFormData, 'Data Has Reached The API');
  try {
    const ProjectFormData = await request.json();
    const createUserProject = await prismaClient.project.create({
      data: {
        title: ProjectFormData.title,
        url: ProjectFormData.url,
        description: ProjectFormData.description,
        portfolioId: ProjectFormData.portfolioId,
      },
    });
    return NextResponse.json(
      {
        data: createUserProject,
        error: null,
        message: 'User Project Saved Successfully...!!!✅',
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
    const findUserProjects = await prismaClient.project.findMany({
      orderBy: {
        title: 'desc',
      },
    });
    return NextResponse.json(
      {
        data: findUserProjects,
        error: null,
        message: 'User Projects Fetched Successfully...!!!✅',
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
        message: 'Failed To Fetch User Projects...!!!🥺',
        status: 500,
      },
      {
        status: 500,
      },
    );
  }
}
