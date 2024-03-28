import React from 'react'
import LeftSideBar from '@/components/shared/LeftSideBar'
import RightSideBar from '@/components/shared/RightSideBar'

const Community = () => {
  return (
    <section className='bg-black h-screen w-full flex'>
      <LeftSideBar currentPage='community-main' />
      <main className="main-content flex-1 overflow-y-auto px-20 pt-6">You are at main com</main>
      <RightSideBar />
    </section>
  )
}

export default Community