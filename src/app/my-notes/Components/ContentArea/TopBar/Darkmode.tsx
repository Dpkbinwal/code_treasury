"use client"

import { useGlobalContext } from '../../../../../ContextApi'
import React from 'react'

const Darkmode = () => {

    const { darkModeObject: { darkMode , setDarkMode } } = useGlobalContext();

    const handleClickDarkMode =(index:number)=>{
        const updateDarkMode = darkMode.map((val,ind)=>{
            if(index==ind){
                return {...val, isSelected:true}
            }else 
            return {...val, isSelected:false}
        })
        setDarkMode(updateDarkMode)
    }

  return (
    <div className='h-[36px] w-[74px] bg-slate-100 rounded-3xl flex justify-center items-center gap-3'>
        {
           darkMode.map((item,ind)=>(
            <div key={ind} className={` cursor-pointer ${item.isSelected ? 'bg-purple-600 text-white ':'text-purple-600 bg-slate-100' } w-7 h-7 flex items-center justify-center rounded-full top-[4px] p-1 left-0 select-none`} onClick={()=>handleClickDarkMode(ind)}>
                {item.icon} 
            </div>
 
           ))
        }
    </div>
  )
}

export default Darkmode