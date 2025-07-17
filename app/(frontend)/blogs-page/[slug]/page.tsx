export const dynamic = 'force-dynamic';
import React from 'react'
import { getProfile } from '@/actions/profile-action';
import BlogPostDetail from '@/components/frontend/blog-detail'
import { getUserBlogPostBySlugAction } from '@/actions/blog-posts-action';

export default async function page({params}:{params:Promise<{slug:string}>}) {
  const { slug } = await params
  const userBlogPost = await getUserBlogPostBySlugAction(slug)
  const fetchedProfile = await getProfile()
  // console.log(fetchedProfile, '................')
  if(!fetchedProfile) {
    return
  }
  if(!userBlogPost) {
    return (
      <div className='flex justify-center items-center'>
        <h1>No Data Found...</h1>
      </div>
    )
  }
  return (
    <>
      <BlogPostDetail userBlogPost={userBlogPost} fetchedProfile={fetchedProfile[0]} />
    </>
  )
}
