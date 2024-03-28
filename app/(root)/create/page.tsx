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
    community: "Choose a community",
    userName: "anithaJ77",
    contentType: "",
    showTextInput: true,
    contentText: "",
    contentImageURL: ""
  });

  const [errors, setErrors] = useState({
    communityError: false,
    titleError: false,
    contentError: false
  });

  const getRandomImageUrl = () => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    return `https://picsum.photos/id/${randomNumber}/2000/800`;
  };

  const handleSelectCommunity = (communityName: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      community: communityName
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({
      communityError: false,
      titleError: false,
      contentError: false
    });


    let formIsValid = true;

    if (formData.community === "Choose a community") {
      setErrors(prevErrors => ({ ...prevErrors, communityError: true }));
      formIsValid = false;
    }

    if (formData.title.trim() === "") {
      setErrors(prevErrors => ({ ...prevErrors, titleError: true }));
      formIsValid = false;
    }
    console.log("content image", formData.contentImageURL.trim());
    if (formData.contentImageURL.trim() === "" && formData.contentText.trim() === "") {
      console.log("Empty!!!!");
      setErrors(prevErrors => ({ ...prevErrors, contentError: true }));
      formIsValid = false;
    }

    if (formIsValid) {
      try {

        let updatedFormData = { ...formData };
        if (formData.contentImageURL && !formData.contentText) {
          // Case 1: Image URL filled, text area empty
          updatedFormData = {
            ...updatedFormData,
            contentType: 'image',
            contentText: '',
            contentImageURL: getRandomImageUrl()
          };
        } else if (!formData.contentImageURL && formData.contentText) {
          // Case 2: Text area filled, image URL empty
          updatedFormData = {
            ...updatedFormData,
            contentType: 'text',
            contentImageURL: '',
            contentText: formData.contentText
          };
        } else if (formData.contentImageURL && formData.contentText) {
          // Case 3: Both image URL and text area filled
          updatedFormData = {
            ...updatedFormData,
            contentType: 'mix',
            contentImageURL: getRandomImageUrl(),
            contentText: formData.contentText
          };
        }

        const requestData = {
          formData: updatedFormData
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
            community: "Choose a community",
            userName: "anithaJ77",
            contentType: "",
            showTextInput: true,
            contentImageURL: "",
            contentText: ""
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
            <div className="image-url-input">
              <Input className='bg-neutral-950'
                value={formData.contentImageURL}
                type="text"
                id="imageUrl"
                onChange={(e) => setFormData((prevFormData) => ({
                  ...prevFormData,
                  contentImageURL: e.target.value
                }))}
                placeholder="Enter Image URL"
              />
            </div>

            <div className="flex items-center justify-center gap-2">
              <div className="flex-1 h-0.5 bg-zinc-800"></div>
              <p className="px-2 text-zinc-800">Or</p>
              <div className="flex-1 h-0.5 bg-zinc-800"></div>
            </div>


            <div className="text-area-input">
              <Textarea className='bg-neutral-950'
                value={formData.contentText}
                rows={12}
                onChange={(e) => setFormData((prevFormData) => ({
                  ...prevFormData,
                  contentText: e.target.value
                }))}
                placeholder="Enter Text"
              />
            </div>
            {errors.contentError && (
            <p className="text-red-500">Please enter the image url or text.</p>
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