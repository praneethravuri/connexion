"use client";
import React from 'react';
import Link from 'next/link';
import { Home, Send, Handshake, User, BadgePlus, LogOut } from 'lucide-react';
import Logo from './Logo';
import { usePathname } from "next/navigation";

const navItems = [
    { href: '/homepage', icon: Home, label: 'Home' },
    { href: '/messages', icon: Send, label: 'Messages' },
    { href: '/people', icon: Handshake, label: 'People' },
    { href: '/create', icon: BadgePlus, label: 'Create' },
    { href: '/profile', icon: User, label: 'Profile' },
    { href: '/login', icon: LogOut, label: 'Log Out' },
];

const NavBar = () => {
    const pathname = usePathname();

    return (
        <>
            <div className='top-0 z-30 flex w-full items-center justify-between bg-black px-6 py-6'>
                <Logo />
                <div className='flex space-x-4'>
                    {navItems.map(({ href, icon: Icon, label }) => {
                        const isActive = pathname === href;
                        const isNotLogoutIcon = Icon !== LogOut;
                        return (

                            <div key={label} className={`p-2 rounded ${isActive ? 'bg-gray-800' : ''} ${isNotLogoutIcon ? 'max-sm:hidden' : ''}`} >
                                <Link href={href} passHref>
                                    <Icon color="#fff" />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
            <hr className="border-t border-zinc-800 mx-auto w-11/12" />
        </>
    );
}

export default NavBar;
