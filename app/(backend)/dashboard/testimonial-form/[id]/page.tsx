export const dynamic = 'force-dynamic'
import TestimonialForm from '@/components/backend/forms/testimonial-form';
import { getPortfolio, getTestimonialAction } from '@/actions/actions';
import React from 'react';

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await getTestimonialAction(id);
  const portfolio = await getPortfolio();
  // console.log(profile, 'the guy...');
  if (!portfolio) {
    return null;
  }
  return (
    <>
      <TestimonialForm portfolio={portfolio[0]} testimonial={testimonial} />
    </>
  );
}
