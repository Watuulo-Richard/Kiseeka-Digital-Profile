import { handleComments } from "@/services/comment";
import { UpdateCommentType } from "@/types/comment";
import { CommentFormTypes } from "@/schema/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useComments() {
  const queryClient = useQueryClient();

  const commentsQuery = useQuery({
    queryKey:  ["Comment", "all"],
    queryFn:   () => handleComments.handleListCommentsService(),
    staleTime: 30000,
    gcTime:    3 * 60 * 1000,
  });

  const createCommentMutation = useMutation({
    mutationFn: async (commentDetails: CommentFormTypes) => {
      return handleComments.handleCreateCommentService(commentDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Comment"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: async ({
      id,
      commentDetails,
    }: {
      id:              string;
      commentDetails: Partial<UpdateCommentType>;
    }) => {
      return handleComments.handleUpdateCommentService(id, commentDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Comment"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (id: string) => {
      return handleComments.handleDeleteCommentService(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Comment"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const commentsError =
    commentsQuery.data && !commentsQuery.data.success
      ? commentsQuery.data.message
      : commentsQuery.error instanceof Error
        ? commentsQuery.error.message
        : null;

  return {
    listComments:  commentsQuery.data?.data ?? [],
    isLoading:     commentsQuery.isLoading,
    isFetching:    commentsQuery.isFetching,
    error:         commentsError,
    refetch:       commentsQuery.refetch,
    createComment: createCommentMutation.mutate,
    isCreating:    createCommentMutation.isPending,
    updateComment: updateCommentMutation.mutate,
    isUpdating:    updateCommentMutation.isPending,
    updatingId:    updateCommentMutation.isPending
      ? updateCommentMutation.variables?.id ?? null
      : null,
    deleteComment: deleteCommentMutation.mutate,
    isDeleting:    deleteCommentMutation.isPending,
    deletingId:    deleteCommentMutation.isPending
      ? deleteCommentMutation.variables ?? null
      : null,
  };
}

export function useSingleCommentQuery(id?: string, enabled = true) {
  const singleCommentQuery = useQuery({
    queryKey: ["Comment", "single", id],
    queryFn:  () => handleComments.handleGetCommentService(id as string),
    enabled:  enabled && Boolean(id),
  });

  return {
    comment:   singleCommentQuery.data?.data ?? null,
    isLoading: singleCommentQuery.isLoading,
    message:   singleCommentQuery.data?.message ?? null,
  };
}