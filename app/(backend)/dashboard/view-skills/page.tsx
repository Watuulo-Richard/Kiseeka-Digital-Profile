export const dynamic = 'force-dynamic'
import { getSkillsAction } from '@/actions/actions';
import SkillsTable from '@/components/backend/tables/skills-table';
import React from 'react';

export default async function page() {
  const skills = await getSkillsAction();

  return (
    <>
      <SkillsTable
        title="Skills"
        skills={skills}
      />
    </>
  );
}
