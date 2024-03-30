"use client";
import React, { useState, useEffect } from 'react';
import { ThumbsDown, ThumbsUp, MessageSquare, Share, Dot } from 'lucide-react';
import { IPostDocument } from '@/app/(models)/postModel';
import Link from 'next/link';

interface UserPostsProps {
  filter?: string;
}

const UserPosts: React.FC<UserPostsProps> = ({ filter = 'all' }) => {
  const [posts, setPosts] = useState<IPostDocument[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/homepage-posts?filter=${filter}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data: IPostDocument[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, [filter]);

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

  return (
    <>
      {posts.map((post) => (
        <React.Fragment key={post.id}>
          <hr className="border-t border-zinc-800 mx-auto my-4" />
          <article className="bg-black text-white p-4 rounded-lg hover:bg-gray-800">
            <div className="mb-2 flex justify-between items-center">
              <div className='flex'>
                <Link href='/' className="text-base text-zinc-500 hover:text-zinc-200 cursor-pointer">{post.userName}</Link>
                <Dot />
                <Link href={`/community/${post.community}`} className="text-base text-zinc-500 hover:text-zinc-200 cursor-pointer">{post.community.charAt(0).toUpperCase() + post.community.slice(1)}</Link>
              </div>
              <span className="text-base text-zinc-500">{formatDate(post.createdAt)}</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
            {post.contentType === "text" ? (
              <p>{post.contentText}</p>
            ) : post.contentType === "image" ? (
              <img src={post.contentImageURL} alt={post.title} width={1000} height={400} className="max-w-full h-auto rounded-lg" />
            ) : post.contentType === "mix" ? (
              <>
                <img src={post.contentImageURL} alt={post.title} width={1000} height={400} className="max-w-full h-auto rounded-lg" />
                <p className='mt-3'>{post.contentText}</p>
              </>
            ) : null}
            <div className="buttons flex space-x-4 mt-3">
              <div className='rounded-lg flex items-center space-x-2'>
                <ThumbsUp className='h-5 w-5 cursor-pointer' color="#fff" /><span>12</span>
              </div>
              <div className='rounded-lg flex items-center space-x-2'>
                <ThumbsDown className='h-5 w-5 cursor-pointer' color="#fff" /><span>12</span>
              </div>
              <div className='rounded-lg flex items-center space-x-2'>
                <MessageSquare className='h-5 w-5 cursor-pointer' color="#fff" /><span>12</span>
              </div>
              <div className='rounded-lg flex items-center space-x-2'>
                <Share className='h-5 w-5 cursor-pointer' color="#fff" />
              </div>
            </div>
          </article>
        </React.Fragment>
      ))}
      <div className='m-10'></div>
    </>
  );
};

export default UserPosts;