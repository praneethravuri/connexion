"use client";
import React from 'react'
import { Home, Send, Handshake, User, Bell, LogOut } from 'lucide-react';
import Logo from './Logo';
import { usePathname } from "next/navigation";
import Link from 'next/link';

const Bottombar = () => {
  const pathname = usePathname();
  const navItems = [
    { href: '/homepage', icon: Home, label: 'Home' },
    { href: '/messages', icon: Send, label: 'Messages' },
    { href: '/people', icon: Handshake, label: 'People' },
    { href: '/notifications', icon: Bell, label: 'Notifications' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className='fixed bottom-0 z-30 flex w-full items-center justify-center bg-black px-6 py-3 text-center sm:hidden'>
      <div className='flex space-x-14'>
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <div key={label} className={`p-2 rounded ${isActive ? 'bg-zinc-800' : ''} `} >
              <Link href={href} passHref>
                <div className="cursor-pointer">
                  <Icon color="#fff" />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Bottombar
