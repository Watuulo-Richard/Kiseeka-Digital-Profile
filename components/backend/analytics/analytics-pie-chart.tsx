"use client";

import { PieChart as PieChartIcon, Layers } from "lucide-react";
import { useWorkExperiences } from "@/hooks/use-work-experiences";
import type { PieData } from "@/components/charts/pie-context";
import { useTestimonials } from "@/hooks/use-testimonials";
import { PieCenter } from "@/components/charts/pie-center";
import { PieChart } from "@/components/charts/pie-chart";
import { PieSlice } from "@/components/charts/pie-slice";
import { useMemo } from "react";
import { useBlogPosts } from "@/hooks/use-blog-posts";
import { useEducation } from "@/hooks/use-education";
import { useProjects } from "@/hooks/use-projects";
import { useSkills } from "@/hooks/use-skills";

const SLICE_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "hsl(262 80% 60%)",
];

export default function AnalyticsPieChart() {
  const { listBlogPosts, isLoading: isLoadingPosts } = useBlogPosts();
  const { listProjects, isLoading: isLoadingProjects } = useProjects();
  const { listSkills, isLoading: isLoadingSkills } = useSkills();
  const { listEducation, isLoading: isLoadingEducation } = useEducation();
  const {
    listWorkExperiences,
    isLoading: isLoadingWorkExperiences,
  } = useWorkExperiences();
  const {
    listTestimonials,
    isLoading: isLoadingTestimonials,
  } = useTestimonials();

  const isLoading =
    isLoadingPosts ||
    isLoadingProjects ||
    isLoadingSkills ||
    isLoadingEducation ||
    isLoadingWorkExperiences ||
    isLoadingTestimonials;

  const data = useMemo<PieData[]>(
    () =>
      [
        { label: "Blog Posts", value: listBlogPosts.length },
        { label: "Projects", value: listProjects.length },
        { label: "Skills", value: listSkills.length },
        { label: "Education", value: listEducation.length },
        { label: "Work Experience", value: listWorkExperiences.length },
        { label: "Testimonials", value: listTestimonials.length },
      ]
        .map((item, index) => ({
          ...item,
          color: SLICE_COLORS[index % SLICE_COLORS.length],
        }))
        .filter((item) => item.value > 0),
    [
      listBlogPosts,
      listProjects,
      listSkills,
      listEducation,
      listWorkExperiences,
      listTestimonials,
    ],
  );

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 dark:border-[#1F1F23] dark:bg-[#0F0F12]">
      <div className="mb-4">
        <h2 className="flex items-center gap-2 text-left text-lg font-bold text-gray-900 dark:text-white">
          <PieChartIcon className="h-3.5 w-3.5 text-zinc-900 dark:text-zinc-50" />
          Content Overview
        </h2>
      </div>

      <div className="flex-1">
        {isLoading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="h-40 w-40 animate-pulse rounded-full bg-zinc-100 dark:bg-[#1F1F23]" />
          </div>
        ) : data.length === 0 ? (
          <div className="flex h-48 items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
            No content available yet.
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <PieChart
              data={data}
              size={200}
              innerRadius={64}
              padAngle={0.02}
              cornerRadius={4}
            >
              {data.map((slice, index) => (
                <PieSlice key={slice.label} index={index} />
              ))}
              <PieCenter defaultLabel="Total" />
            </PieChart>

            <ul className="w-full max-w-[240px] space-y-2.5">
              {data.map((slice) => {
                const percentage =
                  total > 0 ? Math.round((slice.value / total) * 100) : 0;
                return (
                  <li
                    key={slice.label}
                    className="flex items-center gap-2.5"
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: slice.color }}
                    />
                    <span className="flex-1 truncate text-sm text-gray-900 dark:text-white">
                      {slice.label}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {slice.value}
                    </span>
                    <span className="w-10 text-right text-xs text-gray-500 dark:text-gray-400">
                      {percentage}%
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-[#1F1F23]">
        <p className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Layers className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          Total content items
        </p>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          {total}
        </p>
      </div>
    </div>
  );
}