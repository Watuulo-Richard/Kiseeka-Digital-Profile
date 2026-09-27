import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  GetAllTestimonialsResponse,
  CreateTestimonialResponse,
} from "@/types/testimonial";

export async function GET(): Promise<NextResponse<GetAllTestimonialsResponse>> {
  try {
    const findTestimonials = await prismaClient.testimonial.findMany({
      orderBy: { fullName: "desc" },
    });

    return NextResponse.json(
      {
        success: true,
        data:    findTestimonials,
        message: "Testimonials Fetched Successfully...✅",
        error:   null,
        status:  200,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Database error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        data:    [],
        message: `Failed To Fetch Testimonials: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateTestimonialResponse>> {
  try {
    const TestimonialData = await request.json();

    if (!TestimonialData.userId) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "User ID Is Required...!!!🥺😔",
          error:   "Missing user ID",
          status:  400,
        },
        { status: 400 },
      );
    }

    const existingUser = await prismaClient.user.findUnique({
      where: { id: TestimonialData.userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "User Not Found...!!!🥺😔",
          error:   "User not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    const createTestimonialDetails = await prismaClient.testimonial.create({
      data: {
        fullName:    TestimonialData.fullName,
        email:       TestimonialData.email,
        profession:  TestimonialData.profession,
        image:       TestimonialData.image,
        description: TestimonialData.description,
        userId:      TestimonialData.userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        id:      createTestimonialDetails.id,
        message: "Testimonial Details Saved Successfully...✅",
        error:   null,
        status:  201,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Database error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        id:      "",
        message: `Failed To Save Testimonial Details: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}