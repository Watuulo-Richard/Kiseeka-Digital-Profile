"use server";

import { baseAPI } from "@/config/axios";
import { SkillFormTypes } from "@/schema/schema";
import { UpdateSkillType } from "@/types/skill";
import {
  GetAllSkillsResponse,
  GetSingleSkillResponse,
  CreateSkillResponse,
  UpdateSkillResponse,
  DeleteSkillResponse,
} from "@/types/skill";

export async function getSkillsAction(): Promise<GetAllSkillsResponse> {
  try {
    const response = await baseAPI.get("/skillsAPI");
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
      message: "Failed To Fetch Skills...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function createSkillAction(
  skillDetails: SkillFormTypes,
): Promise<CreateSkillResponse> {
  try {
    const response = await baseAPI.post("/skillsAPI", skillDetails);
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
      message: "Failed To Add Skill...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function skillAction(id: string): Promise<GetSingleSkillResponse> {
  try {
    const response = await baseAPI.get(`/skillsAPI/${id}`);
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
      message: "Failed To Fetch Skill...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function deleteSkillAction(id: string): Promise<DeleteSkillResponse> {
  try {
    const response = await baseAPI.delete(`/skillsAPI/${id}`);
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
      message: "Failed To Delete Skill...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function updateSkillAction(
  id: string,
  skillDetails: UpdateSkillType,
): Promise<UpdateSkillResponse> {
  try {
    const response = await baseAPI.patch(`/skillsAPI/${id}`, skillDetails);
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
      message: "Failed To Update Skill...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}