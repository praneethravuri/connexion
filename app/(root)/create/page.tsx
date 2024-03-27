"use client";
import React, { useState } from 'react';
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

const Creates = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    community: "Choose a community",
    userName: "prav2510"
  });

  // Function to handle selection
  const handleSelectCommunity = (communityName: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      community: communityName
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here, you can perform any necessary actions with the formData
    console.log('FormData:', formData);

    try {
      const response = await fetch("/api/create-post", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData })
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const result = await response.json();
      console.log(result);

      if (result.message === "Post Created") {
        setFormData({
          title: "",
          content: "",
          community: "Choose a community",
          userName: "prav2510"
        });
      }
      else {
        console.log("Error creating the post");
      }
    }
    catch (error) {
      console.error('Error: ', error);
    }

  };

  return (
    <section className='bg-black h-screen w-full flex'>
      <LeftSideBar currentPage='create' />

      <main className="main-content flex-1 overflow-y-auto px-20 pt-6 m-5 h-5/6 rounded-lg w-5/6">
        <div className='communities-drop-down'>
          <DropdownMenu>
            <DropdownMenuTrigger className='bg-neutral-900 space-x-10 pl-2 py-3 pr-3 rounded-lg flex justify-between items-center'>
              <span>{formData.community}</span>
              <span><ChevronDown color='#fff' /></span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-neutral-900 w-full'>
              <DropdownMenuItem className="text-left" onSelect={() => handleSelectCommunity('Cars')}>Cars</DropdownMenuItem>
              <DropdownMenuItem className="text-left " onSelect={() => handleSelectCommunity('Bikes')}>Bikes</DropdownMenuItem>
              <DropdownMenuItem className="text-left " onSelect={() => handleSelectCommunity('People')}>People</DropdownMenuItem>
              <DropdownMenuItem className="text-left " onSelect={() => handleSelectCommunity('Boats')}>Boats</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="insert-content">
          <form className='pt-5 w-full space-y-5' onSubmit={handleSubmit}>
            <div>
              <Input
                className='bg-neutral-950'
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prevFormData) => ({
                  ...prevFormData,
                  title: e.target.value
                }))}
                placeholder='Title'
                name='title'
              />
            </div>
            <div>
              <Textarea
                placeholder='Enter text'
                rows={10}
                name='content'
                value={formData.content}
                onChange={(e) => setFormData((prevFormData) => ({
                  ...prevFormData,
                  content: e.target.value
                }))}
              />
            </div>
            <Button variant="ghost" type='submit'>Post</Button>
          </form>
        </div>
      </main>

      <RightSideBar />
    </section>
  );
};

export default Creates;