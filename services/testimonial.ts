import {
  createTestimonialAction,
  deleteTestimonialAction,
  getTestimonialsAction,
  testimonialAction,
  updateTestimonialAction,
} from "@/actions/testimonial";
import { TestimonialFormTypes } from "@/schema/schema";
import {
  CreateTestimonialResponse,
  DeleteTestimonialResponse,
  GetAllTestimonialsResponse,
  GetSingleTestimonialResponse,
  UpdateTestimonialResponse,
  UpdateTestimonialType,
} from "@/types/testimonial";

type UseTestimonialsState = {
  handleCreateTestimonialService: (testimonialDetails: TestimonialFormTypes) => Promise<CreateTestimonialResponse>;
  handleListTestimonialsService: () => Promise<GetAllTestimonialsResponse>;
  handleGetTestimonialService: (id: string) => Promise<GetSingleTestimonialResponse>;
  handleDeleteTestimonialService: (id: string) => Promise<DeleteTestimonialResponse>;
  handleUpdateTestimonialService: (
    id: string,
    testimonialDetails: UpdateTestimonialType,
  ) => Promise<UpdateTestimonialResponse>;
};

export const handleTestimonials: UseTestimonialsState = {
  async handleCreateTestimonialService(testimonialDetails: TestimonialFormTypes) {
    try {
      const testimonial = await createTestimonialAction(testimonialDetails);
      return {
        success: testimonial.success,
        id:      testimonial.id,
        message: testimonial.message,
        error:   testimonial.error,
        status:  testimonial.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        id:      "",
        message: `Failed To Add Testimonial: ${errorMessage}`,
        error:   `Failed To Add Testimonial: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleListTestimonialsService() {
    try {
      const testimonials = await getTestimonialsAction();
      return {
        success: testimonials.success,
        data:    testimonials.data,
        message: testimonials.message,
        error:   testimonials.error,
        status:  testimonials.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        data:    [],
        message: `Failed To Fetch Testimonials: ${errorMessage}`,
        error:   `Failed To Fetch Testimonials: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleGetTestimonialService(id: string) {
    try {
      const testimonial = await testimonialAction(id);
      return {
        success: testimonial.success,
        data:    testimonial.data,
        message: testimonial.message,
        error:   testimonial.error,
        status:  testimonial.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        data:    null,
        message: `Failed To Fetch Testimonial: ${errorMessage}`,
        error:   `Failed To Fetch Testimonial: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleDeleteTestimonialService(id: string) {
    try {
      const testimonial = await deleteTestimonialAction(id);
      return {
        success: testimonial.success,
        message: testimonial.message,
        error:   testimonial.error,
        status:  testimonial.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        message: `Failed To Delete Testimonial: ${errorMessage}`,
        error:   `Failed To Delete Testimonial: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleUpdateTestimonialService(id: string, testimonialDetails: UpdateTestimonialType) {
    try {
      const testimonial = await updateTestimonialAction(id, testimonialDetails);
      return {
        success: testimonial.success,
        id:      testimonial.id,
        message: testimonial.message,
        error:   testimonial.error,
        status:  testimonial.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        id:      "",
        message: `Failed To Update Testimonial: ${errorMessage}`,
        error:   `Failed To Update Testimonial: ${errorMessage}`,
        status:  500,
      };
    }
  },
};