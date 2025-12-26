export const dynamic = "force-dynamic";

import { getUserBlogPostBySlugAction } from "@/actions/blog-posts-action";
import BlogPostDetail from "@/components/frontend/blog/blog-detail/blog-detail";
import { SiteNav } from "@/components/frontend/blog/site-nav";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogFromAPI = await getUserBlogPostBySlugAction(slug);
  return (
    <>
      <div className="">
        <SiteNav />
        <BlogPostDetail blog={blogFromAPI} />
      </div>
    </>
  );
}
