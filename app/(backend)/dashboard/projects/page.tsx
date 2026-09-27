export const dynamic = 'force-dynamic'
import ProjectsTable from '@/components/backend/tables/projects/projects-table';
import { authOptions } from '@/config/authoptions';
import { getServerSession } from 'next-auth';

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return null;
  }

  return (
    <div className="pt-6">
      <ProjectsTable
        title="Projects"
        userId={userId}
      />
    </div>
  );
}