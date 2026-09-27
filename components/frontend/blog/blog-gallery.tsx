"use client";

import { useBlogPostCategories } from "@/hooks/use-blog-post-categories";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { TagFilter } from "@/components/frontend/blog/tag-filter";
import { BlogCard } from "@/components/frontend/blog/blog-card";
import { SiteNav } from "@/components/frontend/blog/site-nav";
import type { BlogPostListItem } from "@/types/blog-post";
import { useBlogPosts } from "@/hooks/use-blog-posts";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getBlogCategoryTitles = (blog: BlogPostListItem): string[] =>
  blog.category?.map((category) => category.title.trim()).filter(Boolean) ??
  [];

export default function BlogGallery() {
  const { listBlogPosts, isLoading, error } = useBlogPosts();
  const { listBlogPostCategories } = useBlogPostCategories();
  const searchParams = useSearchParams();

  const sortedBlogs = useMemo(
    () =>
      [...listBlogPosts].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [listBlogPosts],
  );

  const allCategoryBlogs = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          listBlogPostCategories
            .map((category) => category.title.trim())
            .filter(Boolean),
        ),
      ).sort(),
    ],
    [listBlogPostCategories],
  );

  const selectedCategoryBlog = searchParams.get("tag") || "All";

  const filteredBlogs = useMemo(
    () =>
      selectedCategoryBlog === "All"
        ? sortedBlogs
        : sortedBlogs.filter((blog) =>
            getBlogCategoryTitles(blog).includes(selectedCategoryBlog),
          ),
    [sortedBlogs, selectedCategoryBlog],
  );

  const categoryBlogCounts = useMemo(
    () =>
      allCategoryBlogs.reduce<Record<string, number>>(
        (acc, blogCategory) => {
          acc[blogCategory] =
            blogCategory === "All"
              ? sortedBlogs.length
              : sortedBlogs.filter((blog) =>
                  getBlogCategoryTitles(blog).includes(blogCategory),
                ).length;
          return acc;
        },
        {},
      ),
    [allCategoryBlogs, sortedBlogs],
  );

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <SiteNav />
      <div className="absolute top-0 left-0 z-0 w-full h-[200px] [mask-image:linear-gradient(to_top,transparent_0%,black_100%)]">
        <FlickeringGrid
          className="absolute top-0 left-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#F2B3A5"
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>
      <div className="p-6 border-b border-border flex flex-col gap-6 min-h-[250px] justify-center relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-4xl md:text-5xl tracking-tighter">
              My Blogs
            </h1>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
              Latest news and updates from Kiseka Pius.
            </p>
          </div>
        </div>
        {allCategoryBlogs.length > 0 && (
          <div className="max-w-7xl mx-auto w-full">
            <TagFilter
              tags={allCategoryBlogs}
              selectedTag={selectedCategoryBlog}
              tagCounts={categoryBlogCounts}
            />
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-0">
        {error ? (
          <div className="py-12 text-center text-muted-foreground text-sm">
            Failed to load articles.
          </div>
        ) : isLoading ? (
          <div className="py-12 text-center text-muted-foreground text-sm">
            Loading articles...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground text-sm">
            No articles yet.
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative overflow-hidden border-x border-border ${
              filteredBlogs.length < 4 ? "border-b" : "border-b-0"
            }`}
          >
            {filteredBlogs.map((blog) => {
              const date = new Date(blog.createdAt);
              const formattedDate = formatDate(date);

              return (
                <BlogCard
                  key={blog.slug}
                  slug={blog.slug}
                  title={blog.title}
                  description={blog.excerpt}
                  date={formattedDate}
                  thumbnail={blog.image}
                  showRightBorder={filteredBlogs.length < 3}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}