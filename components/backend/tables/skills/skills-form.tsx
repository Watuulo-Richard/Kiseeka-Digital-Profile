"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Loader2, Plus, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSkills, useSingleSkillQuery } from "@/hooks/use-skills";
import { SkillFormTypes, SkillSchema } from "@/schema/schema";
import { UpdateSkillType } from "@/types/skill";

interface SkillsFormProps {
  userId: string;
  skillId?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const EMPTY_DEFAULTS: SkillFormTypes = {
  name: "",
  level: 0,
  description: "",
  userId: "",
};

export function SkillsForm({
  userId,
  skillId,
  open: controlledOpen,
  onOpenChange,
}: SkillsFormProps) {
  const form = useForm<SkillFormTypes>({
    resolver: zodResolver(SkillSchema),
    defaultValues: EMPTY_DEFAULTS,
  });

  const formErrors = form.formState.errors;

  const { createSkill, updateSkill } = useSkills();
  const { skill, isLoading: isLoadingSkill } = useSingleSkillQuery(
    skillId,
    controlledOpen,
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = onOpenChange ?? setInternalOpen;

  const lastPopulatedId = useRef<string | null>(null);

  useEffect(() => {
    if (skillId && skill && isOpen) {
      if (lastPopulatedId.current !== skillId) {
        lastPopulatedId.current = skillId;
        form.reset({
          name: skill.name,
          level: skill.level ?? 0,
          description: skill.description,
          userId: skill.userId,
        });
      }
    } else if (!skillId && isOpen && lastPopulatedId.current !== null) {
      form.reset(EMPTY_DEFAULTS);
      lastPopulatedId.current = null;
    } else if (!isOpen) {
      lastPopulatedId.current = null;
    }
  }, [skill, skillId, isOpen, form]);

  async function handleSubmit(data: SkillFormTypes) {
    setIsSubmitting(true);

    if (skillId) {
      const updatePayload: UpdateSkillType = {
        name: data.name,
        level: data.level,
        description: data.description,
      };

      updateSkill(
        { id: skillId, skillDetails: updatePayload },
        {
          onSuccess: (response) => {
            setIsSubmitting(false);
            if (response.success) {
              toast.success(response.message || "Skill Updated Successfully...✅");
              form.reset(EMPTY_DEFAULTS);
              setIsOpen(false);
            } else {
              toast.error(response.message || "Failed To Update Skill...🥺");
            }
          },
          onError: (error) => {
            setIsSubmitting(false);
            toast.error("Failed To Update Skill");
            console.error("Update error:", error);
          },
        },
      );
      return;
    }

    createSkill({ ...data, userId }, {
      onSuccess: (response) => {
        setIsSubmitting(false);
        if (response.error) {
          toast.error(response.error ?? "Failed to add skill.");
          return;
        }
        toast.success("Skill Added Successfully...✅");
        form.reset({ ...EMPTY_DEFAULTS });
        setIsOpen(false);
      },
      onError: (error) => {
        setIsSubmitting(false);
        toast.error("Failed To Save Skill");
        console.error("Create error:", error);
      },
    });
  }

  const isEditMode = !!skillId;
  const isBusy = isSubmitting || isLoadingSkill;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {controlledOpen === undefined && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="flex h-[min(90vh,820px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-[540px] md:max-w-[640px]">
        {isLoadingSkill && skillId ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <DialogHeader className="px-6 pt-6 pb-4">
              <DialogTitle>
                {isEditMode ? "Edit Skill" : "Add New Skill"}
              </DialogTitle>
              <DialogDescription>
                {isEditMode
                  ? "Update the skill details below."
                  : "Add a new skill. Click save when you're done."}
              </DialogDescription>
            </DialogHeader>

            <Separator />

            <ScrollArea className="min-h-0 flex-1">
              <div className="space-y-5 px-6 py-4 pb-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">
                    Skill Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="E.g., TypeScript"
                    {...form.register("name")}
                    autoComplete="off"
                    disabled={isBusy}
                  />
                  {formErrors.name && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 font-medium"
                    >
                      {formErrors.name.message}
                    </motion.span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="level">
                    Proficiency Level <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="level"
                    type="number"
                    min={0}
                    max={100}
                    placeholder="E.g., 85"
                    {...form.register("level")}
                    autoComplete="off"
                    disabled={isBusy}
                  />
                  {formErrors.level && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 font-medium"
                    >
                      {formErrors.level.message}
                    </motion.span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">
                    Description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="E.g., Building type-safe full-stack applications and design systems..."
                    rows={4}
                    {...form.register("description")}
                    disabled={isBusy}
                    className="resize-none"
                  />
                  {formErrors.description && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 font-medium"
                    >
                      {formErrors.description.message}
                    </motion.span>
                  )}
                </div>
              </div>
            </ScrollArea>

            <Separator />

            <DialogFooter className="shrink-0 gap-2 px-6 py-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isBusy}
                  className="rounded-lg"
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                disabled={isBusy}
                className="rounded-lg h-10 px-6 gap-2 group"
              >
                {isBusy && !isLoadingSkill ? (
                  <>
                    <span>{isEditMode ? "Updating..." : "Saving..."}</span>
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <span>{isEditMode ? "Update" : "Save"} Skill</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}