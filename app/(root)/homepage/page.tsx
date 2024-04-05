import React from 'react';
import LeftSideBar from '@/components/shared/LeftSideBar';
import RightSideBar from '@/components/shared/RightSideBar';
import Bottombar from '@/components/shared/Bottombar';
import UserPosts from '@/components/shared/UserPosts';
import { getSession } from '@/lib/actions';
import { redirect } from 'next/navigation';
import { generateFakeUsers } from '@/lib/generate-data/generateFakeUsers';

const HomePage = async () => {

  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/");
  }

  const user = session.fullName;
  // console.log("Session homepage: ", session);
  const fakeUsers = generateFakeUsers(5);

  return (
    <>
        <div>
      <h1>Fake Users</h1>
      <ul>
        {fakeUsers.map((user, index) => (
          <li key={index}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.phoneNumber}</p>
            <p>Username: {user.userName}</p>
            <p>Password: {user.password}</p>
            <br/>
          </li>
          
        ))}
      </ul>
    </div>
      <section className='bg-black h-screen w-full flex'>
        <LeftSideBar />
        <main className="main-content flex-1 overflow-y-auto px-20 pt-6">
          <p className='text-3xl'>Welcome, &nbsp;{user}👋</p>
          <UserPosts filter='all' />
        </main>
        <RightSideBar />
        <Bottombar />
      </section>
    </>
  );
}

export default HomePage;