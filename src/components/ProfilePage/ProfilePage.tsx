'use client'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const ProfilePage = () => {

    const router = useRouter();
    const {userData} = useAuth();

    useEffect(() => {
        if(userData?.user.name) {
            userData?.user.name === undefined && router.push("/login")
        }
    }, [userData?.user])

    console.log(userData)

    const handleLogout = () => {
        console.log("te desloguesate")

        Swal.fire({
            title: "You are logged out",
            width: 400,
            padding: "3em",
        });

        localStorage.removeItem('userSession')
        router.push("/")
    };

  return (
    <div className='flex flex-col items-center justify-center gap-4 mt-4'>
        <h1>Dashboard de usuario</h1>
        <h2>Bienvenido: {userData?.user?.name}</h2>
        <p>Tu dirección es: {userData?.user?.address}</p>
        <button onClick={handleLogout} className="bg-gray-200 rounded-lg px-4 py-2">Logout</button>
    </div>
  )
}

export default ProfilePage