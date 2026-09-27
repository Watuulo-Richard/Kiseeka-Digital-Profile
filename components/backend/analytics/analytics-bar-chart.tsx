"use client";

import { useMemo } from "react";
import { BarChart3, TrendingUp } from "lucide-react";
import { useBlogPosts } from "@/hooks/use-blog-posts";
import { BarChart } from "@/components/charts/bar-chart";
import { Bar } from "@/components/charts/bar";
import { BarXAxis } from "@/components/charts/bar-x-axis";
import { Grid } from "@/components/charts/grid";
import { ChartTooltip } from "@/components/charts/tooltip/chart-tooltip";
import { BarChartLoading } from "@/components/charts/bar-chart-loading";

export default function AnalyticsBarChart() {
  const { listBlogPosts, isLoading } = useBlogPosts();

  const data = useMemo(() => {
    const counts = new Map<string, { posts: number; featured: number }>();
    listBlogPosts.forEach((post) => {
      const categories =
        post.category && post.category.length > 0
          ? post.category.map((category) => category.title)
          : ["Uncategorized"];
      categories.forEach((title) => {
        const current = counts.get(title) ?? { posts: 0, featured: 0 };
        current.posts += 1;
        if (post.featured) current.featured += 1;
        counts.set(title, current);
      });
    });
    return [...counts.entries()]
      .map(([name, { posts, featured }]) => ({ name, posts, featured }))
      .sort((a, b) => b.posts - a.posts)
      .slice(0, 12);
  }, [listBlogPosts]);

  const totalPosts = listBlogPosts.length;
  const totalFeatured = listBlogPosts.filter((post) => post.featured).length;

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 dark:border-[#1F1F23] dark:bg-[#0F0F12]">
      <div className="mb-4">
        <h2 className="flex items-center gap-2 text-left text-lg font-bold text-gray-900 dark:text-white">
          <BarChart3 className="h-3.5 w-3.5 text-zinc-900 dark:text-zinc-50" />
          Blog Posts per Category
        </h2>
      </div>

      <div className="flex-1">
        {isLoading ? (
          <BarChartLoading aspectRatio="2 / 1" />
        ) : data.length === 0 ? (
          <div className="flex h-48 items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
            No blog posts yet.
          </div>
        ) : (
          <BarChart data={data} xDataKey="name" barGap={0.2}>
            <Grid horizontal />
            <Bar
              dataKey="posts"
              fill="var(--chart-line-primary)"
              lineCap="round"
            />
            <Bar
              dataKey="featured"
              fill="var(--chart-line-secondary)"
              lineCap="round"
            />
            <BarXAxis />
            <ChartTooltip />
          </BarChart>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-gray-200 pt-4 dark:border-[#1F1F23]">
        <TrendingUp className="h-4 w-4 text-emerald-500" />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {totalPosts} posts across {data.length} categories · {totalFeatured}{" "}
          featured
        </p>
      </div>
    </div>
  );
}