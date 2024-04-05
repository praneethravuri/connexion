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

            // Insert fake users data into the "users" collection
            for (const fakeUser of fakeUsers) {
                const { name, email, password, phoneNumber, userName } = fakeUser;
                const result = await signUpHandler(name, email, password, phoneNumber, userName);

                if (result.message !== 'success') {
                    console.error(`Error creating user: ${result.message}`);
                } else {
                    console.log('User created successfully:', result.userDetails);
                }
            }

            setFakeUsers(fakeUsers); // Update the state with the generated fake users
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