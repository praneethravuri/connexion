import React from 'react'
import { getSession } from '@/lib/actions';
import { redirect } from 'next/navigation';

const DisplayProfile = async () => {

  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }

  const userDetails = {
    name: session.fullName,
    email: session.email,
    phoneNumber: session.phoneNumber,
    username: session.userName
  };

  return (
    <main className='mt-4'>
      <div className="heading">
        <p className='text-2xl font-semibold'>Profile</p>
        <p className='text-gray-400'>This is how others will see you on the site.</p>
      </div>

      <div className="username">
        <p>Username</p>
        <p>{userDetails.username}</p>
      </div>
    </main>
  )
}

export default DisplayProfile