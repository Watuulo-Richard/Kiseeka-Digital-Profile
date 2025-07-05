import EducationForm from '@/components/backend/forms/education-form'
import { getEducationAction, getPortfolio } from '@/actions/actions';
import React from 'react'

export default async function page() {
  const portfolio = await getPortfolio();
    // console.log(profile, 'the guy...');
    if(!portfolio) {
      return null;
    }
  return (
    <>
      <EducationForm portfolio={portfolio[0]} educationBackground={null} />
    </>
  )
}
