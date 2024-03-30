"use client";
import React, { useEffect, useState } from 'react';
import { ICommunityDocument } from '@/app/(models)/communityModel';
import LeftSideBar from '@/components/shared/LeftSideBar';
import RightSideBar from '@/components/shared/RightSideBar';
import { Users } from 'lucide-react';
import Bottombar from '@/components/shared/Bottombar';

const Community = ({ params }: { params: { communityName: string } }) => {
  const [communityData, setCommunityData] = useState<ICommunityDocument | null>(null);

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const response = await fetch(`/api/fetch-selected-community?communityName=${params.communityName}`);
        const data = await response.json();

        if (response.ok) {
          setCommunityData(data);
        } else {
          // Handle error case
          console.error(data.message);
        }
      } catch (err) {
        console.error('Error fetching community data:', err);
      }
    };

    fetchCommunityData();
  }, [params.communityName]);

  return (
    <section className='bg-black h-screen w-full flex'>
      <LeftSideBar currentPage='create' />
      <main className="main-content flex-1 overflow-y-auto px-20 pt-6">
        {communityData ? (
          <React.Fragment key={communityData.id} >
            <div className='community-image'>
              <img className='rounded-lg' src={communityData.communityImage} alt={communityData.communityName} width={1000} height={400} />
            </div>
            <div className='community-details pt-3'>
              <div className="community-heading flex justify-between items-center">
              <p className='text-4xl font-semibold'>{communityData.communityName.charAt(0).toUpperCase() + communityData.communityName.slice(1)}</p>
                <span className='flex space-x-1'>
                <p className='text-xl font-semibold text-gray-400'>{communityData.communityMembers}</p>
                <Users />
                </span>
              </div>
              <div>
                <p>{communityData.communityBio}</p>
              </div>
            </div>
          </React.Fragment>

        ) : (
          <p>Loading...</p>
        )}
      </main>
      <RightSideBar />
      <Bottombar />
    </section>
  );
};

export default Community;