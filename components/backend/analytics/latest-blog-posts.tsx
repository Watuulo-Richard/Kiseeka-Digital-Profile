"use client";

import { useMemo } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { useBlogPosts } from "@/hooks/use-blog-posts";

const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function LatestBlogPosts() {
  const { listBlogPosts, isLoading } = useBlogPosts();

  const latestPosts = useMemo(
    () =>
      [...listBlogPosts]
        .sort(
          (a, b) =>
            new Date(b.publishDate).getTime() -
            new Date(a.publishDate).getTime(),
        )
        .slice(0, 5),
    [listBlogPosts],
  );

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 dark:border-[#1F1F23] dark:bg-[#0F0F12]">
      <div className="mb-2">
        <h2 className="flex items-center gap-2 text-left text-lg font-bold text-gray-900 dark:text-white">
          <FileText className="h-3.5 w-3.5 text-zinc-900 dark:text-zinc-50" />
          Latest Blog Posts
        </h2>
      </div>

      <div className="flex-1">
        {isLoading ? (
          <div className="space-y-3 pt-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-10 animate-pulse rounded-lg bg-zinc-100 dark:bg-[#1F1F23]"
              />
            ))}
          </div>
        ) : latestPosts.length === 0 ? (
          <div className="flex h-40 items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
            No blog posts published yet.
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 pt-2 dark:divide-[#1F1F23]">
            {latestPosts.map((post) => {
              const categoryTitle = post.category?.[0]?.title ?? "Uncategorized";
              return (
                <li
                  key={post.id}
                  className="group flex cursor-pointer items-center gap-4 rounded-lg py-3 px-2 transition-colors hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
                >
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                        {post.title}
                      </span>
                      {post.featured && (
                        <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                          Featured
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="hidden shrink-0 text-right sm:block">
                    <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-600 dark:bg-[#1F1F23] dark:text-zinc-300">
                      {categoryTitle}
                    </span>
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                      {formatDate(post.publishDate)}
                    </p>
                  </div>

                  <ArrowRight className="h-4 w-4 shrink-0 text-gray-300 transition-colors group-hover:text-gray-600 dark:text-gray-600 dark:group-hover:text-gray-300" />
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-gray-200 pt-4 dark:border-[#1F1F23]">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Showing {latestPosts.length} of {listBlogPosts.length} published posts
        </p>
      </div>
    </div>
  );
}