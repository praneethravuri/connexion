import Link from 'next/link'
import React from 'react'
import Logo from './Logo'

const Authbar = () => {
    return (
        <div className=' border-b border-zinc-800 top-0 z-30 flex w-full items-center justify-between bg-black px-6 py-5'>
            <Logo />
            <Link href="/about-us" className='bg-white text-black p-2 rounded-lg hover:bg-accent'>About Us</Link>
        </div>
    )
}

export default Authbar