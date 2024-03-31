import React from 'react';
import { Button } from '@/components/ui/button';
import Bottombar from '@/components/shared/Bottombar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getSession } from '@/lib/actions';
import { redirect } from 'next/navigation';



const Profile = async () => {

  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }

  const userDetails = {
    name: session.fullName,
    email: session.email,
    phoneNumber: session.phoneNumber,
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
            <AlertDialog>
              <AlertDialogTrigger className='mt-5 m-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 w-40 h-10 px-4 py-2 rounded-md'>Delete Account</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </div>
        </div>
      </div>
      <Bottombar />
    </>
  )
}

export default Profile;
