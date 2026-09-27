import {
  createProjectAction,
  deleteProjectAction,
  getProjectsAction,
  projectAction,
  updateProjectAction,
} from "@/actions/project";
import { ProjectsFormTypes } from "@/schema/schema";
import {
  CreateProjectResponse,
  DeleteProjectResponse,
  GetAllProjectsResponse,
  GetSingleProjectResponse,
  UpdateProjectResponse,
  UpdateProjectType,
} from "@/types/project";

type UseProjectsState = {
  handleCreateProjectService: (projectDetails: ProjectsFormTypes) => Promise<CreateProjectResponse>;
  handleListProjectsService: () => Promise<GetAllProjectsResponse>;
  handleGetProjectService: (id: string) => Promise<GetSingleProjectResponse>;
  handleDeleteProjectService: (id: string) => Promise<DeleteProjectResponse>;
  handleUpdateProjectService: (
    id: string,
    projectDetails: UpdateProjectType,
  ) => Promise<UpdateProjectResponse>;
};

export const handleProjects: UseProjectsState = {
  async handleCreateProjectService(projectDetails: ProjectsFormTypes) {
    try {
      const project = await createProjectAction(projectDetails);
      return {
        success: project.success,
        id:      project.id,
        message: project.message,
        error:   project.error,
        status:  project.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        id:      "",
        message: `Failed To Add Project: ${errorMessage}`,
        error:   `Failed To Add Project: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleListProjectsService() {
    try {
      const projects = await getProjectsAction();
      return {
        success: projects.success,
        data:    projects.data,
        message: projects.message,
        error:   projects.error,
        status:  projects.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        data:    [],
        message: `Failed To Fetch Projects: ${errorMessage}`,
        error:   `Failed To Fetch Projects: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleGetProjectService(id: string) {
    try {
      const project = await projectAction(id);
      return {
        success: project.success,
        data:    project.data,
        message: project.message,
        error:   project.error,
        status:  project.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        data:    null,
        message: `Failed To Fetch Project: ${errorMessage}`,
        error:   `Failed To Fetch Project: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleDeleteProjectService(id: string) {
    try {
      const project = await deleteProjectAction(id);
      return {
        success: project.success,
        message: project.message,
        error:   project.error,
        status:  project.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        message: `Failed To Delete Project: ${errorMessage}`,
        error:   `Failed To Delete Project: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleUpdateProjectService(id: string, projectDetails: UpdateProjectType) {
    try {
      const project = await updateProjectAction(id, projectDetails);
      return {
        success: project.success,
        id:      project.id,
        message: project.message,
        error:   project.error,
        status:  project.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        id:      "",
        message: `Failed To Update Project: ${errorMessage}`,
        error:   `Failed To Update Project: ${errorMessage}`,
        status:  500,
      };
    }
  },
};