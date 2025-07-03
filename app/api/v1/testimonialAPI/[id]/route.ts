import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const { id } = await params
        const getTestimonialDetail = await prismaClient.testimonial.findUnique({
            where: {
                id: id
            }
        })
        return NextResponse.json({
            data: getTestimonialDetail,
            error: null,
            message: 'Testimonial Detail Fetched Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Fetch Testimonial Detail...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}
export async function DELETE(request:NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const { id } = await params
        const deleteTestimonialDetail = await prismaClient.testimonial.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json({
            data: deleteTestimonialDetail,
            error: null,
            message: 'Testimonial Detail Deleted Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Delete Testimonial Detail...!!!🥺',
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
        const updateUserEducationBackground = await prismaClient.testimonial.update({
            where: {
                id: id
            },
            data: EducationFormData
        })
        return NextResponse.json({
            data: updateUserEducationBackground,
            error: null,
            message: 'Testimonial Detail Updated Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Update Testimonial Detail...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}