import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  GetSingleTestimonialResponse,
  UpdateTestimonialResponse,
  DeleteTestimonialResponse,
} from "@/types/testimonial";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<GetSingleTestimonialResponse>> {
  try {
    const { id } = await params;

    const getTestimonialDetail = await prismaClient.testimonial.findUnique({
      where: { id },
    });

    if (!getTestimonialDetail) {
      return NextResponse.json(
        {
          success: false,
          data:    null,
          message: "Testimonial Detail Not Found...!!!🥺😔",
          error:   "Testimonial detail not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data:    getTestimonialDetail,
        message: "Testimonial Detail Fetched Successfully...✅",
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
        data:    null,
        message: `Failed To Fetch Testimonial Detail: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<UpdateTestimonialResponse>> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "Testimonial Detail ID Is Required...!!!🥺😔",
          error:   "Missing testimonial detail ID",
          status:  400,
        },
        { status: 400 },
      );
    }

    const TestimonialData = await request.json();

    const existingTestimonial = await prismaClient.testimonial.findUnique({
      where: { id },
    });

    if (!existingTestimonial) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "Testimonial Detail Not Found...!!!🥺😔",
          error:   "Testimonial detail not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    const updateTestimonialDetail = await prismaClient.testimonial.update({
      where: { id },
      data:  TestimonialData,
    });

    return NextResponse.json(
      {
        success: true,
        id:      updateTestimonialDetail.id,
        message: "Testimonial Detail Updated Successfully...✅",
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
        id:      "",
        message: `Failed To Update Testimonial Detail: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<DeleteTestimonialResponse>> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Testimonial Detail ID Is Required...!!!🥺😔",
          error:   "Missing testimonial detail ID",
          status:  400,
        },
        { status: 400 },
      );
    }

    const existingTestimonial = await prismaClient.testimonial.findUnique({
      where: { id },
    });

    if (!existingTestimonial) {
      return NextResponse.json(
        {
          success: false,
          message: "Testimonial Detail Not Found...!!!🥺😔",
          error:   "Testimonial detail not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    await prismaClient.testimonial.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial Detail Deleted Successfully...✅",
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
        message: `Failed To Delete Testimonial Detail: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}