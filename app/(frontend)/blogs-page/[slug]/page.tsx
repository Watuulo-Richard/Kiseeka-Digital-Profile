export const dynamic = "force-dynamic";

import BlogPostDetailPage from "@/components/frontend/blog/blog-detail/blog-post-page";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogPostDetailPage slug={slug} />;
}