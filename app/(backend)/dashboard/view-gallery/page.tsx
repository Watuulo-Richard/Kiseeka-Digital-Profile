export const dynamic = 'force-dynamic'
import GalleryImagesTable from '@/components/backend/tables/gallery-image-table';
import { authOptions } from '@/config/authoptions';
import { getServerSession } from 'next-auth';

export default async function GalleryPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return null;
  }

  return (
    <div className="pt-6">
      <GalleryImagesTable
        title="Gallery Images"
        userId={userId}
      />
    </div>
  );
}