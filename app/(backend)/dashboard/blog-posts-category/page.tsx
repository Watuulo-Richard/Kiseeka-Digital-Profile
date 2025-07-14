export const dynamic = 'force-dynamic'
import { getPortfolio } from '@/actions/actions';
import BlogPostsCategoryForm from '@/components/backend/forms/blog-posts-category-form';
import React from 'react'

export default async function page() {
  const portfolio = await getPortfolio();
    // console.log(profile, 'the guy...');
    if(!portfolio) {
      return null;
    }
  return (
    <>
      <BlogPostsCategoryForm portfolio={portfolio[0]} />
    </>
  )
}
