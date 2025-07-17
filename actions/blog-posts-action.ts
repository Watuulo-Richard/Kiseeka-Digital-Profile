import { baseUrl, BlogPostCommentTypes } from "@/types/type";
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

const blogPostsAPIRoute = `${baseUrl}/api/v1/blogPostsAPI`
export async function getUserBlogPosts() {
    try {
        const response = await fetch(blogPostsAPIRoute, { next: { revalidate: REVALIDATE_TIME } })
        const userBlogPosts = await response.json()
        // console.log(userBlogPosts.data, 'Finally UserBlogPostsCategories Fetched Successfully...👍🏾');
        return userBlogPosts.data as BlogPostCommentTypes[]
    } catch (error) {
        console.log(error);
        return []
    }
}

export async function getUserBlogPostBySlugAction(slug: string) {
    const userBlogPostAPIRoute = `${baseUrl}/api/v1/blogPostsAPI/${slug}`
    try {
        const response = await fetch(userBlogPostAPIRoute, { next: { revalidate: REVALIDATE_TIME } })
        const userBlogPost = await response.json()
        // console.log(userBlogPost.data, 'Finally UserBlogPost Fetched Successfully...👍🏾');
        return userBlogPost.data as BlogPostCommentTypes
    } catch (error) {
        console.log(error);
        return null
    }
}