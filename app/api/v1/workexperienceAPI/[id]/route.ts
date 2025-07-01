import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const { id } = await params
        const getUserWorkExperience = await prismaClient.workExperience.findUnique({
            where: {
                id: id
            }
        })
        return NextResponse.json({
            data: getUserWorkExperience,
            error: null,
            message: 'User Work Experience Fetched Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Fetch User Work Experience...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}
export async function DELETE(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const { id } = await params
        const deleteUserWorkExperience = await prismaClient.workExperience.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json({
            data: deleteUserWorkExperience,
            error: null,
            message: 'User Work Experience Deleted Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Delete User Work Experience...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}
export async function PATCH(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const { id } = await params
        const WorkExperienceFormData = await request.json()
        const updateUserWorkExperience = await prismaClient.workExperience.update({
            where: {
                id: id
            },
            data: WorkExperienceFormData
        })
        return NextResponse.json({
            data: updateUserWorkExperience,
            error: null,
            message: 'User Work Experience Updated Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Update User Work Experience...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}