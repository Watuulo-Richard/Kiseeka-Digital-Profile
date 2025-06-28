"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert"

interface Skill {
  name: string
  level: SkillLevel
  percentage: number
  description: string
}

interface SkillCategory {
  category: string
  icon: React.ReactNode
  color: string
  skills: Skill[]
}

export default function SkillsVisualization() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const skillCategories: SkillCategory[] = [
    {
      category: "Frontend",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5" />
          <path d="M16 19h6" />
          <path d="M19 16v6" />
          <path d="M12 15V9" />
          <path d="m9 13 3 2 3-2" />
        </svg>
      ),
      color: "bg-blue-500/10 text-blue-500",
      skills: [
        {
          name: "JavaScript",
          level: "Expert",
          percentage: 95,
          description: "ES6+, DOM manipulation, async programming, closures, and functional concepts",
        },
        {
          name: "TypeScript",
          level: "Expert",
          percentage: 90,
          description: "Type systems, interfaces, generics, and advanced type manipulations",
        },
        {
          name: "React.js",
          level: "Expert",
          percentage: 92,
          description: "Hooks, context, state management, performance optimization, and custom hooks",
        },
        {
          name: "HTML/CSS",
          level: "Expert",
          percentage: 90,
          description: "Semantic HTML, CSS Grid, Flexbox, animations, and responsive design",
        },
        {
          name: "Tailwind CSS",
          level: "Advanced",
          percentage: 85,
          description: "Utility-first approach, customization, and component patterns",
        },
      ],
    },
    {
      category: "Backend",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
          <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
          <line x1="6" x2="6" y1="6" y2="6" />
          <line x1="6" x2="6" y1="18" y2="18" />
        </svg>
      ),
      color: "bg-green-500/10 text-green-500",
      skills: [
        {
          name: "Node.js",
          level: "Expert",
          percentage: 90,
          description: "Event loop, streams, async patterns, and performance optimization",
        },
        {
          name: "PHP",
          level: "Advanced",
          percentage: 80,
          description: "OOP, modern PHP practices, and framework integration",
        },
        {
          name: "Laravel",
          level: "Advanced",
          percentage: 85,
          description: "MVC architecture, Eloquent ORM, middleware, and service providers",
        },
        {
          name: "Express.js",
          level: "Expert",
          percentage: 90,
          description: "Routing, middleware, error handling, and API design",
        },
        {
          name: "RESTful APIs",
          level: "Expert",
          percentage: 95,
          description: "Design principles, authentication, rate limiting, and documentation",
        },
      ],
    },
    {
      category: "Database",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
      color: "bg-amber-500/10 text-amber-500",
      skills: [
        {
          name: "MySQL",
          level: "Advanced",
          percentage: 85,
          description: "Query optimization, indexing, transactions, and stored procedures",
        },
        {
          name: "PostgreSQL",
          level: "Advanced",
          percentage: 80,
          description: "Advanced queries, JSON operations, and performance tuning",
        },
        {
          name: "DynamoDB",
          level: "Advanced",
          percentage: 80,
          description: "NoSQL design patterns, single-table design, and query optimization",
        },
        {
          name: "MongoDB",
          level: "Intermediate",
          percentage: 75,
          description: "Document modeling, aggregation pipeline, and indexing strategies",
        },
        {
          name: "Redis",
          level: "Advanced",
          percentage: 80,
          description: "Caching strategies, data structures, and pub/sub patterns",
        },
      ],
    },
    {
      category: "Cloud & DevOps",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      ),
      color: "bg-purple-500/10 text-purple-500",
      skills: [
        {
          name: "AWS",
          level: "Advanced",
          percentage: 85,
          description: "Lambda, SQS, EventBridge, Step Functions, and serverless architecture",
        },
        {
          name: "GitHub Actions",
          level: "Advanced",
          percentage: 85,
          description: "CI/CD pipelines, workflow automation, and deployment strategies",
        },
        {
          name: "Travis-CI",
          level: "Intermediate",
          percentage: 70,
          description: "Build configuration, test automation, and deployment integration",
        },
        {
          name: "Docker",
          level: "Advanced",
          percentage: 80,
          description: "Containerization, multi-stage builds, and Docker Compose",
        },
        {
          name: "CI/CD",
          level: "Advanced",
          percentage: 85,
          description: "Continuous integration, deployment automation, and testing strategies",
        },
      ],
    },
    {
      category: "Tools & Methodologies",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      color: "bg-rose-500/10 text-rose-500",
      skills: [
        {
          name: "Git",
          level: "Expert",
          percentage: 90,
          description: "Version control, branching strategies, and collaborative workflows",
        },
        {
          name: "Agile",
          level: "Advanced",
          percentage: 85,
          description: "Scrum, Kanban, sprint planning, and retrospectives",
        },
        {
          name: "Scrum",
          level: "Advanced",
          percentage: 85,
          description: "Sprint planning, daily standups, and team facilitation",
        },
        {
          name: "JIRA",
          level: "Advanced",
          percentage: 80,
          description: "Project tracking, workflow customization, and reporting",
        },
        {
          name: "Figma",
          level: "Intermediate",
          percentage: 70,
          description: "Design collaboration, prototyping, and developer handoff",
        },
      ],
    },
  ]

  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category)
  }

  const getActiveCategorySkills = () => {
    if (!activeCategory) return []
    return skillCategories.find((cat) => cat.category === activeCategory)?.skills || []
  }

  const getSkillLevelColor = (level: SkillLevel) => {
    switch (level) {
      case "Beginner":
        return "bg-blue-500"
      case "Intermediate":
        return "bg-green-500"
      case "Advanced":
        return "bg-amber-500"
      case "Expert":
        return "bg-rose-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {skillCategories.map((category) => (
          <motion.div
            key={category.category}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleCategoryClick(category.category)}
            className={cn(
              "cursor-pointer rounded-lg p-4 transition-all",
              activeCategory === category.category
                ? `${category.color} border-2 border-current shadow-lg`
                : "bg-card hover:bg-card/80 border border-border",
            )}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div className={cn("p-2 rounded-full", category.color)}>{category.icon}</div>
              <h4 className="font-medium">{category.category}</h4>
              <p className="text-xs text-muted-foreground">{category.skills.length} skills</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">
                    {activeCategory} <span className="text-sm font-normal text-muted-foreground">Skills</span>
                  </h3>
                  <Badge variant="outline">
                    {getActiveCategorySkills().length} {getActiveCategorySkills().length === 1 ? "skill" : "skills"}
                  </Badge>
                </div>

                <div className="space-y-6">
                  {getActiveCategorySkills().map((skill) => (
                    <div
                      key={skill.name}
                      className="space-y-2"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <h4 className="font-medium">{skill.name}</h4>
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {skill.level}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{skill.percentage}%</span>
                      </div>

                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={cn("h-full rounded-full", getSkillLevelColor(skill.level))}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.percentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>

                      <AnimatePresence>
                        {hoveredSkill === skill.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-sm text-muted-foreground mt-1"
                          >
                            {skill.description}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {!activeCategory && (
        <div className="text-center text-muted-foreground p-4 border border-dashed rounded-lg">
          <p>Select a category above to view detailed skills</p>
        </div>
      )}
    </div>
  )
}
