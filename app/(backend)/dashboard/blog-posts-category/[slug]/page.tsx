export const dynamic = 'force-dynamic'
import React from 'react'
import { getPortfolio } from '@/actions/actions';
import { getUserBlogPostsCategoryBySlug } from '@/actions/blog-posts-action';
import BlogPostsCategoryForm from '@/components/backend/forms/blog-posts-category-form';

export default async function page({params}:{params:Promise<{slug: string}>}) {
  const portfolio = await getPortfolio();
    // console.log(profile);
    if(!portfolio) {
        return null;
    }
    const {slug} = await params
    const userBlogPostsCategory = await getUserBlogPostsCategoryBySlug(slug);
    console.log(userBlogPostsCategory);
    if(!userBlogPostsCategory) {
        return null;
    }
  return (
    <>
      <BlogPostsCategoryForm portfolio={portfolio[0]} userBlogPostsCategory={userBlogPostsCategory}/>
    </>
  )
}
