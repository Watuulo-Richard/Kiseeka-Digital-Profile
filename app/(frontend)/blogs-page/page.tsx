export const dynamic = 'force-dynamic';
import React from 'react'
import BlogComponent from '@/components/frontend/blog-component';
import { getUserBlogPosts, getUserBlogPostsCategories } from '@/actions/blog-posts-action';
export default async function page() {
  const userBlogPosts = await getUserBlogPosts();
  const userBlogPostsCategories = await getUserBlogPostsCategories()
  return (
    <>
      <BlogComponent userBlogPosts={userBlogPosts} userBlogPostsCategories={userBlogPostsCategories} />
    </>
  )
}
