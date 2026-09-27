"use server";

import { baseAPI } from "@/config/axios";
import { TestimonialFormTypes } from "@/schema/schema";
import { UpdateTestimonialType } from "@/types/testimonial";
import {
  GetAllTestimonialsResponse,
  GetSingleTestimonialResponse,
  CreateTestimonialResponse,
  UpdateTestimonialResponse,
  DeleteTestimonialResponse,
} from "@/types/testimonial";

export async function getTestimonialsAction(): Promise<GetAllTestimonialsResponse> {
  try {
    const response = await baseAPI.get("/testimonialAPI");
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
      message: "Failed To Fetch Testimonials...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function createTestimonialAction(
  testimonialDetails: TestimonialFormTypes,
): Promise<CreateTestimonialResponse> {
  try {
    const response = await baseAPI.post("/testimonialAPI", testimonialDetails);
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
      message: "Failed To Add Testimonial...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function testimonialAction(id: string): Promise<GetSingleTestimonialResponse> {
  try {
    const response = await baseAPI.get(`/testimonialAPI/${id}`);
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
      message: "Failed To Fetch Testimonial...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function deleteTestimonialAction(id: string): Promise<DeleteTestimonialResponse> {
  try {
    const response = await baseAPI.delete(`/testimonialAPI/${id}`);
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
      message: "Failed To Delete Testimonial...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}

export async function updateTestimonialAction(
  id: string,
  testimonialDetails: UpdateTestimonialType,
): Promise<UpdateTestimonialResponse> {
  try {
    const response = await baseAPI.patch(`/testimonialAPI/${id}`, testimonialDetails);
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
      message: "Failed To Update Testimonial...!!!🥺😔",
      error:   "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️",
      status:  500,
    };
  }
}