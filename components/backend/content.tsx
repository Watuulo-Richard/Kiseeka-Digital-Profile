"use client"

import AnalyticsEducationChart from "./analytics/analytics-education-chart"
import AnalyticsSkillsChart from "./analytics/analytics-skills-chart"
import AnalyticsPieChart from "./analytics/analytics-pie-chart"
import AnalyticsBarChart from "./analytics/analytics-bar-chart"
import LatestBlogPosts from "./analytics/latest-blog-posts"

export default function Content() {
  return (
    <div className="space-y-4 pt-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsBarChart />
        <AnalyticsPieChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsSkillsChart />
        <AnalyticsEducationChart />
      </div>

      <LatestBlogPosts />
    </div>
  )
}