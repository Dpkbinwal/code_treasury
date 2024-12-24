"use client"

import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'


const ProfileUser = () => {
    const { user } = useUser()
    const imageUrl = user?.imageUrl;

    const loading = (
        <div className='w-9 h-9 rounded-full mb-[5px] bg-slate-200'></div>
    )
    const loadingEmail = (
        <div className='w-[130px] h-3 rounded-lg mb-[5px] bg-slate-200'></div>
    )
    const loadingName = (<div className='w-[100px] h-4 rounded-lg mb-[5px] bg-slate-200'></div>)


    return (
        <div className=' flex gap-3 items-center mr-2'>
            {
                !user ? loading : (
                    <img  src={imageUrl} alt={`${user.firstName}`} className=' max-md:w-[40px] max-md:h-[40px]  w-9 h-9 rounded-full mb-[5px]' />
                )
            }
            {
                <div className='flex flex-col max-md:hidden'>
                    {
                        !user ? loadingName : <span className='font-semibold  text-slate-600 '>{`${user?.firstName} `}</span>

                    }
                    {
                        !user? loadingEmail : <span className='text-[11px] text-slate-400' >{`${user?.emailAddresses} `}</span>

                    }
                </div>
            }
        </div>
    )
}

export default ProfileUser