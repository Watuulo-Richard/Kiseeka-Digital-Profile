import { handleGallery } from "@/services/gallery";
import { UpdateGalleryImageType } from "@/types/gallery";
import { GalleryImageSchemaType } from "@/schema/gallery.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGalleryImages() {
  const queryClient = useQueryClient();

  const galleryImagesQuery = useQuery({
    queryKey:  ["GalleryImage", "all"],
    queryFn:   () => handleGallery.handleListGalleryImagesService(),
    staleTime: 30000,
    gcTime:    3 * 60 * 1000,
  });

  const createGalleryImageMutation = useMutation({
    mutationFn: async (galleryImageDetails: GalleryImageSchemaType) => {
      return handleGallery.handleCreateGalleryImageService(galleryImageDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GalleryImage"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const updateGalleryImageMutation = useMutation({
    mutationFn: async ({
      id,
      galleryImageDetails,
    }: {
      id:                   string;
      galleryImageDetails: Partial<UpdateGalleryImageType>;
    }) => {
      return handleGallery.handleUpdateGalleryImageService(id, galleryImageDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GalleryImage"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const deleteGalleryImageMutation = useMutation({
    mutationFn: async (id: string) => {
      return handleGallery.handleDeleteGalleryImageService(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GalleryImage"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const galleryImagesError =
    galleryImagesQuery.data && !galleryImagesQuery.data.success
      ? galleryImagesQuery.data.message
      : galleryImagesQuery.error instanceof Error
        ? galleryImagesQuery.error.message
        : null;

  return {
    listGalleryImages:  galleryImagesQuery.data?.data ?? [],
    isLoading:          galleryImagesQuery.isLoading,
    isFetching:         galleryImagesQuery.isFetching,
    error:              galleryImagesError,
    refetch:            galleryImagesQuery.refetch,
    createGalleryImage: createGalleryImageMutation.mutate,
    isCreating:         createGalleryImageMutation.isPending,
    updateGalleryImage: updateGalleryImageMutation.mutate,
    isUpdating:         updateGalleryImageMutation.isPending,
    updatingId:         updateGalleryImageMutation.isPending
      ? updateGalleryImageMutation.variables?.id ?? null
      : null,
    deleteGalleryImage: deleteGalleryImageMutation.mutate,
    isDeleting:         deleteGalleryImageMutation.isPending,
    deletingId:         deleteGalleryImageMutation.isPending
      ? deleteGalleryImageMutation.variables ?? null
      : null,
  };
}

export function useSingleGalleryImageQuery(id?: string, enabled = true) {
  const singleGalleryImageQuery = useQuery({
    queryKey: ["GalleryImage", "single", id],
    queryFn:  () => handleGallery.handleGetGalleryImageService(id as string),
    enabled:  enabled && Boolean(id),
  });

  return {
    galleryImage: singleGalleryImageQuery.data?.data ?? null,
    isLoading:    singleGalleryImageQuery.isLoading,
    message:      singleGalleryImageQuery.data?.message ?? null,
  };
}