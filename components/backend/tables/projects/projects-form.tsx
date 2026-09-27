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
import { useProjects, useSingleProjectQuery } from "@/hooks/use-projects";
import { ProjectsFormTypes, ProjectsSchema } from "@/schema/schema";
import { UpdateProjectType } from "@/types/project";

interface ProjectsFormProps {
  userId: string;
  projectId?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const EMPTY_DEFAULTS: ProjectsFormTypes = {
  title: "",
  description: "",
  url: "",
  userId: "",
};

export function ProjectsForm({
  userId,
  projectId,
  open: controlledOpen,
  onOpenChange,
}: ProjectsFormProps) {
  const form = useForm<ProjectsFormTypes>({
    resolver: zodResolver(ProjectsSchema),
    defaultValues: EMPTY_DEFAULTS,
  });

  const formErrors = form.formState.errors;

  const { createProject, updateProject } = useProjects();
  const { project, isLoading: isLoadingProject } = useSingleProjectQuery(
    projectId,
    controlledOpen,
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = onOpenChange ?? setInternalOpen;

  const lastPopulatedId = useRef<string | null>(null);

  useEffect(() => {
    if (projectId && project && isOpen) {
      if (lastPopulatedId.current !== projectId) {
        lastPopulatedId.current = projectId;
        form.reset({
          title: project.title,
          description: project.description ?? "",
          url: project.url ?? "",
          userId: project.userId,
        });
      }
    } else if (!projectId && isOpen && lastPopulatedId.current !== null) {
      form.reset(EMPTY_DEFAULTS);
      lastPopulatedId.current = null;
    } else if (!isOpen) {
      lastPopulatedId.current = null;
    }
  }, [project, projectId, isOpen, form]);

  async function handleSubmit(data: ProjectsFormTypes) {
    setIsSubmitting(true);

    if (projectId) {
      const updatePayload: UpdateProjectType = {
        title: data.title,
        description: data.description || null,
        url: data.url || null,
      };

      updateProject(
        { id: projectId, projectDetails: updatePayload },
        {
          onSuccess: (response) => {
            setIsSubmitting(false);
            if (response.success) {
              toast.success(response.message || "Project Updated Successfully...✅");
              form.reset(EMPTY_DEFAULTS);
              setIsOpen(false);
            } else {
              toast.error(response.message || "Failed To Update Project...🥺");
            }
          },
          onError: (error) => {
            setIsSubmitting(false);
            toast.error("Failed To Update Project");
            console.error("Update error:", error);
          },
        },
      );
      return;
    }

    createProject({ ...data, userId }, {
      onSuccess: (response) => {
        setIsSubmitting(false);
        if (response.error) {
          toast.error(response.error ?? "Failed to add project.");
          return;
        }
        toast.success("Project Added Successfully...✅");
        form.reset({ ...EMPTY_DEFAULTS });
        setIsOpen(false);
      },
      onError: (error) => {
        setIsSubmitting(false);
        toast.error("Failed To Save Project");
        console.error("Create error:", error);
      },
    });
  }

  const isEditMode = !!projectId;
  const isBusy = isSubmitting || isLoadingProject;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {controlledOpen === undefined && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="flex h-[min(90vh,820px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-[540px] md:max-w-[640px]">
        {isLoadingProject && projectId ? (
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
                {isEditMode ? "Edit Project" : "Add New Project"}
              </DialogTitle>
              <DialogDescription>
                {isEditMode
                  ? "Update the project details below."
                  : "Add a new project. Click save when you're done."}
              </DialogDescription>
            </DialogHeader>

            <Separator />

            <ScrollArea className="min-h-0 flex-1">
              <div className="space-y-5 px-6 py-4 pb-6">
                <div className="grid gap-2">
                  <Label htmlFor="title">
                    Project Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="E.g., Kiseeka Digital Profile"
                    {...form.register("title")}
                    autoComplete="off"
                    disabled={isBusy}
                  />
                  {formErrors.title && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 font-medium"
                    >
                      {formErrors.title.message}
                    </motion.span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="url">Project URL</Label>
                  <Input
                    id="url"
                    placeholder="E.g., https://github.com/your-username/project"
                    {...form.register("url")}
                    autoComplete="off"
                    disabled={isBusy}
                  />
                  {formErrors.url && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 font-medium"
                    >
                      {formErrors.url.message}
                    </motion.span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="E.g., A next.js portfolio that showcases the digital profile of Kiseka Pius..."
                    rows={5}
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
                {isBusy && !isLoadingProject ? (
                  <>
                    <span>{isEditMode ? "Updating..." : "Saving..."}</span>
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <span>{isEditMode ? "Update" : "Save"} Project</span>
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