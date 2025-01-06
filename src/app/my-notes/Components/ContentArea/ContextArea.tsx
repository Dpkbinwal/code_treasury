"use client";
import React from 'react'
import ProfileUser from './TopBar/ProfileUser'
import SearchBar from './TopBar/SearchBar'
import Darkmode from './TopBar/Darkmode'
import { useGlobalContext } from '@/ContextApi'
import { CloseOutlined, MenuOutlined } from '@mui/icons-material';
import SwiperSelection from './NotesArea/SwiperSelection';
import AllNotesSection from './NotesArea/AllNotesSection';
import ContentNote from '../ContentNote/ContentNote';

const ContextArea = () => {

  const {darkModeObject:{darkMode},} = useGlobalContext()

  return (
    <div className={`w-[80%] h-screen ${darkMode[1].isSelected ?'bg-slate-100': 'bg-slate-700'}   p-5`}>
        <TopBar/>
        <NotesArea/>
    </div>
  )
}

function TopBar(){
  const {darkModeObject:{darkMode},} = useGlobalContext()

    return (
        <div className={`rounded-lg flex justify-between items-center  p-3 ${!darkMode[1].isSelected ? 'text-white bg-slate-800':'bg-white'}`} >
            <ProfileUser/>
            <SearchBar/>
            <div className='flex gap-4 items-center'>
            <Darkmode/>
            <MenuIcon/>
            </div>
        </div>
    )
}

const MenuIcon = ()=>{
   const { openSideBarObject:{isOpen,setIsOpen} } = useGlobalContext() 
  return (
    <>
    {
      isOpen ?
       <MenuOutlined onClick={()=>setIsOpen(!isOpen)} className='text-slate-400 cursor-pointer hidden max-md:block'/> :
       <CloseOutlined onClick={()=>setIsOpen(!isOpen)}  className='text-slate-400 cursor-pointer hidden max-md:block'/>     
    }
    </>
  )
}


function NotesArea(){

  const { openContentObject:{openContentNote},mobileView:{isMobile}} = useGlobalContext();

  return (
    <div className='mt-5 flex gap-2'>
      <div className={`${openContentNote ? "w-1/2":"w-full"} ${isMobile?"!w-full":""} `}>
      <SwiperSelection/>
      <AllNotesSection/>
      </div>
      <ContentNote/>
    </div>
  )
}




export default ContextArea