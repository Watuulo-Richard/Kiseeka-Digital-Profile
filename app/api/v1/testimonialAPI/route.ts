import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/lib/db';

export async function POST(request: NextRequest) {
  // const TestimonialData = await request.json()
  // console.log(TestimonialData, 'Data Has Reached The API');
  try {
    const TestimonialData = await request.json();
    const createTestimonialDetails = await prismaClient.testimonial.create({
      data: {
        fullName: TestimonialData.fullName,
        email: TestimonialData.email,
        profession: TestimonialData.profession,
        image: TestimonialData.image,
        description: TestimonialData.description,
        portfolioId: TestimonialData.portfolioId,
      },
    });
    return NextResponse.json(
      {
        data: createTestimonialDetails,
        error: null,
        message: 'Testimonial Details Saved Successfully...!!!✅',
        status: 201,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        error:
          '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
        message: 'Failed To Save Testimonial Details...!!!🥺',
        status: 500,
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const findTestimonials = await prismaClient.testimonial.findMany({
      orderBy: {
        fullName: 'desc',
      },
    });
    return NextResponse.json(
      {
        data: findTestimonials,
        error: null,
        message: 'Testimonials Fetched Successfully...!!!✅',
        status: 200,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        error:
          '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
        message: 'Failed To Fetch Testimonials...!!!🥺',
        status: 500,
      },
      {
        status: 500,
      },
    );
  }
}
