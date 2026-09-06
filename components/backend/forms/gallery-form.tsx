"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Save, ImagePlus, Pencil } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  GalleryImageSchema,
  GalleryImageSchemaType,
} from "@/schema/gallery.schema";
import ImageInput from "../image-upload";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGalleryImages, useSingleGalleryImageQuery } from "@/hooks/use-gallery";

type GalleryFormProps = {
  portfolioId: string;
  galleryImageId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const EMPTY_DEFAULTS: GalleryImageSchemaType = {
  src: "",
  alt: "",
  portfolioId: "",
};

export default function GalleryForm({
  portfolioId,
  galleryImageId,
  open,
  onOpenChange,
}: GalleryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GalleryImageSchemaType>({
    resolver: zodResolver(GalleryImageSchema),
    defaultValues: EMPTY_DEFAULTS,
  });

  const { createGalleryImage, updateGalleryImage, isCreating, isUpdating } =
    useGalleryImages();
  const { galleryImage, isLoading: isLoadingGalleryImage } =
    useSingleGalleryImageQuery(galleryImageId, open);

  const [imageUrl, setImageUrl] = useState("");
  const lastPopulatedIdRef = React.useRef<string | null>(null);

  // Pre-populate form + preview when editing an existing image.
  useEffect(() => {
    if (galleryImageId && galleryImage && open) {
      if (lastPopulatedIdRef.current !== galleryImageId) {
        lastPopulatedIdRef.current = galleryImageId;
        reset({
          src: galleryImage.src,
          alt: galleryImage.alt,
          portfolioId: galleryImage.portfolioId,
        });
        setImageUrl(galleryImage.src);
      }
    } else if (!galleryImageId && open) {
      if (lastPopulatedIdRef.current !== null) {
        lastPopulatedIdRef.current = null;
        reset(EMPTY_DEFAULTS);
        setImageUrl("");
      }
    } else if (!open) {
      lastPopulatedIdRef.current = null;
    }
  }, [galleryImage, galleryImageId, open, reset]);

  const isEditMode = Boolean(galleryImageId);
  const isMutating = isCreating || isUpdating;
  const isBusy = isMutating || (isEditMode && isLoadingGalleryImage);

  async function handleOnSubmit(data: GalleryImageSchemaType) {
    if (!imageUrl) {
      toast.error("Please upload the image first");
      return;
    }

    const payload: GalleryImageSchemaType = {
      src: imageUrl,
      alt: data.alt,
      portfolioId,
    };

    if (galleryImageId) {
      updateGalleryImage(
        { id: galleryImageId, galleryImageDetails: payload },
        {
          onSuccess: (response) => {
            if (response.success) {
              toast.success(response.message || "Gallery Image Updated Successfully...✅");
              onOpenChange(false);
              reset(EMPTY_DEFAULTS);
              setImageUrl("");
            } else {
              toast.error(response.message || "Failed To Update Gallery Image...🥺");
            }
          },
          onError: (error) => {
            toast.error(
              error.message ||
                "❌ Error! Something went wrong while processing your request. ⚠️",
            );
            console.error(error);
          },
        },
      );
      return;
    }

    createGalleryImage(payload, {
      onSuccess: (response) => {
        if (response.success) {
          toast.success(response.message || "Gallery Image Has Been Added Successfully...✅");
          onOpenChange(false);
          reset(EMPTY_DEFAULTS);
          setImageUrl("");
        } else {
          toast.error(response.message || "Failed To Add Gallery Image...🥺");
        }
      },
      onError: (error) => {
        toast.error(
          error.message ||
            "❌ Error! Something went wrong while processing your request. ⚠️",
        );
        console.error(error);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          flex max-h-[90vh] w-[calc(100vw-1.25rem)] max-w-full flex-col
          gap-0 overflow-hidden rounded-2xl p-5 sm:max-w-[525px] sm:rounded-2xl sm:p-6
          border-gray-200 shadow-lg
          dark:border-[#1F1F23] dark:bg-[#0F0F12]
        "
      >
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="flex flex-col"
        >
          <DialogHeader className="gap-1 text-left">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F2B5A0]/15 text-[#f2957a]">
                {isEditMode ? (
                  <Pencil className="h-4 w-4" />
                ) : (
                  <ImagePlus className="h-4 w-4" />
                )}
              </span>
              <div className="min-w-0">
                <DialogTitle className="truncate text-lg text-gray-900 dark:text-white">
                  {isEditMode ? "Edit Gallery Image" : "Add A Gallery Image"}
                </DialogTitle>
                <DialogDescription className="truncate sm:whitespace-normal text-gray-500 dark:text-gray-400">
                  {isEditMode
                    ? "Update the image details below."
                    : "Upload one image at a time to your portfolio gallery."}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <ScrollArea className="h-[calc(90vh-11rem)] pr-2 sm:h-[calc(90vh-9rem)]">
            {isEditMode && isLoadingGalleryImage ? (
            <div className="flex flex-col gap-5 py-5">
              <div className="space-y-2">
                <div className="h-6 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-white/5" />
                <div className="h-60 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-white/5" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-white/5" />
                <div className="h-9 w-full animate-pulse rounded-md bg-gray-200 dark:bg-white/5" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5 py-5">
              {/* Image upload */}
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Image
                </Label>
                <ImageInput
                  title={isEditMode ? "Replace Image" : "Gallery Image"}
                  imageUrl={imageUrl || "/placeholder.svg"}
                  setImageUrl={setImageUrl}
                  endpoint="imageUploader"
                />
                {!imageUrl && (
                  <p className="text-xs text-destructive">
                    Please upload an image before saving.
                  </p>
                )}
              </div>

              {/* Alt text */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="alt"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Alt Text / Description
                </Label>
                <Input
                  id="alt"
                  placeholder="e.g., Audit team workshop at PKF Uganda..."
                  {...register("alt")}
                  autoComplete="off"
                  disabled={isBusy}
                />
                {errors.alt && (
                  <p className="text-sm text-destructive">{errors.alt.message}</p>
                )}
              </div>
            </div>
          )}
          </ScrollArea>

          <DialogFooter className="gap-2 sm:justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={isBusy}
                className="w-full rounded-lg border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 dark:border-[#1F1F23] dark:bg-transparent dark:text-gray-300 dark:hover:bg-white/5 sm:w-auto"
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={isBusy}
              className="w-full gap-2 rounded-lg bg-[#F2B5A0] px-6 text-white shadow hover:bg-rose-300 sm:w-auto"
            >
              {isBusy ? (
                <>
                  <span>{isEditMode ? "Updating..." : "Saving..."}</span>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  <span>{isEditMode ? "Update" : "Save"} Image</span>
                  <Save className="h-3.5 w-3.5" />
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}