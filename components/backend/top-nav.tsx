"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Bell, ChevronRight } from "lucide-react"
import Profile01 from "./profile-01"
import Link from "next/link"
import { Session } from "next-auth"
import { ModeToggle } from "../frontend/mode-toggle"

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function TopNav({session}:{session:Session}) {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "dashboard", href: "/dashboard" },
    { label: "analytics", href: "#" },
    { label: "profile", href: "/dashboard/profile-form" },
    { label: "work experience", href: "/dashboard/work-experience" },
  ]

  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between bg-[#fbebe5] dark:bg-[#0F0F12] border-b border-primary/30 dark:border-[#1F1F23] h-full">
      <div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate md:ml-10 lg:ml-72 max-w-[800px]">
        {breadcrumbs.map((item, index) => (
          <div key={item.label} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 text-[#c0543a]/70 dark:text-primary/70 mx-1" />}
            {item.href ? (
              <Link
                href={item.href}
                className="text-[#c0543a]/80 dark:text-primary/80 hover:text-[#c0543a] dark:hover:text-primary font-medium transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[#c0543a] dark:text-primary font-semibold">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
        <button
          type="button"
          className="p-1.5 sm:p-2 hover:bg-primary/10 dark:hover:bg-[#1F1F23] rounded-full border border-transparent hover:border-primary/50 dark:hover:border-white/15 transition-colors"
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-[#c0543a] dark:text-primary" />
        </button>

        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Image
              src={ session.user.image || "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png"}
              alt="User avatar"
              width={28}
              height={28}
              className="rounded-full ring-2 ring-primary/60 dark:ring-[#2B2B30] sm:w-8 sm:h-8 cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-[280px] sm:w-80 rounded-2xl shadow-lg"
          >
            <Profile01 session={session} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
