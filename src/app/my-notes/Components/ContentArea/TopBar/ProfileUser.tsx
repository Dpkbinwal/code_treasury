"use client"

import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const ProfileUser = () => {
    const { user } = useUser()
    const imageUrl = user?.imageUrl;

    const loading = (
        <div className='w-9 h-9 rounded-full mb-[5px] bg-slate-900'></div>
    )

    return (
        <div className=' flex gap-3 items-center'>
            {
                !user ? loading : (
                    <img src={imageUrl} alt={`${user.firstName}`} className='w-9 h-9 rounded-full mb-[5px]' />
                )
            }
            {
                <div className='flex flex-col'>
                    <span className='font-semibold' >{`${user?.firstName} `}</span>
                    <span className='text-[11px] text-slate-400' >{`${user?.emailAddresses} `}</span>
                </div>
            }
        </div>
    )
}

export default ProfileUser