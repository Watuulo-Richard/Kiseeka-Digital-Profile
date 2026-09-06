import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  GetAllGalleryImagesResponse,
  CreateGalleryImageResponse,
} from "@/types/gallery";

export async function GET(): Promise<NextResponse<GetAllGalleryImagesResponse>> {
  try {
    const galleryImages = await prismaClient.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      {
        success: true,
        data:    galleryImages,
        message: "Gallery Images Fetched Successfully...✅",
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
        message: `Failed To Fetch Gallery Images: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateGalleryImageResponse>> {
  try {
    const galleryImageDetails = await request.json();

    if (!galleryImageDetails.portfolioId) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "Portfolio ID Is Required...!!!🥺😔",
          error:   "Missing portfolio ID",
          status:  400,
        },
        { status: 400 },
      );
    }

    const existingPortfolio = await prismaClient.portfolio.findUnique({
      where: { id: galleryImageDetails.portfolioId },
    });

    if (!existingPortfolio) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "Portfolio Not Found...!!!🥺😔",
          error:   "Portfolio not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    const createdGalleryImage = await prismaClient.galleryImage.create({
      data: {
        src:         galleryImageDetails.src,
        alt:         galleryImageDetails.alt,
        portfolioId: galleryImageDetails.portfolioId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        id:      createdGalleryImage.id,
        message: "Gallery Image Has Been Added Successfully...✅",
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
        message: `Failed To Add Gallery Image: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}