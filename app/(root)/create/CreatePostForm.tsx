"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { ICommunityDocument } from '@/models/communityModel';
import { useToast } from "@/components/ui/use-toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import getRandomImageURL from '@/utils/getRandomImageURL';
import capitalize from '@/utils/capitalizeWord';

const CreatePostForm = ({ user }: { user: string }) => {
    const { toast } = useToast()
    const [postData, setPostData] = useState({
        title: "",
        community: "Choose a community",
        userName: user,
        contentText: "",
        contentImageURL: ""
    });

    const [communities, setCommunities] = useState<ICommunityDocument[]>([]);

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const response = await fetch('/api/community-api/fetch');
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

    const handleSelectCommunity = (communityName: string) => {
        setPostData((prevPostData) => ({
            ...prevPostData,
            community: communityName.toLowerCase()
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
        if (postData.contentImageURL.trim() === "" && postData.contentText.trim() === "") {
            console.log("Empty!!!!");
            setErrors(prevErrors => ({ ...prevErrors, contentError: true }));
            formIsValid = false;
        }

        if (formIsValid) {
            try {


                let updatedPostData = { ...postData };

                if(postData.contentImageURL && postData.contentText){
                    updatedPostData = {
                        ...updatedPostData,
                        contentText: postData.contentText,
                        contentImageURL: getRandomImageURL()
                    }
                }

                else if(postData.contentImageURL && !postData.contentText){
                    updatedPostData = {
                        ...updatedPostData,
                        contentText : "",
                        contentImageURL: getRandomImageURL()
                    }
                }

                else if(!postData.contentImageURL && postData.contentText){
                    updatedPostData = {
                        ...updatedPostData,
                        contentText : postData.contentText,
                        contentImageURL: ""
                    }
                }

                const requestData = {
                    postData: updatedPostData
                };

                const response = await fetch("api/post-api/create", {
                    method: "POST",
                    headers : {
                        "Content-Type" : "application/json",
                    },
                    body : JSON.stringify(requestData),
                });

                if (!response.ok) {
                    throw new Error("Failed to create post");
                  }

                  const data = await response.json();

                if (data.message === "Post Created") {
                    setPostData({
                        title: "",
                        community: "Choose a community",
                        userName: user,
                        contentImageURL: "",
                        contentText: ""
                    });

                    toast({
                        title: "Success!",
                        description: "Your post has been created."
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
        <section>
            <h2 className='text-3xl font-semibold'>Create a Post</h2>
            <hr className="border-t border-zinc-800 mx-auto my-4" />
            <div className='communities-drop-down'>
                {errors.communityError && (
                    <p className="text-red-500">Please choose a community.</p>
                )}
                <DropdownMenu>
                    <DropdownMenuTrigger className='bg-neutral-900 space-x-10 pl-2 py-3 pr-3 rounded-lg flex justify-between items-center'>
                        <span>{capitalize(postData.community)}</span>
                        <span><ChevronDown color='#fff' /></span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='bg-neutral-900 w-full'>
                        {communities.map((community) => (
                            <DropdownMenuItem
                                key={community.id}
                                className="text-left hover:bg-gray-400"
                                onSelect={() => handleSelectCommunity(community.communityName)}

                            >
                                {capitalize(community.communityName)}
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
        </section>
    )
}

export default CreatePostForm