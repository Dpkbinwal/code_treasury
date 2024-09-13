import { SearchOutlined } from '@mui/icons-material'
import React from 'react'

const SearchBar = () => {
  return (
    <div className='relative pl-3 w-[50%] h-[38px] bg-slate-100 rounded-3xl flex items-center gap-2'>
        <SearchOutlined />   
        <input
        placeholder='Search a code........'
        className='w-[70%] outline-none text-sm bg-slate-100 text-slate-500'
        />
        <Btn />
    </div>
  )
}

function Btn(){
    return (
        <div className='absolute flex gap-2 rounded-3xl px-4 bg-purple-600 text-white items-center cursor-pointer select-none '>
            <div className='font-bold'>+</div>
            <div>snippet</div>
        </div>
    )
}

export default SearchBar