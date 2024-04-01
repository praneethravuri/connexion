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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import DisplayProfile from './DisplayProfile';
import AccountSettings from './AccountSettings';



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

  return (
    <section>
      <main className='w-5/6 mx-auto m-6'>
        <div className="settings-title">
          <p className='text-4xl font-semibold'>Settings</p>
          <p className='text-base text-gray-400'>Manage your account settings</p>
          <hr className="border-t border-zinc-800 mx-auto my-4" />

          <div className="tab-content">
            <Tabs defaultValue="profile" className="">
              <TabsList className="w-1/3">
                <TabsTrigger className='w-full' value="profile">Profile</TabsTrigger>
                <TabsTrigger className='w-full' value="account">Account</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <DisplayProfile />
              </TabsContent>
              <TabsContent value="account">
                <AccountSettings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </section>
  )
}

export default Profile;
