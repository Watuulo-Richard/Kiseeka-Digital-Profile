"use server";

import { baseAPI } from "@/config/axios";
import { GalleryImageSchemaType } from "@/schema/gallery.schema";
import { UpdateGalleryImageType } from "@/types/gallery";
import {
  GetAllGalleryImagesResponse,
  GetSingleGalleryImageResponse,
  CreateGalleryImageResponse,
  UpdateGalleryImageResponse,
  DeleteGalleryImageResponse,
} from "@/types/gallery";

export async function getGalleryImagesAction(): Promise<GetAllGalleryImagesResponse> {
  try {
    const response = await baseAPI.get("/galleryAPI");
    return {
      success: response.data.success,
      data:    response.data.data,
      message: response.data.message,
      error:   response.data.error,
      status:  response.data.status,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data:    [],
      message: "Failed To Fetch Gallery Images...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function createGalleryImageAction(
  galleryImageDetails: GalleryImageSchemaType,
): Promise<CreateGalleryImageResponse> {
  try {
    const response = await baseAPI.post("/galleryAPI", galleryImageDetails);
    return {
      success: response.data.success,
      id:      response.data.id,
      message: response.data.message,
      error:   response.data.error,
      status:  response.data.status,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      id:      "",
      message: "Failed To Add Gallery Image...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function galleryImageAction(id: string): Promise<GetSingleGalleryImageResponse> {
  try {
    const response = await baseAPI.get(`/galleryAPI/${id}`);
    return {
      success: response.data.success,
      data:    response.data.data,
      message: response.data.message,
      error:   response.data.error,
      status:  response.data.status,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data:    null,
      message: "Failed To Fetch Gallery Image...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function deleteGalleryImageAction(id: string): Promise<DeleteGalleryImageResponse> {
  try {
    const response = await baseAPI.delete(`/galleryAPI/${id}`);
    return {
      success: response.data.success,
      message: response.data.message,
      error:   response.data.error,
      status:  response.data.status,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed To Delete Gallery Image...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function updateGalleryImageAction(
  id: string,
  galleryImageDetails: UpdateGalleryImageType,
): Promise<UpdateGalleryImageResponse> {
  try {
    const response = await baseAPI.patch(`/galleryAPI/${id}`, galleryImageDetails);
    return {
      success: response.data.success,
      id:      response.data.id,
      message: response.data.message,
      error:   response.data.error,
      status:  response.data.status,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      id:      "",
      message: "Failed To Update Gallery Image...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}