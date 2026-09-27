import {
  createEducationAction,
  deleteEducationAction,
  educationAction,
  getEducationAction,
  updateEducationAction,
} from "@/actions/education";
import { EducationFormTypes } from "@/schema/schema";
import {
  CreateEducationResponse,
  DeleteEducationResponse,
  GetAllEducationResponse,
  GetSingleEducationResponse,
  UpdateEducationResponse,
  UpdateEducationType,
} from "@/types/education";

type UseEducationState = {
  handleCreateEducationService: (educationDetails: EducationFormTypes) => Promise<CreateEducationResponse>;
  handleListEducationService: () => Promise<GetAllEducationResponse>;
  handleGetEducationService: (id: string) => Promise<GetSingleEducationResponse>;
  handleDeleteEducationService: (id: string) => Promise<DeleteEducationResponse>;
  handleUpdateEducationService: (
    id: string,
    educationDetails: UpdateEducationType,
  ) => Promise<UpdateEducationResponse>;
};

export const handleEducation: UseEducationState = {
  async handleCreateEducationService(educationDetails: EducationFormTypes) {
    try {
      const education = await createEducationAction(educationDetails);
      return {
        success: education.success,
        id:      education.id,
        message: education.message,
        error:   education.error,
        status:  education.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        id:      "",
        message: `Failed To Add Education: ${errorMessage}`,
        error:   `Failed To Add Education: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleListEducationService() {
    try {
      const education = await getEducationAction();
      return {
        success: education.success,
        data:    education.data,
        message: education.message,
        error:   education.error,
        status:  education.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        data:    [],
        message: `Failed To Fetch Education: ${errorMessage}`,
        error:   `Failed To Fetch Education: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleGetEducationService(id: string) {
    try {
      const education = await educationAction(id);
      return {
        success: education.success,
        data:    education.data,
        message: education.message,
        error:   education.error,
        status:  education.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        data:    null,
        message: `Failed To Fetch Education: ${errorMessage}`,
        error:   `Failed To Fetch Education: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleDeleteEducationService(id: string) {
    try {
      const education = await deleteEducationAction(id);
      return {
        success: education.success,
        message: education.message,
        error:   education.error,
        status:  education.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        message: `Failed To Delete Education: ${errorMessage}`,
        error:   `Failed To Delete Education: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleUpdateEducationService(id: string, educationDetails: UpdateEducationType) {
    try {
      const education = await updateEducationAction(id, educationDetails);
      return {
        success: education.success,
        id:      education.id,
        message: education.message,
        error:   education.error,
        status:  education.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        id:      "",
        message: `Failed To Update Education: ${errorMessage}`,
        error:   `Failed To Update Education: ${errorMessage}`,
        status:  500,
      };
    }
  },
};