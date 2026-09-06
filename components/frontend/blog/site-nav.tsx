"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ModeToggle } from "../mode-toggle";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/70 backdrop-blur-lg shadow-sm border-b border-border/50"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto w-full flex h-11 sm:h-14 items-center justify-between gap-2 px-2 sm:px-6">
        <Link href="/" aria-label="Go to homepage" className="flex items-center shrink-0">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xl sm:text-2xl font-bold tracking-tighter bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
          >
            KP
          </motion.span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center text-sm font-medium transition-colors px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            Home
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}