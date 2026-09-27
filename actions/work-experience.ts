"use server";

import { baseAPI } from "@/config/axios";
import { WorkExperienceFormTypes } from "@/schema/schema";
import { UpdateWorkExperienceType } from "@/types/work-experience";
import {
  GetAllWorkExperienceResponse,
  GetSingleWorkExperienceResponse,
  CreateWorkExperienceResponse,
  UpdateWorkExperienceResponse,
  DeleteWorkExperienceResponse,
} from "@/types/work-experience";

export async function getWorkExperiencesAction(): Promise<GetAllWorkExperienceResponse> {
  try {
    const response = await baseAPI.get("/workexperienceAPI");
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
      message: "Failed To Fetch Work Experiences...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function createWorkExperienceAction(
  workExperienceDetails: WorkExperienceFormTypes,
): Promise<CreateWorkExperienceResponse> {
  try {
    const response = await baseAPI.post("/workexperienceAPI", workExperienceDetails);
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
      message: "Failed To Add Work Experience...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function workExperienceAction(id: string): Promise<GetSingleWorkExperienceResponse> {
  try {
    const response = await baseAPI.get(`/workexperienceAPI/${id}`);
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
      message: "Failed To Fetch Work Experience...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function deleteWorkExperienceAction(id: string): Promise<DeleteWorkExperienceResponse> {
  try {
    const response = await baseAPI.delete(`/workexperienceAPI/${id}`);
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
      message: "Failed To Delete Work Experience...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function updateWorkExperienceAction(
  id: string,
  workExperienceDetails: UpdateWorkExperienceType,
): Promise<UpdateWorkExperienceResponse> {
  try {
    const response = await baseAPI.patch(`/workexperienceAPI/${id}`, workExperienceDetails);
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
      message: "Failed To Update Work Experience...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}