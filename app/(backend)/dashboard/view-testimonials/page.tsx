export const dynamic = 'force-dynamic'
import TestimonialsTable from '@/components/backend/tables/testimonial-table';
import { getTestimonialsAction } from '@/actions/actions';
import React from 'react';

export default async function page() {
  const testimonials = await getTestimonialsAction();

  return (
    <>
      <TestimonialsTable
        title="Testimonials"
        testimonials={testimonials}
      />
    </>
  );
}
