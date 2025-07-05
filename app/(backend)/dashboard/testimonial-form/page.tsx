export const dynamic = 'force-dynamic'
import { getPortfolio } from '@/actions/actions';
import React from 'react';
import TestimonialForm from '@/components/backend/forms/testimonial-form';

export default async function page() {
  const portfolio = await getPortfolio();
  // console.log(profile, 'the guy...');
  if(!portfolio) {
    return null;
  }
  return (
    <>
      <TestimonialForm portfolio={portfolio[0]} testimonial={null} />
    </>
  );
}
