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
import { generateFakeUsers } from "@/lib/generate-data/generateFakeUsers";
import User, { IUser } from '@/models/userModel';
import { signUpHandler } from '@/app/api/authApi/signApi/signUpHandler';


const InsertData = () => {

    const [fakeUsers, setFakeUsers] = useState<IUser[]>([]);

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
                    <CardTitle>Posts</CardTitle>
                    <CardDescription>Insert fake data in the posts collection</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="ghost">Insert Data</Button>
                </CardContent>
            </Card>
            <Card className='w-full m-5'>
                <CardHeader>
                    <CardTitle>Communities</CardTitle>
                    <CardDescription>Insert fake data in the communities collection</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="ghost">Insert Data</Button>
                </CardContent>
            </Card>
        </section>
    )
}

export default InsertData