import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  GetSingleGalleryImageResponse,
  UpdateGalleryImageResponse,
  DeleteGalleryImageResponse,
} from "@/types/gallery";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<GetSingleGalleryImageResponse>> {
  try {
    const { id } = await params;

    const galleryImage = await prismaClient.galleryImage.findUnique({ where: { id } });

    if (!galleryImage) {
      return NextResponse.json(
        {
          success: false,
          data:    null,
          message: "Gallery Image Not Found...!!!🥺😔",
          error:   "Gallery image not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data:    galleryImage,
        message: "Gallery Image Fetched Successfully...✅",
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
        message: `Failed To Fetch Gallery Image: ${errorMessage}`,
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
): Promise<NextResponse<UpdateGalleryImageResponse>> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "Gallery Image ID Is Required...!!!🥺😔",
          error:   "Missing gallery image ID",
          status:  400,
        },
        { status: 400 },
      );
    }

    const galleryImageDetails = await request.json();

    const existingGalleryImage = await prismaClient.galleryImage.findUnique({
      where: { id },
    });

    if (!existingGalleryImage) {
      return NextResponse.json(
        {
          success: false,
          id:      "",
          message: "Gallery Image Not Found...!!!🥺😔",
          error:   "Gallery image not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    const updatedGalleryImage = await prismaClient.galleryImage.update({
      where: { id },
      data:  galleryImageDetails,
    });

    return NextResponse.json(
      {
        success: true,
        id:      updatedGalleryImage.id,
        message: "Gallery Image Has Been Updated Successfully...✅",
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
        message: `Failed To Update Gallery Image: ${errorMessage}`,
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
): Promise<NextResponse<DeleteGalleryImageResponse>> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery Image ID Is Required...!!!🥺😔",
          error:   "Missing gallery image ID",
          status:  400,
        },
        { status: 400 },
      );
    }

    const existingGalleryImage = await prismaClient.galleryImage.findUnique({
      where: { id },
    });

    if (!existingGalleryImage) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery Image Not Found...!!!🥺😔",
          error:   "Gallery image not found",
          status:  404,
        },
        { status: 404 },
      );
    }

    await prismaClient.galleryImage.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        message: "Gallery Image Has Been Deleted Successfully...✅",
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
        message: `Failed To Delete Gallery Image: ${errorMessage}`,
        error:   errorMessage,
        status:  500,
      },
      { status: 500 },
    );
  }
}