export const dynamic = 'force-dynamic';
import React from 'react';
import { getUserBlogPostsCategories } from '@/actions/blog-posts-action';
import BlogPostsCategoriesTable from '@/components/backend/tables/blog-posts-categories-table';

export default async function page() {
  const userBlogPostsCategories = await getUserBlogPostsCategories();

  return (
    <>
      <BlogPostsCategoriesTable
        title="Blog-Posts Categories"
        userBlogPostsCategories={userBlogPostsCategories}
      />
    </>
  );
}
