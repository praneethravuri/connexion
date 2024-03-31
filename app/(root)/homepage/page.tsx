import React from 'react';
import LeftSideBar from '@/components/shared/LeftSideBar';
import RightSideBar from '@/components/shared/RightSideBar';
import Bottombar from '@/components/shared/Bottombar';
import UserPosts from '@/components/shared/UserPosts';

const HomePage = () => {
  const user = "Anitha";

  return (
    <section className='bg-black h-screen w-full flex'>
      <LeftSideBar />
      <main className="main-content flex-1 overflow-y-auto px-20 pt-6">
        <p className='text-3xl'>Welcome 👋, &nbsp;{user}</p>
        <UserPosts />
      </main>
      <RightSideBar />
      <Bottombar />
    </section>
  );
}

export default HomePage;