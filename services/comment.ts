import {
  commentAction,
  createCommentAction,
  deleteCommentAction,
  getCommentsAction,
  updateCommentAction,
} from "@/actions/comment";
import { CommentFormTypes } from "@/schema/schema";
import {
  CreateCommentResponse,
  DeleteCommentResponse,
  GetAllCommentsResponse,
  GetSingleCommentResponse,
  UpdateCommentResponse,
  UpdateCommentType,
} from "@/types/comment";

type UseCommentsState = {
  handleCreateCommentService: (commentDetails: CommentFormTypes) => Promise<CreateCommentResponse>;
  handleListCommentsService: () => Promise<GetAllCommentsResponse>;
  handleGetCommentService: (id: string) => Promise<GetSingleCommentResponse>;
  handleDeleteCommentService: (id: string) => Promise<DeleteCommentResponse>;
  handleUpdateCommentService: (
    id: string,
    commentDetails: UpdateCommentType,
  ) => Promise<UpdateCommentResponse>;
};

export const handleComments: UseCommentsState = {
  async handleCreateCommentService(commentDetails: CommentFormTypes) {
    try {
      const comment = await createCommentAction(commentDetails);
      return {
        success: comment.success,
        id:      comment.id,
        message: comment.message,
        error:   comment.error,
        status:  comment.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        id:      "",
        message: `Failed To Add Comment: ${errorMessage}`,
        error:   `Failed To Add Comment: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleListCommentsService() {
    try {
      const comments = await getCommentsAction();
      return {
        success: comments.success,
        data:    comments.data,
        message: comments.message,
        error:   comments.error,
        status:  comments.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        data:    [],
        message: `Failed To Fetch Comments: ${errorMessage}`,
        error:   `Failed To Fetch Comments: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleGetCommentService(id: string) {
    try {
      const comment = await commentAction(id);
      return {
        success: comment.success,
        data:    comment.data,
        message: comment.message,
        error:   comment.error,
        status:  comment.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        data:    null,
        message: `Failed To Fetch Comment: ${errorMessage}`,
        error:   `Failed To Fetch Comment: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleDeleteCommentService(id: string) {
    try {
      const comment = await deleteCommentAction(id);
      return {
        success: comment.success,
        message: comment.message,
        error:   comment.error,
        status:  comment.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        message: `Failed To Delete Comment: ${errorMessage}`,
        error:   `Failed To Delete Comment: ${errorMessage}`,
        status:  500,
      };
    }
  },

  async handleUpdateCommentService(id: string, commentDetails: UpdateCommentType) {
    try {
      const comment = await updateCommentAction(id, commentDetails);
      return {
        success: comment.success,
        id:      comment.id,
        message: comment.message,
        error:   comment.error,
        status:  comment.status,
      };
    } catch (error) {
      console.error("Database error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        id:      "",
        message: `Failed To Update Comment: ${errorMessage}`,
        error:   `Failed To Update Comment: ${errorMessage}`,
        status:  500,
      };
    }
  },
};