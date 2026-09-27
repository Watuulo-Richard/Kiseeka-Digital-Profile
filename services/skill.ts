import {
  createSkillAction,
  deleteSkillAction,
  getSkillsAction,
  skillAction,
  updateSkillAction,
} from "@/actions/skill";
import { SkillFormTypes } from "@/schema/schema";
import {
  CreateSkillResponse,
  DeleteSkillResponse,
  GetAllSkillsResponse,
  GetSingleSkillResponse,
  UpdateSkillResponse,
  UpdateSkillType,
} from "@/types/skill";

type UseSkillsState = {
  handleCreateSkillService: (skillDetails: SkillFormTypes) => Promise<CreateSkillResponse>;
  handleListSkillsService: () => Promise<GetAllSkillsResponse>;
  handleGetSkillService: (id: string) => Promise<GetSingleSkillResponse>;
  handleDeleteSkillService: (id: string) => Promise<DeleteSkillResponse>;
  handleUpdateSkillService: (
    id: string,
    skillDetails: UpdateSkillType,
  ) => Promise<UpdateSkillResponse>;
};

export const handleSkills: UseSkillsState = {
  async handleCreateSkillService(skillDetails: SkillFormTypes) {
    try {
      const skill = await createSkillAction(skillDetails);
      return {
        success: skill.success,
        id:      skill.id,
        message: skill.message,
        error:   skill.error,
        status:  skill.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        id:      "",
        message: `Failed To Add Skill: ${errorMessage}`,
        error:   `Failed To Add Skill: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleListSkillsService() {
    try {
      const skills = await getSkillsAction();
      return {
        success: skills.success,
        data:    skills.data,
        message: skills.message,
        error:   skills.error,
        status:  skills.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        data:    [],
        message: `Failed To Fetch Skills: ${errorMessage}`,
        error:   `Failed To Fetch Skills: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleGetSkillService(id: string) {
    try {
      const skill = await skillAction(id);
      return {
        success: skill.success,
        data:    skill.data,
        message: skill.message,
        error:   skill.error,
        status:  skill.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        data:    null,
        message: `Failed To Fetch Skill: ${errorMessage}`,
        error:   `Failed To Fetch Skill: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleDeleteSkillService(id: string) {
    try {
      const skill = await deleteSkillAction(id);
      return {
        success: skill.success,
        message: skill.message,
        error:   skill.error,
        status:  skill.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        message: `Failed To Delete Skill: ${errorMessage}`,
        error:   `Failed To Delete Skill: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleUpdateSkillService(id: string, skillDetails: UpdateSkillType) {
    try {
      const skill = await updateSkillAction(id, skillDetails);
      return {
        success: skill.success,
        id:      skill.id,
        message: skill.message,
        error:   skill.error,
        status:  skill.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        id:      "",
        message: `Failed To Update Skill: ${errorMessage}`,
        error:   `Failed To Update Skill: ${errorMessage}`,
        status:  500,
      };
    }
  },
};