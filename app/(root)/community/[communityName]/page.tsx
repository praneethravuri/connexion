"use client";
import React, { useEffect, useState } from 'react';
import { ICommunityDocument } from '@/models/communityModel';
import LeftSideBar from '@/components/shared/static/LeftSideBar';
import RightSideBar from '@/components/shared/static/RightSideBar';
import { Users, SearchX } from 'lucide-react';
import Bottombar from '@/components/shared/static/Bottombar';
import UserPosts from '@/components/shared/UserPosts';
import LoadingPage from '@/components/shared/static/LoadingPage';
import capitalize from '@/utils/capitalizeWord';

const Community = ({ params }: { params: { communityName: string } }) => {


  const [communityData, setCommunityData] = useState<ICommunityDocument | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/community-api/fetch-selected?communityName=${params.communityName.toLowerCase()}`);
        const data = await response.json();

        if (response.ok) {
          setCommunityData(data);
        } else {
          // Handle error case
          console.error(data.message);
        }
      } catch (err) {
        console.error('Error fetching community data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommunityData();
  }, [params.communityName]);

  return (
    isLoading ? (
      <LoadingPage />
    ) : (
      <section className='bg-black h-screen w-full flex'>
        <LeftSideBar />
        <main className="main-content flex-1 overflow-y-auto px-20 pt-6">
          {communityData ? (
            <React.Fragment key={communityData.id} >
              <div className='p-4'>
                <div className='community-image'>
                  <img className='rounded-lg' src={communityData.communityImage} alt={communityData.communityName} width={1000} height={400} />
                </div>
                <div className='community-details pt-3'>
                  <div className="community-heading flex justify-between items-center">
                    <p className='text-4xl font-semibold'>{capitalize(communityData.communityName)}</p>
                    <span className='flex space-x-1'>
                      <p className='text-xl font-semibold text-gray-400'>{communityData.communityMembers}</p>
                      <Users />
                    </span>
                  </div>
                  <div>
                    <p>{communityData.communityBio}</p>
                  </div>
                </div>
              </div>
            </React.Fragment>

          ) : (
            <div className="no-communities-found items-center justify-center flex h-screen">
              <div className="flex flex-col items-center justify-center">
                <SearchX color='#fff' className='mx-auto h-20 w-20' />
                <p className='mx-auto text-base font-semibold'>Community not found</p>
              </div>
            </div>
          )}
          <div className="related-posts mt-6">
            <h2 className='text-xl font-semibold p-4'>Related Posts</h2>
            <UserPosts filter={params.communityName} />
          </div>

        </main>
        <RightSideBar />
        <Bottombar />
      </section>
    )
  );
};

export default Community;