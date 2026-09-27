"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Hash, Link2, Loader2, Plus, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useBlogPostCategories,
  useSingleBlogPostCategoryQuery,
} from "@/hooks/use-blog-post-categories";
import {
  BlogPostsCategoryFormTypes,
  BlogPostsCategorySchema,
} from "@/schema/schema";
import { UpdateBlogPostCategoryType } from "@/types/blog-post-category";
import { generateSlug } from "@/lib/generate-slug";

interface BlogPostCategoryFormProps {
  userId: string;
  categorySlug?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const EMPTY_DEFAULTS: BlogPostsCategoryFormTypes = {
  title: "",
  description: "",
  slug: "",
  userId: "",
};

export function BlogPostCategoryForm({
  userId,
  categorySlug,
  open: controlledOpen,
  onOpenChange,
}: BlogPostCategoryFormProps) {
  const form = useForm<BlogPostsCategoryFormTypes>({
    resolver: zodResolver(BlogPostsCategorySchema),
    defaultValues: EMPTY_DEFAULTS,
  });

  const formErrors = form.formState.errors;
  const watchedTitle = form.watch("title");

  const { createBlogPostCategory, updateBlogPostCategory } =
    useBlogPostCategories();
  const { blogPostCategory, isLoading: isLoadingCategory } =
    useSingleBlogPostCategoryQuery(categorySlug, controlledOpen);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const slugPreview = generateSlug(watchedTitle || "");

  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = onOpenChange ?? setInternalOpen;

  const lastPopulatedSlug = useRef<string | null>(null);

  useEffect(() => {
    if (categorySlug && blogPostCategory && isOpen) {
      if (lastPopulatedSlug.current !== categorySlug) {
        lastPopulatedSlug.current = categorySlug;
        form.reset({
          title: blogPostCategory.title,
          description: blogPostCategory.description,
          slug: blogPostCategory.slug,
          userId: blogPostCategory.userId,
        });
      }
    } else if (!categorySlug && isOpen && lastPopulatedSlug.current !== null) {
      form.reset(EMPTY_DEFAULTS);
      lastPopulatedSlug.current = null;
    } else if (!isOpen) {
      lastPopulatedSlug.current = null;
    }
  }, [blogPostCategory, categorySlug, isOpen, form]);

  async function handleSubmit(data: BlogPostsCategoryFormTypes) {
    setIsSubmitting(true);

    const slug = slugPreview || `category-${Date.now()}`;

    if (categorySlug) {
      const updatePayload: UpdateBlogPostCategoryType = {
        title: data.title,
        description: data.description,
        slug,
      };

      updateBlogPostCategory(
        { slug: categorySlug, blogPostCategoryDetails: updatePayload },
        {
          onSuccess: (response) => {
            setIsSubmitting(false);
            if (response.success) {
              toast.success(
                response.message || "Blog-Posts Category Updated Successfully...✅",
              );
              form.reset(EMPTY_DEFAULTS);
              setIsOpen(false);
            } else {
              toast.error(
                response.message || "Failed To Update Blog-Posts Category...🥺",
              );
            }
          },
          onError: (error) => {
            setIsSubmitting(false);
            toast.error("Failed To Update Blog-Posts Category");
            console.error("Update error:", error);
          },
        },
      );
      return;
    }

    createBlogPostCategory(
      {
        title: data.title,
        description: data.description,
        slug,
        userId,
      },
      {
        onSuccess: (response) => {
          setIsSubmitting(false);
          if (response.error) {
            toast.error(response.error ?? "Failed to add blog category.");
            return;
          }
          toast.success("Blog-Posts Category Added Successfully...✅");
          form.reset({ ...EMPTY_DEFAULTS });
          setIsOpen(false);
        },
        onError: (error) => {
          setIsSubmitting(false);
          toast.error("Failed To Save Blog-Posts Category");
          console.error("Create error:", error);
        },
      },
    );
  }

  const isEditMode = !!categorySlug;
  const isBusy = isSubmitting || isLoadingCategory;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {controlledOpen === undefined && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="flex h-[min(90vh,820px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-[540px] md:max-w-[640px]">
        {isLoadingCategory && categorySlug ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <DialogHeader className="px-6 pt-6 pb-4">
              <DialogTitle>
                {isEditMode ? "Edit Blog Category" : "Add New Blog Category"}
              </DialogTitle>
              <DialogDescription>
                {isEditMode
                  ? "Update the blog category details below."
                  : "Add a new blog category. Click save when you're done."}
              </DialogDescription>
            </DialogHeader>

            <Separator />

            <ScrollArea className="min-h-0 flex-1">
              <div className="space-y-5 px-6 py-4 pb-6">
                <div className="grid gap-2">
                  <Label htmlFor="title">
                    Category Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="E.g., Web Development"
                    {...form.register("title")}
                    autoComplete="off"
                    disabled={isBusy}
                  />
                  {formErrors.title && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 font-medium"
                    >
                      {formErrors.title.message}
                    </motion.span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="slug">Slug</Label>
                  <div className="relative">
                    <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="slug"
                      value={slugPreview || "category-..."}
                      readOnly
                      disabled
                      className="h-10 rounded-lg border-gray-200 bg-muted/40 pl-9 pr-10 text-sm font-mono dark:border-gray-800"
                    />
                    <Hash className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  <span className="text-[11px] text-muted-foreground">
                    Auto-generated from the title. Used in URLs and as a
                    unique identifier.
                  </span>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">
                    Description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="E.g., Insights, tutorials, and updates about modern web development..."
                    rows={4}
                    {...form.register("description")}
                    disabled={isBusy}
                    className="resize-none"
                  />
                  {formErrors.description && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 font-medium"
                    >
                      {formErrors.description.message}
                    </motion.span>
                  )}
                </div>
              </div>
            </ScrollArea>

            <Separator />

            <DialogFooter className="shrink-0 gap-2 px-6 py-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isBusy}
                  className="rounded-lg"
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                disabled={isBusy}
                className="rounded-lg h-10 px-6 gap-2 group"
              >
                {isBusy && !isLoadingCategory ? (
                  <>
                    <span>{isEditMode ? "Updating..." : "Saving..."}</span>
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <span>{isEditMode ? "Update" : "Save"} Category</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}