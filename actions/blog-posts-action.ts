import { baseUrl } from "@/types/type";
import { BlogPostCategory } from "@prisma/client";

// Add revalidate time (in seconds) for ISR
const REVALIDATE_TIME = 60; // 1 minute

const blogPostCategoriesAPIRoute = `${baseUrl}/api/v1/blogPostsCategoryAPI`
export async function getUserBlogPostsCategories() {
    try {
        const response = await fetch(blogPostCategoriesAPIRoute, { next: { revalidate: REVALIDATE_TIME } })
        const userBlogPostsCategories = await response.json()
        // console.log(userBlogPostsCategories.data, 'Finally UserBlogPostsCategories Fetched Successfully...👍🏾');
        return userBlogPostsCategories.data as BlogPostCategory[]
    } catch (error) {
        console.log(error);
        return []
    }
}