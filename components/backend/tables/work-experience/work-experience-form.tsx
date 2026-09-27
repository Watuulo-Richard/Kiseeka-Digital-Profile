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
import {
  useSingleWorkExperienceQuery,
  useWorkExperiences,
} from "@/hooks/use-work-experiences";
import {
  WorkExperienceFormTypes,
  workExperienceSchema,
} from "@/schema/schema";
import { UpdateWorkExperienceType } from "@/types/work-experience";
import { StartDate } from "@/components/backend/start-date";
import { EndDate } from "@/components/backend/end-date";

interface WorkExperienceFormProps {
  userId: string;
  workExperienceId?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const EMPTY_DEFAULTS: WorkExperienceFormTypes = {
  position: "",
  company: "",
  startDate: "",
  endDate: "",
  description: "",
  userId: "",
};

function toInputDate(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function WorkExperienceForm({
  userId,
  workExperienceId,
  open: controlledOpen,
  onOpenChange,
}: WorkExperienceFormProps) {
  const form = useForm<WorkExperienceFormTypes>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: EMPTY_DEFAULTS,
  });

  const formErrors = form.formState.errors;

  const { createWorkExperience, updateWorkExperience } = useWorkExperiences();
  const { workExperience, isLoading: isLoadingWorkExperience } =
    useSingleWorkExperienceQuery(workExperienceId, controlledOpen);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const watchedStartDate = form.watch("startDate");
  const watchedEndDate = form.watch("endDate");

  function handleStartDateChange(date: Date) {
    form.setValue("startDate", date.toISOString(), { shouldValidate: true });
  }

  function handleEndDateChange(date: Date) {
    form.setValue("endDate", date.toISOString(), { shouldValidate: true });
  }

  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = onOpenChange ?? setInternalOpen;

  const lastPopulatedId = useRef<string | null>(null);

  useEffect(() => {
    if (workExperienceId && workExperience && isOpen) {
      if (lastPopulatedId.current !== workExperienceId) {
        lastPopulatedId.current = workExperienceId;
        form.reset({
          position: workExperience.position,
          company: workExperience.company,
          startDate: toInputDate(workExperience.startDate),
          endDate: toInputDate(workExperience.endDate),
          description: workExperience.description,
          userId: workExperience.userId,
        });
      }
    } else if (!workExperienceId && isOpen && lastPopulatedId.current !== null) {
      form.reset(EMPTY_DEFAULTS);
      lastPopulatedId.current = null;
    } else if (!isOpen) {
      lastPopulatedId.current = null;
    }
  }, [workExperience, workExperienceId, isOpen, form]);

  async function handleSubmit(data: WorkExperienceFormTypes) {
    setIsSubmitting(true);

    if (workExperienceId) {
      const updatePayload: UpdateWorkExperienceType = {
        position: data.position,
        company: data.company,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        description: data.description,
      };

      updateWorkExperience(
        { id: workExperienceId, workExperienceDetails: updatePayload },
        {
          onSuccess: (response) => {
            setIsSubmitting(false);
            if (response.success) {
              toast.success(response.message || "Work Experience Updated Successfully...✅");
              form.reset(EMPTY_DEFAULTS);
              setIsOpen(false);
            } else {
              toast.error(response.message || "Failed To Update Work Experience...🥺");
            }
          },
          onError: (error) => {
            setIsSubmitting(false);
            toast.error("Failed To Update Work Experience");
            console.error("Update error:", error);
          },
        },
      );
      return;
    }

    createWorkExperience({ ...data, userId }, {
      onSuccess: (response) => {
        setIsSubmitting(false);
        if (response.error) {
          toast.error(response.error ?? "Failed to add work experience.");
          return;
        }
        toast.success("Work Experience Added Successfully...✅");
        form.reset({ ...EMPTY_DEFAULTS });
        setIsOpen(false);
      },
      onError: (error) => {
        setIsSubmitting(false);
        toast.error("Failed To Save Work Experience");
        console.error("Create error:", error);
      },
    });
  }

  const isEditMode = !!workExperienceId;
  const isBusy = isSubmitting || isLoadingWorkExperience;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {controlledOpen === undefined && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Work Experience
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="flex h-[min(90vh,820px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-[540px] md:max-w-[640px]">
        {isLoadingWorkExperience && workExperienceId ? (
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
                {isEditMode ? "Edit Work Experience" : "Add New Work Experience"}
              </DialogTitle>
              <DialogDescription>
                {isEditMode
                  ? "Update the work experience details below."
                  : "Add a new work experience. Click save when you're done."}
              </DialogDescription>
            </DialogHeader>

            <Separator />

            <ScrollArea className="min-h-0 flex-1">
              <div className="space-y-5 px-6 py-4 pb-6">
                <div className="grid gap-2">
                  <Label htmlFor="position">
                    Position <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="position"
                    placeholder="E.g., Senior Software Engineer"
                    {...form.register("position")}
                    autoComplete="off"
                    disabled={isBusy}
                  />
                  {formErrors.position && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 font-medium"
                    >
                      {formErrors.position.message}
                    </motion.span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="company">
                    Company <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="company"
                    placeholder="E.g., Google"
                    {...form.register("company")}
                    autoComplete="off"
                    disabled={isBusy}
                  />
                  {formErrors.company && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 font-medium"
                    >
                      {formErrors.company.message}
                    </motion.span>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <StartDate
                      id="startDate"
                      triggerClassName="w-full"
                      label={
                        <>
                          Start Date <span className="text-destructive">*</span>
                        </>
                      }
                      startDate={
                        watchedStartDate ? new Date(watchedStartDate) : undefined
                      }
                      setStartDate={handleStartDateChange}
                    />
                    {formErrors.startDate && (
                      <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 font-medium"
                      >
                        {formErrors.startDate.message}
                      </motion.span>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <EndDate
                      id="endDate"
                      triggerClassName="w-full"
                      label={
                        <>
                          End Date <span className="text-destructive">*</span>
                        </>
                      }
                      endDate={
                        watchedEndDate ? new Date(watchedEndDate) : undefined
                      }
                      setEndDate={handleEndDateChange}
                    />
                    {formErrors.endDate && (
                      <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 font-medium"
                      >
                        {formErrors.endDate.message}
                      </motion.span>
                    )}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">
                    Description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="E.g., Led a team of engineers shipping core platform features..."
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
                {isBusy && !isLoadingWorkExperience ? (
                  <>
                    <span>{isEditMode ? "Updating..." : "Saving..."}</span>
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <span>{isEditMode ? "Update" : "Save"} Work Experience</span>
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