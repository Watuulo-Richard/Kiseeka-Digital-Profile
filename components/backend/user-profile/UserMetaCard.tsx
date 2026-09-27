"use client";

import { Loader2, PencilLine, UserRound } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useSingleProfileQuery } from "@/hooks/use-profile";
import { ProfileForm } from "./ProfileForm";

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function roleLabel(role: string): string {
  return role
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function UserMetaCard({ userId }: { userId: string }) {
  const { profile, isLoading } = useSingleProfileQuery(userId);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const fullName = profile ? profile.title || profile.fullName || "" : "";

  return (
    <>
      <div className="rounded-2xl border border-border bg-card p-5 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex w-full flex-col items-center gap-6 xl:flex-row">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-border">
              {isLoading ? (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : profile?.profileImage ? (
                <Image
                  src={profile.profileImage}
                  alt={fullName || profile.email}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-lg font-semibold text-primary dark:bg-primary/15 dark:text-primary">
                  {fullName ? (
                    getInitials(fullName)
                  ) : (
                    <UserRound className="h-8 w-8" />
                  )}
                </div>
              )}
            </div>

            <div className="order-3 xl:order-2">
              {isLoading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="h-6 w-44 animate-pulse rounded-md bg-muted" />
                  <div className="h-4 w-28 animate-pulse rounded-md bg-muted" />
                </div>
              ) : (
                <>
                  <h4 className="mb-1 text-center text-lg font-semibold text-foreground xl:text-left">
                    {fullName || "—"}
                  </h4>
                  <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                    <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {profile ? roleLabel(profile.role) : "—"}
                    </span>
                    <div className="hidden h-3.5 w-px bg-border xl:block" />
                    <p className="truncate text-sm text-muted-foreground">
                      {profile?.email ?? "—"}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsEditOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-xs hover:bg-muted lg:inline-flex lg:w-auto"
          >
            <PencilLine className="h-4 w-4" />
            Edit
          </button>
        </div>
      </div>

      <ProfileForm
        userId={userId}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
    </>
  );
}