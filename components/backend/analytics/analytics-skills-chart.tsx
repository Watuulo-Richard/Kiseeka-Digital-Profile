"use client";

import { useMemo } from "react";
import { TrendingUp, BarChartHorizontal } from "lucide-react";
import { useSkills } from "@/hooks/use-skills";
import { BarChart } from "@/components/charts/bar-chart";
import { Bar } from "@/components/charts/bar";
import { BarXAxis } from "@/components/charts/bar-x-axis";
import { BarYAxis } from "@/components/charts/bar-y-axis";
import { Grid } from "@/components/charts/grid";
import { ChartTooltip } from "@/components/charts/tooltip/chart-tooltip";
import { BarChartLoading } from "@/components/charts/bar-chart-loading";

export default function AnalyticsSkillsChart() {
  const { listSkills, isLoading } = useSkills();

  const data = useMemo(
    () =>
      listSkills
        .filter((skill) => skill.level != null)
        .map((skill) => ({ name: skill.name, level: skill.level as number }))
        .sort((a, b) => b.level - a.level)
        .slice(0, 10),
    [listSkills],
  );

  const avglevel = data.length
    ? Math.round(
        data.reduce((sum, skill) => sum + skill.level, 0) / data.length,
      )
    : 0;

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 dark:border-[#1F1F23] dark:bg-[#0F0F12]">
      <div className="mb-4">
        <h2 className="flex items-center gap-2 text-left text-lg font-bold text-gray-900 dark:text-white">
          <BarChartHorizontal className="h-3.5 w-3.5 text-zinc-900 dark:text-zinc-50" />
          Skills by Proficiency
        </h2>
      </div>

      <div className="flex-1">
        {isLoading ? (
          <BarChartLoading aspectRatio="2 / 1" />
        ) : data.length === 0 ? (
          <div className="flex h-48 items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
            No skills added yet.
          </div>
        ) : (
          <BarChart
            data={data}
            xDataKey="name"
            orientation="horizontal"
            barGap={0.3}
          >
            <Grid vertical />
            <Bar
              dataKey="level"
              fill="var(--chart-line-primary)"
              lineCap="round"
            />
            <BarYAxis />
            <BarXAxis />
            <ChartTooltip />
          </BarChart>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-gray-200 pt-4 dark:border-[#1F1F23]">
        <TrendingUp className="h-4 w-4 text-emerald-500" />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {listSkills.length} skills profiled · {avglevel}% average master level
        </p>
      </div>
    </div>
  );
}