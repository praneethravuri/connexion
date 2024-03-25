import React from 'react';
import Link from 'next/link'; // Import Link from next/link
import { Home, Send, Handshake, User, Bell, LogOut } from 'lucide-react';
import Logo from './Logo';

const NavBar = () => {
    return (
        <div className='fixed top-0 z-30 flex w-full items-center justify-between bg-black px-6 py-6'>
            <Logo />
            <div className='flex space-x-4'>
                <Link href="/homepage" passHref><Home color="#fff" /></Link>
                <Link href="/messages" passHref><Send color="#fff" /></Link>
                <Link href="/communities" passHref><Handshake color="#fff" /></Link>
                <Link href="/notifications" passHref><Bell color="#fff" /></Link>
                <Link href="/profile" passHref><User color="#fff" /></Link>
                <Link href="/logout" passHref><LogOut color="#fff"/></Link>
            </div>
        </div>
    );
}

export default NavBar;
