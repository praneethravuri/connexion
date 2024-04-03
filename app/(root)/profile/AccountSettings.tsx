"use client";
import React, { useState } from 'react';
import { Input } from "@/components/ui/Input";
import { Button } from '@/components/ui/Button';

const AccountSettings = ({ userDetails }) => {
  const [formData, setFormData] = useState({
    name: userDetails.name,
    username: userDetails.userName,
    email: userDetails.email,
    password: userDetails.password,
    phoneNumber: userDetails.phoneNumber,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/update-user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // User updated successfully, handle any necessary actions
        console.log('User updated successfully');
      } else {
        // Handle error
        console.error('Error updating user');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <main className='mt-4 w-2/3 space-y-10'>

      <div className="heading">
        <p className='text-2xl font-semibold'>Account</p>
        <p className='text-gray-400'>This is where you can update your details</p>
        <hr className="border-t border-zinc-800 mx-auto my-4" />
      </div>

      <form onSubmit={handleSubmit} className='space-y-10'>
        <div>
          <p className='text-2xl font-semibold'>Profile</p>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <p className='text-2xl font-semibold'>Profile</p>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div>
        <p className='text-2xl font-semibold'>Email</p>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
        <p className='text-2xl font-semibold'>Password</p>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
        <p className='text-2xl font-semibold'>Phone Number</p>
          <Input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <Button variant="ghost" type="submit">Update Profile</Button>
      </form>
    </main>

  );
};

export default AccountSettings;