import React from 'react'
import { logout } from '@/lib/actions'
import { Button } from '@/components/ui/button'

const LogOutForm = () => {
  return (
    <form action={logout}>
        <Button variant="ghost">Logout</Button>
    </form>
  )
}

export default LogOutForm