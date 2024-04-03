import React from 'react'
import UserPosts from '@/components/shared/UserPosts'
import { getSession } from '@/lib/actions';
import { redirect } from 'next/navigation';

const UserActivity = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }
  return (
    <main className='mt-4 w-full space-y-10'>
      <div className="heading">
        <p className='text-2xl font-semibold'>User Activity</p>
        <p className='text-gray-400'>See your latest activity</p>
      </div>
      <UserPosts filter={session.userName} />
    </main>
  )
}

export default UserActivity