import React from 'react';
import LeftSideBar from '@/components/shared/LeftSideBar';
import Bottombar from '@/components/shared/Bottombar';
import RightSideBar from '@/components/shared/RightSideBar';

const posts = [
  { id: 1, name: "Alice Johnson", datePosted: "March 25, 2024", title: "Sunset", content: "Beautiful sunset at the beach", contentType: "text" },
  { id: 2, name: "Bob Smith", datePosted: "March 24, 2024", title: "Vacation Time", content: "https://picsum.photos/200/300", contentType: "image" },
  { id: 3, name: "Carol Jones", datePosted: "March 23, 2024", title: "A Day at the Park", content: "It was a lovely day at the park with family.", contentType: "text" },
  { id: 4, name: "Dave Wilson", datePosted: "March 22, 2024", title: "Mountain Climbing", content: "https://picsum.photos/200/300", contentType: "image" },
  { id: 5, name: "Eve Carter", datePosted: "March 21, 2024", title: "Book Review", content: "Just finished reading 'The Great Adventure'. Highly recommend it!", contentType: "text" },
  { id: 6, name: "Frank Garcia", datePosted: "March 20, 2024", title: "New Recipe", content: "https://picsum.photos/200/300", contentType: "image" },
  { id: 7, name: "Grace Lee", datePosted: "March 19, 2024", title: "DIY Gardening", content: "Gardening is my new hobby! Started with some herbs.", contentType: "text" },
  { id: 8, name: "Henry Turner", datePosted: "March 18, 2024", title: "Sunrise Hike", content: "https://picsum.photos/200/300", contentType: "image" },
  { id: 9, name: "Isabel Moore", datePosted: "March 17, 2024", title: "Learning Piano", content: "I've decided to learn the piano. Day 1 of practice was challenging but fun!", contentType: "text" },
  { id: 10, name: "Jake Ellis", datePosted: "March 16, 2024", title: "Night Sky", content: "https://picsum.photos/200/300", contentType: "image" },
];


const HomePage = () => {
  return (
    <section className='bg-black h-screen w-full flex'>
      <LeftSideBar currentPage="Homepage" />
      <main className="main-content flex-1 overflow-y-auto px-20 pt-6 w-full">
        <h2 className="text-white text-2xl mb-4">Posts</h2>
        {posts.map(post => (
          <>
            <hr className="border-t border-zinc-800 mx-auto pb-2" />
            <article key={post.id} className="bg-black text-white p-4 rounded-lg mb-4 hover:bg-gray-800">
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p className="text-sm mb-2">Posted by {post.name} on {post.datePosted}</p>
              {post.contentType === "text" ? (
                <p>{post.content}</p>
              ) : (
                <img src={post.content} alt={post.title} className="max-w-full h-auto" />
              )}
            </article>
          </>
        ))}
        <Bottombar />
      </main>
      <RightSideBar />
    </section>
  );
}

export default HomePage;
