/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const AUDIT_LINK = "/#contact";

interface PromoContentProps {
  variant?: "desktop" | "mobile";
  className?: string;
}

export function PromoContent({
  variant = "desktop",
  className,
}: PromoContentProps) {
  if (variant === "mobile") {
    return (
      <Link
        href={AUDIT_LINK}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "border-t border-border bg-muted/20 p-3 flex items-center gap-3 hover:bg-muted/40 transition-colors",
          className
        )}
      >
        <img
          src="./audit-one.jpg"
          alt="Kiseka Pius"
          className="w-8 h-8 rounded object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-foreground/90 truncate">
            Audit & assurance, made personal
          </p>
          <p className="text-xs text-muted-foreground truncate">
            Let's talk about your next engagement
          </p>
        </div>
        <span className="text-xs text-primary hover:text-primary/80 font-medium shrink-0">
          Contact
        </span>
      </Link>
    );
  }

  return (
    <div
      className={cn(
        "border border-border rounded-lg overflow-hidden bg-card group",
        className
      )}
    >
      <div className="relative">
        <img
          src="/PIUS-PROFILE.jpg"
          alt="Kiseka Pius"
          className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 h-6 px-3 text-xs font-medium bg-background/80 backdrop-blur rounded-md border border-border flex items-center justify-center">
          Available for projects
        </span>
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold tracking-tighter">
            Need an assurance you can trust?
          </h3>
          <p className="text-sm text-muted-foreground">
            Audit, tax, and advisory support tailored to your business.
          </p>
        </div>
        <Link
          href={AUDIT_LINK}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Let's work together
        </Link>
      </div>
    </div>
  );
}