import React from 'react';
import Link from 'next/link';
import { Home, Send, Handshake, User, BadgePlus, LogOut } from 'lucide-react';
import Logo from './Logo';
// import { usePathname } from "next/navigation";
import LogOutForm from './LogOutForm';
import { getSession } from '@/lib/actions';

const navItems = [
    { href: '/homepage', icon: Home, label: 'Home' },
    { href: '/community', icon: Handshake, label: 'Community' },
    { href: '/create', icon: BadgePlus, label: 'Create' },
    { href: '/profile', icon: User, label: 'Profile' },
    { href: '/login', icon: LogOut, label: 'Log Out' },
];

const NavBar = async () => {
    // const pathname = usePathname();
    const session = await getSession();
    console.log(session);

    return (
        <>
            <div className='top-0 z-30 flex w-full items-center justify-between bg-black px-6 py-6'>
                <Logo />
                <div className='flex space-x-4'>
                    {navItems.map(({ href, icon: Icon, label }) => {
                        // const isActive = pathname === href;
                        const isNotLogoutIcon = Icon !== LogOut;
                        return (
                            // className={`p-2 rounded ${isActive ? 'bg-gray-800' : ''} ${isNotLogoutIcon ? 'max-sm:hidden' : ''}`
                            <div key={label} className='p-2 rounded-lg max-sm:hidden' >
                                <Link href={href} passHref>
                                    <Icon color="#fff" />
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
