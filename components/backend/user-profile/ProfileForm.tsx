"use client";

import { ProfileFormTypes, profileSchema } from "@/schema/schema";
import { Loader2, Send, UserRound } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useProfile, useSingleProfileQuery } from "@/hooks/use-profile";
import { UpdateProfileType } from "@/types/profile";
import ImageInput from "@/components/backend/image-upload";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProfileFormProps {
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EMPTY_DEFAULTS: ProfileFormTypes = {
  title: "",
  bio: "",
  profileImage: "",
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <motion.span
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-xs font-medium text-red-500"
    >
      {message}
    </motion.span>
  );
}

export function ProfileForm({ userId, open, onOpenChange }: ProfileFormProps) {
  const form = useForm<ProfileFormTypes>({
    resolver: zodResolver(profileSchema),
    defaultValues: EMPTY_DEFAULTS,
  });

  const formErrors = form.formState.errors;

  const { updateProfile, isUpdatingProfile } = useProfile();
  const { profile, isLoading: isLoadingProfile } =
    useSingleProfileQuery(userId, open);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const lastPopulatedId = useRef<string | null>(null);

  // Populate the form once per dialog open, keyed on profile.id.
  React.useEffect(() => {
    if (profile && open) {
      if (lastPopulatedId.current !== profile.id) {
        lastPopulatedId.current = profile.id;
        const nextImage = profile.profileImage || "/placeholder.svg";
        setImageUrl(nextImage);
        form.reset({
          title: profile.title ?? "",
          bio: profile.bio ?? "",
          profileImage: nextImage,
        });
      }
    } else if (!open) {
      lastPopulatedId.current = null;
    }
  }, [profile, open, form]);

  async function handleSubmit(data: ProfileFormTypes) {
    setIsSubmitting(true);

    const updatePayload: UpdateProfileType = {
      title: data.title,
      bio: data.bio,
      profileImage: imageUrl,
    };

    updateProfile(
      { id: userId, profileDetails: updatePayload },
      {
        onSuccess: (response) => {
          setIsSubmitting(false);
          if (response.error) {
            toast.error(response.error ?? "Failed To Update Profile");
            return;
          }
          toast.success("Profile Updated Successfully...✅");
          onOpenChange(false);
        },
        onError: (error) => {
          setIsSubmitting(false);
          toast.error("Failed To Update Profile");
          console.error("Update error:", error);
        },
      },
    );
  }

  const isBusy = isSubmitting || isUpdatingProfile;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85dvh] w-full flex-col gap-0 overflow-hidden p-0 sm:max-w-[540px] md:max-w-[620px]">
        {isLoadingProfile ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <DialogHeader className="shrink-0 px-6 pt-6 pb-4">
              <DialogTitle>
                <span className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UserRound className="h-4.5 w-4.5" />
                  </span>
                  Edit Personal Information
                </span>
              </DialogTitle>
              <DialogDescription>
                Update your profile details to keep your portfolio up-to-date.
              </DialogDescription>
            </DialogHeader>

            <Separator />

            <ScrollArea className="min-h-0 flex-1">
              <div className="space-y-5 px-6 py-4 pb-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="title">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="title"
                      placeholder="E.g., Kiseka Pius"
                      {...form.register("title")}
                      autoComplete="off"
                      disabled={isBusy}
                    />
                    <FieldError message={formErrors.title?.message} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile?.email ?? ""}
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">
                      Contact a Super Admin to change your email.
                    </p>
                  </div>
                </div>

                <div className="grid gap-2">
                  <ImageInput
                    title="Profile Photo"
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    endpoint="imageUploader"
                    compact
                  />
                  <FieldError message={formErrors.profileImage?.message} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="bio">
                    Professional Profile <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Summarize your career journey, unique value, and accomplishments that define who you are..."
                    rows={4}
                    className="resize-none"
                    {...form.register("bio")}
                    disabled={isBusy}
                  />
                  <FieldError message={formErrors.bio?.message} />
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
                className="h-10 gap-2 rounded-lg px-6 group"
              >
                {isBusy ? (
                  <>
                    <span>Updating...</span>
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <span>Save Changes</span>
                    <Send className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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