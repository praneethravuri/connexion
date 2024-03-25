import React from 'react';
import Image from 'next/image';
import Bottombar from '@/components/shared/Bottombar';
import { Button } from '@/components/ui/button';

interface DetailSectionProps {
  title: string;
  content: string;
  isProfile?: boolean;
}

const DetailSection: React.FC<DetailSectionProps> = ({ title, content, isProfile = false }) => (
  <div className={`${title.toLowerCase()} m-3`}>
    <h1 className='text-xl font-semibold'>{title}</h1>
    <hr className="border-t border-gray-400" />
    <div className={`m-3 ${isProfile ? 'flex items-center' : ''}`}>
      {isProfile ? (
        <>
          <Image src={`https://ui-avatars.com/api/?name=${content}`} width={30} height={30} alt='avatar' className='rounded-full mr-4' />
          <p>{content}</p>
        </>
      ) : <p>{content}</p>}
    </div>
  </div>
);

const Profile: React.FC = () => {
  const details = {
    name: "Praneeth Ravuri",
    email: "pravdev10@gmail.com",
    phoneNumber: "5716228648"
  };

  return (
    <div className='flex flex-col mx-auto w-6/12 rounded-lg bg-blackBackground px-6 py-3 h-5/6'>
      <h1 className="text-white m-3 text-3xl font-semibold">Account</h1>
      <p className='m-3 text-gray-400'>Manage or view your account settings</p>
      <div className='flex flex-col space-y-2 mb-9'>
        <DetailSection title="Profile" content={details.name} isProfile />
        <DetailSection title="Email" content={details.email} />
        <DetailSection title="Phone Number" content={details.phoneNumber} />
        <Button variant="destructive">Delete Account</Button>
      </div>
      <Bottombar />
    </div>
  );
}

export default Profile;
