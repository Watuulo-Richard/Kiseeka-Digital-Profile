"use client";

import { useSingleBlogPostQuery } from "@/hooks/use-blog-posts";
import { SiteNav } from "@/components/frontend/blog/site-nav";
import BlogPostDetail from "@/components/frontend/blog/blog-detail/blog-detail";

export default function BlogPostDetailPage({ slug }: { slug: string }) {
  const { blogPost, isLoading } = useSingleBlogPostQuery(slug);

  return (
    <div>
      <SiteNav />
      {isLoading && !blogPost ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          Loading article...
        </div>
      ) : (
        <BlogPostDetail blog={blogPost} />
      )}
    </div>
  );
}