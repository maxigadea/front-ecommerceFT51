'use client'
import { usePathname } from 'next/navigation'
import React from 'react'

const ShowComponent = ({children}: {children: React.ReactNode}) => {
    const pathname = usePathname();
  return (
    <div className='w-full'>
        {
            pathname !== "/login" && (
                children
            ) 
        }
    </div>
  )
}

export default ShowComponent