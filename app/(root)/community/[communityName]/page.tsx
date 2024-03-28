import React from 'react'
import LeftSideBar from '@/components/shared/LeftSideBar'
import RightSideBar from '@/components/shared/RightSideBar'

interface CommunityParams {
    communityName: string;

  }
  
  const Community: React.FC<{ params: CommunityParams }> = ({ params }) => {
    return (
      <section className='bg-black h-screen w-full flex'>
        <LeftSideBar currentPage='community' />
        <main className="main-content flex-1 overflow-y-auto px-20 pt-6">
          You are at the {params.communityName} community!
        </main>
        <RightSideBar />
      </section>
    );
  };
  
  export default Community;