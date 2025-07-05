import ProjectsForm from '@/components/backend/forms/projects-form';
import { getPortfolio, getProjectAction } from '@/actions/actions';
import React from 'react';

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const {id} = await params
  const project = await getProjectAction(id)
  if (!project) {
    return null;
  }
  const portfolio = await getPortfolio();
  // console.log(profile, 'the guy...');
  if (!portfolio) {
    return null;
  }
  return (
    <>
      <ProjectsForm portfolio={portfolio[0]} project={project} />
    </>
  );
}
