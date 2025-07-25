"use client"

import { BookOpen, Home } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  BarChart2,
  Settings,
  HelpCircle,
  Menu,
  CircleUser,
  BriefcaseBusiness,
  GraduationCap,
  GlobeLock,
  Hammer,
  Users,
  TableProperties,
} from "lucide-react"
import { Box } from "./box"
import { FileChartColumn } from "./file-icon"

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function NavItem({
    href,
    icon: Icon,
    children,
  }: {
    href: string
    icon: any
    children: React.ReactNode
  }) {
    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-rose-300/95 dark:hover:bg-[#1F1F23]"
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        {children}
      </Link>
    )
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-[#fbebe5] dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`
                fixed inset-y-0 left-0 z-[70] w-64 bg-[#fbebe5] dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-[#1F1F23]
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="h-full flex flex-col">
          <Link
            href="/dashboard"
            rel="noopener noreferrer"
            className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23]"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full overflow-hidden">
                <Image
                src="https://j9v2s0d9fs.ufs.sh/f/lPsbSsZAX9SYdNnmqvWekY0wghnZXPrJQ7R45bjNmFBu8SCx"
                alt="Kiseeka Pius"
                width={32}
                height={32}
                className="flex-shrink-0 hidden dark:hidden ring-2 ring-gradient-text dark:ring-[#2B2B30] sm:w-8 sm:h-8 cursor-pointer"
              />
              </div>
              <div className="rounded-full overflow-hidden ring-2 ring-gradient-text dark:ring-[#2B2B30] sm:w-8 sm:h-8 cursor-pointer">
              <Image
                src="https://j9v2s0d9fs.ufs.sh/f/lPsbSsZAX9SYdNnmqvWekY0wghnZXPrJQ7R45bjNmFBu8SCx"
                alt="Kiseeka Pius"
                width={32}
                height={32}
                className="flex-shrink-0 block"
              />
              </div>
              <span className="text-lg font-semibold hover:cursor-pointer gradient-text dark:text-white bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Kiseka Pius
              </span>
            </div>
          </Link>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider gradient-text dark:text-gray-400">
                  Overview
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard" icon={Home}>
                    Dashboard
                  </NavItem>
                  <NavItem href="/dashboard" icon={BarChart2}>
                    Analytics
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider gradient-text dark:text-gray-400">
                  Form Suite
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard/profile-form" icon={ CircleUser }>
                    Profile
                  </NavItem>
                  <NavItem href="/dashboard/work-experience" icon={BriefcaseBusiness}>
                    Work Experience
                  </NavItem>
                  <NavItem href="/dashboard/education-form" icon={GraduationCap}>
                    Education
                  </NavItem>
                  <NavItem href="/dashboard/projects-form" icon={GlobeLock}>
                    Projects
                  </NavItem>
                  <NavItem href="/dashboard/skills-form" icon={Hammer}>
                    Skill
                  </NavItem>
                  <NavItem href="/dashboard/testimonial-form" icon={Users}>
                    Testimonial
                  </NavItem>
                  <NavItem href="/dashboard/blog-posts-category" icon={BookOpen}>
                    Blog Category Form
                  </NavItem>
                  <NavItem href="/dashboard/blog-posts-form" icon={FileChartColumn}>
                    Blog Posts Form
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider gradient-text dark:text-gray-400">
                  Table OverView
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard/view-work-experiences" icon={TableProperties}>
                    Work Experiences
                  </NavItem>
                  <NavItem href="/dashboard/view-education-backgrounds" icon={TableProperties}>
                    Education Background
                  </NavItem>
                  <NavItem href="/dashboard/view-projects" icon={TableProperties}>
                    Projects
                  </NavItem>
                  <NavItem href="/dashboard/view-skills" icon={TableProperties}>
                    Skills
                  </NavItem>
                  <NavItem href="/dashboard/view-testimonials" icon={TableProperties}>
                    Testimonials
                  </NavItem>
                  <NavItem href="/dashboard/view-blog-posts-categories" icon={TableProperties}>
                    Blog Categories
                  </NavItem>
                  <NavItem href="/dashboard/view-blog-posts" icon={TableProperties}>
                    Blog Posts
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
            <div className="space-y-1">
              <NavItem href="#" icon={Settings}>
                Settings
              </NavItem>
              <NavItem href="#" icon={HelpCircle}>
                Help
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
