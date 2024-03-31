"use client";
import React, { useState, useEffect } from 'react';
import LeftSideBar from '@/components/shared/LeftSideBar';
import RightSideBar from '@/components/shared/RightSideBar';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Community, { ICommunityDocument } from '@/models/communityModel';
import Bottombar from '@/components/shared/Bottombar';
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreatePostForm from './CreatePostForm';
import CreateCommunityForm from './CreateCommunityForm';
import { getSession } from '@/lib/actions';
import { redirect } from 'next/navigation';


const CreateContent = async () => {

  const session = await getSession();

  if(!session.isLoggedIn){
    redirect("/");
  }
  
  return (
    <section className='bg-black h-screen w-full flex'>
      <LeftSideBar />
      <main className="main-content flex-1 overflow-y-auto px-20 pt-6 m-5 h-5/6 rounded-lg w-5/6">
        <h2 className='text-3xl font-semibold'>Create post or community</h2>
        <hr className="border-t border-zinc-800 mx-auto my-4" />
        <Tabs defaultValue="create-post" className="w-full">
          <TabsList>
            <TabsTrigger value="create-post">Create Post</TabsTrigger>
            <TabsTrigger value="create-community">Create Community</TabsTrigger>
          </TabsList>
          <TabsContent value="create-post">
            <CreatePostForm />
          </TabsContent>
          <TabsContent value="create-community">
            <CreateCommunityForm />
          </TabsContent>
        </Tabs>
      </main>
      <RightSideBar />
      <Bottombar />
    </section>
  );
};

export default CreateContent;