export const dynamic = 'force-dynamic'
import TestimonialsFullTable from '@/components/backend/tables/testimonial/testimonial-table';
import { authOptions } from '@/config/authoptions';
import { getServerSession } from 'next-auth';

export default async function TestimonialPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return null;
  }

  return (
    <div className="pt-6">
      <TestimonialsFullTable
        title="Testimonials"
        userId={userId}
      />
    </div>
  );
}