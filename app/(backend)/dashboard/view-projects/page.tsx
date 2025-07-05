export const dynamic = 'force-dynamic'
import { getProjectsAction } from '@/actions/actions';
import ProjectsTable from '@/components/backend/tables/projects-table';
import React from 'react';

export default async function page() {
  const projects = await getProjectsAction();

  return (
    <>
      <ProjectsTable
        title="Projects"
        projects={projects}
      />
    </>
  );
}
