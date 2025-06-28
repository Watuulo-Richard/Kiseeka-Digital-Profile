import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const { id } = await params
        const getProfile = await prismaClient.portfolio.findUnique({
            where: {
                id: id
            }
        })
        return NextResponse.json({
            data: getProfile,
            error: null,
            message: 'Profile Fetched Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Fetch Profile...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}
export async function DELETE(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const { id } = await params
        const deleteProfile = await prismaClient.portfolio.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json({
            data: deleteProfile,
            error: null,
            message: 'Profile Deleted Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: 'Something Went Wrong, Please Check Your Internet Connection...!!!🥺',
            message: 'Failed To Delete Profile...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}
export async function PATCH(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const { id } = await params
        const profileData = await request.json()
        const updateProfile = await prismaClient.portfolio.update({
            where: {
                id: id
            },
            data: profileData
        })
        return NextResponse.json({
            data: updateProfile,
            error: null,
            message: 'Profile Fetched Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: 'Something Went Wrong, Please Check Your Internet Connection...!!!🥺',
            message: 'Failed To Update Profile...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}