import { handleTestimonials } from "@/services/testimonial";
import { UpdateTestimonialType } from "@/types/testimonial";
import { TestimonialFormTypes } from "@/schema/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTestimonials() {
  const queryClient = useQueryClient();

  const testimonialsQuery = useQuery({
    queryKey:  ["Testimonial", "all"],
    queryFn:   () => handleTestimonials.handleListTestimonialsService(),
    staleTime: 30000,
    gcTime:    3 * 60 * 1000,
  });

  const createTestimonialMutation = useMutation({
    mutationFn: async (testimonialDetails: TestimonialFormTypes) => {
      return handleTestimonials.handleCreateTestimonialService(testimonialDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Testimonial"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const updateTestimonialMutation = useMutation({
    mutationFn: async ({
      id,
      testimonialDetails,
    }: {
      id:                   string;
      testimonialDetails: Partial<UpdateTestimonialType>;
    }) => {
      return handleTestimonials.handleUpdateTestimonialService(id, testimonialDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Testimonial"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const deleteTestimonialMutation = useMutation({
    mutationFn: async (id: string) => {
      return handleTestimonials.handleDeleteTestimonialService(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Testimonial"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const testimonialsError =
    testimonialsQuery.data && !testimonialsQuery.data.success
      ? testimonialsQuery.data.message
      : testimonialsQuery.error instanceof Error
        ? testimonialsQuery.error.message
        : null;

  return {
    listTestimonials:  testimonialsQuery.data?.data ?? [],
    isLoading:         testimonialsQuery.isLoading,
    isFetching:        testimonialsQuery.isFetching,
    error:             testimonialsError,
    refetch:           testimonialsQuery.refetch,
    createTestimonial: createTestimonialMutation.mutate,
    isCreating:        createTestimonialMutation.isPending,
    updateTestimonial: updateTestimonialMutation.mutate,
    isUpdating:        updateTestimonialMutation.isPending,
    updatingId:        updateTestimonialMutation.isPending
      ? updateTestimonialMutation.variables?.id ?? null
      : null,
    deleteTestimonial: deleteTestimonialMutation.mutate,
    isDeleting:        deleteTestimonialMutation.isPending,
    deletingId:        deleteTestimonialMutation.isPending
      ? deleteTestimonialMutation.variables ?? null
      : null,
  };
}

export function useSingleTestimonialQuery(id?: string, enabled = true) {
  const singleTestimonialQuery = useQuery({
    queryKey: ["Testimonial", "single", id],
    queryFn:  () => handleTestimonials.handleGetTestimonialService(id as string),
    enabled:  enabled && Boolean(id),
  });

  return {
    testimonial: singleTestimonialQuery.data?.data ?? null,
    isLoading:   singleTestimonialQuery.isLoading,
    message:     singleTestimonialQuery.data?.message ?? null,
  };
}