
import Bottombar from '@/components/shared/Bottombar'
import LeftSideBar from '@/components/shared/LeftSideBar'
import React from 'react'

const HomePage = () => {
  return (
    <section className='bg-black h-screen w-full'>
      <LeftSideBar />
      <Bottombar />
    </section>
    
  )
}

export default HomePage