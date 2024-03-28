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

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    community: "Choose a community",
    userName: "anithaJ77",
    contentType: "",
    showTextInput: true
  });

  const [errors, setErrors] = useState({
    communityError: false,
    titleError: false
  });

  const getRandomImageUrl = () => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1; // Generate a random number between 1 and 1000
    return `https://picsum.photos/id/${randomNumber}/2000/800`;
  };

  const handleSelectCommunity = (communityName: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      community: communityName
    }));
  };

  const handleContentTypeSelection = (type: string) => {
    if (type === 'image') {
      const randomImageUrl = getRandomImageUrl();
      setFormData((prevFormData) => ({
        ...prevFormData,
        contentType: type,
        content: randomImageUrl,
        showTextInput: false,
      }));
    } else if (type === 'text') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        contentType: type,
        showTextInput: true,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('FormData:', formData);

    setErrors({
      communityError: false,
      titleError: false
    });

    if (formData.community === "Choose a community") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        communityError: true
      }));
    }

    if (formData.title.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        titleError: true
      }));
    }

    if (!errors.communityError && !errors.titleError) {
      try {
        const requestData = {
          formData: {
            ...formData,
            contentType: formData.contentType || "text", // Include the contentType
          },
        };

        const response = await fetch("/api/create-post", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
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
            userName: "anithaJ77",
            contentType: "",
            showTextInput: true,
          });
        } else {
          console.log("Error creating the post");
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    }

  };



  return (
    <section className='bg-black h-screen w-full flex'>
      <LeftSideBar currentPage='create' />
      <main className="main-content flex-1 overflow-y-auto px-20 pt-6 m-5 h-5/6 rounded-lg w-5/6">
        <div className='communities-drop-down'>
          {errors.communityError && (
            <p className="text-red-500">Please choose a community.</p>
          )}
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

        <div className="content-type-selection py-5 space-x-5">
          <Button variant="ghost" onClick={() => handleContentTypeSelection('text')}>Text</Button>
          <Button variant="ghost" onClick={() => handleContentTypeSelection('image')}>Image</Button>
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
              {errors.titleError && (
                <p className="text-red-500">Please enter a title.</p>
              )}
            </div>
            {formData.showTextInput ? (
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
            ) : (
              <div>
                <Input
                  className='bg-neutral-950'
                  type="text"
                  id="imageURL"
                  value={formData.content}
                  onChange={(e) => setFormData((prevFormData) => ({
                    ...prevFormData,
                    content: e.target.value
                  }))}
                  placeholder='Image URL'
                  name='content'
                />
              </div>
            )}
            <Button variant="ghost" type='submit'>Post</Button>
          </form>
        </div>
      </main>

      <RightSideBar />
    </section>
  );
};

export default CreatePost;
