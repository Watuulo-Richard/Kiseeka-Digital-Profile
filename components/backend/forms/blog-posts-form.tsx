'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import {
  FileText,
  Info,
  ImagePlus,
  SaveAll,
  Loader,
  CalendarDays,
} from 'lucide-react';
import { BlogPostsFormTypes, BlogPostsSchema } from '@/schema/schema';
import ImageInput from '../image-upload';
import { toast } from 'sonner';
import { baseUrl, BlogPostCommentTypes } from '@/types/type';
import { BlogPostCategory, Portfolio } from '@prisma/client';
import { Users } from '@/components/frontend/users';
import { DateAndTime } from '../date-and-time';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';

export default function BlogPostsForm({
  portfolio,
  userBlogPostsCategories,
  userBlogPost
}: {
  portfolio: Portfolio;
  userBlogPostsCategories: BlogPostCategory[];
  userBlogPost: BlogPostCommentTypes | null
}) {
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMM dd, yyyy');
  };

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
      title: userBlogPost?.title || '',
      image: userBlogPost?.image || '',
      excerpt: userBlogPost?.excerpt || '',
      // Fix: Use proper date handling
      publishDate: userBlogPost?.publishDate 
        ? (typeof userBlogPost.publishDate === 'string' 
           ? userBlogPost.publishDate 
           : userBlogPost.publishDate.toISOString())
        : new Date().toISOString(),
      // Fix: Use category ID instead of title
      blogPostsCategoryId: userBlogPost?.category?.id || '',
    },
  });

  const initialImage = userBlogPost?.image || '/placeholder.svg';
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [loading, setLoading] = useState(false);
  // Fix: Initialize with existing category ID if editing
  const [blogCategory, setBlogCategory] = useState(userBlogPost?.category?.id || '');
  
  const watchedStartDate = watch('publishDate');

  // Handle publish Date Change
  function handlePublishDateChange(date: Date) {
    setValue('publishDate', date.toISOString(), { shouldValidate: true });
  }

  async function handleOnSubmit(BlogPostsFormData: BlogPostsFormTypes) {
    if (!imageUrl) {
      setLoading(false);
      toast.error('Please upload an image for the blog post');
      return;
    }
    if (!blogCategory) {
      setLoading(false);
      toast.error('Please select a blog category');
      return;
    }
    
    setLoading(true);
    
    // Set additional fields
    BlogPostsFormData.image = imageUrl;
    BlogPostsFormData.slug = BlogPostsFormData.title
      .split(' ')
      .join('-')
      .toLowerCase(); // Fix: toLowerCase() instead of toLocaleLowerCase()
    BlogPostsFormData.portfolioId = portfolio.id;
    BlogPostsFormData.blogPostsCategoryId = blogCategory;
    
    console.log(BlogPostsFormData);
    
    if (userBlogPost) {
      try {
        const response = await fetch(
          `${baseUrl}/api/v1/blogPostsAPI/${userBlogPost.slug}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(BlogPostsFormData),
          },
        );
        
        console.log(response);
        if (response.ok) {
          setLoading(false);
          console.log(response);
          toast.success('Blog-Post Details Updated Successfully');
        } else {
          setLoading(false);
          toast.error('Failed To Update Blog-Post Details...🥺');
        }
      } catch (error) {
        setLoading(false);
        toast.error(
          '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
        );
        console.log(error);
      }
    } else {
      try {
        const response = await fetch(`${baseUrl}/api/v1/blogPostsAPI`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(BlogPostsFormData),
        });
        
        console.log(response);
        if (response.ok) {
          setLoading(false);
          console.log(response);
          toast.success('Blog-Post Details Saved Successfully');
          reset();
        } else {
          setLoading(false);
          toast.error('Failed To Save Blog-Posts Details...🥺');
        }
      } catch (error) {
        setLoading(false);
        toast.error(
          '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
        );
        console.log(error);
      }
    } // Fix: Added missing closing brace
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-2">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-rose-300 to-[#F2B5A0] rounded-full">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-[#F2B5A0] to-gray-900 bg-clip-text text-transparent">
              Submit Your Blog-Posts
            </h1>
          </div>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Kindly fill out the form below to share a professional testimonial
            for Kiseeka Pius. Your insights and endorsement help strengthen his
            digital profile and credibility.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-4">
          {/* Grid Layout for Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Information Card */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white dark:bg-[#0F0F12] dark:border-[#1F1F23]">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Info className="h-5 w-5 text-gray-600" />
                  Blog Post Information
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Please provide the blog post details and select appropriate category.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="">
                  <Label className="text-gray-700 font-semibold">
                    Blog Post Title
                  </Label>
                  <Input
                    placeholder="Enter blog post title..."
                    {...register('title', { required: true })}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">
                      Blog post title is required...
                    </p>
                  )}
                </div>
                <div className="">
                  <Label className="text-gray-700 font-semibold">
                    Category
                  </Label>
                  <Select
                    onValueChange={(value) => setBlogCategory(value)}
                    value={blogCategory}
                  >
                    <SelectTrigger className="w-full">
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
                <div className="">
                  <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white dark:bg-[#0F0F12] dark:border-[#1F1F23]">
                    <CardHeader className="border-b border-gray-100">
                      <CardTitle className="flex items-center gap-2 text-gray-900">
                        <CalendarDays className="h-5 w-5 text-gray-600" />
                        Publish Date
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Select when this blog post should be published
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div className="">
                        <div>
                          <DateAndTime
                            publishedDateAndTime={
                              watchedStartDate
                                ? new Date(watchedStartDate)
                                : new Date()
                            }
                            setPublishedDateAndTime={handlePublishDateChange}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Blog Post Image */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white dark:bg-[#0F0F12] dark:border-[#1F1F23]">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <ImagePlus className="h-5 w-5 text-gray-600" />
                  Upload Blog Post Image
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Add a featured image for your blog post. (Max size: 2MB)
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4 w-full">
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
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <FileText className="h-5 w-5 text-gray-600" />
                  Blog Post Excerpt
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Write a brief excerpt that summarizes your blog post content.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Label className="text-gray-700 font-semibold">
                  Blog Post Excerpt
                </Label>
                <Textarea
                  placeholder="Write a compelling excerpt that gives readers a preview of your blog post..."
                  className="min-h-32 resize-none"
                  {...register('excerpt', { required: true })}
                />
                {errors.excerpt && (
                  <p className="text-sm text-destructive">
                    Excerpt is required...
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

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
                      className="text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Loader className="h-5 w-5 mr-2 animate-spin" />
                      Updating Blog Post, Please Wait...
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
                ) : (
                  loading ? (
                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Loader className="h-5 w-5 mr-2 animate-spin" />
                      Saving Blog Post, Please Wait...
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
                  )
                )}

                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    reset();
                    setBlogCategory('');
                    setImageUrl('/placeholder.svg');
                  }}
                  className="bg-[#F2B5A0] text-white hover:border hover:border-[#F2B5A0] hover:bg-transparent font-semibold px-8 py-3 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Cancel & Reset
                </Button>
              </div>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-500">All fields are required</p>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}