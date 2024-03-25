// layout.tsx
import { ReactNode } from "react";
import Head from "next/head";
import Authbar from "@/components/shared/Authbar";

export default function AuthLayout({ children, title, subtitle, errorMessage }: { children: ReactNode, title: string, subtitle: string, errorMessage?: string }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={subtitle} />
      </Head>
      <Authbar />
      <div className='container min-w-96 mx-auto px-4 sm:px-6 lg:px-8 flex h-screen w-full flex-col items-center justify-center'>
        <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold'>{title}</h1>
        <h3 className='text-xs sm:text-sm md:text-base text-gray-400'>{subtitle}</h3>
        {errorMessage && <div className='text-red-500'>{errorMessage}</div>}
        {children}
      </div>
    </>
  );
}
