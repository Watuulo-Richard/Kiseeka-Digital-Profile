export const dynamic = 'force-dynamic'
import UserMetaCard from '@/components/backend/user-profile/UserMetaCard';
import UserInfoCard from '@/components/backend/user-profile/UserInfoCard';
import { authOptions } from '@/config/authoptions';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function UserProfilePage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return null;
  }

  return (
    <div className="space-y-6 pt-6">
      <UserMetaCard userId={userId} />
      <UserInfoCard userId={userId} />
    </div>
  );
}