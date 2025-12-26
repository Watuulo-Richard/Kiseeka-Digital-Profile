"use client";
import Link from "next/link";
import Image from "next/image";
import { AuthorCard } from "./author-card";
import { PromoContent } from "./promo-content";
import { Button } from "@/components/ui/button";
import { MobileTableOfContents } from "./mobile-toc";
import { TableOfContents } from "./table-of-contents";
import { ReadMoreSection } from "./read-more-section";
import { ArrowLeft } from "lucide-react";
import { HashScrollHandler } from "../hash-scroll-handler";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { BlogPostAndRelatedBlogPostType } from "@/types/type";

const formatDate = (date: Date | string): string => {
  // Convert to Date object if it's a string
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function BlogPostDetail({
  blog,
}: {
  blog: BlogPostAndRelatedBlogPostType | null;
}) {
  /* Handle no blog */
  if (!blog) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">No blog found.</div>
      </div>
    );
  }

  // Do it the same way as ReadMoreSection - directly pass to formatDate
  const formattedDate = formatDate(blog.blogPost?.createdAt || blog.blogPost?.publishDate || '');

  return (
    <div className="min-h-screen relative">
      <HashScrollHandler />
      <div className="absolute top-0 left-0 z-0 w-full h-[200px] [mask-image:linear-gradient(to_top,transparent_10%,black_95%)]">
        <FlickeringGrid
          className="absolute top-0 left-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#F2B3A5"
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>

      <div className="space-y-4 border-b border-border relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 p-6">
          <div className="flex flex-wrap items-center gap-3 gap-y-5 text-sm text-muted-foreground">
            <Button variant="outline" asChild className="h-6 w-6">
              <Link href="/blogs-page">
                <ArrowLeft className="w-4 h-4" />
                <span className="sr-only">Back to all articles</span>
              </Link>
            </Button>
            {/* {page.data.tags && page.data.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 text-muted-foreground">
                {page.data.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="h-6 w-fit px-3 text-sm font-medium bg-muted text-muted-foreground rounded-md border flex items-center justify-center"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )} */}
            <time className="font-medium text-muted-foreground">
              {formattedDate}
            </time>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-3xl font-medium tracking-tighter text-balance">
            {blog.blogPost?.title}
          </h1>

          {blog.blogPost?.excerpt && (
            <p className="text-muted-foreground max-w-full md:text-lg md:text-balance">
              {blog.blogPost?.excerpt}
            </p>
          )}
        </div>
      </div>
      <div className="flex divide-x divide-border relative max-w-7xl mx-auto px-4 md:px-0 z-10">
        <div className="absolute max-w-7xl mx-auto left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] lg:w-full h-full border-x border-border p-0 pointer-events-none" />
        <main className="w-full p-0 overflow-hidden">
          {blog.blogPost?.image && (
            <div className="relative w-full h-[500px] overflow-hidden object-cover border border-transparent">
              <Image
                src={blog.blogPost?.image}
                alt={blog.blogPost?.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          {blog.blogPost?.content && (
            <div className="p-6 lg:p-10">
              <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance prose-lg">
                <div dangerouslySetInnerHTML={{ __html: blog.blogPost.content }} />
              </div>
            </div>
          )}
          <div className="mt-10">
            <ReadMoreSection relatedPosts={blog ?? []} />
          </div>
        </main>

        <aside className="hidden lg:block w-[350px] flex-shrink-0 p-6 lg:p-10 bg-muted/60 dark:bg-muted/20">
          <div className="sticky top-20 space-y-8">
            {blog.blogPost?.portfolio.title && <AuthorCard blog={blog} />}
            <div className="border border-border rounded-lg p-6 bg-card">
              <TableOfContents containerSelector=".prose" />
            </div>
            <PromoContent variant="desktop" />
          </div>
        </aside>
      </div>
      <MobileTableOfContents />
    </div>
  );
}
