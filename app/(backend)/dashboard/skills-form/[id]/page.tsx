import SkillForm from '@/components/backend/forms/skills-form';
import { getPortfolio, getSkillAction } from '@/actions/actions';
import React from 'react';

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = await getSkillAction(id);
  if (!skill) {
    return null;
  }
  const portfolio = await getPortfolio();
  // console.log(profile, 'the guy...');
  if (!portfolio) {
    return null;
  }
  return (
    <>
      <SkillForm portfolio={portfolio[0]} skill={skill} />
    </>
  );
}
