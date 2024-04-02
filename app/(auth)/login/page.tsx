"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import AuthLayout from "../layout";
import { login } from "@/lib/actions"

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    try {
      await login({ email, password });
    } catch (error) {
      console.error('Error:', error);
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
          name='email'
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name='password'
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