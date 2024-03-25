import Link from 'next/link'
import React from 'react'

const Authbar = () => {
    return (
        <div className='fixed top-0 z-30 flex w-full items-center justify-between bg-black px-6 py-3'>
            <h1 className='text-lg font-semibold'>Connexion</h1>
            <Link href="/about-us" className='bg-white text-black p-2 rounded-lg hover:bg-accent'>About Us</Link>
        </div>
    )
}

export default Authbar