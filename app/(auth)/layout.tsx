// layout.tsx
import { ReactNode } from "react";
import Head from "next/head";
import Authbar from "@/components/shared/Authbar";
import Bottombar from "@/components/shared/Bottombar";

export default function AuthLayout({ children, title, subtitle, errorMessage }: { children: ReactNode, title: string, subtitle: string, errorMessage?:string }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={subtitle} />
      </Head>
      <Authbar />
      <div className='container flex h-screen w-screen flex-col items-center justify-center'>
        <h1 className='text-2xl font-semibold'>{title}</h1>
        <h3 className='text-gray-400 text-sm'>{subtitle}</h3>
        {errorMessage && <div className='text-red-500'>{errorMessage}</div>}
        {children}
      </div>
      <Bottombar />
    </>
  );
}
