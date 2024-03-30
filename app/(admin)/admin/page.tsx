import React from 'react'
import { Users, StickyNote, Handshake } from 'lucide-react';
import Link from 'next/link';

const AdminPage = () => {

  const adminControls = [
    { icon: Users, label: "Users", href:"/admin/users" },
    { icon: StickyNote, label: "Posts", href:"/admin/posts" },
    { icon: Handshake, label: "Communities" ,href:"/admin/communities" },
  ]

  return (
    <section >
      
      
      <main>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, ullam.</p>
      </main>

    </section>
  )
}

export default AdminPage