import { handleWorkExperiences } from "@/services/work-experience";
import { UpdateWorkExperienceType } from "@/types/work-experience";
import { WorkExperienceFormTypes } from "@/schema/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useWorkExperiences() {
  const queryClient = useQueryClient();

  const workExperiencesQuery = useQuery({
    queryKey:  ["WorkExperience", "all"],
    queryFn:   () => handleWorkExperiences.handleListWorkExperiencesService(),
    staleTime: 30000,
    gcTime:    3 * 60 * 1000,
  });

  const createWorkExperienceMutation = useMutation({
    mutationFn: async (workExperienceDetails: WorkExperienceFormTypes) => {
      return handleWorkExperiences.handleCreateWorkExperienceService(workExperienceDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["WorkExperience"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const updateWorkExperienceMutation = useMutation({
    mutationFn: async ({
      id,
      workExperienceDetails,
    }: {
      id:                       string;
      workExperienceDetails: Partial<UpdateWorkExperienceType>;
    }) => {
      return handleWorkExperiences.handleUpdateWorkExperienceService(id, workExperienceDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["WorkExperience"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const deleteWorkExperienceMutation = useMutation({
    mutationFn: async (id: string) => {
      return handleWorkExperiences.handleDeleteWorkExperienceService(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["WorkExperience"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const workExperiencesError =
    workExperiencesQuery.data && !workExperiencesQuery.data.success
      ? workExperiencesQuery.data.message
      : workExperiencesQuery.error instanceof Error
        ? workExperiencesQuery.error.message
        : null;

  return {
    listWorkExperiences:  workExperiencesQuery.data?.data ?? [],
    isLoading:            workExperiencesQuery.isLoading,
    isFetching:           workExperiencesQuery.isFetching,
    error:                workExperiencesError,
    refetch:              workExperiencesQuery.refetch,
    createWorkExperience: createWorkExperienceMutation.mutate,
    isCreating:           createWorkExperienceMutation.isPending,
    updateWorkExperience: updateWorkExperienceMutation.mutate,
    isUpdating:           updateWorkExperienceMutation.isPending,
    updatingId:           updateWorkExperienceMutation.isPending
      ? updateWorkExperienceMutation.variables?.id ?? null
      : null,
    deleteWorkExperience: deleteWorkExperienceMutation.mutate,
    isDeleting:           deleteWorkExperienceMutation.isPending,
    deletingId:           deleteWorkExperienceMutation.isPending
      ? deleteWorkExperienceMutation.variables ?? null
      : null,
  };
}

export function useSingleWorkExperienceQuery(id?: string, enabled = true) {
  const singleWorkExperienceQuery = useQuery({
    queryKey: ["WorkExperience", "single", id],
    queryFn:  () => handleWorkExperiences.handleGetWorkExperienceService(id as string),
    enabled:  enabled && Boolean(id),
  });

  return {
    workExperience: singleWorkExperienceQuery.data?.data ?? null,
    isLoading:      singleWorkExperienceQuery.isLoading,
    message:        singleWorkExperienceQuery.data?.message ?? null,
  };
}