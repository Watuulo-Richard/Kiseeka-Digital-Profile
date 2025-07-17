import { baseUrl } from "@/types/type";
import { Comment } from "@prisma/client";

// Add revalidate time (in seconds) for ISR
const REVALIDATE_TIME = 60; // 1 minute

const blogPostCommentsAPIRoute = `${baseUrl}/api/v1/commentAPI`
export async function getUserBlogPostCommentsAction() {
    try {
        const response = await fetch(blogPostCommentsAPIRoute, { next: { revalidate: REVALIDATE_TIME } })
        const userBlogPostComment = await response.json()
        // console.log(userBlogPostComment.data, 'Finally User BlogPostComment Fetched Successfully...👍🏾');
        return userBlogPostComment.data as Comment[]
    } catch (error) {
        console.log(error);
        return []
    }
}