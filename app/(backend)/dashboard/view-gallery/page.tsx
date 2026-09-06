export const dynamic = 'force-dynamic'
import GalleryImagesTable from '@/components/backend/tables/gallery-image-table';
import { getPortfolio } from '@/actions/actions';

export default async function GalleryPage() {
  const portfolio = await getPortfolio();

  return (
    <div className="pt-6">
      <GalleryImagesTable
        title="Gallery Images"
        portfolioId={portfolio[0]?.id ?? ''}
      />
    </div>
  );
}