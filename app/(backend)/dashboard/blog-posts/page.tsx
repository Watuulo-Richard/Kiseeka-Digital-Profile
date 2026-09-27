export const dynamic = 'force-dynamic'
import BlogPostsFullTable from '@/components/backend/tables/blog-posts/blog-post-table';
import { authOptions } from '@/config/authoptions';
import { getServerSession } from 'next-auth';

export default async function BlogPostsPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return null;
  }

  return (
    <div className="pt-6">
      <BlogPostsFullTable
        title="Blog Posts"
        userId={userId}
      />
    </div>
  );
}