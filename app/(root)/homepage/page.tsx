"use client";

import React, { useState, useEffect } from 'react';
import LeftSideBar from '@/components/shared/LeftSideBar';
import RightSideBar from '@/components/shared/RightSideBar';
import Post, { IPostDocument } from '@/app/(models)/postModel';
import Bottombar from '@/components/shared/Bottombar';
import UserPosts from '@/components/shared/UserPosts';

const HomePage = () => {
  const [posts, setPosts] = useState<IPostDocument[]>([]);
  const user = "Anitha";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/homepage-posts');
        if (!response.ok) throw new Error('Network response was not ok');
        const data: IPostDocument[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className='bg-black h-screen w-full flex'>
      <LeftSideBar currentPage="Homepage" />
      <main className="main-content flex-1 overflow-y-auto px-20 pt-6">
        <p className='text-3xl'>Welcome 👋, &nbsp;{user}</p>
        <UserPosts posts={posts} />
      </main>
      <RightSideBar />
      <Bottombar />
    </section>
  );
}

export default HomePage;