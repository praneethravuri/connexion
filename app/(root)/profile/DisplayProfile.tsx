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
    <main className='mt-4 w-2/3 space-y-10'>
      <div className="heading">
        <p className='text-2xl font-semibold'>Profile</p>
        <p className='text-gray-400'>This is how others will see you on the site.</p>
        <hr className="border-t border-zinc-800 mx-auto my-4" />
      </div>

      <div className="username space-y-2">
        <p className='text-xl font-semibold'>Name</p>
        <p className='p-3 border border-zinc-800 rounded-lg w-full'>{userDetails.name}</p>
      </div>

      <div className="username space-y-2">
        <p className='text-xl font-semibold'>Username</p>
        <p className='p-3 border border-zinc-800 rounded-lg w-full'>{userDetails.username}</p>
        <p className='text-gray-400'>This is your public display name. It can be your real name or a pseudonym.</p>
      </div>

      <div className="email">
      <p className='text-xl font-semibold'>Email</p>
        <p className='p-3 border border-zinc-800 rounded-lg w-full'>{userDetails.email}</p>
        <p className='text-gray-400'>You can manage verified email addresses in your email settings.</p>
      </div>
    </main>
  )
}

export default DisplayProfile