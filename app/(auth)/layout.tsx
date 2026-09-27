import { ReactNode } from 'react';

export default async function AuthenticationLayout({ children }: { children: ReactNode }) {

  return (
    <div className="min-h-screen overflow-x-hidden">
        <main className="dark:bg-[#0F0F12]">
          {children}
        </main>
    </div>
  );
}

