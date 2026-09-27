import { handleBlogPosts } from "@/services/blog-post";
import { UpdateBlogPostType } from "@/types/blog-post";
import { BlogPostsFormTypes } from "@/schema/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useBlogPosts() {
  const queryClient = useQueryClient();

  const blogPostsQuery = useQuery({
    queryKey:  ["BlogPost", "all"],
    queryFn:   () => handleBlogPosts.handleListBlogPostsService(),
    staleTime: 30000,
    gcTime:    3 * 60 * 1000,
  });

  const createBlogPostMutation = useMutation({
    mutationFn: async (blogPostDetails: BlogPostsFormTypes) => {
      return handleBlogPosts.handleCreateBlogPostService(blogPostDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["BlogPost"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const updateBlogPostMutation = useMutation({
    mutationFn: async ({
      slug,
      blogPostDetails,
    }: {
      slug:              string;
      blogPostDetails: Partial<UpdateBlogPostType>;
    }) => {
      return handleBlogPosts.handleUpdateBlogPostService(slug, blogPostDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["BlogPost"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const deleteBlogPostMutation = useMutation({
    mutationFn: async (slug: string) => {
      return handleBlogPosts.handleDeleteBlogPostService(slug);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["BlogPost"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const blogPostsError =
    blogPostsQuery.data && !blogPostsQuery.data.success
      ? blogPostsQuery.data.message
      : blogPostsQuery.error instanceof Error
        ? blogPostsQuery.error.message
        : null;

  return {
    listBlogPosts:  blogPostsQuery.data?.data ?? [],
    isLoading:      blogPostsQuery.isLoading,
    isFetching:     blogPostsQuery.isFetching,
    error:          blogPostsError,
    refetch:        blogPostsQuery.refetch,
    createBlogPost: createBlogPostMutation.mutate,
    isCreating:     createBlogPostMutation.isPending,
    updateBlogPost: updateBlogPostMutation.mutate,
    isUpdating:     updateBlogPostMutation.isPending,
    updatingSlug:   updateBlogPostMutation.isPending
      ? updateBlogPostMutation.variables?.slug ?? null
      : null,
    deleteBlogPost: deleteBlogPostMutation.mutate,
    isDeleting:     deleteBlogPostMutation.isPending,
    deletingSlug:   deleteBlogPostMutation.isPending
      ? deleteBlogPostMutation.variables ?? null
      : null,
  };
}

export function useSingleBlogPostQuery(slug?: string, enabled = true) {
  const singleBlogPostQuery = useQuery({
    queryKey: ["BlogPost", "single", slug],
    queryFn:  () => handleBlogPosts.handleGetBlogPostService(slug as string),
    enabled:  enabled && Boolean(slug),
  });

  return {
    blogPost:  singleBlogPostQuery.data?.data ?? null,
    isLoading: singleBlogPostQuery.isLoading,
    message:   singleBlogPostQuery.data?.message ?? null,
  };
}