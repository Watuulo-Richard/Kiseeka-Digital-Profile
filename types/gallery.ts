/* Base Gallery Image Type */
export type GalleryImageBaseType = {
  id:          string;
  src:         string;
  alt:         string;
  portfolioId: string;
  createdAt:   Date;
  updatedAt:   Date;
};

export type CreateGalleryImageType = Omit<
  GalleryImageBaseType,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateGalleryImageType = Partial<
  Omit<GalleryImageBaseType, "id" | "portfolioId" | "createdAt" | "updatedAt">
>;

/* Query Response: Get All Gallery Images */
export type GetAllGalleryImagesResponse = {
  success: boolean;
  data:    GalleryImageBaseType[];
  message: string;
  error:   string | null;
  status:  number;
};

/* Query Response: Get Single Gallery Image */
export type GetSingleGalleryImageResponse = {
  success: boolean;
  data:    GalleryImageBaseType | null;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Create Gallery Image */
export type CreateGalleryImageResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Update Gallery Image */
export type UpdateGalleryImageResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Delete Gallery Image */
export type DeleteGalleryImageResponse = {
  success: boolean;
  message: string;
  error:   string | null;
  status:  number;
};