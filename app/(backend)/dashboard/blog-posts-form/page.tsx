export const dynamic = 'force-dynamic'
import { getPortfolio } from '@/actions/actions';
import { getUserBlogPostsCategories } from '@/actions/blog-posts-action';
import BlogPostsForm from '@/components/backend/forms/blog-posts-form';
import React from 'react'

export default async function page() {
  const portfolio = await getPortfolio();
    // console.log(profile, 'the guy...');
    if(!portfolio) {
      return null;
    }
    const userBlogPostsCategories = await getUserBlogPostsCategories()
  return (
    <>
      <BlogPostsForm portfolio={portfolio[0]} userBlogPostsCategories={userBlogPostsCategories} userBlogPost={null}/>
    </>
  )
}
