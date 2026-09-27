import { handleEducation } from "@/services/education";
import { UpdateEducationType } from "@/types/education";
import { EducationFormTypes } from "@/schema/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useEducation() {
  const queryClient = useQueryClient();

  const educationQuery = useQuery({
    queryKey:  ["Education", "all"],
    queryFn:   () => handleEducation.handleListEducationService(),
    staleTime: 30000,
    gcTime:    3 * 60 * 1000,
  });

  const createEducationMutation = useMutation({
    mutationFn: async (educationDetails: EducationFormTypes) => {
      return handleEducation.handleCreateEducationService(educationDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Education"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const updateEducationMutation = useMutation({
    mutationFn: async ({
      id,
      educationDetails,
    }: {
      id:                string;
      educationDetails: Partial<UpdateEducationType>;
    }) => {
      return handleEducation.handleUpdateEducationService(id, educationDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Education"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const deleteEducationMutation = useMutation({
    mutationFn: async (id: string) => {
      return handleEducation.handleDeleteEducationService(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Education"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const educationError =
    educationQuery.data && !educationQuery.data.success
      ? educationQuery.data.message
      : educationQuery.error instanceof Error
        ? educationQuery.error.message
        : null;

  return {
    listEducation:  educationQuery.data?.data ?? [],
    isLoading:      educationQuery.isLoading,
    isFetching:     educationQuery.isFetching,
    error:          educationError,
    refetch:        educationQuery.refetch,
    createEducation: createEducationMutation.mutate,
    isCreating:     createEducationMutation.isPending,
    updateEducation: updateEducationMutation.mutate,
    isUpdating:     updateEducationMutation.isPending,
    updatingId:     updateEducationMutation.isPending
      ? updateEducationMutation.variables?.id ?? null
      : null,
    deleteEducation: deleteEducationMutation.mutate,
    isDeleting:     deleteEducationMutation.isPending,
    deletingId:     deleteEducationMutation.isPending
      ? deleteEducationMutation.variables ?? null
      : null,
  };
}

export function useSingleEducationQuery(id?: string, enabled = true) {
  const singleEducationQuery = useQuery({
    queryKey: ["Education", "single", id],
    queryFn:  () => handleEducation.handleGetEducationService(id as string),
    enabled:  enabled && Boolean(id),
  });

  return {
    education: singleEducationQuery.data?.data ?? null,
    isLoading: singleEducationQuery.isLoading,
    message:   singleEducationQuery.data?.message ?? null,
  };
}