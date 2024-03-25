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
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prefixEmail = "1";
    const prefixPassword = "1"

    if (email === prefixEmail && password === prefixPassword) {
      router.push("/sign-up");
    }
    else {
      console.log("invalid credentials")
    }

    console.log("Logging in with", email, password);
  };
  return (
    <div className='container flex h-screen w-screen flex-col items-center justify-center '>
      <h1 className='text-2xl font-semibold'>Login to you account</h1>
      <h3 className='text-gray-400 text-sm'>Enter your email and password to login</h3>
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
        {/* <Button type="submit">Log In</Button> */}
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
