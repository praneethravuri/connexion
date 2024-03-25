"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

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
    <div className='container flex h-screen w-screen flex-col items-center justify-center'>
      <h1 className='text-2xl font-semibold'>Login to your account</h1>
      <h3 className='text-gray-400 text-sm'>Enter your email and password to login</h3>
      {errorMessage && <div className='text-red-500 text-sm'>{errorMessage}</div>} {/* Display error message if any */}
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
        <button type='submit' className={cn(buttonVariants({ variant: "ghost" }))}>Login</button>
      </form>
      <p className='text-gray-400'>
        Don't have an account?
        <span className='ml-2'>
          <Link className='text-offWhiteText hover:underline' href="/sign-up" passHref>
            Sign Up
          </Link>
        </span>
      </p>
    </div>
  );
}
