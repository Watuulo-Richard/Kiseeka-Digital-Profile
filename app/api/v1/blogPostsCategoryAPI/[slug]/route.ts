import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/lib/db";

export async function GET(request:NextRequest, {params}:{params:Promise<{slug:string}>}) {
    try {
        const { slug } = await params
        const getUserBlogPostsCategory = await prismaClient.blogPostCategory.findUnique({
            where: {
                slug: slug
            }
        })
        return NextResponse.json({
            data: getUserBlogPostsCategory,
            error: null,
            message: 'User Blog-Posts Category Fetched Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Fetch User Blog-Posts Category...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}
export async function DELETE(request:NextRequest, {params}:{params:Promise<{slug:string}>}) {
    try {
        const { slug } = await params
        const deleteUserBlogPostsCategory = await prismaClient.blogPostCategory.delete({
            where: {
                slug: slug
            }
        })
        return NextResponse.json({
            data: deleteUserBlogPostsCategory,
            error: null,
            message: 'User Blog-Posts Category Deleted Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Delete User Blog-Posts Category...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}
export async function PATCH(request:NextRequest, {params}:{params:Promise<{slug:string}>}) {
    try {
        const { slug } = await params
        const BlogPostsCategoryFormData = await request.json()
        const updateUserBlogPostsCategory = await prismaClient.blogPostCategory.update({
            where: {
                slug: slug
            },
            data: BlogPostsCategoryFormData
        })
        return NextResponse.json({
            data: updateUserBlogPostsCategory,
            error: null,
            message: 'User Blog-Posts Category Updated Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To User Blog-Posts Category...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}