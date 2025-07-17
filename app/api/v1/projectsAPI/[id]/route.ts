import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const { id } = await params
        const getUserProject = await prismaClient.project.findUnique({
            where: {
                id: id
            }
        })
        return NextResponse.json({
            data: getUserProject,
            error: null,
            message: 'User Project Fetched Successfully...!!!✅',
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
        const deleteUserProject = await prismaClient.project.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json({
            data: deleteUserProject,
            error: null,
            message: 'User Project Deleted Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Delete User Project...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}
export async function PATCH(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const { id } = await params
        const ProjectFormData = await request.json()
        const updateUserProject = await prismaClient.project.update({
            where: {
                id: id
            },
            data: ProjectFormData
        })
        return NextResponse.json({
            data: updateUserProject,
            error: null,
            message: 'User Project Updated Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Update User Project...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}