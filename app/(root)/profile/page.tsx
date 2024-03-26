import React from 'react';
import { Button } from '@/components/ui/button';
import Bottombar from '@/components/shared/Bottombar';
import { Switch } from "@/components/ui/switch"


const Profile = () => {
  const userDetails = {
    name: "Praneeth Ravuri",
    email: "pravdev10@gmail.com",
    phoneNumber: "5716228648",
  };

  const ProfileSection = ({ title, content }: { title: string, content: string }) => (
    <div className='mt-5 m-1'>
      <h1 className="text-white m-2 text-xl font-semibold">{title}</h1>
      <hr className="border-t border-zinc-700 mx-auto w-11/12" />
      <p className='m-2 text-gray-400'>{content}</p>
    </div>
  );

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col mx-auto w-6/12 md:w-6/12 lg:max-w-4xl rounded-lg bg-blackBackground px-6 py-3 m-3">
          <div className='text-left w-full'>
            <h1 className="text-white m-3 text-3xl font-semibold">Account</h1>
            <p className='m-3 text-gray-400'>Manage your account settings</p>
            <hr className="border-t border-zinc-700 mx-auto w-11/12" />
            <ProfileSection title="Profile" content={userDetails.name} />
            <ProfileSection title="Email" content={userDetails.email} />
            <ProfileSection title="Phone Number" content={userDetails.phoneNumber} />
            <Button className='mt-5 m-2' variant="destructive">Delete Account</Button>
          </div>
        </div>
      </div>
      <Bottombar />
    </>
  )
}

export default Profile;
