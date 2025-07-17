import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/lib/db";

export async function GET(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const { id } = await params
        const getUserComment = await prismaClient.comment.findUnique({
            where: {
                id: id
            }
        })
        return NextResponse.json({
            data: getUserComment,
            error: null,
            message: 'User Comment Fetched Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Fetch User Comment...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}
export async function DELETE(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const { id } = await params
        const deleteUserComment = await prismaClient.comment.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json({
            data: deleteUserComment,
            error: null,
            message: 'User Comment Deleted Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Delete User Comment...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}
export async function PATCH(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const { id } = await params
        const CommentFormData = await request.json()
        const updateUserEducationBackground = await prismaClient.comment.update({
            where: {
                id: id
            },
            data: CommentFormData
        })
        return NextResponse.json({
            data: updateUserEducationBackground,
            error: null,
            message: 'User Comment Updated Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Update User Comment...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}