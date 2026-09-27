import { handleBlogPostCategories } from "@/services/blog-post-category";
import { UpdateBlogPostCategoryType } from "@/types/blog-post-category";
import { BlogPostsCategoryFormTypes } from "@/schema/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useBlogPostCategories() {
  const queryClient = useQueryClient();

  const blogPostCategoriesQuery = useQuery({
    queryKey:  ["BlogPostCategory", "all"],
    queryFn:   () => handleBlogPostCategories.handleListBlogPostCategoriesService(),
    staleTime: 30000,
    gcTime:    3 * 60 * 1000,
  });

  const createBlogPostCategoryMutation = useMutation({
    mutationFn: async (blogPostCategoryDetails: BlogPostsCategoryFormTypes) => {
      return handleBlogPostCategories.handleCreateBlogPostCategoryService(blogPostCategoryDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["BlogPostCategory"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const updateBlogPostCategoryMutation = useMutation({
    mutationFn: async ({
      slug,
      blogPostCategoryDetails,
    }: {
      slug:                      string;
      blogPostCategoryDetails: Partial<UpdateBlogPostCategoryType>;
    }) => {
      return handleBlogPostCategories.handleUpdateBlogPostCategoryService(slug, blogPostCategoryDetails);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["BlogPostCategory"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const deleteBlogPostCategoryMutation = useMutation({
    mutationFn: async (slug: string) => {
      return handleBlogPostCategories.handleDeleteBlogPostCategoryService(slug);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["BlogPostCategory"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const blogPostCategoriesError =
    blogPostCategoriesQuery.data && !blogPostCategoriesQuery.data.success
      ? blogPostCategoriesQuery.data.message
      : blogPostCategoriesQuery.error instanceof Error
        ? blogPostCategoriesQuery.error.message
        : null;

  return {
    listBlogPostCategories:  blogPostCategoriesQuery.data?.data ?? [],
    isLoading:               blogPostCategoriesQuery.isLoading,
    isFetching:              blogPostCategoriesQuery.isFetching,
    error:                   blogPostCategoriesError,
    refetch:                 blogPostCategoriesQuery.refetch,
    createBlogPostCategory:  createBlogPostCategoryMutation.mutate,
    isCreating:              createBlogPostCategoryMutation.isPending,
    updateBlogPostCategory:  updateBlogPostCategoryMutation.mutate,
    isUpdating:              updateBlogPostCategoryMutation.isPending,
    updatingSlug:            updateBlogPostCategoryMutation.isPending
      ? updateBlogPostCategoryMutation.variables?.slug ?? null
      : null,
    deleteBlogPostCategory:  deleteBlogPostCategoryMutation.mutate,
    isDeleting:              deleteBlogPostCategoryMutation.isPending,
    deletingSlug:            deleteBlogPostCategoryMutation.isPending
      ? deleteBlogPostCategoryMutation.variables ?? null
      : null,
  };
}

export function useSingleBlogPostCategoryQuery(slug?: string, enabled = true) {
  const singleBlogPostCategoryQuery = useQuery({
    queryKey: ["BlogPostCategory", "single", slug],
    queryFn:  () => handleBlogPostCategories.handleGetBlogPostCategoryService(slug as string),
    enabled:  enabled && Boolean(slug),
  });

  return {
    blogPostCategory: singleBlogPostCategoryQuery.data?.data ?? null,
    isLoading:        singleBlogPostCategoryQuery.isLoading,
    message:          singleBlogPostCategoryQuery.data?.message ?? null,
  };
}