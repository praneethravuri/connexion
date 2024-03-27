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
    setErrorMessage('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const result = await response.json();
      console.log(result);

      if (result.message === 'Login successful') {
        router.push("/homepage");
      } else {
        setErrorMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      console.log(error);
      setErrorMessage('Failed to login. Please try again.');
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
        <Button className='w-full' variant="ghost" type='submit'>Login</Button>
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