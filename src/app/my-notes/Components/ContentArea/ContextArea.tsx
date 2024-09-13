import { bodyBgImage } from '@/assets'
import React from 'react'
import ProfileUser from './TopBar/ProfileUser'
import SearchBar from './TopBar/SearchBar'

const ContextArea = () => {
  return (
    <div className='w-[80%] bg-slate-100 p-5'>
        <TopBar/>
    </div>
  )
}

function TopBar(){
    return (
        <div className='rounded-lg flex justify-between items-center bg-white p-3' >
            <ProfileUser/>
            <SearchBar/>
        </div>
    )
}

export default ContextArea