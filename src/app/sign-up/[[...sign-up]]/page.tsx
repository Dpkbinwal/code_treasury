"use client"

import { SignIn, SignUp } from "@clerk/nextjs";

const SignUpPage = ()=>{
  return (
    <div className={`w-full h-screen flex justify-center items-center`}>
      <SignUp/>
    </div>

  )
}

export default SignUpPage;