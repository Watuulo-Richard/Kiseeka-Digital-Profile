import { prismaClient } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const getProfile = await prismaClient.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!getProfile) {
      return NextResponse.json(
        {
          success: false,
          data:    null,
          error:   'Profile not found',
          message: 'Profile Not Found...!!!🥺',
          status:  404,
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data:    getProfile,
        error:   null,
        message: 'Profile Fetched Successfully...!!!✅',
        status:  200,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        data:    null,
        error:
          '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
        message: 'Failed To Fetch Profile...!!!🥺',
        status:  500,
      },
      {
        status: 500,
      },
    );
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const deleteProfile = await prismaClient.user.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(
      {
        success: true,
        data:    deleteProfile,
        error:   null,
        message: 'Profile Deleted Successfully...!!!✅',
        status:  200,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        data:    null,
        error:
          'Something Went Wrong, Please Check Your Internet Connection...!!!🥺',
        message: 'Failed To Delete Profile...!!!🥺',
        status:  500,
      },
      {
        status: 500,
      },
    );
  }
}
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const profileData = await request.json();
    const { userId: _userId, ...profileFields } = profileData;
    const updateProfile = await prismaClient.user.update({
      where: {
        id: id,
      },
      data: profileFields,
    });
    return NextResponse.json(
      {
        success: true,
        id:      updateProfile.id,
        data:    updateProfile,
        error:   null,
        message: 'Profile Updated Successfully...!!!✅',
        status:  200,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        id:      "",
        data:    null,
        error:
          'Something Went Wrong, Please Check Your Internet Connection...!!!🥺',
        message: 'Failed To Update Profile...!!!🥺',
        status:  500,
      },
      {
        status: 500,
      },
    );
  }
}