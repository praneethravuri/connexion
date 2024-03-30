"use client";

import React, { useState, useEffect } from 'react';
import LeftSideBar from '@/components/shared/LeftSideBar';
import RightSideBar from '@/components/shared/RightSideBar';
import Community, { ICommunityDocument } from '@/app/(models)/communityModel';
import Link from 'next/link';
import Bottombar from '@/components/shared/Bottombar';


const CommunityPage = () => {
  const [communities, setCommunities] = useState<ICommunityDocument[]>([]);

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

  const formatDate = (dateInput: Date | string) => {
    let date: Date;
    if (typeof dateInput === 'string') {
      date = new Date(dateInput);
    } else {
      date = dateInput;
    }
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("here");

  //   try {
  //     const response = await fetch('/api/create-community', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ communityName, communityImage }),
  //     });
  //     const data = await response.json();
  //     console.log(data);

  //     // Reset form fields or show a success message
  //     setCommunityName('');
  //     setCommunityImage('');
  //     fetchCommunities(); // Fetch the updated communities after creating a new one
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  return (
    <section className='bg-black h-screen w-full flex'>
      <LeftSideBar currentPage='community-main' />

      <main className="main-content flex-1 overflow-y-auto px-20 pt-6">
        {/* <h1>Create a New Community</h1> */}

        {/* <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="communityName">Community Name:</label>
            <input
              type="text"
              id="communityName"
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="communityImage">Community Image URL:</label>
            <input
              type="text"
              id="communityImage"
              value={communityImage}
              onChange={(e) => setCommunityImage(e.target.value)}
            />
          </div>

          <button type="submit">Create Community</button>
        </form> */}

        <h2 className='text-3xl font-semibold'>Communities</h2>
        <ul>
          {communities.map((community) => (
            <React.Fragment key={community.id}>
              <hr className="border-t border-zinc-800 mx-auto my-4" />
              <Link href={`/community/${community.communityName}`} className="bg-black text-white p-4 rounded-lg hover:bg-gray-800 flex items-center">
                <div className="mb-2 items-center">
                  <div className="flex items-center ">
                    <div className="w-24 h-24 overflow-hidden rounded-lg">
                      <img src={community.communityImage} alt={community.communityName} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-8">
                      <p className='text-2xl font-semibold'>{community.communityName}</p>
                      <p className='text-gray-400 font-semibold'>12,000</p>
                    </div>
                  </div>
                </div>
              </Link>
            </React.Fragment>
          ))}
        </ul>
      </main>

      <RightSideBar />
      <Bottombar />
    </section>
  );
};

export default CommunityPage;