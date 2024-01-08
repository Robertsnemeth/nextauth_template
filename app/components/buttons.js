"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <Link className="mr-[10px] border rounded border-white p-2 hover:bg-white hover:text-black" href="/login">
      Sign in
    </Link>
  );
};

export const RegisterButton = () => {
  return (
    <Link href="/register" className="mr-[10px] border rounded border-white p-2 hover:bg-white hover:text-black" >
      Register
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <button className="mr-[10px] border rounded border-white p-2 hover:bg-white hover:text-black"  onClick={() => signOut()}>
      Sign Out
    </button>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile" className="border rounded border-white p-2 hover:bg-white hover:text-black">Profile</Link>;
};
