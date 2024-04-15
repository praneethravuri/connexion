import React from 'react';
import LeftSideBar from '@/components/shared/static/LeftSideBar';
import RightSideBar from '@/components/shared/static/RightSideBar';
import Bottombar from '@/components/shared/static/Bottombar';
import UserPosts from '@/components/shared/UserPosts';
import { getSession } from '@/lib/actions';
import { redirect } from 'next/navigation';

const HomePage = async () => {

  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/");
  }

  const user = session.fullName;

  return (
    <section className='bg-black h-screen w-full flex'>
      <LeftSideBar />
      <main className="main-content flex-1 overflow-y-auto px-20 pt-6">
        <p className='text-3xl'>Welcome, &nbsp;{user}👋</p>
        <UserPosts filter='all' />
      </main>
      <RightSideBar />
      <Bottombar />
    </section>
  );
}

export default HomePage;