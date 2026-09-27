import { handleProfile } from "@/services/profile";
import { ProfileFormTypes } from "@/schema/schema";
import { UpdateProfileType } from "@/types/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useSingleProfileQuery(id?: string, enabled = true) {
  const singleProfileQuery = useQuery({
    queryKey: ["Profile", "single", id],
    queryFn:  () => handleProfile.handleGetProfileService(id as string),
    enabled:  enabled && Boolean(id),
  });

  return {
    profile:  singleProfileQuery.data?.data ?? null,
    isLoading: singleProfileQuery.isLoading,
    message:  singleProfileQuery.data?.message ?? null,
  };
}

export function useProfile() {
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ["Profile", "all"],
    queryFn:  () => handleProfile.handleListProfilesService(),
    staleTime: 30000,
    gcTime:   3 * 60 * 1000,
  });

  const createProfileMutation = useMutation({
    mutationFn: async (profileDetails: ProfileFormTypes) => {
      return handleProfile.handleCreateProfileService(profileDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Profile"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async ({
      id,
      profileDetails,
    }: {
      id: string;
      profileDetails: Partial<UpdateProfileType>;
    }) => {
      return handleProfile.handleUpdateProfileService(id, profileDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Profile"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const deleteProfileMutation = useMutation({
    mutationFn: async (id: string) => {
      return handleProfile.handleDeleteProfileService(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Profile"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const profiles = profileQuery.data?.data ?? [];

  const profileError =
    profileQuery.data && !profileQuery.data.success
      ? profileQuery.data.message
      : profileQuery.error instanceof Error
        ? profileQuery.error.message
        : null;

  return {
    profile:          profiles[0] ?? null,
    profiles,
    isLoading:        profileQuery.isLoading,
    isFetching:       profileQuery.isFetching,
    error:            profileError,
    refetch:          profileQuery.refetch,
    createProfile:    createProfileMutation.mutate,
    isCreatingProfile: createProfileMutation.isPending,
    updateProfile:    updateProfileMutation.mutate,
    isUpdatingProfile: updateProfileMutation.isPending,
    updatingProfileId: updateProfileMutation.isPending
      ? updateProfileMutation.variables?.id ?? null
      : null,
    deleteProfile:    deleteProfileMutation.mutate,
    isDeletingProfile: deleteProfileMutation.isPending,
    deletingProfileId: deleteProfileMutation.isPending
      ? deleteProfileMutation.variables ?? null
      : null,
  };
}