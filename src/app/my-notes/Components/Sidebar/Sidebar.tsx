"use client"

import React from 'react'
import DataObjectIcon from '@mui/icons-material/DataObject';
import BorderAllIcon from "@mui/icons-material/BorderAll"
import { DeleteOutlineOutlined, FavoriteBorder } from '@mui/icons-material';
import { mainColor } from '@/assets/colors/Colors';
import JavascriptOutlinedIcon from '@mui/icons-material/JavascriptOutlined';
import { useGlobalContext } from '@/ContextApi';

export default function Sidebar() {
    return (
        <div className=' w-[20%] p-5 flex flex-col gap-2 h-screen pt-7 border-r pl-[25px]' >
            <Logo />
            <QuickLinks />
            <Languages />
        </div>
    )
}

function Logo() {
    return (
        <div className='flex gap-2 items-center'>
            <div className={`bg-purple-600 p-[6px] rounded-md`} >
                <DataObjectIcon sx={{ fonstSize: 27, color: "white" }} />
            </div>
            <div className='flex gap-1 text-[19px]'>
                <span className='font-bold text-purple-600'>Code</span>
                <span className='text-slate-600'>Treasure</span>
            </div>
        </div>
    )
}
function QuickLinks() {

    const { sideBarMenuObject: { sideBarMenu,setSideBarMenu } } = useGlobalContext();
    console.log(sideBarMenu, 'this is menu')

    const clickedMenu=(index:number)=>{
        const updatedSidebarMenu = sideBarMenu.map((menu,i)=>{
            if(i===index ){
                return {...menu,isSelected:true}
            }else{
                return {...menu, isSelected:false}
            }
        })

        setSideBarMenu(updatedSidebarMenu)
    }

    return (
        <div className='mt-20 text-sm'>
            <div className="font-bold text-slate-400">Quick Link</div>

            <ul className="text-slate-400 mt-4 flex flex-col gap-2">
                {
                    sideBarMenu && sideBarMenu.map((menu, index) => (
                        <li 
                        key={index}
                        onClick = {()=>clickedMenu(index)}
                        className={`flex gap-1 items-center ${menu.isSelected ? 'bg-purple-600 text-white':''} p-[7px] px-2 rounded-md w-[80%] cursor-pointer `}>
                            {menu.icons}
                            <span>{menu.name}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}


function Languages() {
    return (
        <div className=" mt-7 flex flex-col  text-slate-400 text-sm">
            <div className="font-bold">Languages</div>
            <ul className="mt-5 flex flex-col gap-2 ">
                <li className="flex flex-row justify-between px-2 pr-3 rounded-md p-[7px] hover:text-slate-500 cursor-pointer ">
                    <span> <JavascriptOutlinedIcon /> JavaScript </span>
                    <span>2</span>
                </li>
                <li className="flex flex-row justify-between px-2 pr-3 p-[7px] rounded-md  hover:text-slate-500 cursor-pointer ">
                    <span><JavascriptOutlinedIcon /> Java </span>
                    <span>10</span>
                </li>
                <li className="flex flex-row justify-between px-2 pr-3 p-[7px] rounded-md  hover:text-slate-500 cursor-pointer ">
                    <span><JavascriptOutlinedIcon /> Python </span>
                    <span>5</span>
                </li>
            </ul>
        </div>
    )
}