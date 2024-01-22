"use client";

import {
    LoginButton,
    LogoutButton,
    ProfileButton,
    RegisterButton,
  } from "../buttons";
  import { useEffect, useState } from "react";
  
const HeaderButtons = ({ session }) => {


    useEffect(() => {
    }, [session]);

  return (
    <>
        {!session ? 
        <div className='flex gap-3 items-center'>
            <LoginButton/>
            <RegisterButton/>
        </div>
        :
        <div className='flex gap-3 items-center'>
            <LogoutButton/>
            <ProfileButton/>
        </div>
        } 
    </>
 )
}

export default HeaderButtons