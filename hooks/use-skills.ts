import { handleSkills } from "@/services/skill";
import { UpdateSkillType } from "@/types/skill";
import { SkillFormTypes } from "@/schema/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useSkills() {
  const queryClient = useQueryClient();

  const skillsQuery = useQuery({
    queryKey:  ["Skill", "all"],
    queryFn:   () => handleSkills.handleListSkillsService(),
    staleTime: 30000,
    gcTime:    3 * 60 * 1000,
  });

  const createSkillMutation = useMutation({
    mutationFn: async (skillDetails: SkillFormTypes) => {
      return handleSkills.handleCreateSkillService(skillDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Skill"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const updateSkillMutation = useMutation({
    mutationFn: async ({
      id,
      skillDetails,
    }: {
      id:            string;
      skillDetails: Partial<UpdateSkillType>;
    }) => {
      return handleSkills.handleUpdateSkillService(id, skillDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Skill"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const deleteSkillMutation = useMutation({
    mutationFn: async (id: string) => {
      return handleSkills.handleDeleteSkillService(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Skill"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const skillsError =
    skillsQuery.data && !skillsQuery.data.success
      ? skillsQuery.data.message
      : skillsQuery.error instanceof Error
        ? skillsQuery.error.message
        : null;

  return {
    listSkills:  skillsQuery.data?.data ?? [],
    isLoading:   skillsQuery.isLoading,
    isFetching:  skillsQuery.isFetching,
    error:       skillsError,
    refetch:     skillsQuery.refetch,
    createSkill: createSkillMutation.mutate,
    isCreating:  createSkillMutation.isPending,
    updateSkill: updateSkillMutation.mutate,
    isUpdating:  updateSkillMutation.isPending,
    updatingId:  updateSkillMutation.isPending
      ? updateSkillMutation.variables?.id ?? null
      : null,
    deleteSkill: deleteSkillMutation.mutate,
    isDeleting:  deleteSkillMutation.isPending,
    deletingId:  deleteSkillMutation.isPending
      ? deleteSkillMutation.variables ?? null
      : null,
  };
}

export function useSingleSkillQuery(id?: string, enabled = true) {
  const singleSkillQuery = useQuery({
    queryKey: ["Skill", "single", id],
    queryFn:  () => handleSkills.handleGetSkillService(id as string),
    enabled:  enabled && Boolean(id),
  });

  return {
    skill:     singleSkillQuery.data?.data ?? null,
    isLoading: singleSkillQuery.isLoading,
    message:   singleSkillQuery.data?.message ?? null,
  };
}