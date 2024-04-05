"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import AuthLayout from '../layout';
import { signUp } from '@/lib/actions';
import { useRouter } from 'next/router';

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        name: "",
        userName: "",
        email: "",
        emailConfirm: "",
        password: "",
        passwordConfirm: "",
        phoneNumber: "",
    });
    const [errorMessage, setErrorMessage] = useState('');


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage('');

        const { name, email, emailConfirm, password, passwordConfirm, userName, phoneNumber } = formData;

        if (email !== emailConfirm || password !== passwordConfirm) {
            setErrorMessage("Emails or passwords do not match. Please try again.");
            return;
        }
        try {
            const message = await signUp({ name, email, password, phoneNumber, userName });
            if (message === "success") {
                console.log("success");
                const router = useRouter();
                router.push('/homepage');
            } else {
                setErrorMessage(message);
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <AuthLayout title="Create an account" subtitle="Enter your details to create your account" errorMessage={errorMessage}>
            <form onSubmit={handleSubmit}>
                <Input
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <Input
                    name="userName"
                    placeholder="Username"
                    value={formData.userName}
                    onChange={handleChange}
                />
                <Input
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <Input
                    name="emailConfirm"
                    placeholder="Re-enter Email"
                    value={formData.emailConfirm}
                    onChange={handleChange}
                />
                <Input
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <Input
                    name="passwordConfirm"
                    placeholder="Re-enter Password"
                    type="password"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                />
                <Input
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
                <Button className='w-full' variant="ghost" type='submit'>Sign Up</Button>
            </form>
            <p className='text-gray-400'>
                Already have an account?
                <span className='ml-2'>
                    <Link className='text-offWhiteText hover:underline' href="/login" passHref>
                        Login
                    </Link>
                </span>
            </p>
        </AuthLayout>
    );
}
