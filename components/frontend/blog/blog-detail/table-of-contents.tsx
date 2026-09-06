"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
  containerSelector?: string;
}

const SCROLL_OFFSET = 84;

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\u00C0-\u00FF]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function TableOfContents({
  className,
  containerSelector = ".prose",
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  /* Scan headings inside the prose container and give every one a stable id */
  useEffect(() => {
    let cancelled = false;

    const scan = () => {
      const root = containerSelector
        ? document.querySelector(containerSelector)
        : document;

      if (!root) return;

      const headingsArray: Heading[] = [];
      const usedIds = new Set<string>();

      root.querySelectorAll("h1, h2, h3").forEach((element, index) => {
        /* The article title itself shouldn't appear in the TOC */
        if (element.tagName === "H1") return;

        const rawText = element.textContent?.trim() || "";
        if (!rawText) return;

        const baseId =
          element.id || slugify(rawText) || `heading-${index + 1}`;
        let id = baseId;
        let counter = 2;
        while (usedIds.has(id)) {
          id = `${baseId}-${counter++}`;
        }
        usedIds.add(id);

        element.id = id;

        headingsArray.push({
          id,
          text: rawText,
          level: parseInt(element.tagName.charAt(1)),
        });
      });

      if (!cancelled) {
        setHeadings((prev) =>
          prev.length === headingsArray.length &&
          prev.every((heading, i) => heading.id === headingsArray[i].id)
            ? prev
            : headingsArray
        );
      }
    };

    scan();
    /* Second pass in case content mounts slightly late */
    const timer = window.setTimeout(scan, 100);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [containerSelector]);

  /* Track which heading is currently in view while scrolling */
  useEffect(() => {
    if (headings.length === 0) return;

    const getActiveHeading = () => {
      let current: Heading | null = null;

      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (!element) continue;

        /* Headings are in document order, so keep the last one above the line */
        if (element.getBoundingClientRect().top <= SCROLL_OFFSET) {
          current = heading;
        } else {
          break;
        }
      }

      return current;
    };

    const handleScroll = () => {
      const current = getActiveHeading();
      setActiveId((prev) => (current && current.id !== prev ? current.id : prev));
    };

    let scrollTimeout: number;
    const throttledScroll = () => {
      window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(handleScroll, 50);
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.clearTimeout(scrollTimeout);
    };
  }, [headings]);

  const handleClick = (id: string) => {
    window.history.pushState({}, "", `#${id}`);
    setActiveId(id);

    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - SCROLL_OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="text-sm font-semibold text-foreground mb-4">
        On this page
      </h4>
      <nav>
        <ul className="space-y-2 border-l border-border">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => handleClick(heading.id)}
                className={cn(
                  "text-left w-full text-sm transition-colors hover:text-foreground -ml-px border-l-2 pl-3",
                  activeId === heading.id
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-muted-foreground",
                  heading.level === 3 && "pl-7",
                  heading.level === 4 && "pl-11"
                )}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}