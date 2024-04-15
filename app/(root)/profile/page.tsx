import React from 'react';
import LeftSideBar from '@/components/shared/static/LeftSideBar';
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
import UserActivity from './UserActivity';
import RightSideBar from '@/components/shared/static/RightSideBar';



const Profile = async () => {

  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }

  const userDetails = {
    name: session.fullName,
    email: session.email,
    phoneNumber: session.phoneNumber,
    username: session.userName,
    password: session.password,
  };

  console.log("User Details main: ", userDetails);

  return (
    <section className='bg-black h-screen w-full flex'>
      <LeftSideBar />
      <main className='w-5/6 mx-auto m-6 main-content flex-1 overflow-y-auto px-20 pt-6'>
        <div className="settings-title">
          <p className='text-4xl font-semibold'>Settings</p>
          <p className='text-base text-gray-400'>Manage your account settings</p>
          <hr className="border-t border-zinc-800 mx-auto my-4" />

          <div className="tab-content">
            <Tabs defaultValue="profile" className="">
              <TabsList className="w-1/3">
                <TabsTrigger className='w-full' value="profile">Profile</TabsTrigger>
                <TabsTrigger className='w-full' value="account">Account</TabsTrigger>
                <TabsTrigger className='w-full' value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <DisplayProfile userDetails={userDetails} />
              </TabsContent>
              <TabsContent value="account">
                <AccountSettings userDetails={userDetails} />
              </TabsContent>
              <TabsContent value="activity">
                <UserActivity />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <RightSideBar />
    </section>
  )
}

export default Profile;
