export const dynamic = 'force-dynamic'
import { getUserBlogPosts } from '@/actions/blog-posts-action';
import BlogPostsTable from '@/components/backend/tables/blog-posts-table';
import React from 'react';

export default async function page() {
  const userBlogPosts = await getUserBlogPosts();

  return (
    <>
      <BlogPostsTable
        title="Blog-Posts"
        userBlogPosts={userBlogPosts}
      />
    </>
  );
}
