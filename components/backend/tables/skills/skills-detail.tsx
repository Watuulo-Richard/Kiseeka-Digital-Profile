"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSingleSkillQuery } from "@/hooks/use-skills";
import { SkillBaseType } from "@/types/skill";
import clsx from "clsx";
import { format } from "date-fns";
import {
  BadgeCheck,
  Calendar,
  FileText,
  Gauge,
  Loader2,
  Receipt,
  Tag,
  X,
} from "lucide-react";

/* ── Props ── */

interface SkillDetailDialogProps {
  open:         boolean;
  onOpenChange: (open: boolean) => void;
  skillId?: string;
}

/* ── Helpers ── */

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "—";
  return format(new Date(date), "MMM dd, yyyy");
}

function levelLabel(level: number | null): string {
  const value = level ?? 0;
  if (value >= 90) return "Expert";
  if (value >= 70) return "Advanced";
  if (value >= 50) return "Intermediate";
  if (value >= 30) return "Basic";
  return "Beginner";
}

/* ── Sub-components ── */

function InfoRow({
  icon: Icon,
  label,
  value,
  mono = false,
  multiline = false,
}: {
  icon:      React.ElementType;
  label:     string;
  value:     React.ReactNode;
  mono?:     boolean;
  multiline?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border/40 last:border-0">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted/60">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col xs:flex-row xs:items-center xs:justify-between gap-0.5">
        <span className="text-xs text-muted-foreground font-medium shrink-0 min-w-[110px]">
          {label}
        </span>
        <span
          className={clsx(
            "text-sm font-medium text-foreground",
            mono && "font-mono",
            multiline
              ? "whitespace-pre-wrap break-words text-right"
              : "text-right flex items-center justify-end gap-2",
          )}
        >
          {value ?? <span className="text-muted-foreground/40 text-xs">—</span>}
        </span>
      </div>
    </div>
  );
}

function SectionTitle({ label }: { label: string }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70 mb-3">
      {label}
    </p>
  );
}

/* ── Detail body ── */

function SkillDetail({ skill }: { skill: SkillBaseType }) {
  const level = skill.level ?? 0;

  return (
    <>
      {/* ── Header banner ── */}
      <div className="px-6 pt-6 pb-5 border-b border-border/60 bg-muted/20">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
              <BadgeCheck className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1 min-w-0 flex-1">
              <DialogTitle className="text-base font-bold leading-tight">
                {skill.name}
              </DialogTitle>
              <p className="text-xs text-muted-foreground">
                {levelLabel(level)} · {level}% proficiency
              </p>
              <Badge
                variant="outline"
                className={clsx(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border",
                  "bg-[#F2B5A0]/10 text-[#c0543a] border-[#F2B5A0]/40 dark:text-[#f2957a] dark:border-[#F2B5A0]/30",
                )}
              >
                <span className="h-1.5 w-1.5 rounded-full shrink-0 bg-[#c0543a]" />
                {levelLabel(level)}
              </Badge>
            </div>
          </div>
        </DialogHeader>
      </div>

      {/* ── Body ── */}
      <ScrollArea className="max-h-[60vh]">
        <div className="px-6 py-5 space-y-6">

          {/* ── Skill information ── */}
          <div>
            <SectionTitle label="Skill Information" />
            <div className="rounded-xl border border-border/50 bg-muted/10 px-4 py-1 divide-y divide-border/30">
              <InfoRow icon={Tag}    label="Skill Name" value={skill.name} />
              <InfoRow icon={Gauge}  label="Proficiency Level" value={(
                <span className="flex items-center gap-2">
                  <Progress value={level} className="h-1.5 w-24" />
                  {level}%
                </span>
              )} />
              <InfoRow icon={FileText} label="Description" value={skill.description} multiline />
            </div>
          </div>

          {/* ── Timestamps ── */}
          <div>
            <SectionTitle label="Timestamps" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/10 px-4 py-3">
                <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-[11px] text-muted-foreground">Created</p>
                  <p className="text-xs font-medium">{formatDate(skill.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/10 px-4 py-3">
                <Receipt className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-[11px] text-muted-foreground">Last Updated</p>
                  <p className="text-xs font-medium">{formatDate(skill.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </ScrollArea>

      {/* ── Footer ── */}
      <div className="px-6 py-4 border-t border-border/60 bg-muted/10 flex items-center justify-end gap-2">
        <p className="text-[11px] text-muted-foreground mr-auto font-mono">
          ID: {skill.id}
        </p>
      </div>
    </>
  );
}

/* ── Main Dialog ── */

export default function SkillDetailDialog({
  open,
  onOpenChange,
  skillId,
}: SkillDetailDialogProps) {
  const { skill, isLoading, message } = useSingleSkillQuery(skillId, open);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-xl md:max-w-2xl p-0 gap-0 overflow-hidden rounded-2xl">

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Loading skill details...</p>
          </div>

        ) : skill ? (
          <SkillDetail skill={skill} />

        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
              <X className="h-7 w-7 text-muted-foreground/50" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Skill Not Found</p>
              <p className="text-xs text-muted-foreground mt-1">
                {message ?? "The requested skill could not be found."}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}