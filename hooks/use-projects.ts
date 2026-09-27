import { handleProjects } from "@/services/project";
import { UpdateProjectType } from "@/types/project";
import { ProjectsFormTypes } from "@/schema/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProjects() {
  const queryClient = useQueryClient();

  const projectsQuery = useQuery({
    queryKey:  ["Project", "all"],
    queryFn:   () => handleProjects.handleListProjectsService(),
    staleTime: 30000,
    gcTime:    3 * 60 * 1000,
  });

  const createProjectMutation = useMutation({
    mutationFn: async (projectDetails: ProjectsFormTypes) => {
      return handleProjects.handleCreateProjectService(projectDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Project"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({
      id,
      projectDetails,
    }: {
      id:              string;
      projectDetails: Partial<UpdateProjectType>;
    }) => {
      return handleProjects.handleUpdateProjectService(id, projectDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Project"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      return handleProjects.handleDeleteProjectService(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Project"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const projectsError =
    projectsQuery.data && !projectsQuery.data.success
      ? projectsQuery.data.message
      : projectsQuery.error instanceof Error
        ? projectsQuery.error.message
        : null;

  return {
    listProjects:  projectsQuery.data?.data ?? [],
    isLoading:     projectsQuery.isLoading,
    isFetching:    projectsQuery.isFetching,
    error:         projectsError,
    refetch:       projectsQuery.refetch,
    createProject: createProjectMutation.mutate,
    isCreating:    createProjectMutation.isPending,
    updateProject: updateProjectMutation.mutate,
    isUpdating:    updateProjectMutation.isPending,
    updatingId:    updateProjectMutation.isPending
      ? updateProjectMutation.variables?.id ?? null
      : null,
    deleteProject: deleteProjectMutation.mutate,
    isDeleting:    deleteProjectMutation.isPending,
    deletingId:    deleteProjectMutation.isPending
      ? deleteProjectMutation.variables ?? null
      : null,
  };
}

export function useSingleProjectQuery(id?: string, enabled = true) {
  const singleProjectQuery = useQuery({
    queryKey: ["Project", "single", id],
    queryFn:  () => handleProjects.handleGetProjectService(id as string),
    enabled:  enabled && Boolean(id),
  });

  return {
    project:   singleProjectQuery.data?.data ?? null,
    isLoading: singleProjectQuery.isLoading,
    message:   singleProjectQuery.data?.message ?? null,
  };
}