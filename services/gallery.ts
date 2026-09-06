import {
  createGalleryImageAction,
  deleteGalleryImageAction,
  getGalleryImagesAction,
  galleryImageAction,
  updateGalleryImageAction,
} from "@/actions/gallery";
import { GalleryImageSchemaType } from "@/schema/gallery.schema";
import {
  CreateGalleryImageResponse,
  DeleteGalleryImageResponse,
  GetAllGalleryImagesResponse,
  GetSingleGalleryImageResponse,
  UpdateGalleryImageResponse,
  UpdateGalleryImageType,
} from "@/types/gallery";

type UseGalleryImagesState = {
  handleCreateGalleryImageService: (galleryImageDetails: GalleryImageSchemaType) => Promise<CreateGalleryImageResponse>;
  handleListGalleryImagesService: () => Promise<GetAllGalleryImagesResponse>;
  handleGetGalleryImageService: (id: string) => Promise<GetSingleGalleryImageResponse>;
  handleDeleteGalleryImageService: (id: string) => Promise<DeleteGalleryImageResponse>;
  handleUpdateGalleryImageService: (
    id: string,
    galleryImageDetails: UpdateGalleryImageType,
  ) => Promise<UpdateGalleryImageResponse>;
};

export const handleGallery: UseGalleryImagesState = {
  async handleCreateGalleryImageService(galleryImageDetails: GalleryImageSchemaType) {
    try {
      const galleryImage = await createGalleryImageAction(galleryImageDetails);
      return {
        success: galleryImage.success,
        id:      galleryImage.id,
        message: galleryImage.message,
        error:   galleryImage.error,
        status:  galleryImage.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        id:      "",
        message: `Failed To Add Gallery Image: ${errorMessage}`,
        error:   `Failed To Add Gallery Image: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleListGalleryImagesService() {
    try {
      const galleryImages = await getGalleryImagesAction();
      return {
        success: galleryImages.success,
        data:    galleryImages.data,
        message: galleryImages.message,
        error:   galleryImages.error,
        status:  galleryImages.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        data:    [],
        message: `Failed To Fetch Gallery Images: ${errorMessage}`,
        error:   `Failed To Fetch Gallery Images: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleGetGalleryImageService(id: string) {
    try {
      const galleryImage = await galleryImageAction(id);
      return {
        success: galleryImage.success,
        data:    galleryImage.data,
        message: galleryImage.message,
        error:   galleryImage.error,
        status:  galleryImage.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        data:    null,
        message: `Failed To Fetch Gallery Image: ${errorMessage}`,
        error:   `Failed To Fetch Gallery Image: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleDeleteGalleryImageService(id: string) {
    try {
      const galleryImage = await deleteGalleryImageAction(id);
      return {
        success: galleryImage.success,
        message: galleryImage.message,
        error:   galleryImage.error,
        status:  galleryImage.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        message: `Failed To Delete Gallery Image: ${errorMessage}`,
        error:   `Failed To Delete Gallery Image: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleUpdateGalleryImageService(id: string, galleryImageDetails: UpdateGalleryImageType) {
    try {
      const galleryImage = await updateGalleryImageAction(id, galleryImageDetails);
      return {
        success: galleryImage.success,
        id:      galleryImage.id,
        message: galleryImage.message,
        error:   galleryImage.error,
        status:  galleryImage.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        id:      "",
        message: `Failed To Update Gallery Image: ${errorMessage}`,
        error:   `Failed To Update Gallery Image: ${errorMessage}`,
        status:  500,
      };
    }
  },
};