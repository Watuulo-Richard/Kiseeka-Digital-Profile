export const dynamic = 'force-dynamic'
import React from 'react'
import { getPortfolio } from '@/actions/actions';
import { getUserBlogPostBySlugAction, getUserBlogPostsCategories, getUserBlogPostsCategoryBySlug } from '@/actions/blog-posts-action';
import BlogPostsCategoryForm from '@/components/backend/forms/blog-posts-category-form';
import BlogPostsForm from '@/components/backend/forms/blog-posts-form';

export default async function page({params}:{params:Promise<{slug: string}>}) {
  const portfolio = await getPortfolio();
    // console.log(profile);
    if(!portfolio) {
        return null;
    }
    const {slug} = await params
    const userBlogPost = await getUserBlogPostBySlugAction(slug);
    console.log(userBlogPost);
    if(!userBlogPost) {
        return null;
    }
    const userBlogPostsCategories = await getUserBlogPostsCategories()
  return (
    <>
      <BlogPostsForm portfolio={portfolio[0]} userBlogPostsCategories={userBlogPostsCategories} userBlogPost={userBlogPost} />
    </>
  )
}
