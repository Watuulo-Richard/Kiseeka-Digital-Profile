"use server";

import { baseAPI } from "@/config/axios";
import { EducationFormTypes } from "@/schema/schema";
import { UpdateEducationType } from "@/types/education";
import {
  GetAllEducationResponse,
  GetSingleEducationResponse,
  CreateEducationResponse,
  UpdateEducationResponse,
  DeleteEducationResponse,
} from "@/types/education";

export async function getEducationAction(): Promise<GetAllEducationResponse> {
  try {
    const response = await baseAPI.get("/educationAPI");
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
      message: "Failed To Fetch Education...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function createEducationAction(
  educationDetails: EducationFormTypes,
): Promise<CreateEducationResponse> {
  try {
    const response = await baseAPI.post("/educationAPI", educationDetails);
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
      message: "Failed To Add Education...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function educationAction(id: string): Promise<GetSingleEducationResponse> {
  try {
    const response = await baseAPI.get(`/educationAPI/${id}`);
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
      message: "Failed To Fetch Education...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function deleteEducationAction(id: string): Promise<DeleteEducationResponse> {
  try {
    const response = await baseAPI.delete(`/educationAPI/${id}`);
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
      message: "Failed To Delete Education...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function updateEducationAction(
  id: string,
  educationDetails: UpdateEducationType,
): Promise<UpdateEducationResponse> {
  try {
    const response = await baseAPI.patch(`/educationAPI/${id}`, educationDetails);
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
      message: "Failed To Update Education...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}