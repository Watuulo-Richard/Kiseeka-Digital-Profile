export const dynamic = 'force-dynamic'
import WorkExperienceForm from '@/components/backend/forms/work-experience-form';
import { getPortfolio } from '@/actions/actions';
import React from 'react';

export default async function page() {
  
  const portfolio = await getPortfolio();
  // console.log(profile, 'the guy...');
  if(!portfolio) {
    return null;
  }
  return (
    <>
      <WorkExperienceForm portfolio={portfolio[0]} workExperience={null} />
    </>
  );
}
