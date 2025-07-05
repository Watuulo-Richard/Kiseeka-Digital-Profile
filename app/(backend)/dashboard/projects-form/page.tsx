export const dynamic = 'force-dynamic'
import ProjectsForm from '@/components/backend/forms/projects-form';
import { getPortfolio } from '@/actions/actions';
import React from 'react';

export default async function page() {
  
  const portfolio = await getPortfolio();
  // console.log(profile, 'the guy...');
  if (!portfolio) {
    return null;
  }
  return (
    <>
      <ProjectsForm portfolio={portfolio[0]} project={null} />
    </>
  );
}
