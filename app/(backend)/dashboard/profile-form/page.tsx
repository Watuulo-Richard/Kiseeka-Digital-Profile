export const dynamic = 'force-dynamic'
import ProfileForm from '@/components/backend/forms/profile-form';
import { authOptions } from '@/config/authoptions';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function page() {
  const session = await getServerSession(authOptions)
  // console.log(session?.user.id, 'Session Exists');
  const userId = session?.user.id

  if(!userId) {
    return null
  }
  return (
    <>
      <ProfileForm userId={userId} userPortfolio={null}/>
    </>
  );
}
