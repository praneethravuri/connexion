"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";

const CreateCommunityForm = () => {

  const [newCommunityData, setNewCommunityData] = useState({
    communityName: "",
    communityImage: "",
    communityBio: "",
    communityMembers: 0
  });
  const { toast } = useToast();

  const handleCommunitySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Creating community with data:", newCommunityData);

    try {
      if (newCommunityData.communityName && newCommunityData.communityBio && newCommunityData.communityImage) {

        const response = await fetch("api/community-api/create", {
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
    <section>
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
    </section>
  )
}

export default CreateCommunityForm