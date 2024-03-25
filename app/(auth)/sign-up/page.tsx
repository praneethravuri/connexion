"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import AuthLayout from '../layout';

export default function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [emailConfirm, setEmailConfirm] = useState("");
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage('');

        if (email !== emailConfirm || password !== passwordConfirm) {
            setErrorMessage("Incorrect details. Please try again.")
        }
        console.log(password);
    };

    return (
        <AuthLayout title="Create an account" subtitle="Enter your details to create your account" errorMessage={errorMessage}>
            <form onSubmit={handleSubmit}>
                <Input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    placeholder="Re-enter Email"
                    value={emailConfirm}
                    onChange={(e) => setEmailConfirm(e.target.value)}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                    placeholder="Re-enter Password"
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <Input
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <button type='submit' className={cn(buttonVariants({ variant: "ghost" }))}>Sign Up</button>
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
