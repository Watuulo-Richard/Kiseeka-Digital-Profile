import { ReactNode } from 'react';
import Sidebar from '@/components/backend/sidebar';
import { authOptions } from '@/config/authoptions';
import TopNav from '@/components/backend/top-nav';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function BackendLayout({ children }: { children: ReactNode }) {
const session = await getServerSession(authOptions)
  // console.log(session?.user);
    if(!session) {
      return(
        redirect('/sign-in-page')
      )
    }
    else if(session.user.role !== 'ADMIN') {
      return(
        redirect('/sign-in-page')
      )
    }
    
  return (
    <div className="flex h-screen overflow-hidden bg-[#fbebe5]">
      <Sidebar />
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23]">
          <TopNav session={session}/>
        </header>
        <main className="flex-1 overflow-auto px-6 pt-14 py-4 bg-[#fbebe5] dark:bg-[#0F0F12]">
          {children}
        </main>
      </div>
    </div>
  );
}

