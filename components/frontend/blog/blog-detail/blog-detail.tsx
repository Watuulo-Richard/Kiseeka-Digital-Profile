"use client";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import { AuthorCard } from "./author-card";
import { PromoContent } from "./promo-content";
import { Button } from "@/components/ui/button";
import { MobileTableOfContents } from "./mobile-toc";
import { TableOfContents } from "./table-of-contents";
import { ReadMoreSection } from "./read-more-section";
import { HashScrollHandler } from "../hash-scroll-handler";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { BlogPostAndRelatedBlogPostType } from "@/types/type";

const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

export default function BlogPostDetail({
  blog,
}: {
  blog: BlogPostAndRelatedBlogPostType | null;
}) {
  const formattedDate = formatDate(
    blog?.blogPost?.createdAt || blog?.blogPost?.publishDate || ""
  );

  const readingTime = useMemo(() => {
    const text = (blog?.blogPost?.content || "").replace(/<[^>]+>/g, " ");
    const words = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  }, [blog?.blogPost?.content]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  /* Handle no blog */
  if (!blog) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">No blog found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <HashScrollHandler />

      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-primary to-primary/60"
      />

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
          <motion.div
            {...fadeUp}
            className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground"
          >
            <Button variant="outline" asChild size="icon" className="h-8 w-8">
              <Link href="/blogs-page">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to all articles</span>
              </Link>
            </Button>

            {blog.blogPost?.category && blog.blogPost.category.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {blog.blogPost.category.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/blogs-page?tag=${encodeURIComponent(cat.title)}`}
                    className="h-6 w-fit px-3 text-xs font-medium bg-muted text-muted-foreground rounded-md border flex items-center justify-center transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            )}

            <time className="font-medium">{formattedDate}</time>

            <span className="inline-flex items-center gap-1.5 font-medium">
              <Clock className="h-4 w-4" />
              {readingTime} min read
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-4xl lg:text-[2.75rem] font-medium tracking-tighter text-balance"
          >
            {blog.blogPost?.title}
          </motion.h1>

          {blog.blogPost?.excerpt && (
            <motion.p
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground max-w-full md:text-lg text-balance"
            >
              {blog.blogPost?.excerpt}
            </motion.p>
          )}
        </div>
      </div>
      <div className="flex divide-x divide-border relative max-w-7xl mx-auto px-4 md:px-0 z-10">
        <div className="absolute max-w-7xl mx-auto left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] lg:w-full h-full border-x border-border p-0 pointer-events-none" />
        <main className="w-full p-0 overflow-hidden">
          {blog.blogPost?.image && (
            <motion.div
              {...fadeUp}
              className="relative w-full h-56 sm:h-80 md:h-[400px] lg:h-[500px] overflow-hidden object-cover border border-transparent"
            >
              <Image
                src={blog.blogPost.image}
                alt={blog.blogPost.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          )}
          {blog.blogPost?.content && (
            <div className="p-6 lg:p-10">
              <motion.div
                {...fadeUp}
                className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance prose-lg break-words [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_img]:max-w-full [&_img]:h-auto [&_table]:block [&_table]:overflow-x-auto"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: blog.blogPost.content,
                  }}
                />
              </motion.div>
            </div>
          )}
          <div className="mt-10">
            <ReadMoreSection relatedPosts={blog} />
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