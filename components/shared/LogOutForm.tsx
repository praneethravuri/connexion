import React from 'react'
import { logout } from '@/lib/actions'

const LogOutForm = () => {
  return (
    <form action={logout}>
        <button>Logout</button>
    </form>
  )
}

export default LogOutForm