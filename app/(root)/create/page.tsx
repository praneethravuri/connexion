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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { title } from 'process';


const CreateContent = () => {
  const [postData, setPostData] = useState({
    title: "",
    community: "Choose a community",
    userName: "montes",
    contentType: "",
    showTextInput: true,
    contentText: "",
    contentImageURL: ""
  });

  const [newCommunityData, setNewCommunityData] = useState({
    communityName: "",
    communityImage: "",
    communityBio: "",
    communityMembers: 0
  });


  const [communities, setCommunities] = useState<ICommunityDocument[]>([]);

  const { toast } = useToast()

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await fetch('/api/fetch-communities');
        if (!response.ok) throw new Error('Network response was not ok');
        const data: ICommunityDocument[] = await response.json();
        setCommunities(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchCommunities();
  }, []);

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
    setPostData((prevPostData) => ({
      ...prevPostData,
      community: communityName
    }));
  };

  const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({
      communityError: false,
      titleError: false,
      contentError: false
    });


    let formIsValid = true;

    if (postData.community === "Choose a community") {
      setErrors(prevErrors => ({ ...prevErrors, communityError: true }));
      formIsValid = false;
    }

    if (postData.title.trim() === "") {
      setErrors(prevErrors => ({ ...prevErrors, titleError: true }));
      formIsValid = false;
    }
    console.log("content image", postData.contentImageURL.trim());
    if (postData.contentImageURL.trim() === "" && postData.contentText.trim() === "") {
      console.log("Empty!!!!");
      setErrors(prevErrors => ({ ...prevErrors, contentError: true }));
      formIsValid = false;
    }

    if (formIsValid) {
      try {

        let updatedPostData = { ...postData };
        if (postData.contentImageURL && !postData.contentText) {
          // Case 1: Image URL filled, text area empty
          updatedPostData = {
            ...updatedPostData,
            contentType: 'image',
            contentText: '',
            contentImageURL: getRandomImageUrl()
          };
        } else if (!postData.contentImageURL && postData.contentText) {
          // Case 2: Text area filled, image URL empty
          updatedPostData = {
            ...updatedPostData,
            contentType: 'text',
            contentImageURL: '',
            contentText: postData.contentText
          };
        } else if (postData.contentImageURL && postData.contentText) {
          // Case 3: Both image URL and text area filled
          updatedPostData = {
            ...updatedPostData,
            contentType: 'mix',
            contentImageURL: getRandomImageUrl(),
            contentText: postData.contentText
          };
        }

        const requestData = {
          postData: updatedPostData
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
          setPostData({
            title: "",
            community: "Choose a community",
            userName: "montes",
            contentType: "",
            showTextInput: true,
            contentImageURL: "",
            contentText: ""
          });

          toast({
            title: "Success!",
            description: "Your post has been created.",
            // Optional: Add any actions or customize as needed
          });
        } else {
          console.log("Error creating the post");
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    }
  };

  const handleCommunitySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Creating community with data:", newCommunityData);

    try {
      if (newCommunityData.communityName && newCommunityData.communityBio && newCommunityData.communityImage) {

        const response = await fetch("api/create-community", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCommunityData),
        })

        if (!response.ok) {
          throw new Error("Failed to create community");
        }

        const result = await response.json();
        console.log(result);

        if (result.message === "Community Created") {
          setNewCommunityData({
            communityName: "",
            communityBio: "",
            communityImage: "",
            communityMembers: 0
          });

          toast({
            title: "Success!",
            description: "Your community has been created.",
            // Optional: Add any actions or customize as needed
          });
        }
        else {
          console.log("Error creating community");
        }
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };
  return (
    <section className='bg-black h-screen w-full flex'>
      <LeftSideBar />
      <main className="main-content flex-1 overflow-y-auto px-20 pt-6 m-5 h-5/6 rounded-lg w-5/6">
        <h2 className='text-3xl font-semibold'>Create post or community</h2>
        <hr className="border-t border-zinc-800 mx-auto my-4" />
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="create-post">Create Post</TabsTrigger>
            <TabsTrigger value="create-community">Create Community</TabsTrigger>
          </TabsList>
          <TabsContent value="create-post">
            <h2 className='text-3xl font-semibold'>Create a post</h2>
            <hr className="border-t border-zinc-800 mx-auto my-4" />
            <div className='communities-drop-down'>
              {errors.communityError && (
                <p className="text-red-500">Please choose a community.</p>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger className='bg-neutral-900 space-x-10 pl-2 py-3 pr-3 rounded-lg flex justify-between items-center'>
                  <span>{postData.community}</span>
                  <span><ChevronDown color='#fff' /></span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='bg-neutral-900 w-full'>
                  {communities.map((community) => (
                    <DropdownMenuItem
                      key={community.id}
                      className="text-left hover:bg-gray-400"
                      onSelect={() => handleSelectCommunity(community.communityName)}

                    >
                      {community.communityName}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="insert-content">
              <form className='pt-5 w-full space-y-5' onSubmit={handlePostSubmit}>
                <div>
                  <Input
                    className='bg-neutral-950'
                    type="text"
                    id="title"
                    value={postData.title}
                    onChange={(e) => setPostData((prevPostData) => ({
                      ...prevPostData,
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
                    value={postData.contentImageURL}
                    type="text"
                    id="imageUrl"
                    onChange={(e) => setPostData((prevPostData) => ({
                      ...prevPostData,
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
                    value={postData.contentText}
                    rows={10}
                    onChange={(e) => setPostData((prevPostData) => ({
                      ...prevPostData,
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
          </TabsContent>
          <TabsContent value="create-community">
            <h2 className='text-3xl font-semibold'>Create a Community</h2>
            <hr className="border-t border-zinc-800 mx-auto my-4" />
            <form className='pt-5 space-y-5' onSubmit={handleCommunitySubmit}>
              <div>
                <Input
                  className='bg-neutral-950'
                  type="text"
                  id="communityTitle"
                  value={newCommunityData.communityName}
                  onChange={(e) => setNewCommunityData(prev => ({
                    ...prev,
                    communityName: e.target.value
                  }))}
                  placeholder='Community Name'
                  name='title'
                />
              </div>
              <div>
                <Input
                  className='bg-neutral-950'
                  type="text"
                  id="communityImageURL"
                  value={newCommunityData.communityImage}
                  onChange={(e) => setNewCommunityData(prev => ({
                    ...prev,
                    communityImage: e.target.value
                  }))}
                  placeholder="Community Image URL"
                />
              </div>
              <div>
                <Textarea
                  className='bg-neutral-950'
                  value={newCommunityData.communityBio}
                  rows={5}
                  onChange={(e) => setNewCommunityData(prev => ({
                    ...prev,
                    communityBio: e.target.value
                  }))}
                  placeholder="Community Bio"
                />
              </div>
              <Button variant="ghost" type='submit'>Create Community</Button>
            </form>
          </TabsContent>
        </Tabs>
      </main>
      <RightSideBar />
      <Bottombar />
    </section>
  );
};

export default CreateContent;