import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const { id } = await params
        const getUser = await prismaClient.user.findUnique({
            where: {
                id: id
            }
        })
        return NextResponse.json({
            data: getUser,
            error: null,
            message: 'User Fetched Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Fetch User...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}
export async function PATCH(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const { id } = await params
        const userDetails = await request.json()
        const updateUser = await prismaClient.user.update({
            where: {
                id: id
            },
            data: {
                isVerified: true
            }
        })
        return NextResponse.json({
            data: updateUser,
            error: null,
            message: 'User Updated Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Update User...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}