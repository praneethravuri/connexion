
import { ReactNode } from "react";
import Authbar from "@/components/shared/static/Authbar";

export default function AuthLayout({ children, title, subtitle, errorMessage }: { children: ReactNode, title: string, subtitle: string, errorMessage?: string }) {
  return (
    <section >
      <div className='container min-w-96 mx-auto px-4 sm:px-6 lg:px-8 flex h-screen w-full flex-col items-center justify-center'>
        <h1 className='text-2xl sm:text-lg md:text-xl lg:text-2xl font-semibold'>{title}</h1>
        <h3 className='text-xs sm:text-sm md:text-base text-gray-400'>{subtitle}</h3>
        {errorMessage && <div className='text-red-500 p-1'>{errorMessage}</div>}
        {children}
      </div>
    </section>
  );
}
