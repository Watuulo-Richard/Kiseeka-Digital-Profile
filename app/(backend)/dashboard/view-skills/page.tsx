import { getSkillsAction, getTestimonialAction, getWorkExperiences } from '@/actions/actions';
import SkillsTable from '@/components/backend/tables/skills-table';
import TestimonialsTable from '@/components/backend/tables/testimonial-table';
import WorkExperienceTable from '@/components/backend/tables/work-experience-table';
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
