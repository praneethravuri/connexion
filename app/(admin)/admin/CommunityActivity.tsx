// CommunityActivity.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { ICommunityDocument } from '@/models/communityModel';
import { IPostDocument } from '@/models/postModel';
import capitalize from '@/utils/capitalizeWord';

interface CommunityActivityProps {
    communities: ICommunityDocument[];
}

const CommunityActivity: React.FC<CommunityActivityProps> = ({ communities }) => {
    const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);
    const [posts, setPosts] = useState<IPostDocument[]>([]);
    const [postStats, setPostStats] = useState({ totalPosts: 0, uniqueUsers: 0 });

    useEffect(() => {
        if (selectedCommunityId) {
            const fetchCommunityPosts = async () => {
                try {
                    // const response = await fetch(`/api/communityActivity?communityId=${selectedCommunityId}`);
                    const response = await fetch(`/api/admin-api/community-activity?communityId=${selectedCommunityId}`)
                    const data = await response.json();

                    if (response.ok) {
                        setPosts(data.posts);
                        setPostStats({
                            totalPosts: data.totalPosts,
                            uniqueUsers: data.uniqueUsers
                        });
                    } else {
                        console.error('Error fetching community posts:', data.message);
                    }
                } catch (err) {
                    console.error('Error fetching community posts:', err);
                }
            };

            fetchCommunityPosts();
        }
    }, [selectedCommunityId]);

    const handleCommunitySelect = (communityId: string, communityName: string) => {
        console.log(`Selected community ID: ${communityId}`);
        console.log(`Selected community name: ${communityName}`);
        setSelectedCommunityId(communityId);
    };

    return (
        <section className='h-96 overflow-y-auto  text-white p-4 rounded-lg'>
            <h1 className='text-xl font-semibold mt-5 mb-5'>Community Activity</h1>
            <div className="display-info flex space-x-4">
                <div className="list-communities border border-zinc-800 rounded-lg p-2 overflow-auto h-96 w-96">
                    {communities.map((community) => (
                        <div
                            className={`border-b border-zinc-800 rounded-lg p-2 cursor-pointer ${community._id === selectedCommunityId ? 'bg-neutral-900' : ''}`}
                            key={community._id}
                            onClick={() => handleCommunitySelect(community._id, community.communityName)}
                        >
                            {capitalize(community.communityName)}
                        </div>
                    ))}
                </div>
                <div className="community-stats border border-zinc-800 rounded-lg p-2 overflow-auto h-96 w-96">

                    {posts.map((post) => (
                        <div key={post._id} className='border border-zinc-800 rounded-lg m-2 p-2'>
                            <h3 className='text-lg font-semibold'>{post.title}</h3>
                        </div>
                    ))}
                </div>
                <div className="stats flex flex-col items-center justify-center h-96 w-96  border border-zinc-800 rounded-lg p-2">
                    <p className='text-xl font-semibold text-center'>Total Posts: {postStats.totalPosts}</p>
                    <p className='text-xl font-semibold text-center'>Unique Contributors: {postStats.uniqueUsers}</p>
                </div>

            </div>
        </section>
    );
};

export default CommunityActivity;
