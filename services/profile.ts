import {
  createProfileAction,
  deleteProfileAction,
  getProfilesAction,
  profileAction,
  updateProfileAction,
} from "@/actions/profile";
import { ProfileFormTypes } from "@/schema/schema";
import {
  CreateProfileResponse,
  DeleteProfileResponse,
  GetAllProfilesResponse,
  GetSingleProfileResponse,
  UpdateProfileResponse,
  UpdateProfileType,
} from "@/types/profile";

type UseProfileState = {
  handleCreateProfileService: (profileDetails: ProfileFormTypes) => Promise<CreateProfileResponse>;
  handleListProfilesService: () => Promise<GetAllProfilesResponse>;
  handleGetProfileService: (id: string) => Promise<GetSingleProfileResponse>;
  handleDeleteProfileService: (id: string) => Promise<DeleteProfileResponse>;
  handleUpdateProfileService: (
    id: string,
    profileDetails: UpdateProfileType,
  ) => Promise<UpdateProfileResponse>;
};

export const handleProfile: UseProfileState = {
  async handleCreateProfileService(profileDetails: ProfileFormTypes) {
    try {
      const profile = await createProfileAction(profileDetails);
      return {
        success: profile.success,
        id:      profile.id,
        message: profile.message,
        error:   profile.error,
        status:  profile.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        id:      "",
        message: `Failed To Save Profile: ${errorMessage}`,
        error:   `Failed To Save Profile: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleListProfilesService() {
    try {
      const profiles = await getProfilesAction();
      return {
        success: profiles.success,
        data:    profiles.data,
        message: profiles.message,
        error:   profiles.error,
        status:  profiles.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        data:    [],
        message: `Failed To Fetch Profiles: ${errorMessage}`,
        error:   `Failed To Fetch Profiles: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleGetProfileService(id: string) {
    try {
      const profile = await profileAction(id);
      return {
        success: profile.success,
        data:    profile.data,
        message: profile.message,
        error:   profile.error,
        status:  profile.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        data:    null,
        message: `Failed To Fetch Profile: ${errorMessage}`,
        error:   `Failed To Fetch Profile: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleDeleteProfileService(id: string) {
    try {
      const profile = await deleteProfileAction(id);
      return {
        success: profile.success,
        message: profile.message,
        error:   profile.error,
        status:  profile.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        message: `Failed To Delete Profile: ${errorMessage}`,
        error:   `Failed To Delete Profile: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleUpdateProfileService(id: string, profileDetails: UpdateProfileType) {
    try {
      const profile = await updateProfileAction(id, profileDetails);
      return {
        success: profile.success,
        id:      profile.id,
        message: profile.message,
        error:   profile.error,
        status:  profile.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        id:      "",
        message: `Failed To Update Profile: ${errorMessage}`,
        error:   `Failed To Update Profile: ${errorMessage}`,
        status:  500,
      };
    }
  },
};