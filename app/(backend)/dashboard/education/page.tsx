export const dynamic = 'force-dynamic'
import EducationTable from '@/components/backend/tables/education/education-table';
import { authOptions } from '@/config/authoptions';
import { getServerSession } from 'next-auth';

export default async function EducationPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return null;
  }

  return (
    <div className="pt-6">
      <EducationTable
        title="Education"
        userId={userId}
      />
    </div>
  );
}