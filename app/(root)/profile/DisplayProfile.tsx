"use client";
import React from 'react';
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
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { deleteAccount } from '@/lib/actions';

interface UserDetails {
  name: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
}

interface DisplayProfileProps {
  userDetails: UserDetails;
}

const DisplayProfile: React.FC<DisplayProfileProps> = ({ userDetails }) => {

  console.log(userDetails);

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

      <div className="delete-account">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className='border border-zinc-800'>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>
                <button
                  onClick={async () => {
                    try {
                      await deleteAccount();
                    } catch (error) {
                      console.error('Error deleting account:', error);
                      // Handle error (e.g., display an error message)
                    }
                  }}
                >
                  Continue
                </button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  )
}

export default DisplayProfile