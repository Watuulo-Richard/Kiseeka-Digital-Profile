import { getWorkExperiences } from '@/actions/actions';
import WorkExperienceTable from '@/components/backend/tables/work-experience-table';
import React from 'react';

export default async function page() {
  const workExperiences = await getWorkExperiences();

  return (
    <>
      <WorkExperienceTable
        title="Work Experiences"
        workExperiences={workExperiences}
      />
    </>
  );
}
