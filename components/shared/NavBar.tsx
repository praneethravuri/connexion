"use client";
import React from 'react';
import Link from 'next/link';
import { Home, Send, Handshake, User, Bell, LogOut } from 'lucide-react';
import Logo from './Logo';
import { usePathname } from "next/navigation"; // Imported for determining the active route

const navItems = [
    { href: '/homepage', icon: Home, label: 'Home' },
    { href: '/messages', icon: Send, label: 'Messages' },
    { href: '/people', icon: Handshake, label: 'People' },
    { href: '/notifications', icon: Bell, label: 'Notifications' },
    { href: '/profile', icon: User, label: 'Profile' },
    { href: '/login', icon: LogOut, label: 'Log Out' },
];

const NavBar = () => {
    const pathname = usePathname();

    return (
        <div className='top-0 z-30 flex w-full items-center justify-between bg-black px-6 py-6'>
            <Logo />
            <div className='flex space-x-4'>
                {navItems.map(({ href, icon: Icon, label }) => {
                    const isActive = pathname === href;
                    return (
                        
                        <div key={label} className={`p-2 rounded ${isActive ? 'bg-zinc-800' : ''}`} >
                            <Link href={href} passHref>
                                <div className="cursor-pointer">
                                    <Icon color="#fff"/>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default NavBar;
