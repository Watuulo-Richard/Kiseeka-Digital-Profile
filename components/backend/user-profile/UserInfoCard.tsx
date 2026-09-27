"use client";

import { Info, PencilLine } from "lucide-react";
import { useState } from "react";
import { useSingleProfileQuery } from "@/hooks/use-profile";
import { ProfileForm } from "./ProfileForm";

function InfoRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <p className="mb-2 text-xs leading-normal text-muted-foreground">
        {label}
      </p>
      <p className="text-sm font-medium text-foreground">
        {value ?? (
          <span className="font-normal text-muted-foreground">
            Not provided
          </span>
        )}
      </p>
    </div>
  );
}

export default function UserInfoCard({ userId }: { userId: string }) {
  const { profile, isLoading } = useSingleProfileQuery(userId);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-border bg-card p-5 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <h4 className="mb-6 text-lg font-semibold text-foreground">
              Personal Information
            </h4>

            {isLoading ? (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i}>
                    <div className="mb-2 h-3 w-16 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                <InfoRow label="Email Address" value={profile?.email ?? null} />
                <InfoRow label="Full Name" value={profile?.fullName ?? null} />
                <InfoRow label="Display Title" value={profile?.title ?? null} />
                <InfoRow label="Professional Profile" value={profile?.bio ?? null} />
              </div>
            )}

            {!isLoading && (
              <div className="mt-4 flex items-start gap-2 rounded-lg bg-muted px-3 py-2.5">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  Your email address cannot be changed here. Contact a Super
                  Admin to update it.
                </p>
              </div>
            )}
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