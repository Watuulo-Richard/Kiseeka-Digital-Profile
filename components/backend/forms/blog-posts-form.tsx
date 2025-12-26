"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  FileText,
  Info,
  ImagePlus,
  SaveAll,
  Loader,
  CalendarDays,
  Edit3,
} from "lucide-react";
import { BlogPostsFormTypes, BlogPostsSchema } from "@/schema/schema";
import ImageInput from "../image-upload";
import { toast } from "sonner";
import { baseUrl, BlogPostAndRelatedBlogPostType, BlogPostCommentTypes } from "@/types/type";
import { BlogPostCategory, Portfolio } from "@prisma/client";
import { Users } from "@/components/frontend/users";
import { DateAndTime } from "../date-and-time";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VEditor from "./rich-text-editor";
import { generateSlug } from "@/lib/generate-slug";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";

export default function BlogPostsForm({
  portfolio,
  userBlogPostsCategories,
  userBlogPost,
}: {
  portfolio: Portfolio;
  userBlogPostsCategories: BlogPostCategory[];
  userBlogPost: BlogPostAndRelatedBlogPostType | null;
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogPostsFormTypes>({
    resolver: zodResolver(BlogPostsSchema),
    defaultValues: {
      title: userBlogPost?.blogPost.title || "",
      image: userBlogPost?.blogPost.image || "",
      excerpt: userBlogPost?.blogPost.excerpt || "",
      publishDate: userBlogPost?.blogPost.publishDate
        ? typeof userBlogPost?.blogPost.publishDate === "string"
          ? userBlogPost.blogPost.publishDate
          : userBlogPost.blogPost.publishDate.toISOString()
        : new Date().toISOString(),
    },
  });
const router = useRouter()
  const initialImage = userBlogPost?.blogPost.image || "/placeholder.svg";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [loading, setLoading] = useState(false);
  const [blogCategory, setBlogCategory] = useState<any>();
  const [blogContent, setBlogContent] = useState<any>();
  const [isFeatured, setIsFeatured] = useState<boolean>(false);

  const watchedStartDate = watch("publishDate");

  function handlePublishDateChange(date: Date) {
    setValue("publishDate", date.toISOString(), { shouldValidate: true });
  }

  async function handleOnSubmit(BlogPostsFormData: BlogPostsFormTypes) {
    if (!imageUrl) {
      setLoading(false);
      toast.error("Please upload an image for the blog post");
      return;
    }
    if (!blogCategory) {
      setLoading(false);
      toast.error("Please select a blog category");
      return;
    }

    if (!blogContent) {
      setLoading(false);
      toast.error("Please add content to your blog post");
      return;
    }

    setLoading(true);

    BlogPostsFormData.image = imageUrl;
    BlogPostsFormData.slug = generateSlug(BlogPostsFormData.title);
    BlogPostsFormData.portfolioId = portfolio.id;
    BlogPostsFormData.blogPostsCategoryId = blogCategory;
    BlogPostsFormData.content = blogContent;
    BlogPostsFormData.featured = isFeatured;

    if (userBlogPost) {
      try {
        const response = await fetch(
          `${baseUrl}/api/v1/blogPostsAPI/${userBlogPost.blogPost.slug}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(BlogPostsFormData),
          }
        );

        console.log(response);
        if (response.ok) {
          setLoading(false);
          console.log(response);
          toast.success("Blog-Post Details Updated Successfully");
        } else {
          setLoading(false);
          toast.error("Failed To Update Blog-Post Details...🥺");
        }
      } catch (error) {
        setLoading(false);
        toast.error(
          "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️"
        );
        console.log(error);
      }
    } else {
      try {
        const response = await fetch(`${baseUrl}/api/v1/blogPostsAPI`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(BlogPostsFormData),
        });

        console.log(response);
        if (response.ok) {
          setLoading(false);
          console.log(response);
          toast.success("Blog-Post Details Saved Successfully");
          reset();
          router.push("/dashboard/view-blog-posts")
        } else {
          setLoading(false);
          toast.error("Failed To Save Blog-Posts Details...🥺");
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error(
          "❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️"
        );
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-r from-rose-300 to-[#F2B5A0] rounded-full">
            <Users className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-[#F2B5A0] to-gray-900 bg-clip-text text-transparent">
            {userBlogPost ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm max-w-2xl mx-auto">
          {userBlogPost
            ? "Update your blog post details below"
            : "Share your thoughts and insights with your audience by creating a new blog post"}
        </p>
      </div>

      <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-6">
        {/* Grid Layout for Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {/* Profile Information Card */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white dark:bg-[#0F0F12] dark:border-[#1F1F23]">
            <CardHeader className="border-b border-gray-100 dark:border-[#1F1F23]">
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Info className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                Blog Post Information
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Provide the blog post details and select appropriate category.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <Label className="text-gray-700 dark:text-gray-300 font-semibold">
                  Blog Post Title
                </Label>
                <Input
                  placeholder="Enter blog post title..."
                  {...register("title", { required: true })}
                  className="mt-1"
                />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">
                    Blog post title is required
                  </p>
                )}
              </div>
              <div>
                <Label className="text-gray-700 dark:text-gray-300 font-semibold">
                  Category
                </Label>
                <Select
                  onValueChange={(value) => setBlogCategory(value)}
                  value={blogCategory}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select a blog-post category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Blog post categories</SelectLabel>
                      {userBlogPostsCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Card className="shadow-sm border border-gray-200 bg-gray-50 dark:bg-[#18181B] dark:border-[#27272A]">
                  <CardHeader className="border-b border-gray-100 dark:border-[#27272A] pb-3">
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100 text-base">
                      <CalendarDays className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      Publish Date
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 text-xs">
                      Select when this blog post should be published
                    </CardDescription>
                  </CardHeader>
                  <div className="grid grid-cols-2">
                    <CardContent className="p-4">
                      <DateAndTime
                        publishedDateAndTime={
                          watchedStartDate
                            ? new Date(watchedStartDate)
                            : new Date()
                        }
                        setPublishedDateAndTime={handlePublishDateChange}
                      />
                    </CardContent>
                    <div className="flex items-center space-x-2 p-4">
                      <Switch
                        checked={isFeatured}
                        onCheckedChange={setIsFeatured}
                        id="featured-toggle"
                      />
                      <Label
                        htmlFor="featured-toggle"
                        className="text-sm font-medium cursor-pointer"
                      >
                        Featured Post
                      </Label>
                    </div>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Blog Post Image */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white dark:bg-[#0F0F12] dark:border-[#1F1F23]">
            <CardHeader className="border-b border-gray-100 dark:border-[#1F1F23]">
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <ImagePlus className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                Upload Blog Post Image
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Add a featured image for your blog post. (Max size: 2MB)
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 w-full">
              <ImageInput
                title="Blog Post Photo"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                endpoint="imageUploader"
              />
            </CardContent>
          </Card>

          {/* Description Card */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white dark:bg-[#0F0F12] dark:border-[#1F1F23] lg:col-span-2">
            <CardHeader className="border-b border-gray-100 dark:border-[#1F1F23]">
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                Blog Post Excerpt
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Write a brief excerpt that summarizes your blog post content.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Label className="text-gray-700 dark:text-gray-300 font-semibold">
                Blog Post Excerpt
              </Label>
              <Textarea
                placeholder="Write a compelling excerpt that gives readers a preview of your blog post..."
                className="min-h-32 resize-none mt-1"
                {...register("excerpt", { required: true })}
              />
              {errors.excerpt && (
                <p className="text-sm text-destructive mt-1">
                  Excerpt is required
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Blog Content Editor */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white dark:bg-[#0F0F12] dark:border-[#1F1F23]">
          <CardHeader className="border-b border-gray-100 dark:border-[#1F1F23]">
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Edit3 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              Blog Post Content
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Write your full blog post content using the rich text editor
              below.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <VEditor
              content={blogContent as string}
              setContent={setBlogContent}
              variant="default"
            />
          </CardContent>
        </Card>

        {/* Action Buttons Card */}
        <Card className="shadow-lg border border-gray-200 bg-white dark:bg-[#0F0F12] dark:border-[#1F1F23]">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {userBlogPost ? (
                loading ? (
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Loader className="h-5 w-5 mr-2 animate-spin" />
                    Updating Blog Post...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="lg"
                    className="text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <SaveAll className="h-5 w-5 mr-2" />
                    Update Blog Post
                  </Button>
                )
              ) : loading ? (
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Saving Blog Post...
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="lg"
                  className="text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <SaveAll className="h-5 w-5 mr-2" />
                  Save Blog Post
                </Button>
              )}

              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => {
                  reset();
                  setBlogCategory("");
                  setImageUrl("/placeholder.svg");
                  setBlogContent(null);
                }}
                className="bg-[#F2B5A0] text-white hover:border hover:border-[#F2B5A0] hover:bg-transparent hover:text-[#F2B5A0] font-semibold px-8 py-3 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Cancel & Reset
              </Button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                All fields are required
              </p>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
