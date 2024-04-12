import React from 'react';
import { getSession } from '@/lib/actions';
import { redirect } from 'next/navigation';
import AdminPage from './AdminPage';
import LogOutForm from '@/components/shared/LogOutForm';

const page = async () => {

  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/");
  }

  else if(session.email !== "admin@connexion.com"){
    redirect("/");
  }

  return (
    <AdminPage />
  )
}

export default page