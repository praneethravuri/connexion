import React from 'react'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/login"><h1 className='text-2xl font-semibold'>Connexion</h1></Link>
  )
}

export default Logo