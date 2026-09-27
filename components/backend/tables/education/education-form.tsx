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
  useEducation,
  useSingleEducationQuery,
} from "@/hooks/use-education";
import { EducationFormTypes, EducationSchema } from "@/schema/schema";
import { UpdateEducationType } from "@/types/education";
import { StartDate } from "@/components/backend/start-date";
import { EndDate } from "@/components/backend/end-date";

interface EducationFormProps {
  userId: string;
  educationId?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const EMPTY_DEFAULTS: EducationFormTypes = {
  institution: "",
  educationLevel: "",
  startDate: "",
  endDate: "",
  currentlyStudying: false,
  description: "",
  userId: "",
};

function toInputDate(value: Date | string | null): string {
  if (!value) return "";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function EducationForm({
  userId,
  educationId,
  open: controlledOpen,
  onOpenChange,
}: EducationFormProps) {
  const form = useForm<EducationFormTypes>({
    resolver: zodResolver(EducationSchema),
    defaultValues: EMPTY_DEFAULTS,
  });

  const formErrors = form.formState.errors;
  const isCurrentlyStudying = form.watch("currentlyStudying") ?? false;

  const { createEducation, updateEducation } = useEducation();
  const { education, isLoading: isLoadingEducation } = useSingleEducationQuery(
    educationId,
    controlledOpen,
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const watchedStartDate = form.watch("startDate");
  const watchedEndDate = form.watch("endDate");

  function handleStartDateChange(date: Date) {
    form.setValue("startDate", toInputDate(date), { shouldValidate: true });
  }

  function handleEndDateChange(date: Date) {
    form.setValue("endDate", toInputDate(date), { shouldValidate: true });
  }

  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = onOpenChange ?? setInternalOpen;

  const lastPopulatedId = useRef<string | null>(null);

  useEffect(() => {
    if (educationId && education && isOpen) {
      if (lastPopulatedId.current !== educationId) {
        lastPopulatedId.current = educationId;
        form.reset({
          institution: education.institution,
          educationLevel: education.educationLevel,
          startDate: toInputDate(education.startDate),
          endDate: toInputDate(education.endDate),
          currentlyStudying: education.endDate === null,
          description: education.description,
          userId: education.userId,
        });
      }
    } else if (!educationId && isOpen && lastPopulatedId.current !== null) {
      form.reset(EMPTY_DEFAULTS);
      lastPopulatedId.current = null;
    } else if (!isOpen) {
      lastPopulatedId.current = null;
    }
  }, [education, educationId, isOpen, form]);

  async function handleSubmit(data: EducationFormTypes) {
    setIsSubmitting(true);

    if (educationId) {
      const updatePayload: UpdateEducationType = {
        institution: data.institution,
        educationLevel: data.educationLevel,
        startDate: new Date(data.startDate),
        endDate: data.currentlyStudying ? null : new Date(data.endDate as string),
        description: data.description,
      };

      updateEducation(
        { id: educationId, educationDetails: updatePayload },
        {
          onSuccess: (response) => {
            setIsSubmitting(false);
            if (response.success) {
              toast.success(response.message || "Education Updated Successfully...✅");
              form.reset(EMPTY_DEFAULTS);
              setIsOpen(false);
            } else {
              toast.error(response.message || "Failed To Update Education...🥺");
            }
          },
          onError: (error) => {
            setIsSubmitting(false);
            toast.error("Failed To Update Education");
            console.error("Update error:", error);
          },
        },
      );
      return;
    }

    createEducation(
      {
        institution: data.institution,
        educationLevel: data.educationLevel,
        startDate: data.startDate,
        ...(data.currentlyStudying
          ? {}
          : { endDate: data.endDate as string }),
        description: data.description,
        userId,
      },
      {
        onSuccess: (response) => {
          setIsSubmitting(false);
          if (response.error) {
            toast.error(response.error ?? "Failed to add education.");
            return;
          }
          toast.success("Education Added Successfully...✅");
          form.reset({ ...EMPTY_DEFAULTS });
          setIsOpen(false);
        },
        onError: (error) => {
          setIsSubmitting(false);
          toast.error("Failed To Save Education");
          console.error("Create error:", error);
        },
      },
    );
  }

  const isEditMode = !!educationId;
  const isBusy = isSubmitting || isLoadingEducation;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {controlledOpen === undefined && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="flex h-[min(90vh,820px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-[540px] md:max-w-[640px]">
        {isLoadingEducation && educationId ? (
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
                {isEditMode ? "Edit Education" : "Add New Education"}
              </DialogTitle>
              <DialogDescription>
                {isEditMode
                  ? "Update the education details below."
                  : "Add a new education. Click save when you're done."}
              </DialogDescription>
            </DialogHeader>

            <Separator />

            <ScrollArea className="min-h-0 flex-1">
              <div className="space-y-5 px-6 py-4 pb-6">
                <div className="grid gap-2">
                  <Label htmlFor="institution">
                    Institution <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="institution"
                    placeholder="E.g., Makerere University"
                    {...form.register("institution")}
                    autoComplete="off"
                    disabled={isBusy}
                  />
                  {formErrors.institution && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 font-medium"
                    >
                      {formErrors.institution.message}
                    </motion.span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="educationLevel">
                    Education Level <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="educationLevel"
                    placeholder="E.g., Bachelor of Science in Software Engineering"
                    {...form.register("educationLevel")}
                    autoComplete="off"
                    disabled={isBusy}
                  />
                  {formErrors.educationLevel && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 font-medium"
                    >
                      {formErrors.educationLevel.message}
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
                    {isCurrentlyStudying ? (
                      <>
                        <Label htmlFor="endDate">End Date</Label>
                        <div className="flex h-10 items-center rounded-lg border border-dashed border-gray-300 bg-gray-50 px-3 text-sm font-medium text-muted-foreground dark:border-gray-700 dark:bg-transparent">
                          Present · currently studying
                        </div>
                      </>
                    ) : (
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
                    )}
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

                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-[#F2B5A0]/30 bg-[#fff8f4] px-3 py-2.5 select-none dark:border-gray-800 dark:bg-white/[0.03]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded accent-[#F2B5A0]"
                    {...form.register("currentlyStudying")}
                    disabled={isBusy}
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    I&apos;m currently studying here
                  </span>
                </label>

                <div className="grid gap-2">
                  <Label htmlFor="description">
                    Description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="E.g., Studied full-stack development, data structures, and software engineering principles..."
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
                {isBusy && !isLoadingEducation ? (
                  <>
                    <span>{isEditMode ? "Updating..." : "Saving..."}</span>
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <span>{isEditMode ? "Update" : "Save"} Education</span>
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