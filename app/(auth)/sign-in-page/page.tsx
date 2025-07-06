import SignIn from '@/components/backend/auth/signin';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import React from 'react';

export default function page() {
  return (
    <>
    <BackgroundBeamsWithCollision>
      <SignIn />
    </BackgroundBeamsWithCollision>
    </>
  );
}
