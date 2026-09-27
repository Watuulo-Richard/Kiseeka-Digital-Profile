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
import { ImageIcon, Loader2, Plus, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTestimonials, useSingleTestimonialQuery } from "@/hooks/use-testimonials";
import { TestimonialFormTypes, TestimonialSchema } from "@/schema/schema";
import { UpdateTestimonialType } from "@/types/testimonial";

interface TestimonialFormProps {
  userId: string;
  testimonialId?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const EMPTY_DEFAULTS: TestimonialFormTypes = {
  fullName: "",
  email: "",
  image: "",
  profession: "",
  description: "",
  userId: "",
};

export function TestimonialForm({
  userId,
  testimonialId,
  open: controlledOpen,
  onOpenChange,
}: TestimonialFormProps) {
  const form = useForm<TestimonialFormTypes>({
    resolver: zodResolver(TestimonialSchema),
    defaultValues: EMPTY_DEFAULTS,
  });

  const formErrors = form.formState.errors;

  const { createTestimonial, updateTestimonial } = useTestimonials();
  const { testimonial, isLoading: isLoadingTestimonial } = useSingleTestimonialQuery(
    testimonialId,
    controlledOpen,
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = onOpenChange ?? setInternalOpen;

  const lastPopulatedId = useRef<string | null>(null);

  useEffect(() => {
    if (testimonialId && testimonial && isOpen) {
      if (lastPopulatedId.current !== testimonialId) {
        lastPopulatedId.current = testimonialId;
        form.reset({
          fullName: testimonial.fullName,
          email: testimonial.email,
          image: testimonial.image ?? "",
          profession: testimonial.profession,
          description: testimonial.description,
          userId: testimonial.userId,
        });
      }
    } else if (!testimonialId && isOpen && lastPopulatedId.current !== null) {
      form.reset(EMPTY_DEFAULTS);
      lastPopulatedId.current = null;
    } else if (!isOpen) {
      lastPopulatedId.current = null;
    }
  }, [testimonial, testimonialId, isOpen, form]);

  async function handleSubmit(data: TestimonialFormTypes) {
    setIsSubmitting(true);

    const cleanedImage = data.image?.trim() ? data.image : "";

    if (testimonialId) {
      const updatePayload: UpdateTestimonialType = {
        fullName: data.fullName,
        email: data.email,
        image: cleanedImage,
        profession: data.profession,
        description: data.description,
      };

      updateTestimonial(
        { id: testimonialId, testimonialDetails: updatePayload },
        {
          onSuccess: (response) => {
            setIsSubmitting(false);
            if (response.success) {
              toast.success(response.message || "Testimonial Updated Successfully...✅");
              form.reset(EMPTY_DEFAULTS);
              setIsOpen(false);
            } else {
              toast.error(response.message || "Failed To Update Testimonial...🥺");
            }
          },
          onError: (error) => {
            setIsSubmitting(false);
            toast.error("Failed To Update Testimonial");
            console.error("Update error:", error);
          },
        },
      );
      return;
    }

    createTestimonial(
      {
        ...data,
        image: cleanedImage,
        userId,
      },
      {
        onSuccess: (response) => {
          setIsSubmitting(false);
          if (response.error) {
            toast.error(response.error ?? "Failed to add testimonial.");
            return;
          }
          toast.success("Testimonial Added Successfully...✅");
          form.reset({ ...EMPTY_DEFAULTS });
          setIsOpen(false);
        },
        onError: (error) => {
          setIsSubmitting(false);
          toast.error("Failed To Save Testimonial");
          console.error("Create error:", error);
        },
      },
    );
  }

  const isEditMode = !!testimonialId;
  const isBusy = isSubmitting || isLoadingTestimonial;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {controlledOpen === undefined && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Testimonial
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="flex h-[min(90vh,820px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-[540px] md:max-w-[640px]">
        {isLoadingTestimonial && testimonialId ? (
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
                {isEditMode ? "Edit Testimonial" : "Add New Testimonial"}
              </DialogTitle>
              <DialogDescription>
                {isEditMode
                  ? "Update the testimonial details below."
                  : "Add a new testimonial. Click save when you're done."}
              </DialogDescription>
            </DialogHeader>

            <Separator />

            <ScrollArea className="min-h-0 flex-1">
              <div className="space-y-5 px-6 py-4 pb-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="E.g., Jane Doe"
                      {...form.register("fullName")}
                      autoComplete="off"
                      disabled={isBusy}
                    />
                    {formErrors.fullName && (
                      <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 font-medium"
                      >
                        {formErrors.fullName.message}
                      </motion.span>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="E.g., jane@example.com"
                      {...form.register("email")}
                      autoComplete="off"
                      disabled={isBusy}
                    />
                    {formErrors.email && (
                      <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 font-medium"
                      >
                        {formErrors.email.message}
                      </motion.span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="profession">
                      Profession <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="profession"
                      placeholder="E.g., Software Engineer"
                      {...form.register("profession")}
                      autoComplete="off"
                      disabled={isBusy}
                    />
                    {formErrors.profession && (
                      <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 font-medium"
                      >
                        {formErrors.profession.message}
                      </motion.span>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      placeholder="E.g., https://example.com/photo.jpg"
                      {...form.register("image")}
                      autoComplete="off"
                      disabled={isBusy}
                    />
                    {formErrors.image && (
                      <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 font-medium"
                      >
                        {formErrors.image.message}
                      </motion.span>
                    )}
                    <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <ImageIcon className="h-3 w-3" />
                      Provide an image URL for the person&apos;s avatar. Optional.
                    </span>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">
                    Testimonial <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="E.g., Working with Kiseeka was a game-changer for our project..."
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
                {isBusy && !isLoadingTestimonial ? (
                  <>
                    <span>{isEditMode ? "Updating..." : "Saving..."}</span>
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <span>{isEditMode ? "Update" : "Save"} Testimonial</span>
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