export const dynamic = 'force-dynamic'
import WorkExperienceTable from '@/components/backend/tables/work-experience/work-experience-table';
import { authOptions } from '@/config/authoptions';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function page() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return null;
  }

  return (
    <div className="pt-6">
      <WorkExperienceTable
        title="Work Experiences"
        userId={userId}
      />
    </div>
  );
}