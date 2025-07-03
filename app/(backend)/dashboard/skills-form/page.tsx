import { getPortfolio } from '@/actions/actions';
import SkillForm from '@/components/backend/forms/skills-form';
import React from 'react';

export default async function page() {
  const portfolio = await getPortfolio();
  // console.log(profile, 'the guy...');
  if (!portfolio) {
    return null;
  }
  return (
    <>
      <SkillForm portfolio={portfolio[0]} />
    </>
  );
}
