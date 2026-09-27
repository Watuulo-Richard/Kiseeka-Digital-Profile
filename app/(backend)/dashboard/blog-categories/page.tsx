export const dynamic = 'force-dynamic'
import BlogPostCategoriesFullTable from '@/components/backend/tables/blog-categories/blog-category-table';
import { authOptions } from '@/config/authoptions';
import { getServerSession } from 'next-auth';

export default async function BlogCategoriesPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return null;
  }

  return (
    <div className="pt-6">
      <BlogPostCategoriesFullTable
        title="Blog Categories"
        userId={userId}
      />
    </div>
  );
}