import { z } from "zod";

/* Gallery Image — one image added at a time by the portfolio owner */
export const GalleryImageSchema = z.object({
  src: z.string().optional(),
  alt: z.string().min(1, "A short description of the image is required").max(150, "Alt text must be less than 150 characters"),
  portfolioId: z.string().optional(),
});

export type GalleryImageSchemaType = z.infer<typeof GalleryImageSchema>;
export type GalleryImageFormTypes = GalleryImageSchemaType;