import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const profileData = await request.json()
        
        const createProfile = await prismaClient.portfolio.create({
            data: {  
                title: profileData.title, 
                bio:   profileData.bio,
                profileImage:  profileData.profileImage,
                userId:        profileData.userId
            }
        })
        return NextResponse.json({
            data: createProfile,
            error: null,
            message: 'Profile Saved Successfully...!!!✅',
            status: 201
        }, {
            status: 201
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Save Profile...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}

export async function GET(request:NextRequest) {
    try {
        const findProfile = await prismaClient.portfolio.findMany({
            orderBy: {
                title: 'desc'
            }
        })
        return NextResponse.json({
            data: findProfile,
            error: null,
            message: 'Profiles Fetched Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Fetch Profiles...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}