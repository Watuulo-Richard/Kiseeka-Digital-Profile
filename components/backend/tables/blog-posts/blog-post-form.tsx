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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import {
  FileText,
  Hash,
  ImagePlus,
  Link2,
  Loader2,
  Plus,
  Send,
  Star,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBlogPosts, useSingleBlogPostQuery } from "@/hooks/use-blog-posts";
import { useBlogPostCategories } from "@/hooks/use-blog-post-categories";
import { BlogPostsFormTypes, BlogPostsSchema } from "@/schema/schema";
import { UpdateBlogPostType } from "@/types/blog-post";
import { generateSlug } from "@/lib/generate-slug";
import ImageInput from "../../image-upload";
import VEditor from "../../forms/rich-text-editor";
import { DateAndTime } from "../../date-and-time";

interface BlogPostFormProps {
  userId: string;
  postSlug?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const EMPTY_DEFAULTS: BlogPostsFormTypes = {
  title: "",
  excerpt: "",
  publishDate: new Date().toISOString(),
  content: "",
  image: "",
  featured: false,
  blogPostsCategoryId: "",
  slug: "",
  userId: "",
};

const EDITOR_INITIAL = "<p>Start writing your document here...</p>";

export function BlogPostForm({
  userId,
  postSlug,
  open: controlledOpen,
  onOpenChange,
}: BlogPostFormProps) {
  const form = useForm<BlogPostsFormTypes>({
    resolver: zodResolver(BlogPostsSchema),
    defaultValues: EMPTY_DEFAULTS,
  });

  const formErrors = form.formState.errors;
  const watchedTitle = form.watch("title");

  const { createBlogPost, updateBlogPost } = useBlogPosts();
  const { listBlogPostCategories } = useBlogPostCategories();
  const { blogPost: singlePost, isLoading: isLoadingPost } =
    useSingleBlogPostQuery(postSlug, controlledOpen);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const slugPreview = generateSlug(watchedTitle || "");

  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = onOpenChange ?? setInternalOpen;

  const lastPopulatedSlug = useRef<string | null>(null);

  useEffect(() => {
    if (postSlug && singlePost?.blogPost && isOpen) {
      if (lastPopulatedSlug.current !== postSlug) {
        lastPopulatedSlug.current = postSlug;
        const post = singlePost.blogPost;
        form.reset({
          title: post.title,
          excerpt: post.excerpt,
          publishDate:
            typeof post.publishDate === "string"
              ? post.publishDate
              : post.publishDate.toISOString(),
          content: post.content,
          image: post.image,
          featured: post.featured,
          blogPostsCategoryId: post.blogPostsCategoryId,
          slug: post.slug,
          userId: post.userId,
        });
        setImageUrl(post.image);
        setBlogContent(post.content);
        setCategoryId(post.blogPostsCategoryId);
        setIsFeatured(post.featured);
      }
    } else if (!postSlug && isOpen && lastPopulatedSlug.current !== null) {
      form.reset(EMPTY_DEFAULTS);
      setImageUrl("");
      setBlogContent("");
      setCategoryId("");
      setIsFeatured(false);
      lastPopulatedSlug.current = null;
    } else if (!isOpen) {
      lastPopulatedSlug.current = null;
    }
  }, [singlePost, postSlug, isOpen, form]);

  async function handleSubmit(data: BlogPostsFormTypes) {
    if (!imageUrl || imageUrl === "/placeholder.svg") {
      toast.error("Please upload an image for the blog post");
      return;
    }
    if (!categoryId) {
      toast.error("Please select a blog category");
      return;
    }
    if (!blogContent) {
      toast.error("Please add content to your blog post");
      return;
    }

    setIsSubmitting(true);

    const slug = slugPreview || `post-${Date.now()}`;

    if (postSlug) {
      const updatePayload: UpdateBlogPostType = {
        title: data.title,
        excerpt: data.excerpt,
        publishDate: new Date(data.publishDate),
        image: imageUrl,
        slug,
        blogPostsCategoryId: categoryId,
        content: blogContent,
        featured: isFeatured,
      };

      updateBlogPost(
        { slug: postSlug, blogPostDetails: updatePayload },
        {
          onSuccess: (response) => {
            setIsSubmitting(false);
            if (response.success) {
              toast.success(response.message || "Blog-Post Updated Successfully...✅");
              setIsOpen(false);
            } else {
              toast.error(response.message || "Failed To Update Blog-Post...🥺");
            }
          },
          onError: (error) => {
            setIsSubmitting(false);
            toast.error("Failed To Update Blog-Post");
            console.error("Update error:", error);
          },
        },
      );
      return;
    }

    createBlogPost(
      {
        title: data.title,
        excerpt: data.excerpt,
        publishDate: data.publishDate,
        image: imageUrl,
        slug,
        blogPostsCategoryId: categoryId,
        content: blogContent,
        featured: isFeatured,
        userId,
      },
      {
        onSuccess: (response) => {
          setIsSubmitting(false);
          if (response.error) {
            toast.error(response.error ?? "Failed to add blog post.");
            return;
          }
          toast.success("Blog-Post Added Successfully...✅");
          form.reset({ ...EMPTY_DEFAULTS });
          setImageUrl("");
          setBlogContent("");
          setCategoryId("");
          setIsFeatured(false);
          setIsOpen(false);
        },
        onError: (error) => {
          setIsSubmitting(false);
          toast.error("Failed To Save Blog-Post");
          console.error("Create error:", error);
        },
      },
    );
  }

  const isEditMode = !!postSlug;
  const isBusy = isSubmitting || isLoadingPost;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {controlledOpen === undefined && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Blog Post
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="flex h-[min(92vh,900px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
        {isLoadingPost && postSlug ? (
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
                {isEditMode ? "Edit Blog Post" : "Create New Blog Post"}
              </DialogTitle>
              <DialogDescription>
                {isEditMode
                  ? "Update your blog post details below."
                  : "Share your thoughts with your audience. Fill in the details and save."}
              </DialogDescription>
            </DialogHeader>

            <input type="hidden" {...form.register("publishDate")} />

            <Separator />

            <ScrollArea className="min-h-0 flex-1">
              <div className="space-y-5 px-6 py-4 pb-6">
                <div className="grid gap-2">
                  <Label htmlFor="title">
                    Blog Post Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="E.g., How I Built a Digital Profile with Next.js"
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
                      value={slugPreview || "post-..."}
                      readOnly
                      disabled
                      className="h-10 rounded-lg border-gray-200 bg-muted/40 pl-9 pr-10 text-sm font-mono dark:border-gray-800"
                    />
                    <Hash className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  <span className="text-[11px] text-muted-foreground">
                    Auto-generated from the title. Used in URLs as a unique
                    identifier.
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>
                      Blog Category <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={categoryId}
                      onValueChange={setCategoryId}
                      disabled={isBusy}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a blog-post category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Blog post categories</SelectLabel>
                          {listBlogPostCategories.length > 0 ? (
                            listBlogPostCategories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.title}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="__none__" disabled>
                              No categories yet — add one first
                            </SelectItem>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label>
                      Publish Date <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <DateAndTime
                        publishedDateAndTime={
                          form.watch("publishDate")
                            ? new Date(form.watch("publishDate"))
                            : new Date()
                        }
                        setPublishedDateAndTime={(d: Date) => {
                          form.setValue("publishDate", d.toISOString(), {
                            shouldValidate: true,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/10 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F2B5A0]/10">
                      <Star className="h-4 w-4 text-[#f2957a]" />
                    </div>
                    <div>
                      <Label htmlFor="featured-toggle" className="font-medium cursor-pointer">
                        Featured Post
                      </Label>
                      <p className="text-[11px] text-muted-foreground">
                        Highlight this post across your blog.
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="featured-toggle"
                    checked={isFeatured}
                    onCheckedChange={setIsFeatured}
                    disabled={isBusy}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>
                    <span className="flex items-center gap-1.5">
                      <ImagePlus className="h-3.5 w-3.5" />
                      Blog Post Image <span className="text-destructive">*</span>
                    </span>
                  </Label>
                  <ImageInput
                    key={postSlug ?? "new-image"}
                    title="Blog Post Photo"
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    endpoint="imageUploader"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="excerpt">
                    Blog Post Excerpt <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Write a compelling excerpt that gives readers a preview of your blog post..."
                    rows={3}
                    {...form.register("excerpt")}
                    disabled={isBusy}
                    className="resize-none"
                  />
                  {formErrors.excerpt && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 font-medium"
                    >
                      {formErrors.excerpt.message}
                    </motion.span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="content">
                    <span className="flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5" />
                      Blog Post Content <span className="text-destructive">*</span>
                    </span>
                  </Label>
                  <VEditor
                    key={postSlug ?? "new"}
                    content={blogContent}
                    setContent={setBlogContent}
                    initialContent={
                      singlePost?.blogPost?.content || EDITOR_INITIAL
                    }
                    variant="compact"
                    isEditable={!isBusy}
                  />
                  {!blogContent && (
                    <span className="text-[11px] text-muted-foreground">
                      Use the toolbar above to format your content.
                    </span>
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
                {isBusy && !isLoadingPost ? (
                  <>
                    <span>{isEditMode ? "Updating..." : "Saving..."}</span>
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <span>{isEditMode ? "Update" : "Save"} Blog Post</span>
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