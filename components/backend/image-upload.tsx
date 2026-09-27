import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import { ImagePlus } from "lucide-react";
import React from "react";
type ImageInputProps = {
  title: string;
  imageUrl: string;
  setImageUrl: any;
  endpoint: any;
  compact?: boolean;
};
export default function ImageInput({
  title,
  imageUrl,
  setImageUrl,
  endpoint,
  compact = false,
}: ImageInputProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className={compact ? "pb-2" : undefined}>
        <CardTitle className={compact ? "text-sm" : undefined}>{title}</CardTitle>
      </CardHeader>
      <CardContent className={compact ? "py-3" : undefined}>
        <div
          className={
            compact
              ? "flex flex-col items-center gap-4 sm:flex-row"
              : "grid gap-2"
          }
        >
          {imageUrl ? (
            <Image
              alt={title}
              className={
                compact
                  ? "h-28 w-28 shrink-0 rounded-full object-cover object-center"
                  : "h-60 w-full rounded-sm object-cover object-center"
              }
              height={compact ? "112" : "300"}
              src={imageUrl}
              width={compact ? "112" : "300"}
            />
          ) : (
            <div
              className={
                compact
                  ? "flex h-28 w-28 shrink-0 flex-col items-center justify-center gap-1 rounded-full border border-dashed border-border bg-muted text-muted-foreground"
                  : "flex h-60 w-full flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-border bg-muted text-muted-foreground"
              }
            >
              <ImagePlus
                className={
                  compact
                    ? "h-8 w-8"
                    : "h-10 w-10"
                }
              />
              <span className="text-xs">No image uploaded</span>
            </div>
          )}
          <UploadButton
            className="ut-button:w-full ut-button:bg-[#F2B5A0] ut-button:ut-readying:bg-rose-300"
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              setImageUrl(res[0].url);
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
 