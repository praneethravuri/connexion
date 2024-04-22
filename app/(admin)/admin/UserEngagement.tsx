"use client";
import React, { useState, useEffect } from 'react';
import { IUserDocument } from '@/models/userModel';
import { IPostDocument } from '@/models/postModel';
import { ICommunityDocument } from '@/models/communityModel';
import capitalize from '@/utils/capitalizeWord';

interface UserEngagementProps {
    users: IUserDocument[];
}

const UserEngagement: React.FC<UserEngagementProps> = ({ users }) => {
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [posts, setPosts] = useState<IPostDocument[]>([]);
    const [communities, setCommunities] = useState<ICommunityDocument[]>([]);

    useEffect(() => {
        if (selectedUserId) {
            const fetchUserEngagementData = async () => {
                try {
                    const response = await fetch(`/api/admin-api/user-engagement?userId=${selectedUserId}`);
                    const data = await response.json();

                    if (response.ok) {
                        setPosts(data.posts);
                        setCommunities(data.communities);
                    } else {
                        console.error('Error fetching user engagement data:', data.message);
                    }
                } catch (err) {
                    console.error('Error fetching user engagement data:', err);
                }
            };

            fetchUserEngagementData();
        }
    }, [selectedUserId]);

    const handleUserClick = (userId: string, userName: string) => {
        console.log(`Clicked user ID: ${userId}`);
        console.log(`Clicked username: ${userName}`);
        setSelectedUserId(userId);
    };

    return (
        <section className='h-96 overflow-y-auto text-white p-4 rounded-lg'>
            <h1 className='text-xl font-semibold mt-5 mb-5'>User Engagement</h1>

            <div className="display-info flex space-x-4">
                <div className="show-users border border-zinc-800 rounded-lg p-2 overflow-auto h-96 w-96">
                    {users.map((user) => (
                        <div
                            className={`border-b border-zinc-800 rounded-lg p-2 cursor-pointer ${user._id === selectedUserId ? 'bg-neutral-900' : ''
                                }`}
                            key={user._id}
                            onClick={() => handleUserClick(user._id, user.userName)}
                        >
                            {user.userName}
                        </div>
                    ))}
                </div>

                <div className="show-posts border border-zinc-800 rounded-lg p-2 overflow-auto h-96 w-96">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div className='border border-zinc-800 rounded-lg m-2 p-2' key={post._id}>
                                <h3 className='text-lg font-semibold'>{post.title}</h3>
                                <p className='text-base text-neutral-500'>Community: {capitalize(post.community)}</p>
                            </div>
                        ))
                    ) : (
                        <div className='no-posts text-center m-20'>
                            <p>No posts found.</p>
                        </div>
                    )}
                </div>

                <div className="show-communities border border-zinc-800 rounded-lg p-2 overflow-auto h-96 w-96">
                    {communities.length > 0 ? (
                        communities.map((community) => (
                            <div className='border border-neutral-900 rounded-lg m-2 p-2' key={community._id}>
                                <h3 className='text-lg font-semibold'>{capitalize(community.communityName)}</h3>
                                <p className='text-base text-neutral-500'>Members: {community.communityMembers}</p>
                            </div>
                        ))
                    ) : (
                        <div className="no-communities text-center m-20">
                            <p>No communities found.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default UserEngagement;