import React from 'react';
import Link from 'next/link';
import { Home, Handshake, User, BadgePlus, LogOut } from 'lucide-react';
import Logo from './Logo';
import LogOutForm from '../LogOutForm';
import { getSession } from '@/lib/actions';

const navItems = [
    { href: '/homepage', icon: Home, label: 'Home' },
    { href: '/community', icon: Handshake, label: 'Community' },
    { href: '/create', icon: BadgePlus, label: 'Create' },
    { href: '/profile', icon: User, label: 'Profile' },
];

const NavBar = async () => {
    const session = await getSession();
    console.log(session);

    return (
        <>
            <div className='top-0 z-30 flex w-full items-center justify-between bg-black px-4 py-3'>
                <Logo />
                <div className='flex space-x-4'>
                    {navItems.map(({ href, icon: Icon, label }) => {
                        const isNotLogoutIcon = Icon !== LogOut;
                        return (
                            <div key={label} className='p-2 rounded-lg max-sm:hidden' >
                                <Link href={href} passHref className='flex items-center space-x-2 hover:bg-gray-800 p-3 rounded-lg'>
                                    <Icon color="#fff" />
                                    <p>{label}</p>
                                </Link>
                            </div>
                        );
                    })}
                </div>
                {session.isLoggedIn && <LogOutForm />}
            </div>
            <hr className="border-t border-zinc-800 mx-auto w-11/12" />
        </>
    );
}

export default NavBar;
