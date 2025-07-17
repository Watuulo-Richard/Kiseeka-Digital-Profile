'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CommentFormTypes, CommentSchema } from '@/schema/schema';
import { useForm } from 'react-hook-form';
import { BlogPost, Comment, Portfolio } from '@prisma/client';
import { baseUrl, BlogPostCommentTypes } from '@/types/type';
import { format } from 'date-fns';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import type React from 'react';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  MessageCircle,
  Send,
  Heart,
  Loader2,
} from 'lucide-react';
import { getTimeAgo } from '@/lib/getTimeAgo';

// Mock comments data
const initialComments = [
  {
    id: '1',
    author: 'Sarah Chen',
    avatar: '/placeholder.svg?height=40&width=40',
    content:
      "Great article! The section about TypeScript integration was particularly helpful. I've been struggling with proper type definitions in my Next.js projects.",
    createdAt: new Date('2024-01-16T10:30:00'),
    likes: 12,
  },
  {
    id: '2',
    author: 'Mike Rodriguez',
    avatar: '/placeholder.svg?height=40&width=40',
    content:
      'Thanks for sharing this. The performance optimization tips saved me hours of debugging. Looking forward to more content like this!',
    createdAt: new Date('2024-01-16T14:45:00'),
    likes: 8,
  },
  {
    id: '3',
    author: 'Emily Johnson',
    avatar: '/placeholder.svg?height=40&width=40',
    content:
      "Could you elaborate more on the deployment strategies? I'm particularly interested in the CI/CD pipeline setup you mentioned.",
    createdAt: new Date('2024-01-17T09:15:00'),
    likes: 5,
  },
];

export default function BlogPostDetail({
  userBlogPost,
  fetchedProfile,
}: {
  userBlogPost: BlogPostCommentTypes;
  fetchedProfile: Portfolio;
}) {
  console.log(userBlogPost, 'hello................')
  // const [comments, setComments] = useState(initialComments);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CommentFormTypes>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      name: '',
      email: '',
      viewerComment: '',
      blogPostId: userBlogPost.id, // Set the actual blog post ID
    },
  });

  const [loading, setLoading] = useState(false);

  async function handleCommentOnSubmit(CommentFormData: CommentFormTypes) {
    setLoading(true);
    CommentFormData.portfolioId = fetchedProfile.id;
    CommentFormData.blogPostId = userBlogPost.id;

    try {
      const response = await fetch(`${baseUrl}/api/v1/commentAPI`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(CommentFormData),
      });

      if (response.ok) {
        setLoading(false);
        toast.success('Comment Saved Successfully');
        reset();
      } else {
        setLoading(false);
        console.log(response);
        toast.error('Failed To Save Comment...🥺');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(
        '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
      );
    }
  }

  // Format date function
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMM dd, yyyy');
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Blog Post Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">Internal Controls</Badge>
            <Badge variant="secondary">Risk Assessment</Badge>
            <Badge variant="secondary">Compliance Audit</Badge>
          </div>

          <h1 className="text-4xl md:text-3xl font-bold leading-tight mb-4">
            {userBlogPost.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                Published{' '}
                {formatDate(userBlogPost.publishDate)}
              </span>
            </div>
            {/* {userBlogPost.updatedAt > userBlogPost.createdAt && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Updated {getTimeAgo(userBlogPost.createdAt)}</span>
              </div>
            )} */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>
                {getTimeAgo(
                  userBlogPost.publishDate ||
                    'This is sample content for reading time calculation.',
                )}{' '}
                min read
              </span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <Image
            src={userBlogPost.image || '/placeholder.svg?height=400&width=800'}
            alt={userBlogPost.title}
            width={800}
            height={400}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>

        {/* Blog Content */}
        <article className="prose prose-gray dark:prose-invert max-w-none mb-12">
          <p className="text-lg leading-relaxed">{userBlogPost.excerpt}</p>
        </article>

        <Separator className="my-8" />

        {/* Comments Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            {/* <h2 className="text-2xl font-bold">Comments ({userBlogPost.comment.length})</h2> */}
          </div>

          {/* Comment Form */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Leave a Comment</h3>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(handleCommentOnSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      {...register('name', { required: true })}
                      placeholder="Your name *"
                      required
                    />
                    {errors.name && (
                      <span className="text-red-500 text-sm">
                        Name is required
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register('email', { required: true })}
                      type="email"
                      placeholder="Your email"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm">
                        Email is required
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <Textarea
                    {...register('viewerComment', { required: true })}
                    placeholder="Write your comment here..."
                    rows={4}
                    required
                  />
                  {errors.viewerComment && (
                    <span className="text-red-500 text-sm">
                      Comment is required
                    </span>
                  )}
                </div>
                {loading ? (
                  <Button
                    type="submit"
                    className="w-full md:w-auto"
                    disabled={loading}
                  >
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Posting...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full md:w-auto"
                    disabled={loading}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post Comment
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Comments List */}
          <div className="space-y-4">
            {userBlogPost.comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10">
                      {/* <AvatarImage
                        src='/placeholder.svg'
                        alt={comment.name}
                      /> */}
                      <AvatarFallback>
                        {comment.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{comment.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(comment.createdAt)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground"
                        >
                          <Heart className="w-4 h-4 mr-1" />
                          {/* {comment.likes} */}
                        </Button>
                      </div>
                      <p className="text-sm leading-relaxed">
                        {comment.viewerComment}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
