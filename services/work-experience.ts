import {
  createWorkExperienceAction,
  deleteWorkExperienceAction,
  getWorkExperiencesAction,
  workExperienceAction,
  updateWorkExperienceAction,
} from "@/actions/work-experience";
import { WorkExperienceFormTypes } from "@/schema/schema";
import {
  CreateWorkExperienceResponse,
  DeleteWorkExperienceResponse,
  GetAllWorkExperienceResponse,
  GetSingleWorkExperienceResponse,
  UpdateWorkExperienceResponse,
  UpdateWorkExperienceType,
} from "@/types/work-experience";

type UseWorkExperiencesState = {
  handleCreateWorkExperienceService: (workExperienceDetails: WorkExperienceFormTypes) => Promise<CreateWorkExperienceResponse>;
  handleListWorkExperiencesService: () => Promise<GetAllWorkExperienceResponse>;
  handleGetWorkExperienceService: (id: string) => Promise<GetSingleWorkExperienceResponse>;
  handleDeleteWorkExperienceService: (id: string) => Promise<DeleteWorkExperienceResponse>;
  handleUpdateWorkExperienceService: (
    id: string,
    workExperienceDetails: UpdateWorkExperienceType,
  ) => Promise<UpdateWorkExperienceResponse>;
};

export const handleWorkExperiences: UseWorkExperiencesState = {
  async handleCreateWorkExperienceService(workExperienceDetails: WorkExperienceFormTypes) {
    try {
      const workExperience = await createWorkExperienceAction(workExperienceDetails);
      return {
        success: workExperience.success,
        id:      workExperience.id,
        message: workExperience.message,
        error:   workExperience.error,
        status:  workExperience.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        id:      "",
        message: `Failed To Add Work Experience: ${errorMessage}`,
        error:   `Failed To Add Work Experience: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleListWorkExperiencesService() {
    try {
      const workExperiences = await getWorkExperiencesAction();
      return {
        success: workExperiences.success,
        data:    workExperiences.data,
        message: workExperiences.message,
        error:   workExperiences.error,
        status:  workExperiences.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        data:    [],
        message: `Failed To Fetch Work Experiences: ${errorMessage}`,
        error:   `Failed To Fetch Work Experiences: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleGetWorkExperienceService(id: string) {
    try {
      const workExperience = await workExperienceAction(id);
      return {
        success: workExperience.success,
        data:    workExperience.data,
        message: workExperience.message,
        error:   workExperience.error,
        status:  workExperience.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        data:    null,
        message: `Failed To Fetch Work Experience: ${errorMessage}`,
        error:   `Failed To Fetch Work Experience: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleDeleteWorkExperienceService(id: string) {
    try {
      const workExperience = await deleteWorkExperienceAction(id);
      return {
        success: workExperience.success,
        message: workExperience.message,
        error:   workExperience.error,
        status:  workExperience.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        message: `Failed To Delete Work Experience: ${errorMessage}`,
        error:   `Failed To Delete Work Experience: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleUpdateWorkExperienceService(id: string, workExperienceDetails: UpdateWorkExperienceType) {
    try {
      const workExperience = await updateWorkExperienceAction(id, workExperienceDetails);
      return {
        success: workExperience.success,
        id:      workExperience.id,
        message: workExperience.message,
        error:   workExperience.error,
        status:  workExperience.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        id:      "",
        message: `Failed To Update Work Experience: ${errorMessage}`,
        error:   `Failed To Update Work Experience: ${errorMessage}`,
        status:  500,
      };
    }
  },
};