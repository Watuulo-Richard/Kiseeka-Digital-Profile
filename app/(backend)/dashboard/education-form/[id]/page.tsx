import EducationForm from '@/components/backend/forms/education-form';
import { getEducationAction, getPortfolio } from '@/actions/actions';
import React from 'react';

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const educationBackground = await getEducationAction(id);
  if (!educationBackground) {
    return null;
  }
  const portfolio = await getPortfolio();
  // console.log(profile, 'the guy...');
  if (!portfolio) {
    return null;
  }
  return (
    <>
      <EducationForm
        portfolio={portfolio[0]}
        educationBackground={educationBackground}
      />
    </>
  );
}
