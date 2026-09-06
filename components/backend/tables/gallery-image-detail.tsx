"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Copy, ExternalLink, Loader2, Link2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSingleGalleryImageQuery } from "@/hooks/use-gallery";

type Props = {
  galleryImageId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-gray-100 py-2.5 last:border-none dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
        {label}
      </span>
      <span className="text-sm break-all text-gray-700 dark:text-gray-300">
        {value ?? "—"}
      </span>
    </div>
  );
}

export default function GalleryImageDetailDialog({
  galleryImageId,
  open,
  onOpenChange,
}: Props) {
  const { galleryImage, isLoading } = useSingleGalleryImageQuery(
    galleryImageId,
    open,
  );
  const [isCopying, setIsCopying] = useState(false);

  async function handleCopyUrl() {
    if (!galleryImage) return;
    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(galleryImage.src);
      toast.success("Image URL copied", {
        description: "The image link is now on your clipboard.",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy image URL");
    } finally {
      setIsCopying(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden rounded-2xl border-gray-200 bg-white p-5 shadow-lg sm:max-w-lg sm:rounded-2xl sm:p-6 dark:border-[#1F1F23] dark:bg-[#0F0F12]">
        <DialogHeader className="gap-1 text-left">
          <DialogTitle>
            {isLoading
              ? "Loading Gallery Image..."
              : galleryImage
                ? galleryImage.alt || "Gallery Image"
                : "Gallery Image Not Found"}
          </DialogTitle>
          <DialogDescription>
            Full details for this gallery image.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-6.5rem)] pr-2">
          {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          </div>
        ) : !galleryImage ? (
          <p className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
            This gallery image could not be found.
          </p>
        ) : (
          <div className="space-y-5">
            {/* Image preview */}
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={galleryImage.src}
                alt={galleryImage.alt}
                className="h-64 w-full object-cover"
              />
            </div>

            {/* Core details */}
            <div>
              <DetailRow label="Alt Text" value={galleryImage.alt} />
              <DetailRow label="Image ID" value={galleryImage.id} />
              <DetailRow label="Portfolio ID" value={galleryImage.portfolioId} />
              <DetailRow
                label="Created On"
                value={format(new Date(galleryImage.createdAt), "MMM dd, yyyy")}
              />
              <DetailRow
                label="Last Updated"
                value={format(new Date(galleryImage.updatedAt), "MMM dd, yyyy")}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                className="w-full justify-between rounded-lg bg-[#F2B5A0] px-3 py-2.5 text-white shadow hover:bg-rose-300"
                onClick={handleCopyUrl}
                disabled={isCopying}
              >
                <span className="flex items-center gap-2">
                  {isCopying ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Link2 className="h-4 w-4" />
                  )}
                  Copy Image URL
                </span>
                <Copy className="h-3.5 w-3.5" />
              </Button>

              <a
                href={galleryImage.src}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 transition-colors hover:border-[#F2B5A0] hover:bg-[#F2B5A0]/10 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-white/5"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                  Open Image
                </span>
                <span className="text-[#f2957a]">View →</span>
              </a>
            </div>
          </div>
        )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}