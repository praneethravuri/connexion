"use client";
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { generateFakeUsers } from "@/utils/generate-data/generateFakeUsers";
import { generateFakePosts } from '@/utils/generate-data/generateFakePosts';
import User, { IUser } from '@/models/userModel';
import Post, { IPost } from '@/models/postModel';
import Community, { ICommunity } from '@/models/communityModel';


const InsertData = () => {

    const [fakeUsers, setFakeUsers] = useState<IUser[]>([]);
    const [fakePosts, setFakePosts] = useState<IPost[]>([]);
    const [fakeCommunities, setFakeCommunities] = useState<ICommunity[]>([]);

    const handleInsertUsers = async () => {
        try {
            // Generate fake users data
            const fakeUsers = generateFakeUsers(10); // Generate 10 fake users

            console.log(JSON.stringify(fakeUsers));

            // Use fetch API to send a POST request to your server
            const response = await fetch('/api/admin-api/insert-users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fakeUsers), // Assuming the backend expects an object with a users property
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Users inserted successfully:', result);
                setFakeUsers(fakeUsers); // Update the state with the generated fake users
            } else {
                console.error('Error inserting users:', result.message);
            }
        } catch (err) {
            console.error('Error inserting fake users data:', err);
        }
    };

    const handleInsertPosts = async () => {
        try {
            const response = await fetch('/api/admin-api/insert-posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Posts inserted successfully:', result);
                setFakePosts(result.postDetails); // Update the state with the inserted fake posts
            } else {
                console.error('Error inserting posts:', result.message);
            }
        } catch (err) {
            console.error('Error inserting fake posts data:', err);
        }
    };

    const handleInsertCommunities = async () => {
        try {
            const response = await fetch('/api/admin-api/insert-communities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Communities inserted successfully:', result);
                setFakeCommunities(result.communityDetails); // Update the state with the inserted fake communities
            } else {
                console.error('Error inserting communities:', result.message);
            }
        } catch (err) {
            console.error('Error inserting fake communities data:', err);
        }
    };

    return (
        <section className='flex w-full justify-between'>
            <Card className='w-full m-5'>
                <CardHeader>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>Insert fake data in the users collection</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="ghost" onClick={handleInsertUsers}>Insert Data</Button>
                </CardContent>
            </Card>
            <Card className='w-full m-5'>
                <CardHeader>
                    <CardTitle>Communities</CardTitle>
                    <CardDescription>Insert fake data in the communities collection</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="ghost" onClick={handleInsertCommunities}>Insert Data</Button>
                </CardContent>
            </Card>
            <Card className='w-full m-5'>
                <CardHeader>
                    <CardTitle>Posts</CardTitle>
                    <CardDescription>Insert fake data in the posts collection</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="ghost" onClick={handleInsertPosts}>Insert Data</Button>
                </CardContent>
            </Card>
        </section>
    )
}

export default InsertData