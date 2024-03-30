"use client";

import React, { useState, useEffect } from 'react';
import LeftSideBar from '@/components/shared/LeftSideBar';
import RightSideBar from '@/components/shared/RightSideBar';
import Community, { ICommunityDocument } from '@/app/(models)/communityModel';
import Link from 'next/link';
import Bottombar from '@/components/shared/Bottombar';
import { Input } from '@/components/ui/input';
import { SearchX, Users } from 'lucide-react';

const CommunityPage = () => {
  const [communities, setCommunities] = useState<ICommunityDocument[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredCommunities = communities.filter((community) =>
    community.communityName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className='bg-black h-screen w-full flex'>
      <LeftSideBar currentPage='community-main' />

      <main className="main-content flex-1 overflow-y-auto px-20 pt-6">
        <h2 className='text-3xl font-semibold'>Communities</h2>
        <div className="my-4">
          <Input
            type="text"
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-neutral-950"
          />
        </div>

        {filteredCommunities.length > 0 ? (
          <ul>
            {filteredCommunities.map((community) => (
              <React.Fragment key={community.id}>
                <hr className="border-t border-zinc-800 mx-auto my-4" />
                <Link href={`/community/${community.communityName}`} className="bg-black text-white p-4 rounded-lg hover:bg-gray-800 flex items-center">
                  <div className="mb-2 items-center">
                    <div className="flex items-center ">
                      <div className="w-24 h-24 overflow-hidden rounded-lg">
                        <img src={community.communityImage} alt={community.communityName} className="w-full h-full object-cover" />
                      </div>
                      <div className="ml-8">
                        <p className='text-2xl font-semibold'>{community.communityName.charAt(0).toUpperCase() + community.communityName.slice(1)}</p>
                        <span className='flex space-x-1'>
                          <p className='text-base font-semibold text-gray-400'>{community.communityMembers}</p>
                          <Users />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </React.Fragment>
            ))}
          </ul>
        ) : (
          <div className="no-communities-found items-center text-center mx-auto w-full">
            <SearchX className='mx-auto w-20 h-20' color="#fff" />
            <p className='mx-auto text-base font-semibold'>No communities found</p>
          </div>
        )}
      </main>

      <RightSideBar />
      <Bottombar />
    </section>
  );
};

export default CommunityPage;