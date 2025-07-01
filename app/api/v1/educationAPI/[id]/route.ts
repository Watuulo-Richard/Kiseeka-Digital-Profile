import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const { id } = await params
        const getUserEducationBackground = await prismaClient.education.findUnique({
            where: {
                id: id
            }
        })
        return NextResponse.json({
            data: getUserEducationBackground,
            error: null,
            message: 'User Education Background Fetched Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Fetch User Education Background...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}
export async function DELETE(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const { id } = await params
        const deleteUserEducationBackground = await prismaClient.education.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json({
            data: deleteUserEducationBackground,
            error: null,
            message: 'User Education Background Deleted Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Delete User Education Background...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}
export async function PATCH(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const { id } = await params
        const EducationFormData = await request.json()
        const updateUserEducationBackground = await prismaClient.education.update({
            where: {
                id: id
            },
            data: EducationFormData
        })
        return NextResponse.json({
            data: updateUserEducationBackground,
            error: null,
            message: 'User Education Background Updated Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To User Education Background...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}