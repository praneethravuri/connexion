import React from 'react';
import LeftSideBar from '@/components/shared/LeftSideBar';
import Bottombar from '@/components/shared/Bottombar';
import RightSideBar from '@/components/shared/RightSideBar';
import { ThumbsDown, ThumbsUp, MessageSquare, Share } from 'lucide-react';

const posts = [{
  'id': 1,
  'datePosted': 'March 25, 2024',
  'title': 'Sunset',
  'content': 'Beautiful sunset at the beach',
  'contentType': 'text',
  'likeCount': 383,
  'dislikeCount': 13,
  'commentCount': 111,
  'userName': 'sBrooke'
},
{
  'id': 2,
  'datePosted': 'March 24, 2024',
  'title': 'Vacation Time',
  'content': 'https://picsum.photos/1000/800',
  'contentType': 'image',
  'likeCount': 277,
  'dislikeCount': 46,
  'commentCount': 61,
  'userName': 'wooAtlas'
},
{
  'id': 3,
  'datePosted': 'March 23, 2024',
  'title': 'A Day at the Park',
  'content': 'It was a lovely day at the park with family.',
  'contentType': 'text',
  'likeCount': 367,
  'dislikeCount': 94,
  'commentCount': 179,
  'userName': 'projectOrion'
},
{
  'id': 4,
  'datePosted': 'March 22, 2024',
  'title': 'Mountain Climbing',
  'content': 'https://picsum.photos/1000/800',
  'contentType': 'image',
  'likeCount': 120,
  'dislikeCount': 96,
  'commentCount': 55,
  'userName': 'walker7'
},
{
  'id': 5,
  'datePosted': 'March 21, 2024',
  'title': 'Book Review',
  'content': "Just finished reading 'The Great Adventure'. Highly recommend it!",
  'contentType': 'text',
  'likeCount': 73,
  'dislikeCount': 68,
  'commentCount': 105,
  'userName': 'lb00'
},
{
  'id': 6,
  'datePosted': 'March 20, 2024',
  'title': 'New Recipe',
  'content': 'https://picsum.photos/1000/800',
  'contentType': 'image',
  'likeCount': 386,
  'dislikeCount': 56,
  'commentCount': 154,
  'userName': 'Aster'
},
{
  'id': 7,
  'datePosted': 'March 19, 2024',
  'title': 'DIY Gardening',
  'content': 'Gardening is my new hobby! Started with some herbs.',
  'contentType': 'text',
  'likeCount': 184,
  'dislikeCount': 12,
  'commentCount': 62,
  'userName': 'Wood5'
},
{
  'id': 8,
  'datePosted': 'March 18, 2024',
  'title': 'Sunrise Hike',
  'content': 'https://picsum.photos/1000/800',
  'contentType': 'image',
  'likeCount': 444,
  'dislikeCount': 30,
  'commentCount': 7,
  'userName': 'nknight'
},
{
  'id': 9,
  'datePosted': 'March 17, 2024',
  'title': 'Learning Piano',
  'content': "I've decided to learn the piano. Day 1 of practice was challenging but fun!",
  'contentType': 'text',
  'likeCount': 132,
  'dislikeCount': 31,
  'commentCount': 16,
  'userName': 'lunaS'
},
{
  'id': 10,
  'datePosted': 'March 16, 2024',
  'title': 'Night Sky',
  'content': 'https://picsum.photos/1000/800',
  'contentType': 'image',
  'likeCount': 489,
  'dislikeCount': 72,
  'commentCount': 71,
  'userName': 'atWood007'
}]

const postButtons = [
  { icon: ThumbsDown, label: "Like" },
  { icon: ThumbsUp, label: "Dislike" },
  { icon: MessageSquare, label: "Comment" },
  { icon: Share, label: "Share" },
]


const HomePage = () => {
  return (
    <section className='bg-black h-screen w-full flex'>
      <LeftSideBar currentPage="Homepage" />
      <main className="main-content flex-1 overflow-y-auto px-20 pt-6">
        {posts.map(post => (
          <React.Fragment key={post.id}>
            <hr className="border-t border-zinc-800 mx-auto my-4" />
            <article className="bg-black text-white p-4 rounded-lg hover:bg-gray-800">
              <div className="mb-2 flex justify-between items-center">
                <span className="text-base text-zinc-500 hover:text-zinc-200 cursor-pointer">{post.userName}</span>
                <span className="text-base text-zinc-500">{post.datePosted}</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
              {post.contentType === "text" ? (
                <p>{post.content}</p>
              ) : (
                <img src={post.content} alt={post.title} className="max-w-full h-auto rounded-lg" />
              )}

              <div className="buttons flex space-x-4 mt-3">
                <div className='rounded-lg flex items-center space-x-2'>
                  <ThumbsUp className='h-5 w-5 cursor-pointer' color="#fff" /><span>{post.likeCount}</span>
                </div>
                <div className='rounded-lg flex items-center space-x-2'>
                  <ThumbsDown className='h-5 w-5 cursor-pointer' color="#fff" /><span>{post.dislikeCount}</span>
                </div>
                <div className='rounded-lg flex items-center space-x-2'>
                  <MessageSquare className='h-5 w-5 cursor-pointer' color="#fff" /><span>{post.commentCount}</span>
                </div>
                <div className='rounded-lg flex items-center space-x-2'>
                  <Share className='h-5 w-5 cursor-pointer' color="#fff" />
                </div>
              </div>
            </article>
          </React.Fragment>
        ))}
        <Bottombar />
      </main>
      <RightSideBar />
    </section>
  );
}

export default HomePage;