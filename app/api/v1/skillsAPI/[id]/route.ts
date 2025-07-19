import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const { id } = await params
        const getUserSkill = await prismaClient.skill.findUnique({
            where: {
                id: id
            }
        })
        return NextResponse.json({
            data: getUserSkill,
            error: null,
            message: 'User Skill Fetched Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Fetch User Skill...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}
export async function DELETE(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const { id } = await params
        const deleteUserSkill = await prismaClient.skill.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json({
            data: deleteUserSkill,
            error: null,
            message: 'User Skill Deleted Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Delete User Skill...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}
export async function PATCH(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const { id } = await params
        const SkillFormData = await request.json()
        const updateUserSkill = await prismaClient.skill.update({
            where: {
                id: id
            },
            data: SkillFormData
        })
        return NextResponse.json({
            data: updateUserSkill,
            error: null,
            message: 'User Skill Updated Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Update User Skill...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}