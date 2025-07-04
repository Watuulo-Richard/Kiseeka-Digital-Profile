import { getUserPortfolio } from '@/actions/actions';
import ProfileForm from '@/components/backend/forms/profile-form';
import { authOptions } from '@/config/authoptions';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function page({params}:{params:Promise<{id:string}>}) {
  const {id} = await params
  const session = await getServerSession(authOptions)
  // console.log(session?.user.id, 'Session Exists');
  const userId = session?.user.id

  const userPortfolio = await getUserPortfolio(id)
  console.log(userPortfolio, 'User Exists');
  if(!userPortfolio) {
    return null
  }
  if(!userId) {
    return null
  }
  return (
    <>
      <ProfileForm userId={userId} userPortfolio={userPortfolio}/>
    </>
  );
}
