import EducationBackgroundTable from '@/components/backend/tables/education-background-table';
import { getEducationBackgroundAction } from '@/actions/actions';
import React from 'react';

export default async function page() {
  const educationBackgrounds = await getEducationBackgroundAction();
  return (
    <>
      <EducationBackgroundTable
        title="Education Backgrounds"
        educationBackgrounds={educationBackgrounds}
      />
    </>
  );
}
