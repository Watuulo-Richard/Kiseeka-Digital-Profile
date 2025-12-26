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

export function TableOfContents({
  className,
  containerSelector = ".prose",
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    /* Here Are Only searching within the specified container that we gave our class which is prose*/
    /* Here You Can Add A Number of Headings You Feel You Want Depending on how many you have in the database*/
    const headingElements = document.querySelectorAll("h1, h2, h3");
    const headingsArray: Heading[] = [];

    headingElements.forEach((element, index) => {
      /* Auto-generate IDs if they don't exist */
      if (element.id) {
        const id =
          element.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") || `heading-${index}`;
        element.id = id;
      }

      headingsArray.push({
        id: element.id,
        text: element.textContent || "",
        level: parseInt(element.tagName.charAt(1)),
      });
    });

    setHeadings(headingsArray);
  }, [containerSelector]); /* Re-run if container changes */

  useEffect(() => {
    const observer = new IntersectionObserver(
      () => {
        const headingPositions = headings.map((heading) => {
          const element = document.getElementById(heading.id);
          return {
            id: heading.id,
            top: element ? element.getBoundingClientRect().top : Infinity,
          };
        });

        let activeHeading = headingPositions.find(
          (heading) => heading.top >= 0 && heading.top <= 100
        );

        if (!activeHeading) {
          const headingsAbove = headingPositions
            .filter((heading) => heading.top < 0)
            .sort((a, b) => b.top - a.top);

          activeHeading = headingsAbove[0];
        }

        if (!activeHeading) {
          const headingsBelow = headingPositions
            .filter((heading) => heading.top > 100)
            .sort((a, b) => a.top - b.top);

          activeHeading = headingsBelow[0];
        }

        if (activeHeading && activeHeading.id !== activeId) {
          setActiveId(activeHeading.id);
        }
      },
      {
        root: null,
        rootMargin: "-100px",
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    const handleScroll = () => {
      const headingPositions = headings.map((heading) => {
        const element = document.getElementById(heading.id);
        return {
          id: heading.id,
          top: element ? element.getBoundingClientRect().top : Infinity,
        };
      });

      let activeHeading = headingPositions.find(
        (heading) => heading.top >= -50 && heading.top <= 100
      );

      if (!activeHeading) {
        const headingsAbove = headingPositions
          .filter((heading) => heading.top < -50)
          .sort((a, b) => b.top - a.top);

        activeHeading = headingsAbove[0];
      }

      if (activeHeading && activeHeading.id !== activeId) {
        setActiveId(activeHeading.id);
      }
    };

    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 10);
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });

    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", throttledScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [headings, activeId]);

  const handleClick = async (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;

    window.history.pushState({}, "", `#${id}`);

    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error(err);
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

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
        <ul className="space-y-2">
          {headings.map((heading, index) => (
            <li key={heading.id || `heading-${index}`}>
              <button
                onClick={() => handleClick(heading.id)}
                className={cn(
                  "text-left w-full text-sm transition-colors hover:text-foreground",
                  activeId === heading.id
                    ? "text-foreground font-medium"
                    : "text-muted-foreground",
                  heading.level === 2 && "pl-0",
                  heading.level === 3 && "pl-4",
                  heading.level === 4 && "pl-8"
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
