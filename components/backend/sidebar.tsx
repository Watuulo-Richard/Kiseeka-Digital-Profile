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
  X,
} from "lucide-react"
import { FileChartColumn } from "./file-icon"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function isActive(href: string) {
    if (href === "#") return false
    return (
      pathname === href ||
      (href !== "/dashboard" && pathname.startsWith(href))
    )
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
    const active = isActive(href)
    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className={cn(
          "group flex items-center px-3 py-2 text-sm rounded-md transition-colors",
          active
            ? "bg-primary/20 border border-primary/50 text-[#c0543a] shadow-sm dark:bg-white/[0.06] dark:border-white/15 dark:text-white"
            : "text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-rose-300/95 dark:hover:bg-[#1F1F23]"
        )}
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0 text-[#c0543a] dark:text-primary/90 group-hover:text-white dark:group-hover:text-white" />
        <span className="truncate">{children}</span>
      </Link>
    )
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-[#fbebe5] dark:bg-[#0F0F12] shadow-md hover:shadow-lg transition-shadow"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5 text-[#c0543a] dark:text-primary" />
      </button>

      {/* Sidebar */}
      <nav
        className={cn(
          "fixed inset-y-0 left-0 z-[70] w-72 sm:w-80 lg:w-64 xl:w-72 bg-[#fbebe5] dark:bg-[#0F0F12] transform transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 lg:static border-r border-primary/30 dark:border-[#1F1F23]",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="h-16 sm:h-20 lg:h-16 px-4 sm:px-6 flex items-center justify-between border-b border-primary/30 dark:border-[#1F1F23] flex-shrink-0">
            <Link
              href="/dashboard"
              rel="noopener noreferrer"
              className="flex items-center gap-3 min-w-0"
            >
              <div className="rounded-full overflow-hidden ring-2 ring-gradient-text dark:ring-[#2B2B30] w-8 h-8 sm:w-10 sm:h-10 lg:w-8 lg:h-8 flex-shrink-0">
                <Image
                  src="https://j9v2s0d9fs.ufs.sh/f/lPsbSsZAX9SYdNnmqvWekY0wghnZXPrJQ7R45bjNmFBu8SCx"
                  alt="Kiseeka Pius"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-base sm:text-lg lg:text-base font-semibold hover:cursor-pointer gradient-text dark:text-white bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent truncate">
                Kiseka Pius
              </span>
            </Link>

            {/* Close button for mobile */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#1F1F23] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-[#c0543a] dark:text-primary" />
            </button>
          </div>

          {/* Scrollable Navigation */}
          <ScrollArea className="flex-1">
            <div className="py-4 px-3 sm:px-4">
              <div className="space-y-6">
                {/* Overview Section */}
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

                {/* Form Suite Section */}
                <div>
                  <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider gradient-text dark:text-gray-400">
                    Form Suite
                  </div>
                  <div className="space-y-1">
                    <NavItem href="/dashboard/profile-form" icon={CircleUser}>
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
                      Blog Category
                    </NavItem>
                    <NavItem href="/dashboard/blog-posts-form" icon={FileChartColumn}>
                      Blog Posts
                    </NavItem>
                  </div>
                </div>

                {/* Table Overview Section */}
                <div>
                  <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider gradient-text dark:text-gray-400">
                    Table Overview
                  </div>
                  <div className="space-y-1">
                    <NavItem href="/dashboard/view-work-experiences" icon={TableProperties}>
                      Work Experiences
                    </NavItem>
                    <NavItem href="/dashboard/view-education-backgrounds" icon={TableProperties}>
                      Education
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
                    <NavItem href="/dashboard/view-gallery" icon={TableProperties}>
                      Gallery Images
                    </NavItem>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="px-3 sm:px-4 py-3 sm:py-4 border-t border-primary/30 dark:border-[#1F1F23] flex-shrink-0">
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

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[65] lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}