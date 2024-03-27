import React from 'react';
import LeftSideBar from '@/components/shared/LeftSideBar';
import Bottombar from '@/components/shared/Bottombar';
import RightSideBar from '@/components/shared/RightSideBar';

// Sample data for posts
const posts = [
  { id: 1, name: "Alice Johnson", datePosted: "March 25, 2024", title: "Sunset", content: "Beautiful sunset at the beach", contentType: "text" },
  { id: 2, name: "Bob Smith", datePosted: "March 24, 2024", title: "Vacation Time", content: "/path/to/image2.jpg", contentType: "image" },
  { id: 2, name: "Bob Smith", datePosted: "March 24, 2024", title: "Vacation Time", content: "/path/to/image2.jpg", contentType: "image" },
  { id: 2, name: "Bob Smith", datePosted: "March 24, 2024", title: "Vacation Time", content: "/path/to/image2.jpg", contentType: "image" },
  { id: 2, name: "Bob Smith", datePosted: "March 24, 2024", title: "Vacation Time", content: "/path/to/image2.jpg", contentType: "image" },
  { id: 2, name: "Bob Smith", datePosted: "March 24, 2024", title: "Vacation Time", content: "/path/to/image2.jpg", contentType: "image" },
  { id: 2, name: "Bob Smith", datePosted: "March 24, 2024", title: "Vacation Time", content: "/path/to/image2.jpg", contentType: "image" },
  { id: 2, name: "Bob Smith", datePosted: "March 24, 2024", title: "Vacation Time", content: "/path/to/image2.jpg", contentType: "image" },
  { id: 2, name: "Bob Smith", datePosted: "March 24, 2024", title: "Vacation Time", content: "/path/to/image2.jpg", contentType: "image" },
  { id: 2, name: "Bob Smith", datePosted: "March 24, 2024", title: "Vacation Time", content: "/path/to/image2.jpg", contentType: "image" },
  { id: 2, name: "Bob Smith", datePosted: "March 24, 2024", title: "Vacation Time", content: "/path/to/image2.jpg", contentType: "image" },
  { id: 2, name: "Bob Smith", datePosted: "March 24, 2024", title: "Vacation Time", content: "/path/to/image2.jpg", contentType: "image" },
  { id: 2, name: "Bob Smith", datePosted: "March 24, 2024", title: "Vacation Time", content: "/path/to/image2.jpg", contentType: "image" },
  { id: 2, name: "Bob Smith", datePosted: "March 24, 2024", title: "Vacation Time", content: "/path/to/image2.jpg", contentType: "image" },
  { id: 2, name: "Bob Smith", datePosted: "March 24, 2024", title: "Vacation Time", content: "/path/to/image2.jpg", contentType: "image" },
  { id: 2, name: "Bob Smith", datePosted: "March 24, 2024", title: "Vacation Time", content: "/path/to/image2.jpg", contentType: "image" },
  // Add more posts here...
  // For brevity, adding only a couple of posts. You can duplicate or add more with varied content.
];

const HomePage = () => {
  return (
    <section className='bg-black h-screen w-full flex'>
      <LeftSideBar currentPage="Homepage" />
      <main className="main-content flex-1 overflow-y-auto p-4 w-3/6">
        <h2 className="text-white text-2xl mb-4">Posts</h2>
        {posts.map(post => (
          <article key={post.id} className="bg-blackBackground text-white p-4 rounded-lg mb-4">
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p className="text-sm mb-2">Posted by {post.name} on {post.datePosted}</p>
            {post.contentType === "text" ? (
              <p>{post.content}</p>
            ) : (
              <img src={post.content} alt={post.title} className="max-w-full h-auto" />
            )}
          </article>
        ))}
        <Bottombar />
      </main>
      <RightSideBar />
    </section>
  );
}

export default HomePage;
