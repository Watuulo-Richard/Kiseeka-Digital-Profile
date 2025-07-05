import WorkExperienceForm from '@/components/backend/forms/work-experience-form';
import { getPortfolio, getWorkExperienceAction } from '@/actions/actions';
import React from 'react';

export default async function page({params}:{params:Promise<{id:string}>}) {
  const {id} = await params
  const workExperience = await getWorkExperienceAction(id)
  // console.log(workExperience, 'Finally Work Experience Fetched Successfully...👍🏾');
  if(!workExperience) {
    return null;
  }
  const portfolio = await getPortfolio();
  // console.log(profile, 'the guy...');
  if(!portfolio) {
    return null;
  }
  return (
    <>
      <WorkExperienceForm portfolio={portfolio[0]} workExperience={workExperience}/>
    </>
  );
}
