export const dynamic = 'force-dynamic'
import SkillsTable from '@/components/backend/tables/skills/skills-table';
import { authOptions } from '@/config/authoptions';
import { getServerSession } from 'next-auth';

export default async function SkillsPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return null;
  }

  return (
    <div className="pt-6">
      <SkillsTable
        title="Skills"
        userId={userId}
      />
    </div>
  );
}