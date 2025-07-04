import { getTestimonialAction, getWorkExperiences } from '@/actions/actions';
import TestimonialsTable from '@/components/backend/tables/testimonial-table';
import WorkExperienceTable from '@/components/backend/tables/work-experience-table';
import React from 'react';

export default async function page() {
  const testimonials = await getTestimonialAction();

  return (
    <>
      <TestimonialsTable
        title="Testimonials"
        testimonials={testimonials}
      />
    </>
  );
}
