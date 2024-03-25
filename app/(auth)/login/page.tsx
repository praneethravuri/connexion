"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import AuthLayout from "../layout";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prefixEmail = "1";
    const prefixPassword = "1";
    setErrorMessage('');

    if (email === prefixEmail && password === prefixPassword) {
      router.push("/homepage");
    }
    else {
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <AuthLayout title="Login to your account" subtitle="Enter your email and password to login" errorMessage={errorMessage}>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="ghost" type='submit'>Login</Button>
      </form>
      <p className='text-gray-400'>
        Don't have an account?
        <span className='ml-2'>
          <Link className='text-offWhiteText hover:underline' href="/sign-up" passHref>
            Sign Up
          </Link>
        </span>
      </p>
    </AuthLayout>
  );
}
