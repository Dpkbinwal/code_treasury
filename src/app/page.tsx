"use client"

import { mainColor } from "@/assets/colors/Colors";
import Image from "next/image";

import DataObjectIcon from '@mui/icons-material/DataObject';
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="poppins">
      <Navbar />
    </div>
  );
}

function Navbar() {
  return (
    <>
      <div className="flex m-5 gap-8 max-sm:mt-9 mx-8 items-center justify-between max-sm:flex-col">
        <Logo />
        <Button />
      </div>
      <CTASection />
    </>
  );
}

function Logo() {
  return (
    <div className="flex gap-2 items-center">
      <div className={`bg-[${mainColor}] p-[6px] rounded-md`}>
        <DataObjectIcon sx={{ fontSize: 27, color: "white" }} />
        {/* <img src="" alt="Logo"/> */}
      </div>
      <div className="flex gap-1 text-[19px]">
        <span className={`font-bold text-[${mainColor}]`}>Code</span>
        <span className="text-slate-600">Treasury</span>
      </div>
    </div>
  );
}

function Button() {
  const { userId } = useAuth()


  return userId ? (
    <Link href="/my-notes">
      <button
        className={`max-sm:w-full bg-[${mainColor}] p-2 px-6 text-sm text-white rounded-md`}
      >
        Access To The App
      </button>
    </Link>
  ) : (
    <div className="flex gap-2 max-sm:flex-col max-sm:w-[60%] max-sm:mt-8">

      <button
        className={`max-sm:w-full bg-[${mainColor}] p-[8px] px-6 text-sm text-white rounded-md`}>
        <Link href="/sign-in">
          Sign In
        </Link>
      </button>

      <button
        className={`text-sm border border-[${mainColor}] text-[${mainColor}] hover:bg-[${mainColor}] hover:text-white p-[8px] px-6 rounded-md`}>
          <Link href="/sign-up">
          Sign Up
        </Link>
      </button>
    </div>
  );
}

function CTASection() {
  return (
    <div className="flex flex-col mx-16 items-center mt-[120px] gap-6">
      <h2 className="font-bold text-2xl text-center">
        Organize Your Code Snippets
        <span className={`text-[${mainColor}]`}> Efficiently</span>
      </h2>
      <p className="text-center text-sm w-[450px] max-sm:w-full text-slate-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit hic
        est, reiciendis numquam aperiam fugiat cupiditate eaque quia laudantium
        obcaecati ut dignissimos iusto perspiciatis excepturi consequuntur
        inventore autem totam adipisci.
      </p>
      <button
        className="block px-9 py-3 text-sm bg-[#6815dc] rounded-lg font-medium text-white transition focus:outline-none"
        type="button"
      >
        Let&lsquo;s get started!
      </button>
    </div>
  );
}
