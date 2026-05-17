import { Suspense } from "react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { BlogCard } from "@/components/frontend/blog/blog-card";
import { TagFilter } from "@/components/frontend/blog/tag-filter";
import {
  getUserBlogPosts,
  getUserBlogPostsCategories,
} from "@/actions/blog-posts-action";
import { SiteNav } from "@/components/frontend/blog/site-nav";

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getBlogCategoryTitles = (blog: {
  category?:
    | { title?: string | null }
    | Array<{ title?: string | null }>
    | null;
}) => {
  if (!blog.category) return [];

  if (Array.isArray(blog.category)) {
    return blog.category
      .map((category) => category.title?.trim())
      .filter((title): title is string => Boolean(title));
  }

  const title = blog.category.title?.trim();
  return title ? [title] : [];
};

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const userBlogPostsCategories = await getUserBlogPostsCategories();
  const userBlogPosts = await getUserBlogPosts();
  const sortedBlogs = [...userBlogPosts].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });
  const sortedCategoryBlogs = [...userBlogPostsCategories].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });

  const allCategoryBlogs = [
    "All",
    ...Array.from(
      new Set(sortedCategoryBlogs.flatMap((blog) => blog.title || []))
    ).sort(),
  ];

  const selectedCategoryBlog = resolvedSearchParams.tag || "All";
  const filteredBlogs =
    selectedCategoryBlog === "All"
      ? sortedBlogs
      : sortedBlogs.filter((blog) =>
          getBlogCategoryTitles(blog).includes(selectedCategoryBlog)
        );

  const categoryBlogCounts = allCategoryBlogs.reduce((acc, blogCategory) => {
    if (blogCategory === "All") {
      acc[blogCategory] = sortedBlogs.length;
    } else {
      acc[blogCategory] = sortedBlogs.filter((blog) =>
        getBlogCategoryTitles(blog).includes(blogCategory)
      ).length;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-background relative">
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
        <Suspense fallback={<div>Loading articles...</div>}>
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
        </Suspense>
      </div>
    </div>
  );
}
